"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { useLang } from "@/components/lang-provider";
import { STORAGE_KEYS, useLocalState } from "@/components/use-local-state";
import { Badge, Button, EmptyState, Notice, SectionTitle } from "@/components/ui";
import { formatQty } from "@/lib/i18n";
import { formatTND } from "@/lib/scale";
import type { Bilingual, ShoppingLine, ShopId } from "@/lib/types";
import type { RecipeSummary } from "@/lib/view";

interface ShopInfo {
  id: ShopId;
  name: Bilingual;
}

/** Chaque commerce a son pictogramme. */
const SHOP_ICONS: Record<ShopId, IconName> = {
  marche: "market",
  boucherie: "meat",
  poissonnerie: "fish",
  attar: "spice",
  boulangerie: "bread",
  grande_surface: "store",
};

interface CoursesResponse {
  lines: ShoppingLine[];
  recipes: RecipeSummary[];
  total: number;
}

export function ShoppingClient({ shops }: { shops: ShopInfo[] }) {
  const { t, s, lang } = useLang();

  const [meals, setMeals, mealsReady] = useLocalState<string[]>(STORAGE_KEYS.meals, []);
  const [people] = useLocalState<number>(STORAGE_KEYS.people, 4);
  const [pantry] = useLocalState<string[]>(STORAGE_KEYS.pantry, []);

  const [data, setData] = useState<CoursesResponse | null>(null);
  // Un chargement est en cours dès l'ouverture de la page : pas besoin de le
  // signaler depuis l'effet, ce qui éviterait un rendu en cascade.
  const [loading, setLoading] = useState(true);
  const [ticked, setTicked] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Sans plat sélectionné il n'y a rien à charger : la page affiche
    // directement son état vide.
    if (!mealsReady || meals.length === 0) return;

    // `cancelled` empêche une réponse tardive d'écraser une plus récente.
    let cancelled = false;

    void (async () => {
      try {
        const response = await fetch("/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slugs: meals, people, pantry }),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = (await response.json()) as CoursesResponse;
        if (!cancelled) setData(payload);
      } catch {
        if (!cancelled) setData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [mealsReady, meals, people, pantry]);

  // Un rayon par commerce, dans l'ordre du parcours de courses.
  const grouped = useMemo(() => {
    if (!data) return [];
    return shops
      .map((shop) => ({
        shop,
        lines: data.lines.filter((line) => line.shop === shop.id && !line.inPantry),
      }))
      .filter((group) => group.lines.length > 0);
  }, [data, shops]);

  const alreadyOwned = data?.lines.filter((line) => line.inPantry) ?? [];

  // On ne vérifie le prix que de ce qui reste à acheter.
  const toCheck = (data?.lines ?? [])
    .filter((line) => !line.inPantry)
    .map((line) => line.ingredientId);

  const toggle = (key: string) =>
    setTicked((previous) => {
      const next = new Set(previous);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  if (mealsReady && meals.length === 0) {
    return (
      <EmptyState icon="shopping" title={t("shoppingList")}>
        {t("emptyShopping")}
      </EmptyState>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="flex items-center gap-2 text-lg font-extrabold">
          <Icon name="shopping" size={20} className="text-primary" />
          {t("shoppingList")}
        </h1>
        <div className="no-print flex gap-1">
          <Button variant="ghost" icon="print" onClick={() => window.print()}>
            <span className="sr-only">Imprimer</span>
          </Button>
          <Button
            variant="ghost"
            icon="trash"
            onClick={() => {
              setMeals([]);
              setTicked(new Set());
            }}
          >
            {t("clearList")}
          </Button>
        </div>
      </div>

      {data && (
        <section className="card space-y-3 p-4">
          <SectionTitle icon="recipes">
            {t("selectedMeals")} ({data.recipes.length})
          </SectionTitle>
          <ul className="space-y-1.5">
            {data.recipes.map((recipe) => (
              <li key={recipe.slug} className="flex items-center justify-between gap-3">
                <span className="flex min-w-0 items-center gap-2 text-sm">
                  <Icon name={recipe.category} size={15} className="shrink-0 text-primary" />
                  <span className="truncate">{s(recipe.name)}</span>
                </span>
                <button
                  onClick={() => setMeals((previous) => previous.filter((x) => x !== recipe.slug))}
                  aria-label={t("removeMeal")}
                  className="no-print shrink-0 text-muted transition hover:text-primary"
                >
                  <Icon name="close" size={15} />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between border-t pt-3">
            <span className="text-sm font-bold">{t("total")}</span>
            <span className="text-lg font-extrabold text-primary">
              {formatTND(data.total, lang)}
            </span>
          </div>
          <Notice icon="info">{t("priceNotice")}</Notice>

          <Link href={`/prix?ids=${encodeURIComponent(toCheck.join(","))}`} className="no-print">
            <Button variant="secondary" icon="web" className="w-full">
              {t("checkListPrices")}
            </Button>
          </Link>
        </section>
      )}

      {loading && !data && meals.length > 0 && (
        <p className="flex items-center justify-center gap-2 py-8 text-sm text-muted">
          <Icon name="loading" size={16} className="animate-spin" />
          {t("asking")}
        </p>
      )}

      {grouped.map(({ shop, lines }) => {
        const subtotal = lines.reduce((sum, line) => sum + line.cost, 0);
        return (
          <section key={shop.id}>
            <div className="mb-2 flex items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 text-sm font-bold">
                <span className="grid size-8 place-items-center rounded-lg bg-primary-soft text-primary">
                  <Icon name={SHOP_ICONS[shop.id]} size={16} />
                </span>
                {s(shop.name)}
              </h2>
              <span className="text-xs font-bold text-muted">{formatTND(subtotal, lang)}</span>
            </div>

            <ul className="card divide-y overflow-hidden">
              {lines.map((line) => {
                const key = `${line.ingredientId}|${line.unit}`;
                const isTicked = ticked.has(key);
                return (
                  <li key={key}>
                    <button
                      onClick={() => toggle(key)}
                      aria-pressed={isTicked}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-start transition hover:bg-surface-2"
                    >
                      <Icon
                        name={isTicked ? "done" : "pending"}
                        size={18}
                        className={isTicked ? "text-olive" : "text-muted"}
                      />
                      <span
                        className={`min-w-0 flex-1 truncate text-sm ${
                          isTicked ? "text-muted line-through" : ""
                        }`}
                      >
                        {s(line.name)}
                      </span>
                      <span className="shrink-0 text-sm font-bold tabular-nums">
                        {formatQty(line.qty, line.unit, lang)}
                      </span>
                      <span className="w-16 shrink-0 text-end text-xs text-muted tabular-nums">
                        {formatTND(line.cost, lang)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      {alreadyOwned.length > 0 && (
        <section>
          <SectionTitle icon="pantry">{t("alreadyHave")}</SectionTitle>
          <div className="flex flex-wrap gap-1.5">
            {alreadyOwned.map((line) => (
              <Badge key={`${line.ingredientId}|${line.unit}`} icon="check" tone="olive">
                {s(line.name)}
              </Badge>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
