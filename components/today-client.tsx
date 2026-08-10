"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { useLang } from "@/components/lang-provider";
import { MealForm, type MealFormState } from "@/components/meal-form";
import { RecipeCard } from "@/components/recipe-card";
import { STORAGE_KEYS, useLocalState } from "@/components/use-local-state";
import { Badge, Button, Notice, SectionTitle, Stat } from "@/components/ui";
import { monthName, seasonIcon } from "@/lib/i18n";
import { formatMinutes, formatTND } from "@/lib/scale";
import type { AgentResponse, Bilingual } from "@/lib/types";
import type { RecipeSummary } from "@/lib/view";

interface AgentPayload extends AgentResponse {
  recipe: RecipeSummary;
  alternatives: RecipeSummary[];
}

export function TodayClient({
  month,
  seasonal,
}: {
  month: number;
  seasonal: Bilingual[];
}) {
  const { t, s, lang } = useLang();

  const [people, setPeople] = useLocalState<number>(STORAGE_KEYS.people, 4);
  const [pantry] = useLocalState<string[]>(STORAGE_KEYS.pantry, []);
  const [meals, setMeals] = useLocalState<string[]>(STORAGE_KEYS.meals, []);
  const [history, setHistory] = useLocalState<string[]>(STORAGE_KEYS.history, []);

  // Le nombre de convives vit dans le stockage local (il est partagé avec les
  // autres pages) ; le reste du formulaire n'a de sens que sur cette page.
  const [form, setForm] = useState<Omit<MealFormState, "people">>({
    budget: 30,
    maxMinutes: 60,
    tags: [],
    note: "",
  });
  const [result, setResult] = useState<AgentPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const formState = useMemo<MealFormState>(() => ({ ...form, people }), [form, people]);

  const handleChange = ({ people: nextPeople, ...rest }: MealFormState) => {
    setPeople(nextPeople);
    setForm(rest);
  };

  const ask = useCallback(
    async (exclude: string[] = []) => {
      setLoading(true);
      setFailed(false);
      try {
        const response = await fetch("/api/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formState,
            month,
            pantry,
            exclude: [...new Set([...history.slice(0, 3), ...exclude])],
          }),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = (await response.json()) as AgentPayload;
        setResult(payload);
      } catch {
        setFailed(true);
        setResult(null);
      } finally {
        setLoading(false);
      }
    },
    [formState, month, pantry, history],
  );

  const addToShopping = (slug: string) => {
    setMeals((previous) => (previous.includes(slug) ? previous : [...previous, slug]));
    setHistory((previous) => [slug, ...previous.filter((x) => x !== slug)].slice(0, 10));
  };

  const missing = result?.suggestion.shoppingList.filter((line) => !line.inPantry) ?? [];
  const missingTotal = missing.reduce((sum, line) => sum + line.cost, 0);

  return (
    <div className="space-y-5">
      <section className="card flex items-start gap-3 p-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-olive-soft text-olive">
          <Icon name={seasonIcon(month)} size={20} />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">
            {t("seasonNow")} — {monthName(month, lang)}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {seasonal.map(s).join(" · ")}
          </p>
        </div>
      </section>

      <MealForm
        value={formState}
        onChange={handleChange}
        onSubmit={() => ask()}
        loading={loading}
      />

      {failed && (
        <div className="space-y-2">
          <Notice icon="error" tone="warning">
            {t("error")}
          </Notice>
          <Button variant="secondary" icon="reset" onClick={() => ask()} className="w-full">
            {t("retry")}
          </Button>
        </div>
      )}

      {result && (
        <>
          <section className="card overflow-hidden">
            <div className="zellige h-1" />
            <div className="space-y-4 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wide text-primary">
                    {t("todaysMeal")}
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold leading-tight">
                    {s(result.recipe.name)}
                  </h2>
                  {result.recipe.region && (
                    <p className="mt-0.5 text-xs text-muted">{s(result.recipe.region)}</p>
                  )}
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <Icon name={result.recipe.category} size={24} />
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Stat
                  icon="time"
                  label={t("time")}
                  value={formatMinutes(result.recipe.totalMinutes, lang)}
                />
                <Stat
                  icon="cost"
                  label={t("estimatedCost")}
                  value={formatTND(result.suggestion.estimatedCost, lang)}
                />
                <Stat icon="people" label={t("people")} value={String(result.recipe.serves)} />
              </div>

              <div className="rounded-xl bg-surface-2 p-3">
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted">
                  <Icon name="agent" size={13} />
                  {t("why")}
                </p>
                <p className="text-sm leading-relaxed">{s(result.suggestion.why)}</p>
              </div>

              {result.suggestion.adaptations.length > 0 && (
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted">
                    <Icon name="tip" size={13} />
                    {t("adaptations")}
                  </p>
                  <ul className="space-y-2">
                    {result.suggestion.adaptations.map((adaptation, index) => (
                      <li
                        key={index}
                        className="flex gap-2 rounded-xl bg-accent-soft p-2.5 text-xs leading-relaxed text-accent"
                      >
                        <Icon name="forward" size={14} className="mt-0.5 shrink-0" />
                        <span>{s(adaptation.reason)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {missing.length > 0 && (
                <div className="flex items-center justify-between gap-3 rounded-xl border border-dashed p-3">
                  <span className="flex items-center gap-2 text-xs text-muted">
                    <Icon name="shopping" size={15} />
                    {missing.length} {lang === "fr" ? "produits à acheter" : "منتوج للشراء"}
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {formatTND(missingTotal, lang)}
                  </span>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <Link href={`/recettes/${result.recipe.slug}`} className="flex-1">
                  <Button icon="heat" className="w-full">
                    {t("startCooking")}
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  icon={meals.includes(result.recipe.slug) ? "done" : "add"}
                  onClick={() => addToShopping(result.recipe.slug)}
                  disabled={meals.includes(result.recipe.slug)}
                >
                  {meals.includes(result.recipe.slug) ? t("added") : t("addToShopping")}
                </Button>
              </div>

              <div className="flex items-center justify-between gap-3 border-t pt-3">
                <Badge icon={result.source === "gemini" ? "agent" : "pantry"}>
                  {result.source === "gemini" ? t("sourceGemini") : t("sourceLocal")}
                </Badge>
                <Button
                  variant="ghost"
                  icon="reset"
                  loading={loading}
                  onClick={() => ask([result.recipe.slug])}
                >
                  {t("again")}
                </Button>
              </div>

              {result.notice && <Notice icon="info">{result.notice}</Notice>}
            </div>
          </section>

          {result.alternatives.length > 0 && (
            <section>
              <SectionTitle icon="recipes">{t("alternatives")}</SectionTitle>
              <div className="space-y-2.5">
                {result.alternatives.map((alternative) => (
                  <RecipeCard key={alternative.slug} recipe={alternative} showTags={false} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
