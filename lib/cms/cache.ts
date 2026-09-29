import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";

/**
 * Cache tags. Every read is tagged with the section it belongs to; every admin
 * mutation revalidates the tag it touched, so a published edit is visible on
 * the public site without a redeploy.
 */
export const TAGS = {
  site: "site",
  home: "home",
  journey: "journey",
  projects: "projects",
  notes: "random",
  pages: "pages",
} as const;

/** Freshness window for tagged reads. Admin edits bypass this entirely. */
export const REVALIDATE_SECONDS = 3600;

/**
 * Persistent, tag-aware cache for a fixed query.
 *
 * Wrap in `perRequest` as well when the query takes arguments — this returns a
 * zero-arg closure, so a per-slug variant has to be built inside a memoised
 * factory rather than by passing a key straight through.
 */
export function cached<T>(
  query: () => Promise<T>,
  keyParts: string[],
  tags: string[],
): () => Promise<T> {
  return unstable_cache(query, keyParts, { tags, revalidate: REVALIDATE_SECONDS });
}

/**
 * Deduplicate a parameterized query within one render pass, then hand the
 * result to the persistent cache. Two components asking for the same slug in
 * the same request hit Postgres once.
 */
export function cachedBy<TArgs extends unknown[], TResult>(
  factory: (args: TArgs) => () => Promise<TResult>,
  keyPrefix: string,
  tagFor: (args: TArgs) => string[],
): (...args: TArgs) => Promise<TResult> {
  const memo = cache((...args: TArgs) => {
    const query = factory(args);
    return cached(query, [keyPrefix, ...args.map(String)], tagFor(args))();
  });
  return (...args: TArgs) => memo(...args);
}

/** Memoise an uncached read for the duration of a single request. */
export function perRequest<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
): (...args: TArgs) => Promise<TResult> {
  return cache(fn);
}
