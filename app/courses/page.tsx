import type { Metadata } from "next";
import { ShoppingClient } from "@/components/shopping-client";
import { SHOPS, SHOP_ORDER } from "@/lib/data/shops";

export const metadata: Metadata = {
  title: "Liste de courses — Chef Tounsi",
};

export default function ShoppingPage() {
  // Les commerces sont transmis dans l'ordre du parcours de courses.
  const shops = SHOP_ORDER.map((id) => ({ id, name: SHOPS[id].name }));
  return <ShoppingClient shops={shops} />;
}
