"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icons";
import { useLang } from "@/components/lang-provider";
import { STORAGE_KEYS, useLocalState } from "@/components/use-local-state";
import { Button, Notice } from "@/components/ui";
import { INGREDIENT_CATEGORY_LABELS } from "@/lib/i18n";
import type { IngredientCategory } from "@/lib/types";
import type { IngredientOption } from "@/lib/view";

const ORDER: IngredientCategory[] = [
  "legume",
  "herbe",
  "fruit",
  "viande",
  "poisson",
  "cremerie",
  "cereale",
  "legumineuse",
  "epice",
  "epicerie",
  "boulangerie",
];

export function PantryEditor({
  ingredients,
  month,
}: {
  ingredients: IngredientOption[];
  month: number;
}) {
  const { t, s, lang } = useLang();
  const [pantry, setPantry] = useLocalState<string[]>(STORAGE_KEYS.pantry, []);
  const [query, setQuery] = useState("");

  const owned = useMemo(() => new Set(pantry), [pantry]);

  const groups = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matching = needle
      ? ingredients.filter(
          (i) => i.name.fr.toLowerCase().includes(needle) || i.name.ar.includes(query.trim()),
        )
      : ingredients;

    return ORDER.map((category) => ({
      category,
      items: matching.filter((i) => i.category === category),
    })).filter((group) => group.items.length > 0);
  }, [ingredients, query]);

  const toggle = (id: string) =>
    setPantry((previous) =>
      previous.includes(id) ? previous.filter((x) => x !== id) : [...previous, id],
    );

  const selectStaples = () =>
    setPantry((previous) => [
      ...new Set([...previous, ...ingredients.filter((i) => i.staple).map((i) => i.id)]),
    ]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="flex items-center gap-2 text-lg font-extrabold">
          <Icon name="pantry" size={20} className="text-primary" />
          {t("pantryTitle")}
        </h1>
        <p className="mt-1 text-sm text-muted">{t("pantryHelp")}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-primary-soft px-3 py-1.5 text-xs font-bold text-primary">
          {pantry.length} {t("pantryCount")}
        </span>
        <Button variant="secondary" icon="checkAll" onClick={selectStaples}>
          {t("selectStaples")}
        </Button>
        {pantry.length > 0 && (
          <Button variant="ghost" icon="trash" onClick={() => setPantry([])}>
            {t("clearPantry")}
          </Button>
        )}
      </div>

      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 start-3 grid place-items-center text-muted">
          <Icon name="search" size={17} />
        </span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("searchRecipe")}
          className="w-full rounded-xl border bg-surface py-3 ps-10 pe-3 text-sm placeholder:text-muted/70"
        />
      </div>

      <Notice icon="season">{t("seasonNow")}</Notice>

      {groups.map(({ category, items }) => (
        <section key={category}>
          <h2 className="mb-2 flex items-center gap-2 text-sm font-bold">
            <span className="grid size-8 place-items-center rounded-lg bg-surface-2 text-muted">
              <Icon name={category} size={16} />
            </span>
            {INGREDIENT_CATEGORY_LABELS[category][lang]}
          </h2>

          <div className="flex flex-wrap gap-1.5">
            {items.map((ingredient) => {
              const isOwned = owned.has(ingredient.id);
              const seasonal = ingredient.season?.includes(month);
              return (
                <button
                  key={ingredient.id}
                  onClick={() => toggle(ingredient.id)}
                  aria-pressed={isOwned}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    isOwned
                      ? "border-olive bg-olive text-white"
                      : "bg-surface text-muted hover:border-primary hover:text-ink"
                  }`}
                >
                  <Icon name={isOwned ? "check" : "add"} size={12} />
                  {s(ingredient.name)}
                  {seasonal && !isOwned && (
                    <Icon name="season" size={11} className="text-olive" />
                  )}
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
