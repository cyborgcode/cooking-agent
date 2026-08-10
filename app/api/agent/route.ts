import { suggestMeal } from "@/lib/gemini";
import { getRecipe } from "@/lib/data/recipes";
import { parseMealRequest, summarize, todaySeed, toSummary } from "@/lib/view";

/** Suggestion du repas du jour. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corps de requête illisible." }, { status: 400 });
  }

  const req = parseMealRequest(body);
  const { suggestion, source, notice } = await suggestMeal(req, todaySeed());

  const recipe = getRecipe(suggestion.slug);
  if (!recipe) {
    return Response.json({ error: "Aucune recette ne correspond." }, { status: 500 });
  }

  return Response.json({
    source,
    notice,
    suggestion,
    recipe: toSummary(recipe, req.people),
    alternatives: summarize(suggestion.alternatives, req.people),
  });
}
