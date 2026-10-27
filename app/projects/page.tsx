import type { Metadata } from "next";
import { getPageSettings } from "@/lib/cms/pages";
import { Projects } from "@/components/home-sections";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSettings("projects");
  return { title: page.seoTitle, description: page.seoDescription };
}

// The same project list the home page shows, as its own page.
export default function ProjectsPage() {
  return <Projects headingLevel="h1" />;
}
