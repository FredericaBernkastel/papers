import Link from "next/link";

import { navIcon } from "@/components/icons";
import { MobileNav } from "@/components/mobile-nav";
import { nav, site } from "@/content/site";
import { WRAP } from "@/lib/styles";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-paper/90 backdrop-blur-md">
      <div className={cn(WRAP, "flex items-center justify-between gap-4 py-3.5")}>
        <Link href="/" className="flex min-w-0 items-baseline gap-3 no-underline">
          <span className="text-[19px]/tight font-bold tracking-[-0.005em] whitespace-nowrap text-ink">
            {site.name}
          </span>
          <span className="hidden font-mono text-[11px] tracking-[0.04em] whitespace-nowrap text-ink-soft nav:inline">
            {site.role}
          </span>
        </Link>

        <nav className="hidden gap-1 nav:flex" aria-label="Sections">
          {nav.map((item) => {
            const Icon = navIcon[item.icon];
            return (
              <Link
                key={item.label}
                href={{ pathname: item.pathname, hash: item.hash }}
                className="inline-flex items-center gap-[7px] rounded-sm px-2.5 py-[7px] font-mono text-[11.5px] leading-none tracking-[0.1em] text-ink-mid uppercase no-underline transition-colors hover:bg-paper-2 hover:text-accent"
              >
                <Icon size={14} aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
