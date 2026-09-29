import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/session";
import { logout } from "@/lib/admin/actions";
import { AdminNav } from "@/components/admin/admin-nav";

export const metadata: Metadata = {
  title: "CMS",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen">
      <header className="border-b border-black/15 dark:border-white/15">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-lg font-semibold tracking-tight">
              CMS
            </Link>
            <Link
              href="/"
              className="font-mono text-xs opacity-60 hover:underline"
            >
              view site ↗
            </Link>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-black/30 px-4 py-1.5 text-sm transition-colors hover:bg-black hover:text-white dark:border-white/30 dark:hover:bg-white dark:hover:text-black"
            >
              Sign out
            </button>
          </form>
        </div>
        <div className="mx-auto w-full max-w-5xl px-6">
          <AdminNav />
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
