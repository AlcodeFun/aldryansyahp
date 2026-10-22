import Link from "next/link";
import { getSite, getNav } from "@/lib/cms/site";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

export async function Header() {
  const [site, nav] = await Promise.all([getSite(), getNav()]);

  return (
    <header className="raw px-4 pt-4 font-mono text-[15px]">
      <div className="flex max-w-[72ch] flex-wrap items-baseline gap-x-4 gap-y-1">
        <Link href="/" className="font-bold">
          {site.username}
        </Link>
        <NavLinks items={nav} />
        <ThemeToggle />
      </div>
      <hr className="mt-3 max-w-[72ch]" />
    </header>
  );
}
