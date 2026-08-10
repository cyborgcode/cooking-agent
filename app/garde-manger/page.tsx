import type { Metadata } from "next";
import { PantryEditor } from "@/components/pantry-editor";
import { ingredientOptions } from "@/lib/view";

export const metadata: Metadata = {
  title: "Mon garde-manger — Chef Tounsi",
};

export const dynamic = "force-dynamic";

export default function PantryPage() {
  return (
    <PantryEditor ingredients={ingredientOptions()} month={new Date().getMonth() + 1} />
  );
}
