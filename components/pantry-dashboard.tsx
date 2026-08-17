"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { useLang } from "@/components/lang-provider";
import { MealForm, type MealFormState } from "@/components/meal-form";
import { RecipeImage } from "@/components/recipe-image";
import { STORAGE_KEYS, useLocalState } from "@/components/use-local-state";
import { Badge, Button, Notice, SectionTitle } from "@/components/ui";
import { INGREDIENT_CATEGORY_LABELS, formatQty, monthName, seasonIcon } from "@/lib/i18n";
import { formatMinutes, formatTND } from "@/lib/scale";
import type { AgentResponse, Bilingual, IngredientCategory } from "@/lib/types";
import type { IngredientOption, PantryMatch, RecipeSummary } from "@/lib/view";

interface CookableResponse {
  pantrySize: number;
  now: PantryMatch[];
  soon: PantryMatch[];
  counts: { now: number; soon: number; total: number };
}

interface AgentPayload extends AgentResponse {
  recipe: RecipeSummary;
  alternatives: RecipeSummary[];
}

const CATEGORY_ORDER: IngredientCategory[] = [
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

/** Carte d'un plat, avec ce que le garde-manger en couvre. */
function MatchCard({ match }: { match: PantryMatch }) {
  const { s, t, lang } = useLang();
  const { recipe } = match;
  const complete = match.missing.length === 0;

  return (
    <Link
      href={`/recettes/${recipe.slug}`}
      className="card flex gap-3 p-3.5 transition hover:border-primary"
    >
      <RecipeImage
        image={recipe.image}
        fallbackIcon={recipe.category}
        alt={s(recipe.name)}
        className="size-14 shrink-0 self-start rounded-xl"
        sizes="56px"
      />

      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2">
          <span className="truncate font-bold">{s(recipe.name)}</span>
          <span className="shrink-0 text-xs font-bold text-primary">
            {formatTND(recipe.cost, lang)}
          </span>
        </span>

        <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
          <span className="inline-flex items-center gap-1">
            <Icon name="time" size={12} />
            {formatMinutes(recipe.totalMinutes, lang)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Icon name="pantry" size={12} />
            {match.owned} {t("ofIngredients")} {match.essentials}
          </span>
        </span>

        {complete ? (
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-olive-soft px-2.5 py-1 text-[11px] font-semibold text-olive">
            <Icon name="done" size={12} />
            {t("cookNowHelp")}
          </span>
        ) : (
          <span className="mt-2 block">
            <span className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-semibold text-muted">{t("missingLabel")} :</span>
              {match.missing.map((item) => (
                <span
                  key={item.id}
                  className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 text-[11px] font-medium text-primary"
                >
                  {s(item.name)}
                  <span className="opacity-70">{formatQty(item.qty, item.unit, lang)}</span>
                </span>
              ))}
              <span className="text-[11px] font-bold text-primary">
                {formatTND(match.toBuyCost, lang)}
              </span>
            </span>

            {match.missingStaples.length > 0 && (
              <span className="mt-1 block text-[10px] text-muted">
                {t("checkStaples")} : {match.missingStaples.map((i) => s(i.name)).join(", ")}
              </span>
            )}
          </span>
        )}
      </span>
    </Link>
  );
}

export function PantryDashboard({
  ingredients,
  month,
  seasonal,
}: {
  ingredients: IngredientOption[];
  month: number;
  seasonal: Bilingual[];
}) {
  const { t, s, lang } = useLang();

  const [pantry, setPantry, pantryReady] = useLocalState<string[]>(STORAGE_KEYS.pantry, []);
  const [people, setPeople] = useLocalState<number>(STORAGE_KEYS.people, 4);
  const [, setMeals] = useLocalState<string[]>(STORAGE_KEYS.meals, []);

  const [data, setData] = useState<CookableResponse | null>(null);
  const [picker, setPicker] = useState(false);
  const [query, setQuery] = useState("");

  const [form, setForm] = useState<Omit<MealFormState, "people">>({
    budget: null,
    maxMinutes: 90,
    cuisine: null,
    tags: [],
    note: "",
  });
  const [advice, setAdvice] = useState<AgentPayload | null>(null);
  const [asking, setAsking] = useState(false);
  const [refine, setRefine] = useState(false);

  const owned = useMemo(() => new Set(pantry), [pantry]);

  // Ce qu'on peut cuisiner : recalculé à chaque changement du placard.
  useEffect(() => {
    if (!pantryReady) return;
    let cancelled = false;

    void (async () => {
      try {
        const response = await fetch("/api/cuisinable", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pantry, people, month }),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = (await response.json()) as CookableResponse;
        if (!cancelled) setData(payload);
      } catch {
        if (!cancelled) setData(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pantryReady, pantry, people, month]);

  const ask = useCallback(async () => {
    setAsking(true);
    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, people, month, pantry }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setAdvice((await response.json()) as AgentPayload);
    } catch {
      setAdvice(null);
    } finally {
      setAsking(false);
    }
  }, [form, people, month, pantry]);

  const toggle = (id: string) =>
    setPantry((previous) =>
      previous.includes(id) ? previous.filter((x) => x !== id) : [...previous, id],
    );

  const groups = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matching = needle
      ? ingredients.filter(
          (i) => i.name.fr.toLowerCase().includes(needle) || i.name.ar.includes(query.trim()),
        )
      : ingredients;

    return CATEGORY_ORDER.map((category) => ({
      category,
      items: matching.filter((i) => i.category === category),
    })).filter((g) => g.items.length > 0);
  }, [ingredients, query]);

  const empty = pantryReady && pantry.length === 0;

  return (
    <div className="space-y-5">
      {/* ------------------------------------------------ en-tête et saison */}
      <section className="card overflow-hidden">
        <div className="zellige h-1" />
        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-xl font-extrabold leading-tight">{t("dashboardTitle")}</h1>
              <p className="mt-0.5 text-sm text-muted">{t("dashboardIntro")}</p>
            </div>
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
              <Icon name="pantry" size={22} />
            </span>
          </div>

          <div className="flex items-center gap-2.5 border-t pt-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-olive-soft text-olive">
              <Icon name={seasonIcon(month)} size={16} />
            </span>
            <p className="min-w-0 flex-1 truncate text-xs text-muted">
              {monthName(month, lang)} — {seasonal.map(s).join(" · ")}
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- le garde-manger */}
      <section className="card p-4">
        <SectionTitle
          icon="pantry"
          action={
            <Button
              variant={picker ? "secondary" : "primary"}
              icon={picker ? "close" : "add"}
              onClick={() => setPicker((v) => !v)}
            >
              {picker ? t("hideRefine") : t("addIngredients")}
            </Button>
          }
        >
          {t("inMyPantry")}
        </SectionTitle>

        {empty ? (
          <Notice icon="info">{t("emptyPantryHelp")}</Notice>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {pantry.map((id) => {
              const ingredient = ingredients.find((i) => i.id === id);
              if (!ingredient) return null;
              return (
                <button
                  key={id}
                  onClick={() => toggle(id)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-olive bg-olive px-3 py-1.5 text-xs font-semibold text-white"
                >
                  {s(ingredient.name)}
                  <Icon name="close" size={12} />
                </button>
              );
            })}
          </div>
        )}

        {picker && (
          <div className="mt-4 space-y-4 border-t pt-4">
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 start-3 grid place-items-center text-muted">
                <Icon name="search" size={17} />
              </span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("searchRecipe")}
                className="w-full rounded-xl border bg-surface-2 py-2.5 ps-10 pe-3 text-sm placeholder:text-muted/70"
              />
            </div>

            <Button
              variant="secondary"
              icon="checkAll"
              onClick={() =>
                setPantry((previous) => [
                  ...new Set([
                    ...previous,
                    ...ingredients.filter((i) => i.staple).map((i) => i.id),
                  ]),
                ])
              }
            >
              {t("selectStaples")}
            </Button>

            {groups.map(({ category, items }) => (
              <div key={category}>
                <h3 className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-muted">
                  <Icon name={category} size={13} />
                  {INGREDIENT_CATEGORY_LABELS[category][lang]}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((ingredient) => {
                    const has = owned.has(ingredient.id);
                    return (
                      <button
                        key={ingredient.id}
                        onClick={() => toggle(ingredient.id)}
                        aria-pressed={has}
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition ${
                          has
                            ? "border-olive bg-olive font-semibold text-white"
                            : "bg-surface text-muted hover:border-primary hover:text-ink"
                        }`}
                      >
                        <Icon name={has ? "check" : "add"} size={11} />
                        {s(ingredient.name)}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --------------------------------------------- ce qu'on peut cuisiner */}
      {empty ? (
        <Notice icon="pantry">{t("emptyPantryTitle")}</Notice>
      ) : (
        <>
          {data && data.now.length > 0 && (
            <section>
              <SectionTitle
                icon="done"
                action={<Badge tone="olive">{data.counts.now}</Badge>}
              >
                {t("cookNow")}
              </SectionTitle>
              <div className="space-y-2.5">
                {data.now.map((match) => (
                  <MatchCard key={match.recipe.slug} match={match} />
                ))}
              </div>
            </section>
          )}

          {data && data.soon.length > 0 && (
            <section>
              <SectionTitle icon="shopping">{t("almostThere")}</SectionTitle>
              <div className="space-y-2.5">
                {data.soon.map((match) => (
                  <MatchCard key={match.recipe.slug} match={match} />
                ))}
              </div>
            </section>
          )}

          {data && data.now.length === 0 && data.soon.length === 0 && (
            <Notice icon="info">{t("nothingCookable")}</Notice>
          )}
        </>
      )}

      {/* ------------------------------------------------------ l'agent */}
      <section className="card space-y-3 p-4">
        <SectionTitle
          icon="agent"
          action={
            <Button variant="ghost" icon="filter" onClick={() => setRefine((v) => !v)}>
              {refine ? t("hideRefine") : t("refine")}
            </Button>
          }
        >
          {t("askFromPantry")}
        </SectionTitle>

        {refine && (
          <MealForm
            value={{ ...form, people }}
            onChange={({ people: nextPeople, ...rest }) => {
              setPeople(nextPeople);
              setForm(rest);
            }}
            onSubmit={ask}
            loading={asking}
          />
        )}

        {!refine && (
          <Button icon="agent" loading={asking} onClick={ask} className="w-full">
            {asking ? t("asking") : t("askFromPantry")}
          </Button>
        )}

        {advice && (
          <div className="space-y-3 border-t pt-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-primary">
                  {t("todaysMeal")}
                </p>
                <h3 className="mt-0.5 text-lg font-extrabold">{s(advice.recipe.name)}</h3>
              </div>
              <span className="shrink-0 text-sm font-bold text-primary">
                {formatTND(advice.suggestion.estimatedCost, lang)}
              </span>
            </div>

            <p className="rounded-xl bg-surface-2 p-3 text-sm leading-relaxed">
              {s(advice.suggestion.why)}
            </p>

            <div className="flex flex-wrap gap-2">
              <Link href={`/recettes/${advice.recipe.slug}`} className="flex-1">
                <Button icon="heat" className="w-full">
                  {t("startCooking")}
                </Button>
              </Link>
              <Button
                variant="secondary"
                icon="add"
                onClick={() => setMeals((p) => (p.includes(advice.recipe.slug) ? p : [...p, advice.recipe.slug]))}
              >
                {t("addToShopping")}
              </Button>
            </div>

            <Badge icon={advice.source === "gemini" ? "agent" : "pantry"}>
              {advice.source === "gemini" ? t("sourceGemini") : t("sourceLocal")}
            </Badge>
          </div>
        )}
      </section>

      <Link
        href="/recettes"
        className="card flex items-center gap-3 p-3.5 transition hover:border-primary"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
          <Icon name="recipes" size={20} />
        </span>
        <span className="min-w-0 flex-1 text-sm font-bold">{t("seeAllRecipes")}</span>
        <Icon name="next" size={16} className="shrink-0 text-muted rtl:rotate-180" />
      </Link>
    </div>
  );
}
