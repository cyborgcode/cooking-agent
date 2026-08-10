"use client";

import { useCallback, useState } from "react";
import { Icon } from "@/components/icons";
import { useLang } from "@/components/lang-provider";
import { RecipeCard } from "@/components/recipe-card";
import { STORAGE_KEYS, useLocalState } from "@/components/use-local-state";
import { Button, Notice } from "@/components/ui";
import { weekdayName } from "@/lib/i18n";
import { formatTND } from "@/lib/scale";
import type { RecipeSummary } from "@/lib/view";

export function WeekClient({ month }: { month: number }) {
  const { t, lang } = useLang();

  const [people] = useLocalState<number>(STORAGE_KEYS.people, 4);
  const [pantry] = useLocalState<string[]>(STORAGE_KEYS.pantry, []);
  const [meals, setMeals] = useLocalState<string[]>(STORAGE_KEYS.meals, []);

  const [days, setDays] = useState<RecipeSummary[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const generate = useCallback(async () => {
    setLoading(true);
    setFailed(false);
    try {
      const response = await fetch("/api/semaine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ people, pantry, month, maxMinutes: 90, budget: null }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = (await response.json()) as { days: RecipeSummary[] };
      setDays(payload.days);
    } catch {
      setFailed(true);
      setDays(null);
    } finally {
      setLoading(false);
    }
  }, [people, pantry, month]);

  const addAll = () => {
    if (!days) return;
    setMeals((previous) => [...new Set([...previous, ...days.map((day) => day.slug)])]);
  };

  const weekTotal = days?.reduce((sum, day) => sum + day.cost, 0) ?? 0;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="flex items-center gap-2 text-lg font-extrabold">
          <Icon name="week" size={20} className="text-primary" />
          {t("weekTitle")}
        </h1>
        <p className="mt-1 text-sm text-muted">{t("weekHelp")}</p>
      </div>

      <Button icon="agent" loading={loading} onClick={generate} className="w-full">
        {days ? t("again") : t("generateWeek")}
      </Button>

      {failed && <Notice icon="error" tone="warning">{t("error")}</Notice>}

      {days && (
        <>
          <div className="card flex items-center justify-between gap-3 p-4">
            <span className="flex items-center gap-2 text-sm font-bold">
              <Icon name="cost" size={16} className="text-primary" />
              {t("total")}
            </span>
            <span className="text-lg font-extrabold text-primary">
              {formatTND(weekTotal, lang)}
            </span>
          </div>

          <div className="space-y-4">
            {days.map((day, index) => (
              <div key={`${day.slug}-${index}`}>
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted">
                  <Icon name="week" size={13} />
                  {weekdayName(index, lang)}
                </p>
                <RecipeCard recipe={day} showTags={false} />
              </div>
            ))}
          </div>

          <Button
            variant="secondary"
            icon="shopping"
            onClick={addAll}
            className="w-full"
            disabled={days.every((day) => meals.includes(day.slug))}
          >
            {t("addWeekToShopping")}
          </Button>
        </>
      )}
    </div>
  );
}
