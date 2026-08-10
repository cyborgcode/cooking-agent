/**
 * Mise à l'échelle des quantités.
 *
 * Isolé du reste pour rester utilisable côté navigateur : ce module
 * n'importe aucune donnée, seulement de l'arithmétique.
 */

/** Met une quantité à l'échelle du nombre de convives, puis l'arrondit joliment. */
export function scaleQty(qty: number, fromServes: number, toServes: number): number {
  const scaled = (qty * toServes) / fromServes;
  if (scaled >= 100) return Math.round(scaled / 10) * 10; // grammes, millilitres
  if (scaled >= 10) return Math.round(scaled);
  if (scaled >= 1) return Math.round(scaled * 2) / 2; // au demi près
  return Math.round(scaled * 10) / 10;
}

/**
 * Formate un montant en dinars tunisiens.
 *
 * En arabe on écrit « د.ت » : l'abréviation latine « DT » se retrouverait
 * placée avant le nombre par l'algorithme bidirectionnel.
 */
export function formatTND(amount: number, lang: "fr" | "ar" = "fr"): string {
  // `parseFloat` retire les zéros inutiles : 10,0 → 10 et 9,50 → 9,5.
  const value = parseFloat(amount.toFixed(amount < 10 ? 2 : 1));
  return lang === "ar" ? `${value} د.ت` : `${value} DT`;
}

/** Formate une durée : « 45 min », « 1 h 30 », « 45 دقيقة », « ساعة ونصف ». */
export function formatMinutes(minutes: number, lang: "fr" | "ar" = "fr"): string {
  if (minutes < 60) return lang === "ar" ? `${minutes} دقيقة` : `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (lang === "ar") {
    const base = hours === 1 ? "ساعة" : hours === 2 ? "ساعتين" : `${hours} سوايع`;
    if (rest === 0) return base;
    if (rest === 30) return `${base} ونصف`;
    return `${base} و${rest} دقيقة`;
  }

  return rest === 0 ? `${hours} h` : `${hours} h ${rest}`;
}
