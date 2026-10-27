import Link from "next/link";
import { getSite, getStrings } from "@/lib/cms/site";

export async function Footer() {
  const [site, strings] = await Promise.all([getSite(), getStrings()]);

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-muted">
          <span className="font-display font-bold uppercase tracking-wide text-heading">
            {site.name}
          </span>
          <span className="mx-2">|</span>
          {site.role} Portfolio {new Date().getFullYear()}
        </p>
        <p className="flex gap-4 font-semibold">
          <Link href={strings["home.random_notes_href"] ?? "/random"} className="text-muted hover:text-heading hover:underline">
            {strings["footer.random_notes_link"] ?? "Notes"}
          </Link>
          <a href={`mailto:${site.email}`} className="text-muted hover:text-heading hover:underline">
            {strings["footer.say_hello_link"] ?? "Email"}
          </a>
        </p>
      </div>
    </footer>
  );
}
