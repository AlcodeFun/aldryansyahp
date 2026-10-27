import type { Metadata } from "next";
import { Projects } from "@/components/home-sections";

export const metadata: Metadata = {
  title: "Projects",
  description: "Software projects, 2023–2026.",
};

export default function ProjectsPage() {
  return <Projects headingLevel="h1" />;
}
