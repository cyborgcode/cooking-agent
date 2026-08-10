import type { Metadata } from "next";
import { RecipesBrowser } from "@/components/recipes-browser";
import { allSummaries } from "@/lib/view";

export const metadata: Metadata = {
  title: "Recettes tunisiennes — Chef Tounsi",
};

export default function RecipesPage() {
  return <RecipesBrowser recipes={allSummaries()} />;
}
