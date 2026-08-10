import type { Metadata } from "next";
import { WeekClient } from "@/components/week-client";

export const metadata: Metadata = {
  title: "Le menu de la semaine — Chef Tounsi",
};

export const dynamic = "force-dynamic";

export default function WeekPage() {
  return <WeekClient month={new Date().getMonth() + 1} />;
}
