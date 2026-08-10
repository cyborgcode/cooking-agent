"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

/**
 * État persisté dans le navigateur.
 *
 * `localStorage` est une source de données extérieure à React : on s'y
 * abonne plutôt que de la recopier dans un état local depuis un effet. Deux
 * composants qui lisent la même clé partagent donc la même valeur, et une
 * modification faite dans un autre onglet est répercutée ici.
 */

interface Entry {
  /** Chaîne brute au moment de la lecture, pour invalider le cache. */
  raw: string | null;
  parsed: unknown;
}

// Le cache garantit qu'une même chaîne JSON redonne toujours le même objet :
// sans lui, `useSyncExternalStore` boucle à l'infini.
const cache = new Map<string, Entry>();
const listeners = new Map<string, Set<() => void>>();
/** Clés dont l'écriture a échoué : on les garde alors en mémoire seulement. */
const memoryOnly = new Set<string>();

function subscribe(key: string, listener: () => void): () => void {
  let group = listeners.get(key);
  if (!group) {
    group = new Set();
    listeners.set(key, group);
  }
  group.add(listener);

  // Un autre onglet a modifié la même clé.
  const onStorage = (event: StorageEvent) => {
    if (event.key === key) listener();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    group.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function read<T>(key: string, fallback: T): T {
  const cached = cache.get(key);
  if (memoryOnly.has(key) && cached) return cached.parsed as T;

  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    // Stockage inaccessible : on se rabat sur la valeur par défaut.
  }

  if (cached && cached.raw === raw) return cached.parsed as T;

  let parsed: unknown = fallback;
  if (raw !== null) {
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = fallback; // Contenu corrompu.
    }
  }

  cache.set(key, { raw, parsed });
  return parsed as T;
}

function write<T>(key: string, value: T): void {
  const raw = JSON.stringify(value);
  try {
    window.localStorage.setItem(key, raw);
    memoryOnly.delete(key);
  } catch {
    // Navigation privée ou quota atteint : la valeur ne survivra pas au
    // rechargement, mais la session en cours reste utilisable.
    memoryOnly.add(key);
  }
  cache.set(key, { raw, parsed: value });
  listeners.get(key)?.forEach((listener) => listener());
}

/** Abonnement inerte : sert uniquement à détecter la fin de l'hydratation. */
const noopSubscribe = () => () => {};

export function useLocalState<T>(
  key: string,
  initial: T,
): [T, (value: T | ((previous: T) => T)) => void, boolean] {
  // La valeur par défaut est figée au premier rendu : les littéraux passés
  // en ligne (`[]`, `{}`) changeraient d'identité à chaque rendu.
  const initialRef = useRef(initial);

  const value = useSyncExternalStore(
    useCallback((listener: () => void) => subscribe(key, listener), [key]),
    useCallback(() => read<T>(key, initialRef.current), [key]),
    useCallback(() => initialRef.current, []),
  );

  // Faux pendant le rendu serveur et le premier rendu client, vrai ensuite :
  // permet de distinguer « pas encore lu » de « réellement vide ».
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const update = useCallback(
    (next: T | ((previous: T) => T)) => {
      const current = read<T>(key, initialRef.current);
      const resolved =
        typeof next === "function" ? (next as (p: T) => T)(current) : next;
      write(key, resolved);
    },
    [key],
  );

  return [value, update, hydrated];
}

/** Clés de stockage, regroupées pour éviter les collisions. */
export const STORAGE_KEYS = {
  lang: "chef.lang",
  pantry: "chef.pantry",
  meals: "chef.meals",
  people: "chef.people",
  history: "chef.history",
} as const;
