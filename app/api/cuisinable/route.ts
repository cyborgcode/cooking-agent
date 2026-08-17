import { rankByPantry } from "@/lib/view";
import { INGREDIENTS } from "@/lib/data/ingredients";
import type { Cuisine } from "@/lib/types";

const KNOWN = new Set(INGREDIENTS.map((i) => i.id));
const CUISINES: Cuisine[] = ["tunisienne", "italienne"];

/**
 * Ce que le garde-manger permet de cuisiner.
 *
 * Le tableau de bord n'affiche pas tout le répertoire : il sépare ce qui est
 * réalisable tout de suite de ce qui ne demande que quelques courses, et
 * laisse le reste de côté.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corps de requête illisible." }, { status: 400 });
  }

  const raw = (body ?? {}) as Record<string, unknown>;

  const pantry = Array.isArray(raw.pantry)
    ? raw.pantry.filter((id): id is string => typeof id === "string" && KNOWN.has(id))
    : [];

  const people = Number.isFinite(Number(raw.people))
    ? Math.min(20, Math.max(1, Math.round(Number(raw.people))))
    : 4;

  const month = Number.isFinite(Number(raw.month))
    ? Math.min(12, Math.max(1, Math.round(Number(raw.month))))
    : new Date().getMonth() + 1;

  const cuisine = CUISINES.includes(raw.cuisine as Cuisine) ? (raw.cuisine as Cuisine) : null;

  // Sans garde-manger renseigné, aucun plat n'est « presque réalisable » :
  // il manque simplement tout. On renvoie des listes vides plutôt qu'un
  // classement trompeur.
  if (pantry.length === 0) {
    return Response.json({
      pantrySize: 0,
      now: [],
      soon: [],
      counts: { now: 0, soon: 0, total: 0 },
    });
  }

  const ranked = rankByPantry(pantry, people, month, cuisine);

  // Réalisable sans rien acheter — le cœur du tableau de bord.
  const now = ranked.filter((m) => m.missing.length === 0 && m.essentials > 0);
  // À deux ou trois courses près : c'est là que se prend la décision du soir.
  const soon = ranked.filter((m) => m.missing.length > 0 && m.missing.length <= 3);

  return Response.json({
    pantrySize: pantry.length,
    now: now.slice(0, 12),
    soon: soon.slice(0, 12),
    /** Nombre total de plats à portée, pour l'affichage des compteurs. */
    counts: { now: now.length, soon: soon.length, total: ranked.length },
  });
}
