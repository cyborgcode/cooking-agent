import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CookingMode } from "@/components/cooking-mode";
import { RECIPE_SLUGS, getRecipe } from "@/lib/data/recipes";
import { toCookingPayload } from "@/lib/view";

// Le répertoire de recettes est statique : chaque fiche est prérendue.
export function generateStaticParams() {
  return RECIPE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/recettes/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const recipe = getRecipe(slug);
  if (!recipe) return { title: "Recette introuvable" };

  return {
    title: `${recipe.name.fr} (${recipe.name.ar}) — Chef Tounsi`,
    description: recipe.description.fr,
  };
}

export default async function RecipePage(props: PageProps<"/recettes/[slug]">) {
  const { slug } = await props.params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();

  return <CookingMode recipe={toCookingPayload(recipe)} />;
}
