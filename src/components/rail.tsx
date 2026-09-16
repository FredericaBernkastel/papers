import {
  Calendar,
  kindIcon,
  kindLabel,
  statusIcon,
  statusLabel,
  statusTone,
} from "@/components/icons";
import type { Kind, Status } from "@/content/types";
import { MICRO, railItem } from "@/lib/styles";
import { cn } from "@/lib/utils";

/**
 * The left rail: how far along, when, and what kind — three facts the reader
 * takes from glyphs before reading a word. Below `rail` it lies down into a
 * chip row above the content.
 */
export function Rail({
  status,
  kind,
  kindText,
  year,
}: {
  status: Status;
  kind: Kind;
  kindText?: string;
  year?: string;
}) {
  const StatusIcon = statusIcon[status];
  const KindIcon = kindIcon[kind];

  return (
    <div
      className={cn(
        MICRO,
        "flex flex-row flex-wrap items-center gap-x-3.5 gap-y-1.5 text-ink-soft",
        "rail:flex-col rail:items-start rail:gap-1.5 rail:pt-1.5",
      )}
    >
      <span className={railItem({ tone: statusTone[status] })}>
        <StatusIcon size={13} aria-hidden="true" className="shrink-0" />
        {statusLabel[status]}
      </span>

      {year === undefined ? null : (
        <span className={railItem()}>
          <Calendar size={13} aria-hidden="true" className="shrink-0" />
          {year}
        </span>
      )}

      <span className={railItem()}>
        <KindIcon size={13} aria-hidden="true" className="shrink-0" />
        {kindText ?? kindLabel[kind]}
      </span>
    </div>
  );
}
