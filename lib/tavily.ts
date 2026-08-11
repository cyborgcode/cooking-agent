/**
 * Client de recherche web Tavily.
 *
 * Contrat repris de l'API officielle : POST https://api.tavily.com/search,
 * authentification par en-tête `Authorization: Bearer`, corps en snake_case.
 * On appelle l'API directement avec `fetch` plutôt que via le SDK, qui
 * apporterait axios et un agent de proxy dont l'application n'a pas besoin.
 *
 * Règle de conception : toute défaillance renvoie `null`, jamais une
 * exception. Une recherche web est un bonus — l'application doit rester
 * entièrement utilisable sans clé Tavily, comme elle l'est sans clé Gemini.
 */

/**
 * Point d'entrée de l'API.
 *
 * Surchargeable par `TAVILY_API_URL` : utile derrière une passerelle
 * d'entreprise, et indispensable pour tester le client sans appeler le
 * service réel.
 */
const ENDPOINT = process.env.TAVILY_API_URL ?? "https://api.tavily.com/search";
const TIMEOUT_MS = 12_000;

/** Sites tunisiens de cuisine et d'actualité économique, à privilégier. */
export const TUNISIAN_DOMAINS = [
  "tunisienumerique.com",
  "webmanagercenter.com",
  "businessnews.com.tn",
  "lapresse.tn",
  "kapitalis.com",
  "mosaiquefm.net",
  "shemsfm.net",
  "leconomistemaghrebin.com",
  "tap.info.tn",
  "commerce.gov.tn",
  "onagri.nat.tn",
];

export interface WebResult {
  title: string;
  url: string;
  /** Extrait pertinent renvoyé par Tavily. */
  content: string;
  score: number;
  publishedDate?: string;
}

/** Image rapportée par la recherche. */
export interface WebImage {
  url: string;
  description?: string;
}

export interface WebSearch {
  query: string;
  results: WebResult[];
  /** Images trouvées, si `includeImages` a été demandé. */
  images: WebImage[];
  /** Réponse synthétique, si `includeAnswer` a été demandé. */
  answer?: string;
  /** Date de la recherche, au format ISO. */
  fetchedAt: string;
}

export interface SearchOptions {
  maxResults?: number;
  searchDepth?: "basic" | "advanced";
  topic?: "general" | "news";
  includeAnswer?: boolean;
  /** Demander les images des pages trouvées. */
  includeImages?: boolean;
  /** Demander une légende pour chaque image (coûte un aller-retour de plus). */
  includeImageDescriptions?: boolean;
  includeDomains?: string[];
  excludeDomains?: string[];
  /** Fenêtre temporelle : "day", "week", "month", "year". */
  timeRange?: string;
  /** Pays à privilégier (topic « general » uniquement). */
  country?: string;
  /** Durée de validité du cache, en millisecondes. */
  cacheTtlMs?: number;
}

interface TavilyApiResult {
  title?: string;
  url?: string;
  content?: string;
  score?: number;
  published_date?: string;
}

/** L'API renvoie soit une simple URL, soit un objet légendé. */
type TavilyApiImage = string | { url?: string; description?: string };

interface TavilyApiResponse {
  results?: TavilyApiResult[];
  images?: TavilyApiImage[];
  answer?: string;
}

interface CacheEntry {
  expiresAt: number;
  value: WebSearch;
}

// Cache en mémoire : évite de consommer le quota pour la même question posée
// deux fois de suite. Il disparaît au redémarrage, ce qui est acceptable.
const cache = new Map<string, CacheEntry>();
const DEFAULT_TTL_MS = 60 * 60 * 1000; // une heure

function cacheKey(query: string, options: SearchOptions): string {
  return JSON.stringify([
    query,
    options.maxResults,
    options.topic,
    options.searchDepth,
    options.includeDomains,
    options.timeRange,
    options.country,
    options.includeImages,
  ]);
}

/** Vrai si une clé Tavily est configurée côté serveur. */
export function hasTavilyKey(): boolean {
  return Boolean(process.env.TAVILY_API_KEY);
}

/**
 * Interroge Tavily. Renvoie `null` si la clé manque, si l'appel échoue ou
 * expire : l'appelant doit toujours prévoir ce cas.
 */
export async function tavilySearch(
  query: string,
  options: SearchOptions = {},
): Promise<WebSearch | null> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) return null;

  const key = cacheKey(query, options);
  const cached = cache.get(key);
  if (cached && cached.expiresAt > Date.now()) return cached.value;

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        query,
        max_results: options.maxResults ?? 6,
        search_depth: options.searchDepth ?? "basic",
        topic: options.topic ?? "general",
        include_answer: options.includeAnswer ?? false,
        include_raw_content: false,
        include_images: options.includeImages ?? false,
        include_image_descriptions: options.includeImageDescriptions ?? false,
        ...(options.includeDomains?.length && { include_domains: options.includeDomains }),
        ...(options.excludeDomains?.length && { exclude_domains: options.excludeDomains }),
        ...(options.timeRange && { time_range: options.timeRange }),
        ...(options.country && { country: options.country }),
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(`HTTP ${response.status} ${detail.slice(0, 200)}`);
    }

    const payload = (await response.json()) as TavilyApiResponse;

    const value: WebSearch = {
      query,
      answer: payload.answer,
      fetchedAt: new Date().toISOString(),
      images: (payload.images ?? [])
        .map((image) =>
          typeof image === "string"
            ? { url: image }
            : { url: image.url ?? "", description: image.description },
        )
        .filter((image) => image.url.startsWith("https://")),
      results: (payload.results ?? [])
        .filter((r): r is TavilyApiResult & { url: string } => Boolean(r.url))
        .map((r) => ({
          title: r.title ?? "",
          url: r.url,
          content: r.content ?? "",
          score: r.score ?? 0,
          publishedDate: r.published_date,
        })),
    };

    cache.set(key, {
      value,
      expiresAt: Date.now() + (options.cacheTtlMs ?? DEFAULT_TTL_MS),
    });

    return value;
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.error(`[tavily] recherche « ${query} » indisponible : ${reason}`);
    return null;
  }
}

/**
 * Met en forme des résultats web pour un prompt.
 *
 * Le contenu vient d'internet : il est encadré et explicitement désigné
 * comme donnée de référence, jamais comme consigne. Le modèle reste par
 * ailleurs contraint par un schéma de sortie et ses choix sont revalidés,
 * ce qui limite la portée d'une éventuelle injection.
 */
export function formatForPrompt(search: WebSearch, maxChars = 600): string {
  return search.results
    .map((result, index) => {
      const excerpt = result.content.replace(/\s+/g, " ").slice(0, maxChars);
      const date = result.publishedDate ? ` — ${result.publishedDate}` : "";
      return `[${index + 1}] ${result.title}${date}\n${excerpt}\nsource : ${result.url}`;
    })
    .join("\n\n");
}

/** Vide le cache — utile pour forcer un rafraîchissement depuis l'interface. */
export function clearSearchCache(): void {
  cache.clear();
}
