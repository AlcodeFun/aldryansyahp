import type { Metadata } from "next";
import { VisualDesign } from "@/components/home-sections";

export const metadata: Metadata = {
  title: "Visual Design",
  description: "Posters, Instagram feeds, an e-book and reels.",
};

export default function VisualDesignPage() {
  return <VisualDesign headingLevel="h1" />;
}
