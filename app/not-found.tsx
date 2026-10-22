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
      <p className="font-mono">{strings["notfound.code"] ?? "404"}</p>
      <PageTitle title={page.heading} intro={page.intro} />
      <p className="mt-6 font-mono text-[15px]">
        <Link href={page.backHref || "/"}>{page.backLabel}</Link>
      </p>
    </Page>
  );
}
