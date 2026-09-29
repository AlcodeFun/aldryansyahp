import Link from "next/link";
import { getPageSettings } from "@/lib/cms/pages";
import { getStrings } from "@/lib/cms/site";

export default async function NotFound() {
  const [page, strings] = await Promise.all([
    getPageSettings("not_found"),
    getStrings(),
  ]);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-28 text-center sm:py-40">
      <span className="font-mono text-sm opacity-60">
        {strings["notfound.code"] ?? "404"}
      </span>
      <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        {page.heading}
      </h1>
      <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-black/70 dark:text-white/70">
        {page.intro}
      </p>
      <p className="mt-10">
        <Link
          href={page.backHref || "/"}
          className="text-lg underline decoration-1 underline-offset-4 hover:opacity-70"
        >
          {page.backLabel}
        </Link>
      </p>
    </div>
  );
}
