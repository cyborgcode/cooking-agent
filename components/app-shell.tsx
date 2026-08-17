"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/icons";
import { useLang } from "@/components/lang-provider";
import { ThemeToggle } from "@/components/theme";
import { STORAGE_KEYS, useLocalState } from "@/components/use-local-state";
import type { UI } from "@/lib/i18n";

interface NavItem {
  href: string;
  labelKey: keyof typeof UI;
  icon: IconName;
}

const NAV: NavItem[] = [
  // Le garde-manger est l'accueil : c'est de lui que part tout le reste.
  { href: "/", labelKey: "navPantry", icon: "pantry" },
  { href: "/recettes", labelKey: "navRecipes", icon: "recipes" },
  { href: "/semaine", labelKey: "navWeek", icon: "week" },
  { href: "/courses", labelKey: "navShopping", icon: "shopping" },
  { href: "/prix", labelKey: "navPrices", icon: "price" },
];

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/** Compteur d'articles sur l'onglet Courses. */
function ShoppingCount() {
  const [meals, , ready] = useLocalState<string[]>(STORAGE_KEYS.meals, []);
  if (!ready || meals.length === 0) return null;

  return (
    <span className="absolute -top-0.5 end-1 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-ink">
      {meals.length}
    </span>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t, lang, toggle } = useLang();

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col">
      <header className="no-print sticky top-0 z-20 border-b bg-background/85 backdrop-blur">
        <div className="zellige h-1" />
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-ink">
              <Icon name="brand" size={20} />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-extrabold">{t("appName")}</span>
              <span className="block text-[11px] text-muted">{t("tagline")}</span>
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-1.5">
            <ThemeToggle />
            <button
              onClick={toggle}
              className="flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold text-muted transition hover:bg-surface-2 hover:text-ink"
              aria-label={lang === "fr" ? "التبديل إلى العربية" : "Passer au français"}
            >
              <Icon name="lang" size={15} />
              {lang === "fr" ? "عربي" : "FR"}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 pb-28 pt-5">{children}</main>

      <nav className="no-print fixed inset-x-0 bottom-0 z-20 border-t bg-surface/95 backdrop-blur">
        <ul className="mx-auto flex w-full max-w-3xl">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex flex-col items-center gap-1 py-2.5 text-[10px] font-semibold transition ${
                    active ? "text-primary" : "text-muted hover:text-ink"
                  }`}
                >
                  <Icon name={item.icon} size={20} strokeWidth={active ? 2.2 : 1.75} />
                  {item.href === "/courses" && <ShoppingCount />}
                  <span className="max-w-full truncate px-1">{t(item.labelKey)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
