import { TodayClient } from "@/components/today-client";
import { inSeason } from "@/lib/data/ingredients";

// La saisonnalité dépend du jour : la page se rend à chaque requête.
export const dynamic = "force-dynamic";

export default function TodayPage() {
  const month = new Date().getMonth() + 1;
  const seasonal = inSeason(month)
    .slice(0, 12)
    .map((ingredient) => ingredient.name);

  return <TodayClient month={month} seasonal={seasonal} />;
}
