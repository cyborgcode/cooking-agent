"use client";

import { Icon } from "@/components/icons";
import { useLang } from "@/components/lang-provider";
import { Button } from "@/components/ui";
import { TAG_LABELS } from "@/lib/i18n";
import { formatMinutes, formatTND } from "@/lib/scale";
import { CUISINE_LABELS } from "@/lib/i18n";
import type { Cuisine, RecipeTag } from "@/lib/types";

export interface MealFormState {
  people: number;
  cuisine: Cuisine | null;
  budget: number | null;
  maxMinutes: number;
  tags: RecipeTag[];
  note: string;
}

const CUISINE_CHOICES: (Cuisine | null)[] = [null, "tunisienne", "italienne"];

const TIME_CHOICES = [20, 30, 45, 60, 90, 180];
const BUDGET_CHOICES: (number | null)[] = [10, 20, 30, 50, null];
const TAG_CHOICES: RecipeTag[] = [
  "rapide",
  "economique",
  "vegetarien",
  "enfants",
  "invites",
  "ramadan",
  "plat_unique",
  "sans_gluten",
];

function Field({
  icon,
  label,
  children,
}: {
  icon: Parameters<typeof Icon>[0]["name"];
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted">
        <Icon name={icon} size={13} />
        {label}
      </span>
      {children}
    </div>
  );
}

/** Puce sélectionnable — sert pour le temps, le budget et les contraintes. */
function Chip({
  active,
  onClick,
  children,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: Parameters<typeof Icon>[0]["name"];
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
        active
          ? "border-primary bg-primary text-primary-ink"
          : "bg-surface text-muted hover:border-primary hover:text-ink"
      }`}
    >
      {icon && <Icon name={icon} size={13} />}
      {children}
    </button>
  );
}

/** Formulaire de contexte : qui mange, avec quel budget, en combien de temps. */
export function MealForm({
  value,
  onChange,
  onSubmit,
  loading,
}: {
  value: MealFormState;
  onChange: (next: MealFormState) => void;
  onSubmit: () => void;
  loading: boolean;
}) {
  const { t, lang } = useLang();
  const set = <K extends keyof MealFormState>(key: K, v: MealFormState[K]) =>
    onChange({ ...value, [key]: v });

  const toggleTag = (tag: RecipeTag) =>
    set(
      "tags",
      value.tags.includes(tag)
        ? value.tags.filter((x) => x !== tag)
        : [...value.tags, tag],
    );

  return (
    <form
      className="card space-y-5 p-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <Field icon="people" label={t("people")}>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => set("people", Math.max(1, value.people - 1))}
            aria-label="-1"
            className="!px-3"
          >
            <Icon name="remove" size={16} />
          </Button>
          <span className="min-w-10 text-center text-xl font-extrabold tabular-nums">
            {value.people}
          </span>
          <Button
            type="button"
            variant="secondary"
            onClick={() => set("people", Math.min(20, value.people + 1))}
            aria-label="+1"
            className="!px-3"
          >
            <Icon name="add" size={16} />
          </Button>
        </div>
      </Field>

      <Field icon="cost" label={t("budget")}>
        <div className="flex flex-wrap gap-2">
          {BUDGET_CHOICES.map((budget) => (
            <Chip
              key={String(budget)}
              active={value.budget === budget}
              onClick={() => set("budget", budget)}
            >
              {budget === null ? t("budgetFree") : formatTND(budget, lang)}
            </Chip>
          ))}
        </div>
      </Field>

      <Field icon="time" label={t("time")}>
        <div className="flex flex-wrap gap-2">
          {TIME_CHOICES.map((minutes) => (
            <Chip
              key={minutes}
              active={value.maxMinutes === minutes}
              onClick={() => set("maxMinutes", minutes)}
            >
              {formatMinutes(minutes, lang)}
            </Chip>
          ))}
        </div>
      </Field>

      <Field icon="recipes" label={t("allCuisines")}>
        <div className="flex flex-wrap gap-2">
          {CUISINE_CHOICES.map((cuisine) => (
            <Chip
              key={cuisine ?? "toutes"}
              icon={cuisine ?? undefined}
              active={value.cuisine === cuisine}
              onClick={() => set("cuisine", cuisine)}
            >
              {cuisine ? CUISINE_LABELS[cuisine][lang] : t("allCuisines")}
            </Chip>
          ))}
        </div>
      </Field>

      <Field icon="filter" label={t("constraints")}>
        <div className="flex flex-wrap gap-2">
          {TAG_CHOICES.map((tag) => (
            <Chip
              key={tag}
              icon={tag}
              active={value.tags.includes(tag)}
              onClick={() => toggleTag(tag)}
            >
              {TAG_LABELS[tag][lang]}
            </Chip>
          ))}
        </div>
      </Field>

      <Field icon="tip" label={t("note")}>
        <textarea
          value={value.note}
          onChange={(event) => set("note", event.target.value)}
          placeholder={t("notePlaceholder")}
          rows={2}
          maxLength={300}
          className="w-full resize-none rounded-xl border bg-surface-2 px-3 py-2.5 text-sm placeholder:text-muted/70"
        />
      </Field>

      <Button type="submit" icon="agent" loading={loading} className="w-full">
        {loading ? t("asking") : t("ask")}
      </Button>
    </form>
  );
}
