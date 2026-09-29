import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin/token";

/**
 * Fast-path gate for /admin.
 *
 * This only checks that a cookie is present and well-formed so unauthenticated
 * visitors get a redirect instead of a half-rendered editor. It is not the
 * security boundary: `app/admin/(cms)/layout.tsx` calls `requireAdmin()` and
 * every Server Action calls `assertAdmin()` before touching the database. Both
 * run in the same Node runtime as the app and can read the real secret, which
 * proxy cannot rely on.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authenticated = verifySessionToken(
    request.cookies.get(SESSION_COOKIE)?.value,
  );

  // The login screen lives in a route group without the guarded layout, so it
  // needs this exemption to avoid a redirect to itself.
  if (pathname === "/admin/login") {
    return authenticated
      ? NextResponse.redirect(new URL("/admin", request.url))
      : NextResponse.next();
  }
  if (authenticated) return NextResponse.next();

  const login = new URL("/admin/login", request.url);
  // Only sub-paths are worth remembering; "/admin" is where we land anyway.
  if (pathname !== "/admin") login.searchParams.set("from", pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin/:path*"],
};
