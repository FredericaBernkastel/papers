import { kindIcon, Waypoints } from "@/components/icons";
import { Plate } from "@/components/plate";
import { Rail } from "@/components/rail";
import { ResourceLinks } from "@/components/resource-links";
import type { WorkItem } from "@/content/types";
import { BODY, RAIL_GRID } from "@/lib/styles";
import { cn } from "@/lib/utils";

export function WorkRow({ item }: { item: WorkItem }) {
  const KindIcon = kindIcon[item.kind];

  // item.id is this row's permalink: the feed links its entries to #<id>
  return (
    <article
      id={item.id}
      className={cn(RAIL_GRID, "scroll-mt-20 border-t border-rule-soft py-5.5")}
    >
      <Rail status={item.status} kind={item.kind} kindText={item.kindLabel} />

      <div
        className={cn(
          "flex min-w-0 flex-col gap-2.5",
          // the body copy travels with the row, so style it from here
          cn(BODY, "[&_p]:text-[15.5px]/[1.66] [&_p]:text-ink-mid"),
          "[&_code]:rounded-sm [&_code]:bg-paper-2 [&_code]:px-1.5 [&_code]:py-px [&_code]:font-mono [&_code]:text-[0.92em]",
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          {/* an open question is only legible beside the project it came from */}
          {item.from === undefined ? null : (
            <span className="inline-flex items-center gap-1.5 rounded-sm bg-accent/10 px-[7px] py-0.5 font-mono text-[10.5px] leading-[1.5] font-medium tracking-[0.06em] text-accent">
              <Waypoints size={11} aria-hidden="true" />
              {item.from}
            </span>
          )}
          <h3
            className={cn(
              "flex items-center gap-2.5",
              item.mono
                ? "font-mono text-[15.5px]/[1.5] font-medium tracking-[-0.01em] text-ink"
                : "text-[17px]/[1.45] font-bold",
            )}
          >
            <KindIcon
              size={15}
              aria-hidden="true"
              className="shrink-0 text-accent"
            />
            <span>{item.name}</span>
          </h3>
        </div>

        {item.body}

        <ResourceLinks links={item.links} />

        {item.figures.map((figure) => (
          <Plate key={figure.src} figure={figure} />
        ))}
      </div>
    </article>
  );
}
