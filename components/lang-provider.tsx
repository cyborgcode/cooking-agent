"use client";

import { createContext, useCallback, useContext, useEffect } from "react";
import { STORAGE_KEYS, useLocalState } from "@/components/use-local-state";
import { dir, pick, t as translate, type UI } from "@/lib/i18n";
import type { Bilingual, Lang } from "@/lib/types";

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  /** Traduit une clé de l'interface. */
  t: (key: keyof typeof UI) => string;
  /** Choisit la bonne variante d'un libellé bilingue venu des données. */
  s: (value: Bilingual) => string;
  rtl: boolean;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useLocalState<Lang>(STORAGE_KEYS.lang, "fr");

  // Le sens d'écriture est porté par <html> : c'est lui qui fait basculer
  // toute la mise en page, y compris les marges logiques de Tailwind.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir(lang);
  }, [lang]);

  const toggle = useCallback(
    () => setLang((previous) => (previous === "fr" ? "ar" : "fr")),
    [setLang],
  );

  const value: LangContextValue = {
    lang,
    setLang,
    toggle,
    t: (key) => translate(key, lang),
    s: (bilingual) => pick(bilingual, lang),
    rtl: lang === "ar",
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang doit être utilisé à l'intérieur de <LangProvider>");
  }
  return context;
}
