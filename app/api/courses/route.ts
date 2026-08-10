import { getRecipe } from "@/lib/data/recipes";
import { buildShoppingList, mergeShoppingLists } from "@/lib/pricing";
import { parseMealRequest, summarize } from "@/lib/view";
import type { Recipe } from "@/lib/types";

/** Liste de courses consolidée pour un ensemble de plats. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corps de requête illisible." }, { status: 400 });
  }

  const raw = (body ?? {}) as Record<string, unknown>;
  const req = parseMealRequest(body);

  const recipes = (Array.isArray(raw.slugs) ? raw.slugs : [])
    .filter((s): s is string => typeof s === "string")
    .map((s) => getRecipe(s))
    .filter((r): r is Recipe => Boolean(r));

  const lines = mergeShoppingLists(
    recipes.map((r) => buildShoppingList(r, req.people, req.pantry)),
  );

  return Response.json({
    lines,
    recipes: summarize(
      recipes.map((r) => r.slug),
      req.people,
    ),
    total: lines.filter((l) => !l.inPantry).reduce((sum, l) => sum + l.cost, 0),
  });
}
