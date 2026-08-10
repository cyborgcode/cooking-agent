import { getIngredient } from "@/lib/data/ingredients";
import { RECIPES, getRecipe } from "@/lib/data/recipes";
import { buildShoppingList, recipeCost } from "@/lib/pricing";
import type { Adaptation, MealRequest, MealSuggestion, Recipe } from "@/lib/types";

/**
 * Planificateur local : choisit un plat sans appeler de modèle.
 *
 * Il sert à deux choses — répondre instantanément quand aucune clé Gemini
 * n'est configurée, et fournir la présélection de recettes que l'on soumet
 * ensuite au modèle. Le score est entièrement déterministe.
 */

interface ScoredRecipe {
  recipe: Recipe;
  score: number;
  cost: number;
  reasons: string[];
}

/** Hachage stable : même entrée, même sortie, pour varier les plats sans hasard. */
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/** Part des ingrédients de la recette déjà présents au garde-manger (0–1). */
function pantryCoverage(recipe: Recipe, pantry: Set<string>): number {
  const required = recipe.ingredients.filter((i) => !i.optional);
  if (required.length === 0) return 0;
  const owned = required.filter((i) => pantry.has(i.id)).length;
  return owned / required.length;
}

/** Part des ingrédients frais qui sont de saison ce mois-ci (0–1). */
function seasonalFit(recipe: Recipe, month: number): number {
  const seasonal = recipe.ingredients
    .map((i) => getIngredient(i.id))
    .filter((ing) => ing?.season);
  if (seasonal.length === 0) return 1;
  const inSeason = seasonal.filter((ing) => ing!.season!.includes(month)).length;
  return inSeason / seasonal.length;
}

function scoreRecipe(recipe: Recipe, req: MealRequest, seed: string): ScoredRecipe {
  const pantry = new Set(req.pantry);
  const cost = recipeCost(recipe, req.people);
  const totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  const reasons: string[] = [];
  let score = 0;

  // Saison du plat lui-même.
  if (recipe.months.includes(req.month)) {
    score += 20;
  } else {
    score -= 15;
  }

  // Saison des ingrédients : c'est ce qui fait le prix au marché.
  const fit = seasonalFit(recipe, req.month);
  score += fit * 25;
  if (fit >= 0.8) reasons.push("ingrédients de saison");

  // Temps disponible.
  if (totalMinutes <= req.maxMinutes) {
    score += 20;
    if (totalMinutes <= req.maxMinutes / 2) reasons.push("rapide à préparer");
  } else {
    // Pénalité proportionnelle au dépassement, pas une exclusion sèche.
    score -= Math.min(60, ((totalMinutes - req.maxMinutes) / req.maxMinutes) * 60);
  }

  // Budget.
  if (req.budget !== null) {
    if (cost <= req.budget) {
      score += 20;
      if (cost <= req.budget * 0.6) reasons.push("bien en dessous du budget");
    } else {
      score -= Math.min(50, ((cost - req.budget) / req.budget) * 50);
    }
  }

  // Garde-manger : privilégier ce qu'on a déjà.
  const coverage = pantryCoverage(recipe, pantry);
  score += coverage * 30;
  if (coverage >= 0.5) reasons.push("utilise ce que vous avez déjà");

  // Contraintes explicites (végétarien, ramadan, enfants…).
  for (const tag of req.tags) {
    if (recipe.tags.includes(tag)) {
      score += 18;
    } else {
      score -= 25;
    }
  }

  // Variation jour après jour, sans aléatoire : deux jours différents
  // ne proposent pas le même plat à contraintes identiques.
  score += (hash(recipe.slug + seed) % 100) / 10;

  return { recipe, score, cost, reasons };
}

/** Classe toutes les recettes compatibles, la meilleure en tête. */
export function rankRecipes(req: MealRequest, seed = ""): ScoredRecipe[] {
  const excluded = new Set(req.exclude ?? []);
  return RECIPES.filter((r) => !excluded.has(r.slug))
    .map((r) => scoreRecipe(r, req, seed))
    .sort((a, b) => b.score - a.score);
}

/**
 * Propose des adaptations : remplacer ce qui manque ou ce qui est hors saison
 * par un équivalent trouvable au marché tunisien.
 */
