import { GoogleGenAI, Type } from "@google/genai";
import { getIngredient, inSeason } from "@/lib/data/ingredients";
import { getRecipe } from "@/lib/data/recipes";
import { finalizeSuggestion, planLocally, rankRecipes } from "@/lib/planner";
import { recipeCost } from "@/lib/pricing";
import type { Adaptation, AgentResponse, MealRequest } from "@/lib/types";

/**
 * Le cerveau de l'agent.
 *
 * Gemini ne choisit que parmi les recettes du répertoire local, et n'invente
 * jamais ni prix ni quantité : les chiffres sont recalculés ici après coup.
 * Sans clé d'API — ou si l'appel échoue — on retombe sur le planificateur
 * local, qui répond toujours.
 */

const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
const TIMEOUT_MS = 20_000;
/** Nombre de recettes soumises au modèle : présélectionnées localement. */
const CANDIDATES = 10;

const SYSTEM_INSTRUCTION = `Tu es un chef tunisien qui aide une famille à décider quoi cuisiner aujourd'hui.

Règles absolues :
- Tu choisis UNIQUEMENT un plat parmi la liste de candidats fournie, en renvoyant son "slug" exact.
- Tu n'inventes jamais de prix, de quantité ni de recette : ces données sont calculées ailleurs.
- Tu raisonnes sur le marché tunisien : produits de saison, disponibilité chez l'attar, le boucher ou au marché, et prix en dinars.

Ton style :
- En français : direct, chaleureux, concret. Deux ou trois phrases maximum.
- En derja tunisienne : la langue parlée à la maison, écrite en caractères arabes. Pas d'arabe littéraire.
- Justifie ton choix par le contexte réel de l'utilisateur (saison, budget, temps, ce qu'il a déjà) et non par des généralités.

Pour les adaptations, propose des substitutions réellement trouvables en Tunisie.`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    slug: {
      type: Type.STRING,
      description: "Le slug exact du plat choisi, copié depuis la liste des candidats.",
    },
    why_fr: {
      type: Type.STRING,
      description: "Pourquoi ce plat aujourd'hui, en français, 2 à 3 phrases.",
    },
    why_ar: {
      type: Type.STRING,
      description: "La même justification en derja tunisienne, en caractères arabes.",
    },
    adaptations: {
      type: Type.ARRAY,
      description: "Jusqu'à 3 conseils d'adaptation au contexte de l'utilisateur.",
      items: {
        type: Type.OBJECT,
        properties: {
          from: { type: Type.STRING, description: "Ingrédient remplacé, ou chaîne vide." },
          to: { type: Type.STRING, description: "Ingrédient de remplacement, ou chaîne vide." },
          reason_fr: { type: Type.STRING },
          reason_ar: { type: Type.STRING },
        },
        required: ["reason_fr", "reason_ar"],
      },
    },
    alternatives: {
      type: Type.ARRAY,
      description: "2 ou 3 autres slugs de la liste, par ordre de préférence.",
      items: { type: Type.STRING },
    },
  },
  required: ["slug", "why_fr", "why_ar", "adaptations", "alternatives"],
};

const MONTHS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

