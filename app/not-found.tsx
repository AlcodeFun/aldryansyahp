import Link from "next/link";
import { getPageSettings } from "@/lib/cms/pages";
import { getStrings } from "@/lib/cms/site";
import { Page, PageTitle } from "@/components/page";

export default async function NotFound() {
  const [page, strings] = await Promise.all([
    getPageSettings("not_found"),
    getStrings(),
  ]);

  return (
    <Page>
      <p className="mb-4 font-display text-6xl font-extrabold text-yellow">{strings["notfound.code"] ?? "404"}</p>
      <PageTitle title={page.heading} intro={page.intro} />
      <p className="mt-10">
        <Link
          href={page.backHref || "/"}
          className="inline-block rounded-lg bg-navy px-5 py-2.5 font-bold text-white hover:bg-navy-2 dark:bg-yellow dark:text-navy"
        >
          {page.backLabel}
        </Link>
      </p>
    </Page>
  );
}
