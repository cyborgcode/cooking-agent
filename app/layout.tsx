import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { LangProvider } from "@/components/lang-provider";
import "./globals.css";

// Cairo couvre l'alphabet latin et l'arabe : une seule police pour les deux
// langues, donc aucun décalage de mise en page au changement de langue.
const cairo = Cairo({
  subsets: ["latin", "arabic"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-app-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chef Tounsi — l'agent qui décide quoi cuisiner",
  description:
    "Agent de cuisine tunisien : le plat du jour, les étapes pas à pas, la liste de courses par commerce et le budget en dinars.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf7f1" },
    { media: "(prefers-color-scheme: dark)", color: "#16110d" },
  ],
};

/**
 * Applique le thème mémorisé avant le premier rendu.
 *
 * Sans cela, la page s'afficherait d'abord selon le réglage du système, puis
 * basculerait une fois React hydraté : un clignotement bien visible. Le
 * script est volontairement minuscule et tolérant — si le stockage est
 * inaccessible, on retombe simplement sur la préférence système.
 */
const THEME_SCRIPT = `try{var t=JSON.parse(localStorage.getItem("chef.theme")||"null");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // `suppressHydrationWarning` : le script ci-dessus pose `data-theme` sur
    // <html> avant l'hydratation, ce que React signalerait sinon comme un
    // écart avec le rendu serveur.
    <html lang="fr" dir="ltr" className={cairo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="antialiased">
        <LangProvider>
          <AppShell>{children}</AppShell>
        </LangProvider>
      </body>
    </html>
  );
}
