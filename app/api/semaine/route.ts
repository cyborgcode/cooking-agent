import { planWeek } from "@/lib/planner";
import { parseMealRequest, summarize, todaySeed } from "@/lib/view";

/**
 * Menu de la semaine. Calculé localement : sept plats d'affilée sans
 * répétition, c'est un problème d'optimisation, pas de rédaction.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corps de requête illisible." }, { status: 400 });
  }

  const req = parseMealRequest(body);
  const slugs = planWeek(req, todaySeed());

  return Response.json({ days: summarize(slugs, req.people) });
}
