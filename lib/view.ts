import { INGREDIENTS, getIngredient } from "@/lib/data/ingredients";
import { RECIPES, getRecipe } from "@/lib/data/recipes";
import { analyseCoverage, missingCost } from "@/lib/planner";
import { costOf, recipeCost, scaleQty } from "@/lib/pricing";
import { getRecipeImage, type RecipeImage } from "@/lib/recipe-images";
import type {
  Bilingual,
  IngredientCategory,
  MealRequest,
  Recipe,
  Cuisine,
  RecipeCategory,
  RecipeTag,
  ShopId,
  Step,
  Unit,
} from "@/lib/types";

/**
 * Modèles de vue : versions allégées du domaine, envoyées aux composants
 * client. Le catalogue complet reste côté serveur.
 */

export interface RecipeSummary {
  slug: string;
  name: Bilingual;
  description: Bilingual;
  region?: Bilingual;
  cuisine: Cuisine;
  category: RecipeCategory;
  serves: number;
  totalMinutes: number;
  difficulty: 1 | 2 | 3;
  tags: RecipeTag[];
  months: number[];
  stepCount: number;
  /** Coût estimé pour le nombre de convives demandé, en dinars. */
  cost: number;
  /** Photo libre de droits, ou null : la carte affiche alors son pictogramme. */
  image: RecipeImage | null;
}

export function toSummary(recipe: Recipe, people = recipe.serves): RecipeSummary {
  return {
    slug: recipe.slug,
    name: recipe.name,
    description: recipe.description,
    region: recipe.region,
    cuisine: recipe.cuisine ?? "tunisienne",
    category: recipe.category,
    serves: people,
    totalMinutes: recipe.prepMinutes + recipe.cookMinutes,
    difficulty: recipe.difficulty,
    tags: recipe.tags,
    months: recipe.months,
    stepCount: recipe.steps.length,
    cost: recipeCost(recipe, people),
    image: getRecipeImage(recipe.slug),
  };
}

export function summarize(slugs: string[], people: number): RecipeSummary[] {
  return slugs
    .map((slug) => getRecipe(slug))
    .filter((r): r is Recipe => Boolean(r))
    .map((r) => toSummary(r, people));
}

/** Sans nombre de convives, chaque recette est chiffrée pour sa portion d'origine. */
export function allSummaries(people?: number): RecipeSummary[] {
  return RECIPES.map((r) => toSummary(r, people ?? r.serves));
}

/** Un ingrédient tel qu'affiché dans le mode cuisine. */
export interface CookingIngredient {
  id: string;
  name: Bilingual;
  /** Quantité pour `baseServes` convives ; le client la remet à l'échelle. */
  qty: number;
  unit: Unit;
  note?: Bilingual;
  optional: boolean;
  shop: ShopId;
}

/** Tout ce dont le mode cuisine a besoin, sans exposer le catalogue complet. */
export interface CookingPayload {
  slug: string;
  name: Bilingual;
  description: Bilingual;
  region?: Bilingual;
  category: RecipeCategory;
  tags: RecipeTag[];
  difficulty: 1 | 2 | 3;
  prepMinutes: number;
  cookMinutes: number;
  baseServes: number;
  /** Coût pour `baseServes` convives, en dinars. */
  baseCost: number;
  ingredients: CookingIngredient[];
  steps: Step[];
  utensils: Bilingual[];
  tips: Bilingual[];
  image: RecipeImage | null;
}

export function toCookingPayload(recipe: Recipe): CookingPayload {
  return {
    slug: recipe.slug,
    name: recipe.name,
    description: recipe.description,
    region: recipe.region,
    category: recipe.category,
    tags: recipe.tags,
    difficulty: recipe.difficulty,
    prepMinutes: recipe.prepMinutes,
    cookMinutes: recipe.cookMinutes,
    baseServes: recipe.serves,
    baseCost: recipeCost(recipe, recipe.serves),
    ingredients: recipe.ingredients.map((ri) => {
      const ing = getIngredient(ri.id);
      return {
        id: ri.id,
        name: ing?.name ?? { fr: ri.id, ar: ri.id },
        qty: ri.qty,
        unit: ri.unit,
        note: ri.note,
        optional: Boolean(ri.optional),
        shop: ing?.shop ?? "grande_surface",
      };
    }),
    steps: recipe.steps,
    utensils: recipe.utensils,
    tips: recipe.tips ?? [],
    image: getRecipeImage(recipe.slug),
  };
}

/** Un ingrédient qui manque pour réaliser une recette. */
export interface MissingItem {
  id: string;
  name: Bilingual;
  qty: number;
  unit: Unit;
  shop: ShopId;
  cost: number;
}

/**
 * Une recette confrontée au garde-manger.
 *
 * C'est le modèle central du tableau de bord : pour chaque plat, ce qu'on a
 * déjà, ce qui manque, et ce que ça coûterait de compléter.
 */
export interface PantryMatch {
  recipe: RecipeSummary;
  /** Part des ingrédients déterminants déjà au placard (0–1). */
  coverage: number;
  /** Nombre d'ingrédients déterminants. */
  essentials: number;
  owned: number;
  missing: MissingItem[];
  /** Produits de base manquants : à vérifier, sans bloquer la recette. */
  missingStaples: MissingItem[];
  /** Coût de ce qu'il reste à acheter, en dinars. */
  toBuyCost: number;
}

