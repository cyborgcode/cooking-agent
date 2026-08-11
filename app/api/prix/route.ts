import { INGREDIENTS } from "@/lib/data/ingredients";
import { VOLATILE_IDS, fetchMarketPrices } from "@/lib/market-prices";

const KNOWN = new Set(INGREDIENTS.map((i) => i.id));
/** Plafond par appel : une vérification ne doit pas devenir une moisson. */
const MAX_INGREDIENTS = 25;

/** Relevé des prix du marché, vérifiés sur le web quand c'est possible. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corps de requête illisible." }, { status: 400 });
  }

  const raw = (body ?? {}) as Record<string, unknown>;

  const requested = Array.isArray(raw.ingredientIds)
    ? raw.ingredientIds.filter((id): id is string => typeof id === "string" && KNOWN.has(id))
    : [];

  const ids = (requested.length > 0 ? requested : VOLATILE_IDS).slice(0, MAX_INGREDIENTS);

  const month = Number.isFinite(Number(raw.month))
    ? Math.min(12, Math.max(1, Math.round(Number(raw.month))))
    : new Date().getMonth() + 1;

  const report = await fetchMarketPrices(ids, month);
  return Response.json(report);
}
