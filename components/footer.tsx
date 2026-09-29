import Link from "next/link";
import { getSite, getStrings } from "@/lib/cms/site";

export async function Footer() {
  const [site, strings] = await Promise.all([getSite(), getStrings()]);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black dark:border-white">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-start justify-between gap-2 px-6 py-10 sm:flex-row sm:items-center">
        <p className="font-mono text-sm opacity-70">
          © {year} {site.name}
        </p>
        <p className="flex items-center font-mono text-sm opacity-70">
          <Link href={strings["home.random_notes_href"] ?? "/random"} className="hover:underline">
            {strings["footer.random_notes_link"] ?? "random notes"}
          </Link>
          <span className="mx-2">{strings["footer.separator"] ?? "·"}</span>
          <a href={`mailto:${site.email}`} className="hover:underline">
            {strings["footer.say_hello_link"] ?? "reach me out"}
          </a>
        </p>
      </div>
    </footer>
  );
}
