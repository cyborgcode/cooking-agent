"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { useLang } from "@/components/lang-provider";
import { RecipeCard } from "@/components/recipe-card";
import { Button, EmptyState } from "@/components/ui";
import { CATEGORY_LABELS, TAG_LABELS } from "@/lib/i18n";
import type { RecipeCategory, RecipeTag } from "@/lib/types";
import type { RecipeSummary } from "@/lib/view";

const CATEGORIES: RecipeCategory[] = [
  "plat",
  "soupe",
  "salade",
  "entree",
  "petit_dejeuner",
  "dessert",
];

const TAGS: RecipeTag[] = [
  "rapide",
  "economique",
  "vegetarien",
  "enfants",
  "invites",
  "ramadan",
];

/** Normalise pour une recherche tolérante aux accents. */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function RecipesBrowser({ recipes }: { recipes: RecipeSummary[] }) {
  const { t, lang } = useLang();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<RecipeCategory | null>(null);
  const [tag, setTag] = useState<RecipeTag | null>(null);

  const filtered = useMemo(() => {
    const needle = normalize(query.trim());
    return recipes.filter((recipe) => {
      if (category && recipe.category !== category) return false;
      if (tag && !recipe.tags.includes(tag)) return false;
      if (!needle) return true;
      // On cherche dans les deux langues : « couscous » comme « كسكسي ».
      return (
        normalize(recipe.name.fr).includes(needle) ||
        recipe.name.ar.includes(query.trim()) ||
        normalize(recipe.description.fr).includes(needle)
      );
    });
  }, [recipes, query, category, tag]);

  return (
    <div className="space-y-4">
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

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {CATEGORIES.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(category === item ? null : item)}
            aria-pressed={category === item}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              category === item
                ? "border-primary bg-primary text-primary-ink"
                : "bg-surface text-muted hover:text-ink"
            }`}
          >
            <Icon name={item} size={13} />
            {CATEGORY_LABELS[item][lang]}
          </button>
        ))}
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {TAGS.map((item) => (
          <button
            key={item}
            onClick={() => setTag(tag === item ? null : item)}
            aria-pressed={tag === item}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              tag === item
                ? "border-olive bg-olive text-white"
                : "bg-surface text-muted hover:text-ink"
            }`}
          >
            <Icon name={item} size={13} />
            {TAG_LABELS[item][lang]}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted">
        {filtered.length} / {recipes.length}
      </p>

      {filtered.length === 0 ? (
        <EmptyState icon="search" title={t("noResult")}>
          <Link href={`/recettes/decouvrir?q=${encodeURIComponent(query.trim())}`}>
            <Button icon="discover" className="mt-3">
              {t("searchWebInstead")}
            </Button>
          </Link>
        </EmptyState>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      )}

      <Link
        href={`/recettes/decouvrir${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`}
        className="card flex items-center gap-3 p-3.5 transition hover:border-primary"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
          <Icon name="discover" size={20} />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-bold">{t("discoverTitle")}</span>
          <span className="block text-xs text-muted">{t("discoverHelp")}</span>
        </span>
        <Icon name="next" size={16} className="ms-auto shrink-0 text-muted rtl:rotate-180" />
      </Link>
    </div>
  );
}
