import { getIngredient } from "@/lib/data/ingredients";
import { formatTND, scaleQty } from "@/lib/scale";
import type {
  Ingredient,
  Recipe,
  RecipeIngredient,
  ShoppingLine,
  Unit,
} from "@/lib/types";

/** Équivalence approximative d'une unité de cuisine en grammes (ou ml). */
const GRAMS_PER_UNIT: Record<Unit, number> = {
  g: 1,
  kg: 1000,
  ml: 1,
  l: 1000,
  cas: 15,
  cac: 5,
  pincee: 1,
  gousse: 5,
  verre: 200,
  botte: 50,
  feuille: 10,
  piece: 100, // remplacé par `pieceGrams` quand il est renseigné
  boite: 400, // remplacé par `packGrams` quand il est renseigné
};

/** Convertit une quantité de recette en grammes / millilitres. */
function toGrams(qty: number, unit: Unit, ing: Ingredient): number {
  if (unit === "piece" && ing.pieceGrams) return qty * ing.pieceGrams;
  if (unit === "boite" && ing.packGrams) return qty * ing.packGrams;
  return qty * GRAMS_PER_UNIT[unit];
}

/**
 * Coût d'une quantité d'ingrédient, en dinars.
 * Convertit l'unité de la recette vers l'unité de vente au marché.
 */
export function costOf(
  ingredientId: string,
  qty: number,
  unit: Unit,
  priceIndex = 1,
): number {
  const ing = getIngredient(ingredientId);
  if (!ing) return 0;
  const price = ing.price * priceIndex;

  switch (ing.priceUnit) {
    case "kg":
    case "l":
      return (price * toGrams(qty, unit, ing)) / 1000;

    case "piece":
      if (unit === "piece") return price * qty;
      // Quantité au poids pour un produit vendu à la pièce.
      return (price * toGrams(qty, unit, ing)) / (ing.pieceGrams ?? 100);

    case "botte":
      if (unit === "botte") return price * qty;
      return (price * toGrams(qty, unit, ing)) / GRAMS_PER_UNIT.botte;

    case "boite":
      if (unit === "boite") return price * qty;
      return (price * toGrams(qty, unit, ing)) / (ing.packGrams ?? 400);

    case "paquet":
      if (unit === "feuille" && ing.packUnits) return (price * qty) / ing.packUnits;
      return price * qty;
  }
}

/** Ingrédients d'une recette remis à l'échelle du nombre de convives. */
export function scaleIngredients(
  recipe: Recipe,
  people: number,
): (RecipeIngredient & { scaledQty: number })[] {
  return recipe.ingredients.map((ri) => ({
    ...ri,
    scaledQty: scaleQty(ri.qty, recipe.serves, people),
  }));
}

/** Coût total estimé d'une recette pour `people` convives, en dinars. */
export function recipeCost(recipe: Recipe, people: number, priceIndex = 1): number {
  return scaleIngredients(recipe, people).reduce(
    (sum, ri) => sum + costOf(ri.id, ri.scaledQty, ri.unit, priceIndex),
    0,
  );
}

/**
 * Liste de courses d'une recette : chaque ingrédient, sa quantité mise à
 * l'échelle, son coût, et s'il est déjà au garde-manger.
 */
export function buildShoppingList(
  recipe: Recipe,
  people: number,
  pantry: string[] = [],
  priceIndex = 1,
): ShoppingLine[] {
  const owned = new Set(pantry);
  return scaleIngredients(recipe, people).map((ri) => {
    const ing = getIngredient(ri.id);
    return {
      ingredientId: ri.id,
      name: ing?.name ?? { fr: ri.id, ar: ri.id },
      shop: ing?.shop ?? "grande_surface",
      qty: ri.scaledQty,
      unit: ri.unit,
      cost: costOf(ri.id, ri.scaledQty, ri.unit, priceIndex),
      inPantry: owned.has(ri.id),
    };
  });
}

/**
 * Fusionne les listes de courses de plusieurs recettes.
 *
 * Un ingrédient n'apparaît qu'une seule fois : on n'achète pas la harissa
 * deux fois parce qu'un plat en demande une cuillère à café et l'autre deux
 * cuillères à soupe. Quand les recettes n'emploient pas la même unité, tout
 * est ramené au poids, qui reste lisible au marché.
 */
export function mergeShoppingLists(lists: ShoppingLine[][]): ShoppingLine[] {
  const groups = new Map<string, ShoppingLine[]>();
  for (const line of lists.flat()) {
    const group = groups.get(line.ingredientId);
    if (group) group.push(line);
    else groups.set(line.ingredientId, [line]);
  }

  return [...groups.values()].map((group) => {
    const first = group[0];
    const cost = group.reduce((sum, line) => sum + line.cost, 0);
    const units = new Set(group.map((line) => line.unit));

    // Toutes les recettes parlent la même langue : simple addition.
    if (units.size === 1) {
      const qty = group.reduce((sum, line) => sum + line.qty, 0);
      return { ...first, qty: Math.round(qty * 10) / 10, cost };
    }

    const ing = getIngredient(first.ingredientId);
    if (!ing) return { ...first, cost };

    const grams = group.reduce((sum, line) => sum + toGrams(line.qty, line.unit, ing), 0);
    const useKg = grams >= 1000;

    return {
      ...first,
      qty: useKg ? Math.round(grams / 100) / 10 : Math.round(grams),
      unit: useKg ? "kg" : "g",
      cost,
    };
  });
}

// Réexportés pour que les appelants n'aient qu'un seul point d'entrée.
export { formatTND, scaleQty };
