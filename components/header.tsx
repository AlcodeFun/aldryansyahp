import Link from "next/link";
import { getSite, getNav } from "@/lib/cms/site";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

export async function Header() {
  const [site, nav] = await Promise.all([getSite(), getNav()]);

  return (
    <header className="raw px-5 pt-5">
      <div className="flex mx-auto max-w-[60ch] flex-wrap items-baseline gap-x-4 gap-y-1">
        <Link href="/" className="text-[1.3rem]">
          {site.username}
        </Link>
        <NavLinks items={nav} />
        <ThemeToggle />
      </div>
      <hr className="mt-2 mx-auto max-w-[60ch]" />
    </header>
  );
}
