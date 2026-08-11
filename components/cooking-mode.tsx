"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { useLang } from "@/components/lang-provider";
import { difficultyKey } from "@/components/recipe-card";
import { StepTimer } from "@/components/step-timer";
import { STORAGE_KEYS, useLocalState } from "@/components/use-local-state";
import { Badge, Button, Notice, SectionTitle, Stat } from "@/components/ui";
import { CATEGORY_LABELS, TAG_LABELS, formatQty } from "@/lib/i18n";
import { formatMinutes, formatTND, scaleQty } from "@/lib/scale";
import type { CookingPayload } from "@/lib/view";

export function CookingMode({
  recipe,
  sources,
  disclaimer,
  allowShopping = true,
}: {
  recipe: CookingPayload;
  /** Pages d'origine, pour une recette reconstituée depuis le web. */
  sources?: { title: string; url: string }[];
  /** Avertissement affiché en tête de fiche. */
  disclaimer?: string;
  /**
   * Les recettes venues du web ne sont pas dans le répertoire : la liste de
   * courses ne saurait pas les retrouver, on masque donc le bouton.
   */
  allowShopping?: boolean;
}) {
  const { t, s, lang } = useLang();

  const [people, setPeople] = useLocalState<number>(STORAGE_KEYS.people, recipe.baseServes);
  const [meals, setMeals] = useLocalState<string[]>(STORAGE_KEYS.meals, []);
  const [, setHistory] = useLocalState<string[]>(STORAGE_KEYS.history, []);

  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [cooking, setCooking] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const scaled = useMemo(
    () =>
      recipe.ingredients.map((ingredient) => ({
        ...ingredient,
        scaledQty: scaleQty(ingredient.qty, recipe.baseServes, people),
      })),
    [recipe.ingredients, recipe.baseServes, people],
  );

  // Le coût suit le nombre de convives, proportionnellement à la portion de base.
  const cost = (recipe.baseCost * people) / recipe.baseServes;
  const totalMinutes = recipe.prepMinutes + recipe.cookMinutes;

  const toggle = (id: string) =>
    setChecked((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const addToShopping = () => {
    setMeals((previous) =>
      previous.includes(recipe.slug) ? previous : [...previous, recipe.slug],
    );
    setHistory((previous) =>
      [recipe.slug, ...previous.filter((x) => x !== recipe.slug)].slice(0, 10),
    );
  };

  // ------------------------------------------------------------------ cuisine
  if (cooking) {
    const step = recipe.steps[stepIndex];
    const last = stepIndex === recipe.steps.length - 1;
    const finished = stepIndex >= recipe.steps.length;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setCooking(false)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition hover:text-ink"
          >
            <Icon name="back" size={16} />
            {s(recipe.name)}
          </button>
          <Badge icon="heat" tone="primary">
            {t("cookingMode")}
          </Badge>
        </div>

        {finished ? (
          <div className="card flex flex-col items-center gap-4 p-8 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-olive-soft text-olive">
              <Icon name="done" size={32} />
            </span>
            <p className="text-xl font-extrabold">{t("finished")}</p>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                icon="reset"
                onClick={() => {
                  setStepIndex(0);
                  setCooking(false);
                }}
              >
                {t("retry")}
              </Button>
              <Link href="/recettes">
                <Button icon="recipes">{t("allRecipes")}</Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              {recipe.steps.map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 flex-1 rounded-full transition ${
                    index < stepIndex
                      ? "bg-olive"
                      : index === stepIndex
                        ? "bg-primary"
                        : "bg-border"
                  }`}
                />
              ))}
            </div>

            <section className="card space-y-4 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-primary">
                {t("step")} {stepIndex + 1} {t("of")} {recipe.steps.length}
              </p>

              <p className="text-lg font-semibold leading-relaxed">{s(step.text)}</p>

              {step.minutes !== undefined && (
                <StepTimer key={stepIndex} minutes={step.minutes} />
              )}

              {step.tip && (
                <Notice icon="tip" tone="warning">
                  {s(step.tip)}
                </Notice>
              )}
            </section>

            <div className="flex gap-2">
              <Button
                variant="secondary"
                icon="prev"
                onClick={() => setStepIndex((index) => Math.max(0, index - 1))}
                disabled={stepIndex === 0}
                className="flex-1"
              >
                {t("prevStep")}
              </Button>
              <Button
                icon={last ? "check" : "next"}
                onClick={() => setStepIndex((index) => index + 1)}
                className="flex-[2]"
              >
                {last ? t("finish") : t("nextStep")}
              </Button>
            </div>

            <details className="card p-4">
              <summary className="cursor-pointer text-sm font-bold">
                {t("ingredients")}
              </summary>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {scaled.map((ingredient) => (
                  <li key={ingredient.id} className="flex justify-between gap-3">
                    <span>{s(ingredient.name)}</span>
                    <span className="shrink-0 font-semibold text-ink">
                      {formatQty(ingredient.scaledQty, ingredient.unit, lang)}
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          </>
        )}
      </div>
    );
  }

  // ------------------------------------------------------------------ fiche
  return (
    <div className="space-y-5">
      <Link
        href="/recettes"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition hover:text-ink"
      >
        <Icon name="back" size={16} />
        {t("allRecipes")}
      </Link>

      <section className="card overflow-hidden">
        <div className="zellige h-1" />
        <div className="space-y-4 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-xl font-extrabold leading-tight">{s(recipe.name)}</h1>
              {recipe.region && (
                <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                  <Icon name="season" size={12} />
                  {s(recipe.region)}
                </p>
              )}
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
              <Icon name={recipe.category} size={24} />
            </span>
          </div>

          <p className="text-sm leading-relaxed text-muted">{s(recipe.description)}</p>

          {disclaimer && (
            <Notice icon="warning" tone="warning">
              {disclaimer}
            </Notice>
          )}

          <div className="flex flex-wrap gap-1.5">
            <Badge icon={recipe.category} tone="primary">
              {CATEGORY_LABELS[recipe.category][lang]}
            </Badge>
            {recipe.tags.map((tag) => (
              <Badge key={tag} icon={tag} tone="olive">
                {TAG_LABELS[tag][lang]}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 border-t pt-4 sm:grid-cols-4">
            <Stat icon="time" label={t("time")} value={formatMinutes(totalMinutes, lang)} />
            <Stat icon="cost" label={t("estimatedCost")} value={formatTND(cost, lang)} />
            <Stat
              icon="difficulty"
              label={t("constraints")}
              value={t(difficultyKey(recipe.difficulty))}
            />
            <Stat icon="utensils" label={t("steps")} value={String(recipe.steps.length)} />
          </div>
        </div>
      </section>

      <section className="card p-4">
        <SectionTitle icon="people">{t("people")}</SectionTitle>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => setPeople(Math.max(1, people - 1))}
            aria-label="-1"
            className="!px-3"
          >
            <Icon name="remove" size={16} />
          </Button>
          <span className="min-w-10 text-center text-xl font-extrabold tabular-nums">
            {people}
          </span>
          <Button
            variant="secondary"
            onClick={() => setPeople(Math.min(20, people + 1))}
            aria-label="+1"
            className="!px-3"
          >
            <Icon name="add" size={16} />
          </Button>
          <span className="ms-auto text-xs text-muted">{t("priceNotice")}</span>
        </div>
      </section>

      <section>
        <SectionTitle icon="shopping">{t("ingredients")}</SectionTitle>
        <ul className="card divide-y overflow-hidden">
          {scaled.map((ingredient) => {
            const isChecked = checked.has(ingredient.id);
            return (
              <li key={ingredient.id}>
                <button
                  onClick={() => toggle(ingredient.id)}
                  aria-pressed={isChecked}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-start transition hover:bg-surface-2"
                >
                  <Icon
                    name={isChecked ? "done" : "pending"}
                    size={18}
                    className={isChecked ? "text-olive" : "text-muted"}
                  />
                  <span className={`min-w-0 flex-1 text-sm ${isChecked ? "text-muted line-through" : ""}`}>
                    {s(ingredient.name)}
                    {ingredient.optional && (
                      <span className="ms-1.5 text-[11px] text-muted">({t("optional")})</span>
                    )}
                    {ingredient.note && (
                      <span className="block text-[11px] text-muted">{s(ingredient.note)}</span>
                    )}
                  </span>
                  <span className="shrink-0 text-sm font-bold tabular-nums">
                    {formatQty(ingredient.scaledQty, ingredient.unit, lang)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <SectionTitle icon="utensils">{t("utensils")}</SectionTitle>
        <div className="flex flex-wrap gap-1.5">
          {recipe.utensils.map((utensil, index) => (
            <Badge key={index} icon="utensils">
              {s(utensil)}
            </Badge>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle icon="recipes">{t("steps")}</SectionTitle>
        <ol className="space-y-2.5">
          {recipe.steps.map((step, index) => (
            <li key={index} className="card flex gap-3 p-3.5">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-extrabold text-primary">
                {index + 1}
              </span>
              <div className="min-w-0 space-y-2">
                <p className="text-sm leading-relaxed">{s(step.text)}</p>
                {step.minutes !== undefined && (
                  <p className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
                    <Icon name="time" size={12} />
                    {formatMinutes(step.minutes, lang)}
                  </p>
                )}
                {step.tip && (
                  <p className="flex items-start gap-1.5 rounded-lg bg-surface-2 p-2 text-xs leading-relaxed text-muted">
                    <Icon name="tip" size={13} className="mt-px shrink-0 text-gold" />
                    {s(step.tip)}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {recipe.tips.length > 0 && (
        <section>
          <SectionTitle icon="tip">{t("tips")}</SectionTitle>
          <ul className="space-y-2">
            {recipe.tips.map((tip, index) => (
              <li
                key={index}
                className="flex gap-2 rounded-xl bg-accent-soft p-3 text-xs leading-relaxed text-accent"
              >
                <Icon name="tip" size={14} className="mt-0.5 shrink-0" />
                {s(tip)}
              </li>
            ))}
          </ul>
        </section>
      )}

      {sources && sources.length > 0 && (
        <section>
          <SectionTitle icon="web">{t("sourcesUsed")}</SectionTitle>
          <ul className="space-y-1.5">
            {sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card flex items-start gap-2 p-2.5 text-xs transition hover:border-primary"
                >
                  <Icon name="link" size={13} className="mt-0.5 shrink-0 text-muted" />
                  <span className="min-w-0 truncate">{source.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="no-print sticky bottom-20 flex gap-2">
        <Button
          icon="heat"
          onClick={() => {
            setStepIndex(0);
            setCooking(true);
          }}
          className="flex-[2] shadow-lg"
        >
          {t("startCooking")}
        </Button>
        {allowShopping && (
          <Button
            variant="secondary"
            icon={meals.includes(recipe.slug) ? "done" : "add"}
            onClick={addToShopping}
            disabled={meals.includes(recipe.slug)}
            className="flex-1 shadow-lg"
          >
            {meals.includes(recipe.slug) ? t("added") : t("addToShopping")}
          </Button>
        )}
      </div>
    </div>
  );
}
