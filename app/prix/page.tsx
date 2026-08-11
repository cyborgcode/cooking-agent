import type { Metadata } from "next";
import { PricesClient } from "@/components/prices-client";
import { INGREDIENTS } from "@/lib/data/ingredients";
import { VOLATILE_IDS } from "@/lib/market-prices";

export const metadata: Metadata = {
  title: "Prix du marché — Chef Tounsi",
};

export const dynamic = "force-dynamic";

const KNOWN = new Set(INGREDIENTS.map((i) => i.id));

export default async function PricesPage(props: PageProps<"/prix">) {
  // La page Courses passe les ingrédients de la liste via `?ids=`.
  const params = await props.searchParams;
  const raw = typeof params.ids === "string" ? params.ids : "";
  const requested = raw.split(",").filter((id) => KNOWN.has(id));

  return (
    <PricesClient
      month={new Date().getMonth() + 1}
      initialIds={requested.length > 0 ? requested : VOLATILE_IDS}
    />
  );
}
