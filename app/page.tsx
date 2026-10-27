import { getHome } from "@/lib/cms/home";
import { getSite } from "@/lib/cms/site";
import {
  About,
  Certifications,
  Contact,
  CurrentRole,
  Education,
  Experience,
  Hero,
  OtherExperience,
  Projects,
  TechStack,
  VisualDesign,
} from "@/components/home-sections";

export default async function Home() {
  const [{ hero }, site] = await Promise.all([getHome(), getSite()]);

  return (
    <>
      <Hero rhyme={{ line: hero.lineOne, greeting: `${hero.greeting} ${site.nickname}.` }} />
      <About />
      <Education />
      <TechStack />
      <CurrentRole />
      <Experience />
      <OtherExperience />
      <Projects />
      <VisualDesign />
      <Certifications />
      <Contact />
    </>
  );
}
