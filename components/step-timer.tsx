"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { useLang } from "@/components/lang-provider";

function format(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Minuteur d'une étape de cuisson.
 *
 * Le décompte se base sur l'heure de fin réelle, pas sur un compteur
 * incrémenté : l'onglet peut passer en arrière-plan sans dériver.
 *
 * Le composant est remonté à chaque changement d'étape (prop `key` côté
 * appelant), ce qui remet le minuteur à zéro sans effet de synchronisation.
 */
export function StepTimer({ minutes }: { minutes: number }) {
  const total = minutes * 60;
  const [remaining, setRemaining] = useState(total);
  const [running, setRunning] = useState(false);
  const endsAt = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;

    const tick = () => {
      if (endsAt.current === null) return;
      const left = Math.max(0, Math.round((endsAt.current - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) setRunning(false);
    };

    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [running]);

  const { t } = useLang();
  const done = remaining === 0;
  const progress = total > 0 ? 1 - remaining / total : 0;

  const start = () => {
    endsAt.current = Date.now() + remaining * 1000;
    setRunning(true);
  };

  const pause = () => {
    setRunning(false);
    endsAt.current = null;
  };

  const reset = () => {
    setRunning(false);
    endsAt.current = null;
    setRemaining(total);
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border p-3 transition ${
        done ? "border-olive bg-olive-soft" : "bg-surface-2"
      }`}
    >
      <span
        className={`grid size-10 shrink-0 place-items-center rounded-full ${
          done ? "bg-olive text-white" : "bg-surface text-primary"
        }`}
      >
        <Icon name={done ? "done" : "timer"} size={19} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-lg font-extrabold tabular-nums leading-none">
          {done ? t("timerDone") : format(remaining)}
        </p>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
          <div
            className={`h-full rounded-full transition-[width] duration-300 ${
              done ? "bg-olive" : "bg-primary"
            }`}
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>

      <div className="flex shrink-0 gap-1">
        {!done && (
          <button
            onClick={running ? pause : start}
            aria-label={running ? "Pause" : t("startTimer")}
            className="grid size-9 place-items-center rounded-full bg-primary text-primary-ink transition hover:opacity-90"
          >
            <Icon name={running ? "pause" : "play"} size={16} />
          </button>
        )}
        <button
          onClick={reset}
          aria-label={t("retry")}
          className="grid size-9 place-items-center rounded-full bg-surface text-muted transition hover:text-ink"
        >
          <Icon name="reset" size={15} />
        </button>
      </div>
    </div>
  );
}
