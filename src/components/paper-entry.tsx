import Link from "next/link";

import { MathBlock } from "@/components/math";
import { Plate } from "@/components/plate";
import { Rail } from "@/components/rail";
import { ResourceLinks } from "@/components/resource-links";
import { Terms } from "@/components/terms";
import type { Paper } from "@/content/types";
import { BODY, RAIL_GRID } from "@/lib/styles";
import { cn } from "@/lib/utils";

const TITLE_LINK =
  "underline decoration-accent-soft decoration-1 underline-offset-[5px] transition-colors hover:text-accent hover:decoration-accent";

export function PaperEntry({ paper }: { paper: Paper }) {
  // the title leads where the paper actually is: this site if it lives here,
  // otherwise wherever the "read" link points
  const offsite = paper.links.find((link) => link.kind === "read");

  return (
    <article className={RAIL_GRID}>
      <Rail status={paper.status} kind={paper.kind} year={paper.year} />

      <div className="flex min-w-0 flex-col gap-4">
        <h3 className="text-[clamp(21px,3.2vw,27px)]/[1.3] font-bold tracking-[-0.014em] text-balance">
          {paper.article === undefined ? (
            offsite === undefined ? (
              paper.title
            ) : (
              <a href={offsite.href} className={TITLE_LINK}>
                {paper.title}
              </a>
            )
          ) : (
            <Link href={paper.article} className={TITLE_LINK}>
              {paper.title}
            </Link>
          )}
        </h3>

        {paper.formula === undefined ? null : (
          <MathBlock k={paper.formula} className="text-[0.85em]" />
        )}

        {paper.summary === undefined ? null : (
          <p className={cn(BODY, "text-[16.5px]/[1.62] text-ink-mid")}>
            {paper.summary}
          </p>
        )}

        <Terms terms={paper.terms} />

        {paper.article === undefined ? (
          <ResourceLinks links={paper.links} />
        ) : (
          <ResourceLinks links={paper.links} read={paper.article} />
        )}

        {paper.figures.map((figure) => (
          <Plate key={figure.src} figure={figure} />
        ))}
      </div>
    </article>
  );
}
