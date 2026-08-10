import { INGREDIENTS, getIngredient } from "@/lib/data/ingredients";
import { RECIPES, getRecipe } from "@/lib/data/recipes";
import { recipeCost } from "@/lib/pricing";
import type {
  Bilingual,
  IngredientCategory,
  MealRequest,
  Recipe,
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
  category: RecipeCategory;
  serves: number;
  totalMinutes: number;
  difficulty: 1 | 2 | 3;
  tags: RecipeTag[];
  months: number[];
  stepCount: number;
  /** Coût estimé pour le nombre de convives demandé, en dinars. */
  cost: number;
}

export function toSummary(recipe: Recipe, people = recipe.serves): RecipeSummary {
  return {
    slug: recipe.slug,
    name: recipe.name,
    description: recipe.description,
    region: recipe.region,
    category: recipe.category,
    serves: people,
    totalMinutes: recipe.prepMinutes + recipe.cookMinutes,
    difficulty: recipe.difficulty,
    tags: recipe.tags,
    months: recipe.months,
    stepCount: recipe.steps.length,
    cost: recipeCost(recipe, people),
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
  };
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
    exclude,
    note: note || undefined,
  };
}

/** Graine du jour : la suggestion change d'un jour à l'autre, pas d'une seconde à l'autre. */
export function todaySeed(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}
