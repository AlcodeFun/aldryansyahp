import type { Metadata } from "next";
import { getStrings } from "@/lib/cms/site";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const [{ from }, strings] = await Promise.all([searchParams, getStrings()]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center px-6 py-20">
      <h1 className="text-2xl font-semibold tracking-tight">CMS</h1>
      <p className="mt-2 text-sm opacity-70">{strings["site.name"] || "Content manager"}</p>

      <div className="mt-8">
        <LoginForm from={from ?? ""} />
      </div>

      <p className="mt-10 font-mono text-xs opacity-50">
        Sessions last 12 hours. Set ADMIN_PASSWORD in your environment.
      </p>
    </div>
  );
}
