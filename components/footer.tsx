import Link from "next/link";
import { getSite, getStrings } from "@/lib/cms/site";

export async function Footer() {
  const [site, strings] = await Promise.all([getSite(), getStrings()]);

  return (
    <footer className="raw px-4 pb-6 pt-12 font-mono text-[15px]">
      <hr className="mb-3 max-w-[72ch]" />
      <p className="max-w-[72ch]">
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
