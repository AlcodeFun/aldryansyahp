/**
 * Stateless session token for the /admin password gate.
 *
 * The cookie carries `<expiresAtMs>.<hmac>` where the HMAC is over the expiry,
 * keyed by a SHA-256 digest of ADMIN_PASSWORD. Changing ADMIN_PASSWORD
 * therefore invalidates every existing session without a second secret to
 * rotate. There is no server-side session store to keep in sync.
 *
 * This module is imported by `proxy.ts`, so it must stay free of database and
 * framework imports — proxy is a separate bundle and cannot rely on shared
 * module state.
 */

import { createHmac, createHash, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "cms_session";

/** 12 hours — long enough to work, short enough to matter. */
export const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

function adminPassword(): string | undefined {
  // Dot access on purpose. Next.js only inlines statically-analysable
  // `process.env.X` reads into the separately-bundled proxy runtime; bracket
  // access compiles to an empty object there, so `verifySessionToken` would
  // fail every request and bounce signed-in editors back to the login screen.
  //
  // The trade-off is that rotating ADMIN_PASSWORD needs a rebuild, which is the
  // normal shape for a deployed secret anyway.
  return process.env.ADMIN_PASSWORD || undefined;
}

/** False when ADMIN_PASSWORD is missing — no secret, no sessions. */
export function isAdminConfigured(): boolean {
  return adminPassword() !== undefined;
}

/** Constant-time compare against ADMIN_PASSWORD. False if unset. */
export function isAdminPassword(value: string): boolean {
  const expected = adminPassword();
  if (expected === undefined) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  // timingSafeEqual throws on length mismatch, so guard first.
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function sign(payload: string): string {
  const password = adminPassword();
  if (password === undefined) return "";
  return createHmac("sha256", createHash("sha256").update(password).digest())
    .update(payload)
    .digest("hex");
}

export function createSessionToken(now = Date.now()): string {
  const expiresAt = String(now + SESSION_TTL_MS);
  return `${expiresAt}.${sign(expiresAt)}`;
}

export function verifySessionToken(token: string | undefined, now = Date.now()): boolean {
  if (!token) return false;

  const separator = token.lastIndexOf(".");
  if (separator <= 0) return false;

  const expiresAt = token.slice(0, separator);
  const signature = token.slice(separator + 1);

  const expected = sign(expiresAt);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const expiry = Number(expiresAt);
  return Number.isFinite(expiry) && expiry > now;
}
