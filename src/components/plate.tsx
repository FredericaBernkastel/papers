import { Info } from "@/components/icons";
import type { Figure } from "@/content/types";
import { asset } from "@/lib/base-path";
import { cn } from "@/lib/utils";

/**
 * Figures are hand-authored SVGs (and one screenshot) of known intrinsic size,
 * shipped as-is by the static export. next/image would add a loader and a
 * wrapper for work already done, so this uses a plain <img> with explicit
 * dimensions — which is also what reserves the box before the file lands.
 */
export function Plate({ figure }: { figure: Figure }) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      // a bare "/img/..." would 404 under a project page's sub-path
      src={asset(figure.src)}
      width={figure.width}
      height={figure.height}
      alt={figure.alt}
      className={cn(
        "h-auto w-full",
        // a dense journal figure scrolls rather than shrinking past legibility
        figure.dense && "min-w-[660px]",
      )}
    />
  );

  return (
    <figure className="mt-1 flex min-w-0 flex-col gap-2.5">
      <div className="overflow-x-auto border border-rule bg-plate px-3 py-2.5 sm:px-[18px] sm:py-4">
        {figure.source === undefined ? (
          img
        ) : (
          <a href={figure.source} aria-label="Figure source" className="block">
            {img}
          </a>
        )}
      </div>
      <figcaption className="flex gap-2 font-mono text-[10.5px] leading-[1.5] text-ink-soft [&_b]:font-medium [&_b]:text-ink-mid">
        <Info
          size={12}
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-accent-soft"
        />
        <span>{figure.caption}</span>
      </figcaption>
    </figure>
  );
}
