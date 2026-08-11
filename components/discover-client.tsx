"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { CookingMode } from "@/components/cooking-mode";
import { Icon } from "@/components/icons";
import { useLang } from "@/components/lang-provider";
import { Badge, Button, Notice } from "@/components/ui";
import type { DiscoveredRecipe } from "@/lib/discover";

type Outcome =
  | ({ status: "ok" } & DiscoveredRecipe)
  | { status: "not_found" | "unavailable"; reason: string };

export function DiscoverClient({ initialQuery }: { initialQuery: string }) {
  const { t } = useLang();

  const [query, setQuery] = useState(initialQuery);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const search = useCallback(async (term: string) => {
    if (term.trim().length < 2) return;
    setLoading(true);
    setFailed(false);
    setOutcome(null);
    try {
      const response = await fetch("/api/decouvrir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: term.trim() }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setOutcome((await response.json()) as Outcome);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="space-y-5">
      <Link
        href="/recettes"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition hover:text-ink"
      >
        <Icon name="back" size={16} />
        {t("allRecipes")}
      </Link>

      <div>
        <h1 className="flex items-center gap-2 text-lg font-extrabold">
          <Icon name="discover" size={20} className="text-primary" />
          {t("discoverTitle")}
        </h1>
        <p className="mt-1 text-sm text-muted">{t("discoverHelp")}</p>
      </div>

      <form
        className="flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          void search(query);
        }}
      >
        <div className="relative flex-1">
          <span className="pointer-events-none absolute inset-y-0 start-3 grid place-items-center text-muted">
            <Icon name="search" size={17} />
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("discoverPlaceholder")}
            maxLength={120}
            className="w-full rounded-xl border bg-surface py-3 ps-10 pe-3 text-sm placeholder:text-muted/70"
          />
        </div>
        <Button type="submit" icon="web" loading={loading} disabled={query.trim().length < 2}>
          {loading ? t("discovering") : t("discoverButton")}
        </Button>
      </form>

      {failed && (
        <Notice icon="error" tone="warning">
          {t("error")}
        </Notice>
      )}

      {outcome?.status === "not_found" && (
        <Notice icon="info">{outcome.reason || t("discoverNotFound")}</Notice>
      )}

      {outcome?.status === "unavailable" && (
        <Notice icon="warning" tone="warning">
          {outcome.reason}
        </Notice>
      )}

      {outcome?.status === "ok" && (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <Badge icon="web" tone="accent">
              {t("fromWeb")}
            </Badge>
            {outcome.pricedRatio < 1 && (
              <span className="text-xs text-muted">
                {Math.round(outcome.pricedRatio * 100)}% {t("pricedFromCatalogue")}
              </span>
            )}
          </div>

          <CookingMode
            recipe={outcome.recipe}
            sources={outcome.sources}
            disclaimer={t("webRecipeWarning")}
            allowShopping={false}
          />
        </>
      )}
    </div>
  );
}
