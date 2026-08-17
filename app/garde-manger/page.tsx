import { redirect } from "next/navigation";

/**
 * Le garde-manger est devenu la page d'accueil.
 * L'ancienne adresse reste valable : les liens et favoris ne cassent pas.
 */
export default function PantryPage() {
  redirect("/");
}