export function buildAdaptations(recipe: Recipe, req: MealRequest): Adaptation[] {
  const pantry = new Set(req.pantry);
  const adaptations: Adaptation[] = [];

  for (const ri of recipe.ingredients) {
    const ing = getIngredient(ri.id);
    if (!ing || pantry.has(ri.id)) continue;

    const outOfSeason = ing.season && !ing.season.includes(req.month);
    if (!outOfSeason || !ing.substitutes?.length) continue;

    const replacement = getIngredient(ing.substitutes[0]);
    if (!replacement) continue;

    adaptations.push({
      from: ing.name.fr,
      to: replacement.name.fr,
      reason: {
        fr: `${ing.name.fr} n'est pas de saison ce mois-ci : ${replacement.name.fr} fera l'affaire et coûtera moins cher.`,
        ar: `${ing.name.ar} موش في وقتها هذا الشهر، ${replacement.name.ar} تنجّم تعوّضها وأرخص.`,
      },
    });
  }

  // Conseil budget quand l'estimation dépasse la limite fixée.
  const cost = recipeCost(recipe, req.people);
  if (req.budget !== null && cost > req.budget) {
    const meat = recipe.ingredients.find((ri) => {
      const ing = getIngredient(ri.id);
      return ing?.category === "viande" && ing.substitutes?.length;
    });
    if (meat) {
      const ing = getIngredient(meat.id)!;
      const cheaper = getIngredient(ing.substitutes![0]);
      if (cheaper) {
        adaptations.push({
          from: ing.name.fr,
          to: cheaper.name.fr,
          reason: {
            fr: `Pour tenir le budget, remplacez ${ing.name.fr} par ${cheaper.name.fr}, ou réduisez la quantité de viande d'un tiers.`,
            ar: `باش تلحق الميزانية، بدّل ${ing.name.ar} بـ${cheaper.name.ar}، ولا نقّص ثلث اللحم.`,
          },
        });
      }
    }
  }

  return adaptations.slice(0, 4);
}

/** Rédige la justification du choix, en français et en derja. */
function explain(scored: ScoredRecipe, req: MealRequest): { fr: string; ar: string } {
  const { recipe, cost, reasons } = scored;
  const minutes = recipe.prepMinutes + recipe.cookMinutes;
  const list = reasons.length > 0 ? reasons.join(", ") : "un classique qui marche toujours";

  return {
    fr:
      `${recipe.name.fr} pour ${req.people} personne${req.people > 1 ? "s" : ""} : ` +
      `${list}. Comptez ${minutes} minutes en tout et environ ${cost.toFixed(1)} DT.`,
    ar:
      `${recipe.name.ar} لـ${req.people} أشخاص. ` +
      `تاخذ ${minutes} دقيقة وتكلّف تقريب ${cost.toFixed(1)} دينار.`,
  };
}

/** Suggestion complète produite sans modèle. */
export function planLocally(req: MealRequest, seed = ""): MealSuggestion {
  const ranked = rankRecipes(req, seed);
  const best = ranked[0];

  return {
    slug: best.recipe.slug,
    why: explain(best, req),
    adaptations: buildAdaptations(best.recipe, req),
    estimatedCost: best.cost,
    shoppingList: buildShoppingList(best.recipe, req.people, req.pantry),
    alternatives: ranked.slice(1, 4).map((r) => r.recipe.slug),
  };
}

/**
 * Complète une suggestion venant du modèle : le modèle choisit le plat et
 * rédige les explications, les chiffres restent calculés localement.
 */
export function finalizeSuggestion(
  slug: string,
  why: { fr: string; ar: string },
  adaptations: Adaptation[],
  alternatives: string[],
  req: MealRequest,
): MealSuggestion | null {
  const recipe = getRecipe(slug);
  if (!recipe) return null;

  return {
    slug,
    why,
    adaptations,
    estimatedCost: recipeCost(recipe, req.people),
    shoppingList: buildShoppingList(recipe, req.people, req.pantry),
    alternatives: alternatives.filter((s) => getRecipe(s) && s !== slug).slice(0, 3),
  };
}

/**
 * Menu de la semaine : sept plats variés, sans répétition, en tenant compte
 * de la saison et du garde-manger.
 */
export function planWeek(req: MealRequest, seed = ""): string[] {
  const chosen: string[] = [];
  const used = new Set(req.exclude ?? []);

  for (let day = 0; day < 7; day++) {
    const ranked = rankRecipes({ ...req, exclude: [...used] }, `${seed}-${day}`);
    if (ranked.length === 0) break;
    const pick = ranked[0].recipe;
    chosen.push(pick.slug);
    used.add(pick.slug);
  }

  return chosen;
}
