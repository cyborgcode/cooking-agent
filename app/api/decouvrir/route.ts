import { discoverRecipe } from "@/lib/discover";

/** Recherche d'une recette sur le web, remise au format de l'application. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corps de requête illisible." }, { status: 400 });
  }

  const raw = (body ?? {}) as Record<string, unknown>;
  const query = typeof raw.query === "string" ? raw.query.trim().slice(0, 120) : "";

  if (query.length < 2) {
    return Response.json({ error: "Précisez le plat recherché." }, { status: 400 });
  }

  const outcome = await discoverRecipe(query);

  if (outcome.status === "ok") {
    return Response.json({ status: "ok", ...outcome.data });
  }

  // Ni une erreur serveur ni un succès : l'appelant affiche simplement le motif.
  return Response.json({ status: outcome.status, reason: outcome.reason });
}
