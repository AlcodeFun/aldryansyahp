import { getHome } from "@/lib/cms/home";
import { getSite } from "@/lib/cms/site";
import { About, Contact, Education, Hero, RecentOnMe, TechStack } from "@/components/home-sections";

export default async function Home() {
  const [{ hero }, site] = await Promise.all([getHome(), getSite()]);

  return (
    <>
      <Hero rhyme={{ line: hero.lineOne, greeting: `${hero.greeting} ${site.nickname}.` }} />
      <About />
      <Education />
      <TechStack />
      <RecentOnMe />
      <Contact />
    </>
  );
}
