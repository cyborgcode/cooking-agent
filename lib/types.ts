/**
 * Domaine métier de l'agent cuisine tunisien.
 * Tous les libellés destinés à l'utilisateur sont bilingues : français + arabe (derja).
 */

export type Lang = "fr" | "ar";

/** Un libellé disponible dans les deux langues de l'application. */
export interface Bilingual {
  fr: string;
  /** Arabe tunisien (derja) — le mot réellement utilisé au marché. */
  ar: string;
}

/** Types de commerces où l'on fait ses courses en Tunisie. */
export type ShopId =
  | "marche"
  | "boucherie"
  | "poissonnerie"
  | "attar"
  | "grande_surface"
  | "boulangerie";

export interface Shop {
  id: ShopId;
  name: Bilingual;
  /** Ordre de passage conseillé pendant les courses. */
  order: number;
  /** Icône (clé du registre d'icônes, jamais un emoji). */
  icon: string;
}

export type IngredientCategory =
  | "legume"
  | "fruit"
  | "herbe"
  | "viande"
  | "poisson"
  | "cremerie"
  | "epice"
  | "cereale"
  | "legumineuse"
  | "epicerie"
  | "boulangerie";

/** Unités utilisées dans les recettes. */
export type Unit =
  | "g"
  | "kg"
  | "ml"
  | "l"
  | "piece"
  | "botte"
  | "cas" // cuillère à soupe
  | "cac" // cuillère à café
  | "pincee"
  | "gousse"
  | "boite"
  | "feuille"
  | "verre";

/** Unité de référence pour le prix au marché. */
export type PriceUnit = "kg" | "l" | "piece" | "botte" | "boite" | "paquet";

export interface Ingredient {
  id: string;
  name: Bilingual;
  category: IngredientCategory;
  /** Où on l'achète habituellement. */
  shop: ShopId;
  /** Prix indicatif en dinars tunisiens (TND). */
  price: number;
  priceUnit: PriceUnit;
  /**
   * Mois (1–12) où le produit est de saison et au meilleur prix.
   * Absent = disponible toute l'année.
   */
  season?: number[];
  /**
   * Poids moyen d'une pièce, en grammes. Nécessaire pour les produits vendus
   * au kilo mais comptés à l'unité dans les recettes (« 2 oignons »).
   */
  pieceGrams?: number;
  /** Contenu net d'une boîte / d'un paquet, en grammes ou millilitres. */
  packGrams?: number;
  /** Nombre d'unités par paquet (ex. 10 feuilles de malsouka). */
  packUnits?: number;
  /** Produit de base que l'on garde au placard. */
  staple?: boolean;
  /** Produit subventionné / à prix encadré en Tunisie. */
  subsidized?: boolean;
  /** Remplacements possibles, du plus proche au plus éloigné. */
  substitutes?: string[];
}

export interface RecipeIngredient {
  /** Référence vers `Ingredient.id`. */
  id: string;
  /** Quantité pour `Recipe.serves` personnes. */
  qty: number;
  unit: Unit;
  note?: Bilingual;
  optional?: boolean;
}

export interface Step {
  text: Bilingual;
  /** Durée de l'étape, en minutes — déclenche un minuteur dans le mode cuisine. */
  minutes?: number;
  /** Astuce affichée sous l'étape. */
  tip?: Bilingual;
}

export type RecipeCategory =
  | "plat"
  | "soupe"
  | "salade"
  | "entree"
  | "petit_dejeuner"
  | "dessert";

export type RecipeTag =
  | "rapide"
  | "economique"
  | "vegetarien"
  | "plat_unique"
  | "ramadan"
  | "invites"
  | "enfants"
  | "sans_gluten"
  | "batch";

export interface Recipe {
  slug: string;
  name: Bilingual;
  description: Bilingual;
  region?: Bilingual;
  category: RecipeCategory;
  /** Nombre de personnes pour lequel les quantités sont exprimées. */
  serves: number;
  prepMinutes: number;
  cookMinutes: number;
  /** 1 = facile, 2 = moyen, 3 = demande de l'expérience. */
  difficulty: 1 | 2 | 3;
  /** Mois (1–12) où la recette est la plus adaptée. */
  months: number[];
  tags: RecipeTag[];
  ingredients: RecipeIngredient[];
  steps: Step[];
  utensils: Bilingual[];
  tips?: Bilingual[];
}

/** Contexte fourni par l'utilisateur pour la suggestion du jour. */
export interface MealRequest {
  /** Nombre de convives. */
  people: number;
  /** Budget maximum du repas, en TND. Null = pas de contrainte. */
  budget: number | null;
  /** Temps disponible en minutes (préparation + cuisson). */
  maxMinutes: number;
  /** Mois courant (1–12), pour la saisonnalité. */
  month: number;
  /** `Ingredient.id` déjà présents dans le garde-manger. */
  pantry: string[];
  /** Filtres de régime / occasion. */
  tags: RecipeTag[];
  /** Recettes déjà cuisinées récemment, à éviter. */
  exclude?: string[];
  /** Demande libre de l'utilisateur ("quelque chose de léger", "j'ai des courgettes"…). */
  note?: string;
}

/** Ligne de la liste de courses. */
export interface ShoppingLine {
  ingredientId: string;
  name: Bilingual;
  shop: ShopId;
  qty: number;
  unit: Unit;
  /** Coût estimé de cette ligne, en TND. */
  cost: number;
  /** Déjà disponible dans le garde-manger. */
  inPantry: boolean;
}

/** Adaptation proposée par l'agent (substitution, ajustement…). */
export interface Adaptation {
  /** Nom de l'ingrédient remplacé, tel qu'affiché. */
  from?: string;
  /** Nom du remplaçant. */
  to?: string;
  reason: Bilingual;
}

/** Réponse de l'agent pour un repas. */
export interface MealSuggestion {
  slug: string;
  /** Justification du choix, rédigée pour l'utilisateur. */
  why: Bilingual;
  /** Astuces d'adaptation au contexte (budget, garde-manger, saison). */
  adaptations: Adaptation[];
  /** Coût estimé total en TND, pour le nombre de convives demandé. */
  estimatedCost: number;
  /** Ce qu'il faut acheter, hors garde-manger. */
  shoppingList: ShoppingLine[];
  /** Suggestions de repas alternatifs. */
  alternatives: string[];
}

export interface AgentResponse {
  suggestion: MealSuggestion;
  /** Origine de la réponse : modèle Gemini ou planificateur local. */
  source: "gemini" | "local";
  /** Message d'information affiché quand on est retombé sur le mode local. */
  notice?: string;
}
