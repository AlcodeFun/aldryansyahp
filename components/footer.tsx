import Link from "next/link";
import { getSite, getStrings } from "@/lib/cms/site";

export async function Footer() {
  const [site, strings] = await Promise.all([getSite(), getStrings()]);

  return (
    <footer className="raw px-5 pb-8 pt-16 text-[var(--muted)]">
      <hr className="mb-3 max-w-[60ch]" />
      <p className="max-w-[60ch]">
        {site.name}, {new Date().getFullYear()}.{" "}
        <Link href={strings["home.random_notes_href"] ?? "/random"}>
          {strings["footer.random_notes_link"] ?? "notes"}
        </Link>
        {" / "}
        <a href={`mailto:${site.email}`}>
          {strings["footer.say_hello_link"] ?? "email"}
        </a>
      </p>
    </footer>
  );
}
