/**
 * The sub-path the site is served from.
 *
 * Empty for a user or custom-domain site; "/papers" for a GitHub project page.
 * NEXT_PUBLIC_* is inlined at build time, so this works in a static export.
 *
 * next/link and next/router apply basePath on their own. Everything else —
 * `<img src>`, and next/image too, per the basePath docs — does not, so any
 * hand-written path into public/ has to go through `asset()`.
 *
 * next.config.ts imports `normalizeBasePath` so the config and the runtime can
 * never disagree about what the prefix is.
 */

export function normalizeBasePath(raw: string | undefined): string {
  const value = (raw ?? "").trim();
  // actions/configure-pages reports "/" for a user site; Next rejects that
  if (value === "" || value === "/") return "";
  const withLeading = value.startsWith("/") ? value : `/${value}`;
  return withLeading.endsWith("/") ? withLeading.slice(0, -1) : withLeading;
}

export const BASE_PATH = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

/** Prefix a path into public/ with the deployment's base path. */
export function asset(path: `/${string}`): string {
  return `${BASE_PATH}${path}`;
}

/**
 * For a plain <a>, where next/link's automatic handling does not apply.
 * Root-relative paths get the base path; mailto: and absolute URLs are left
 * alone. Internal page navigation should use next/link instead.
 */
export function resolveHref(value: string): string {
  return value.startsWith("/") ? `${BASE_PATH}${value}` : value;
}
