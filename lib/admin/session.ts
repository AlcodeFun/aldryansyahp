import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  SESSION_TTL_MS,
  verifySessionToken,
} from "@/lib/admin/token";

/**
 * Read-and-clear auth for Server Components.
 *
 * Next 16 removed synchronous `cookies()` access, so every caller must await.
 * `redirect()` here throws a control-flow exception, which is why `isAdmin`
 * below exists as a separate non-throwing check.
 */
export async function currentAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/** Redirect to the login form when unauthenticated. For pages and layouts. */
export async function requireAdmin(): Promise<void> {
  if (!(await currentAdmin())) redirect("/admin/login");
}

/** Bail out of a Server Action when unauthenticated. For mutations. */
export async function assertAdmin(): Promise<void> {
  if (!(await currentAdmin())) {
    throw new Error("Unauthorized");
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: Math.floor(SESSION_TTL_MS / 1000),
} as const;
