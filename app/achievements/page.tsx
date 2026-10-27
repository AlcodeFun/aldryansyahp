import type { Metadata } from "next";
import { Certifications } from "@/components/home-sections";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Professional certifications and competition awards.",
};

export default function AchievementsPage() {
  return <Certifications headingLevel="h1" />;
}
