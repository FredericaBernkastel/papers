import type { Metadata } from "next";
import { Alef, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";

import "./globals.css";

// self-hosted by next/font at build time: no request to Google at runtime,
// which a static export on Pages would otherwise make on every visit
const alef = Alef({
  variable: "--font-alef",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/**
 * Native MathML draws a stretchy \underbrace from the horizontal size variants
 * and glyph assembly the font supplies for U+23DF. Without an OpenType MATH
 * table in scope, <math> inherits Alef, which has none, and every brace comes
 * out at one fixed width whatever it spans. Fira Math carries 16 horizontal
 * variants plus an assembly for U+23DF, and its Fira Sans skeleton sits beside
 * Alef. Loaded through next/font so the URL is fingerprinted and carries the
 * base path — a hand-written url() in CSS would 404 under a project page.
 */
const firaMath = localFont({
  src: "./fonts/FiraMath-Regular.woff2",
  variable: "--font-firamath",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: site.name, template: `%s — ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${alef.variable} ${plexMono.variable} ${firaMath.variable}`}
      // light only, as designed
      style={{ colorScheme: "light" }}
    >
      <body className="bg-paper font-sans text-[17px]/[1.7] text-ink antialiased [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-[3px] [&_a:focus-visible]:outline-accent [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-[3px] [&_button:focus-visible]:outline-accent">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
