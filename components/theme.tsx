"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { Icon } from "@/components/icons";
import { useLang } from "@/components/lang-provider";
import { STORAGE_KEYS, useLocalState } from "@/components/use-local-state";

/**
 * Thème clair / sombre.
 *
 * Tant que l'utilisateur n'a rien choisi, l'application suit le réglage du
 * système : c'est le bon défaut pour une application qu'on ouvre le soir dans
 * une cuisine. Dès qu'il touche au bouton, son choix est mémorisé et prime.
 */

export type Theme = "light" | "dark";

const QUERY = "(prefers-color-scheme: dark)";

/**
 * Préférence du système, suivie en direct.
 *
 * `matchMedia` est une source de données extérieure à React : on s'y abonne
 * plutôt que de la recopier dans un état depuis un effet. Basculer le réglage
 * du système met donc l'interface à jour sans recharger la page.
 */
export function usePrefersDark(): boolean {
  return useSyncExternalStore(
    useCallback((listener: () => void) => {
      const media = window.matchMedia(QUERY);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }, []),
    () => window.matchMedia(QUERY).matches,
    // Au rendu serveur on ne peut pas connaître la préférence : on part du
    // clair, et `color-scheme` corrige l'affichage avant même l'hydratation.
    () => false,
  );
}

export function useTheme() {
  const [stored, setStored] = useLocalState<Theme | null>(STORAGE_KEYS.theme, null);
  const prefersDark = usePrefersDark();

  // Ce qui est réellement à l'écran : le choix explicite, sinon le système.
  const resolved: Theme = stored ?? (prefersDark ? "dark" : "light");

  // Synchronise l'attribut que lit la feuille de style.
  useEffect(() => {
    const root = document.documentElement;
    if (stored) root.dataset.theme = stored;
    else delete root.dataset.theme;
  }, [stored]);

  const toggle = useCallback(
    () => setStored(resolved === "dark" ? "light" : "dark"),
    [resolved, setStored],
  );

  /** Revenir au réglage du système. */
  const followSystem = useCallback(() => setStored(null), [setStored]);

  return { theme: resolved, explicit: stored, toggle, followSystem };
}

/** Bouton de bascule clair / sombre, à côté du sélecteur de langue. */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useLang();

  const goingDark = theme === "light";

  return (
    <button
      onClick={toggle}
      aria-label={t(goingDark ? "themeToDark" : "themeToLight")}
      title={t(goingDark ? "themeToDark" : "themeToLight")}
      className="grid size-9 shrink-0 place-items-center rounded-xl border text-muted transition hover:bg-surface-2 hover:text-ink"
    >
      <Icon name={goingDark ? "themeDark" : "themeLight"} size={16} />
    </button>
  );
}