/** Décrit le contexte et les candidats au modèle, en texte compact. */
function buildPrompt(req: MealRequest): string {
  const candidates = rankRecipes(req).slice(0, CANDIDATES);

  const lines = candidates.map(({ recipe, cost }) => {
    const minutes = recipe.prepMinutes + recipe.cookMinutes;
    const main = recipe.ingredients
      .slice(0, 5)
      .map((ri) => getIngredient(ri.id)?.name.fr ?? ri.id)
      .join(", ");
    return `- ${recipe.slug} | ${recipe.name.fr} (${recipe.name.ar}) | ${recipe.category} | ${minutes} min | ~${cost.toFixed(1)} DT pour ${req.people} pers. | difficulté ${recipe.difficulty}/3 | tags: ${recipe.tags.join(", ") || "aucun"} | principaux ingrédients : ${main}`;
  });

  const seasonal = inSeason(req.month)
    .map((i) => i.name.fr)
    .slice(0, 14)
    .join(", ");

  const pantry = req.pantry.length
    ? req.pantry.map((id) => getIngredient(id)?.name.fr ?? id).join(", ")
    : "rien de déclaré";

  return [
    `Nous sommes en ${MONTHS[req.month - 1]}.`,
    `Produits de saison en Tunisie ce mois-ci : ${seasonal}.`,
    "",
    `Contexte : ${req.people} personne(s) à table.`,
    `Budget : ${req.budget === null ? "libre" : `${req.budget} DT maximum`}.`,
    `Temps disponible : ${req.maxMinutes} minutes.`,
    `Contraintes : ${req.tags.length ? req.tags.join(", ") : "aucune"}.`,
    `Garde-manger : ${pantry}.`,
    req.note ? `Demande particulière : « ${req.note} »` : "",
    req.exclude?.length ? `Déjà cuisiné récemment, à éviter : ${req.exclude.join(", ")}.` : "",
    "",
    "Candidats (choisis-en un seul) :",
    ...lines,
  ]
    .filter(Boolean)
    .join("\n");
}

interface ModelOutput {
  slug: string;
  why_fr: string;
  why_ar: string;
  adaptations?: { from?: string; to?: string; reason_fr: string; reason_ar: string }[];
  alternatives?: string[];
}

/** Vrai si une clé Gemini est configurée côté serveur. */
export function hasGeminiKey(): boolean {
  return Boolean(process.env.GEMINI_API_KEY);
}

/**
 * Choisit le repas du jour. Tente Gemini, retombe sur le planificateur local
 * dès que quelque chose cloche — clé absente, réseau, réponse inexploitable.
 */
export async function suggestMeal(req: MealRequest, seed = ""): Promise<AgentResponse> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      suggestion: planLocally(req, seed),
      source: "local",
      notice:
        "Aucune clé GEMINI_API_KEY n'est configurée : la suggestion vient du planificateur local.",
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: buildPrompt(req),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
        temperature: 0.8,
        abortSignal: AbortSignal.timeout(TIMEOUT_MS),
      },
    });

    const text = response.text;
    if (!text) throw new Error("réponse vide du modèle");

    const parsed = JSON.parse(text) as ModelOutput;

    // Le modèle doit avoir choisi un plat réel : sinon on ne lui fait pas confiance.
    if (!parsed.slug || !getRecipe(parsed.slug)) {
      throw new Error(`slug inconnu renvoyé par le modèle : ${parsed.slug}`);
    }

    const adaptations: Adaptation[] = (parsed.adaptations ?? [])
      .filter((a) => a.reason_fr && a.reason_ar)
      .slice(0, 4)
      .map((a) => ({
        from: a.from || undefined,
        to: a.to || undefined,
        reason: { fr: a.reason_fr, ar: a.reason_ar },
      }));

    const suggestion = finalizeSuggestion(
      parsed.slug,
      { fr: parsed.why_fr, ar: parsed.why_ar },
      adaptations,
      parsed.alternatives ?? [],
      req,
    );
    if (!suggestion) throw new Error("recette introuvable après validation");

    // Le modèle propose parfois moins d'alternatives que demandé : on complète.
    if (suggestion.alternatives.length < 2) {
      const extra = rankRecipes(req, seed)
        .map((r) => r.recipe.slug)
        .filter((s) => s !== suggestion.slug && !suggestion.alternatives.includes(s))
        .slice(0, 3 - suggestion.alternatives.length);
      suggestion.alternatives.push(...extra);
    }

    return { suggestion, source: "gemini" };
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.error("[agent] Gemini indisponible, bascule sur le planificateur local :", reason);
    return {
      suggestion: planLocally(req, seed),
      source: "local",
      notice: "Le modèle n'a pas répondu ; voici la suggestion du planificateur local.",
    };
  }
}

/** Coût estimé d'une recette — réexporté pour les routes API. */
export { recipeCost };
