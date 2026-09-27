import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-28 text-center sm:py-40">
      <span className="font-mono text-sm opacity-60">404</span>
      <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        This page is missing from the archive.
      </h1>
      <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-black/70 dark:text-white/70">
        It may have been removed, or the address was written down wrong. Either
        way, the rest of the site is still here.
      </p>
      <p className="mt-10">
        <Link
          href="/"
          className="text-lg underline decoration-1 underline-offset-4 hover:opacity-70"
        >
          ← back home
        </Link>
      </p>
    </div>
  );
}