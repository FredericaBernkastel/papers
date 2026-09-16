import type { NextConfig } from "next";

import { normalizeBasePath } from "./src/lib/base-path";

/**
 * Deployed as a static site on GitHub Pages.
 *
 * A project page is served from /<repo>, a user or custom-domain site from the
 * root. The CI workflow passes NEXT_PUBLIC_BASE_PATH from the Pages API rather
 * than hard-coding it; the same normalisation runs in src/lib/base-path.ts, so
 * `asset()` and this config always agree.
 */
const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

const nextConfig: NextConfig = {
  // static SSG: emits ./out, no server at runtime
  output: "export",
  // every internal href is checked against the real route tree
  typedRoutes: true,
  // /papers/contrapunctus/index.html, which Pages serves without a redirect
  trailingSlash: true,
  // next/image's optimizer needs a server; export ships the source files
  images: { unoptimized: true },
  ...(basePath === "" ? {} : { basePath }),
};

export default nextConfig;
