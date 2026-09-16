import type { ReactNode } from "react";

import type { LucideIcon } from "@/components/icons";

/** Section heading: icon, label, then a hairline running to the right edge. */
export function Rubric({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-3 font-mono text-[11px] leading-none tracking-[0.17em] text-ink-soft uppercase">
      <Icon size={14} aria-hidden="true" className="shrink-0 text-accent" />
      <span>{children}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-rule" />
    </h2>
  );
}
