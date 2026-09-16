import type { NextConfig } from "next";

/**
 * Deployed as a static site on GitHub Pages.
 *
 * `basePath` is only needed for a project page (user.github.io/<repo>); a user
 * or custom-domain site is served from the root and wants it empty. Set
 * NEXT_PUBLIC_BASE_PATH at build time rather than hard-coding it here.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // static SSG: emits ./out, no server at runtime
  output: "export",
  // every internal href is checked against the real route tree
  typedRoutes: true,
  // /papers/contrapunctus/index.html, which Pages serves without a redirect
  trailingSlash: true,
  // next/image's optimizer needs a server; export ships the source files
  images: { unoptimized: true },
  ...(basePath === "" ? {} : { basePath, assetPrefix: basePath }),
};

export default nextConfig;
