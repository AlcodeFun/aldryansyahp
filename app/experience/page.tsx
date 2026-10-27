import type { Metadata } from "next";
import { Experience, OtherExperience } from "@/components/home-sections";

export const metadata: Metadata = {
  title: "Experience",
  description: "Internships, a professional role, teaching and leadership, 2022–2026.",
};

export default function ExperiencePage() {
  return (
    <>
      <Experience headingLevel="h1" />
      <OtherExperience />
    </>
  );
}
