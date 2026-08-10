import type { Shop, ShopId } from "@/lib/types";

/**
 * Les commerces d'un quartier tunisien, dans l'ordre où on les enchaîne
 * quand on fait ses courses : le marché d'abord (produits frais), la
 * grande surface en dernier (produits qui se gardent).
 */
export const SHOPS: Record<ShopId, Shop> = {
  marche: {
    id: "marche",
    name: { fr: "Marché", ar: "السوق" },
    order: 1,
    icon: "market",
  },
  boucherie: {
    id: "boucherie",
    name: { fr: "Boucherie", ar: "الملحمة" },
    order: 2,
    icon: "meat",
  },
  poissonnerie: {
    id: "poissonnerie",
    name: { fr: "Poissonnerie", ar: "حانوت الحوت" },
    order: 3,
    icon: "fish",
  },
  attar: {
    id: "attar",
    name: { fr: "Épicerie / Attar", ar: "العطار" },
    order: 4,
    icon: "spice",
  },
  boulangerie: {
    id: "boulangerie",
    name: { fr: "Boulangerie", ar: "المخبزة" },
    order: 5,
    icon: "bread",
  },
  grande_surface: {
    id: "grande_surface",
    name: { fr: "Grande surface", ar: "المغازة" },
    order: 6,
    icon: "store",
  },
};

export const SHOP_ORDER: ShopId[] = Object.values(SHOPS)
  .sort((a, b) => a.order - b.order)
  .map((s) => s.id);
