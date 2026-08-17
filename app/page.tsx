import { PantryDashboard } from "@/components/pantry-dashboard";
import { inSeason } from "@/lib/data/ingredients";
import { ingredientOptions } from "@/lib/view";

// Le tableau de bord dépend du mois : il se rend à chaque requête.
export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const month = new Date().getMonth() + 1;

  return (
    <PantryDashboard
      ingredients={ingredientOptions()}
      month={month}
      seasonal={inSeason(month).slice(0, 8).map((i) => i.name)}
    />
  );
}
