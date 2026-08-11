import type { Metadata } from "next";
import { DiscoverClient } from "@/components/discover-client";

export const metadata: Metadata = {
  title: "Chercher une recette sur le web — Chef Tounsi",
};

export const dynamic = "force-dynamic";

export default async function DiscoverPage(props: PageProps<"/recettes/decouvrir">) {
  // La page Recettes transmet la recherche restée sans résultat via `?q=`.
  const params = await props.searchParams;
  const query = typeof params.q === "string" ? params.q.slice(0, 120) : "";

  return <DiscoverClient initialQuery={query} />;
}
