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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" dir="ltr" className={cairo.variable}>
      <body className="antialiased">
        <LangProvider>
          <AppShell>{children}</AppShell>
        </LangProvider>
      </body>
    </html>
  );
}
