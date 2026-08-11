import IMAGE_MANIFEST from "@/lib/data/recipe-images.json";
import { tavilySearch } from "@/lib/tavily";

/**
 * Photos des recettes.
 *
 * Deux contraintes ont façonné ce module, et elles priment sur la commodité.
 *
 * **Le droit d'auteur.** La quasi-totalité des photos de cuisine que
 * remonte une recherche web sont protégées : les afficher dans une
 * application publique serait une contrefaçon. La recherche est donc
 * restreinte à des sources dont la licence autorise la réutilisation, et
 * chaque image conserve sa page d'origine pour l'attribution — que la
 * licence exige.
 *
 * **La stabilité.** On ne cherche pas une image à chaque affichage : ce
 * serait lent, coûteux en quota, et le visuel d'un plat changerait d'une
 * visite à l'autre. Les images sont figées dans un manifeste versionné
 * (`lib/data/recipe-images.json`), régénéré à la demande par
 * `scripts/fetch-recipe-images.mjs`. L'application, elle, se contente de
 * lire ce fichier.
 */

/** Hôtes dont on accepte d'afficher les images. */
export const ALLOWED_IMAGE_HOSTS = ["upload.wikimedia.org"];

/**
 * Sources interrogées : uniquement des dépôts sous licence libre.
 * Wikimedia Commons impose l'attribution, que l'interface affiche.
 */
const OPEN_LICENCE_DOMAINS = ["commons.wikimedia.org", "wikipedia.org"];

export interface RecipeImage {
  /** URL directe du fichier image. */
  url: string;
  /** Page d'origine, affichée en attribution. */
  sourcePage: string;
  /** Intitulé de la page source. */
  sourceTitle: string;
  /** Date de récupération, au format ISO. */
  fetchedAt: string;
}

type Manifest = Record<string, RecipeImage>;

const MANIFEST = IMAGE_MANIFEST as Manifest;

/** Vrai si l'URL pointe vers un hôte autorisé, en HTTPS. */
export function isAllowedImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      ALLOWED_IMAGE_HOSTS.some(
        (host) => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`),
      )
    );
  } catch {
    return false;
  }
}

/**
 * Image d'une recette, telle que servie à l'interface.
 * Renvoie `null` quand aucune image n'a été retenue : la carte retombe
 * alors sur son pictogramme, qui reste un affichage valable.
 */
export function getRecipeImage(slug: string): RecipeImage | null {
  const entry = MANIFEST[slug];
  if (!entry || !isAllowedImageUrl(entry.url)) return null;
  return entry;
}

/** Nombre de recettes illustrées — utile pour les scripts et les tests. */
export function countIllustrated(): number {
  return Object.keys(MANIFEST).filter((slug) => getRecipeImage(slug) !== null).length;
}

/** Formats d'image acceptés : pas de SVG, pas de GIF animé. */
const IMAGE_EXTENSION = /\.(jpe?g|png|webp)$/i;

/**
 * Cherche une image libre de droits pour un plat.
 *
 * Utilisé par le script de génération du manifeste, jamais au rendu d'une
 * page. Renvoie `null` si rien de convenable n'a été trouvé — auquel cas la
 * recette reste sans photo, ce qui vaut mieux qu'une image hors sujet.
 */
export async function searchRecipeImage(
  dishName: string,
  extraTerms = "",
): Promise<RecipeImage | null> {
  const search = await tavilySearch(`${dishName} ${extraTerms} plat cuisine`.trim(), {
    maxResults: 6,
    searchDepth: "advanced",
    includeImages: true,
    includeImageDescriptions: true,
    includeDomains: OPEN_LICENCE_DOMAINS,
    // Une photo de plat ne se périme pas : on garde le résultat longtemps.
    cacheTtlMs: 24 * 60 * 60 * 1000,
  });

  if (!search) return null;

  const candidate = search.images.find(
    (image) => isAllowedImageUrl(image.url) && IMAGE_EXTENSION.test(new URL(image.url).pathname),
  );
  if (!candidate) return null;

  // On rattache l'image à la page qui la portait, pour pouvoir créditer.
  const page = search.results[0];

  return {
    url: candidate.url,
    sourcePage: page?.url ?? "https://commons.wikimedia.org",
    sourceTitle: candidate.description || page?.title || dishName,
    fetchedAt: new Date().toISOString(),
  };
}