function toMissingItems(
  recipe: Recipe,
  items: { id: string; qty: number; unit: Unit }[],
  people: number,
): MissingItem[] {
  return items.map((ri) => {
    const ing = getIngredient(ri.id);
    const qty = scaleQty(ri.qty, recipe.serves, people);
    return {
      id: ri.id,
      name: ing?.name ?? { fr: ri.id, ar: ri.id },
      qty,
      unit: ri.unit,
      shop: ing?.shop ?? "grande_surface",
      cost: costOf(ri.id, qty, ri.unit),
    };
  });
}

/** Confronte une recette au garde-manger. */
export function toPantryMatch(
  recipe: Recipe,
  pantry: Set<string>,
  people: number,
): PantryMatch {
  const info = analyseCoverage(recipe, pantry);
  return {
    recipe: toSummary(recipe, people),
    coverage: info.coverage,
    essentials: info.essentials,
    owned: info.owned,
    missing: toMissingItems(recipe, info.missingEssentials, people),
    missingStaples: toMissingItems(recipe, info.missingStaples, people),
    toBuyCost: missingCost(recipe, info.missingEssentials, people),
  };
}

/**
 * Tout le répertoire confronté au garde-manger, du plus réalisable au moins.
 *
 * À couverture égale, on départage par la saison puis par le coût de ce
 * qu'il reste à acheter : entre deux plats aussi faisables, autant proposer
 * celui qui est de saison et qui coûte le moins à compléter.
 */
export function rankByPantry(
  pantry: string[],
  people: number,
  month: number,
  cuisine?: Cuisine | null,
): PantryMatch[] {
  const owned = new Set(pantry);

  return RECIPES.filter((r) => !cuisine || (r.cuisine ?? "tunisienne") === cuisine)
    .map((r) => toPantryMatch(r, owned, people))
    .sort((a, b) => {
      if (b.coverage !== a.coverage) return b.coverage - a.coverage;
      const seasonA = a.recipe.months.includes(month) ? 1 : 0;
      const seasonB = b.recipe.months.includes(month) ? 1 : 0;
      if (seasonB !== seasonA) return seasonB - seasonA;
      return a.toBuyCost - b.toBuyCost;
    });
}

export interface IngredientOption {
  id: string;
  name: Bilingual;
  category: IngredientCategory;
  shop: ShopId;
  staple: boolean;
  season?: number[];
}

export function ingredientOptions(): IngredientOption[] {
  return INGREDIENTS.map((i) => ({
    id: i.id,
    name: i.name,
    category: i.category,
    shop: i.shop,
    staple: Boolean(i.staple),
    season: i.season,
  }));
}

const VALID_TAGS: RecipeTag[] = [
  "rapide",
  "economique",
  "vegetarien",
  "plat_unique",
  "ramadan",
  "invites",
  "enfants",
  "sans_gluten",
  "batch",
];

const VALID_CUISINES: Cuisine[] = ["tunisienne", "italienne"];

const KNOWN_INGREDIENTS = new Set(INGREDIENTS.map((i) => i.id));

function clamp(value: number, min: number, max: number, fallback: number): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.round(value)));
}

/**
 * Valide et normalise le corps d'une requête. Rien de ce qui arrive du
 * client n'est utilisé tel quel : les identifiants inconnus sont écartés et
 * les nombres sont bornés.
 */
export function parseMealRequest(body: unknown): MealRequest {
  const raw = (body ?? {}) as Record<string, unknown>;

  const budgetRaw = raw.budget;
  const budget =
    budgetRaw === null || budgetRaw === undefined || budgetRaw === ""
      ? null
      : clamp(Number(budgetRaw), 1, 1000, 40);

  const pantry = Array.isArray(raw.pantry)
    ? raw.pantry.filter((id): id is string => typeof id === "string" && KNOWN_INGREDIENTS.has(id))
    : [];

  const tags = Array.isArray(raw.tags)
    ? raw.tags.filter((t): t is RecipeTag => VALID_TAGS.includes(t as RecipeTag))
    : [];

  const exclude = Array.isArray(raw.exclude)
    ? raw.exclude.filter((s): s is string => typeof s === "string" && Boolean(getRecipe(s)))
    : [];

  const note = typeof raw.note === "string" ? raw.note.slice(0, 300).trim() : undefined;

  return {
    people: clamp(Number(raw.people), 1, 20, 4),
    budget,
    maxMinutes: clamp(Number(raw.maxMinutes), 10, 360, 60),
    month: clamp(Number(raw.month), 1, 12, new Date().getMonth() + 1),
    pantry,
    tags,
    cuisine: VALID_CUISINES.includes(raw.cuisine as Cuisine)
      ? (raw.cuisine as Cuisine)
      : null,
    exclude,
    note: note || undefined,
  };
}

/** Graine du jour : la suggestion change d'un jour à l'autre, pas d'une seconde à l'autre. */
export function todaySeed(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}
