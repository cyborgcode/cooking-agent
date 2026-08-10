"use client";

import Link from "next/link";
import { Icon } from "@/components/icons";
import { useLang } from "@/components/lang-provider";
import { Badge } from "@/components/ui";
import { CATEGORY_LABELS, TAG_LABELS } from "@/lib/i18n";
import { formatMinutes, formatTND } from "@/lib/scale";
import type { RecipeSummary } from "@/lib/view";

export function difficultyKey(level: 1 | 2 | 3) {
  return (["difficulty1", "difficulty2", "difficulty3"] as const)[level - 1];
}

/** Carte d'un plat : ce qu'il faut savoir avant de cliquer. */
export function RecipeCard({
  recipe,
  showTags = true,
}: {
  recipe: RecipeSummary;
  showTags?: boolean;
}) {
  const { s, t, lang } = useLang();

  return (
    <Link
      href={`/recettes/${recipe.slug}`}
      className="card flex gap-3 p-3.5 transition hover:border-primary"
    >
      <span className="grid size-11 shrink-0 place-items-center self-start rounded-xl bg-primary-soft text-primary">
        <Icon name={recipe.category} size={21} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2">
          <span className="truncate font-bold">{s(recipe.name)}</span>
          <span className="shrink-0 text-xs font-bold text-primary">
            {formatTND(recipe.cost, lang)}
          </span>
        </span>

        <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-muted">
          {s(recipe.description)}
        </span>

        <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
          <span className="inline-flex items-center gap-1">
            <Icon name="time" size={12} />
            {formatMinutes(recipe.totalMinutes, lang)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Icon name="difficulty" size={12} />
            {t(difficultyKey(recipe.difficulty))}
          </span>
          <span className="inline-flex items-center gap-1">
            <Icon name="people" size={12} />
            {recipe.serves}
          </span>
        </span>

        {showTags && recipe.tags.length > 0 && (
          <span className="mt-2 flex flex-wrap gap-1.5">
            <Badge icon={recipe.category} tone="neutral">
              {CATEGORY_LABELS[recipe.category][lang]}
            </Badge>
            {recipe.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} icon={tag} tone="olive">
                {TAG_LABELS[tag][lang]}
              </Badge>
            ))}
          </span>
        )}
      </span>
    </Link>
  );
}
