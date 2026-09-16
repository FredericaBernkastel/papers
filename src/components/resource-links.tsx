import Link from "next/link";
import type { Route } from "next";

import { linkIcon, SquareArrowOutUpRight } from "@/components/icons";
import type { Resource } from "@/content/types";
import { linkChip } from "@/lib/styles";

export function ResourceLinks({
  links,
  read,
}: {
  links: readonly Resource[];
  /** when the full text lives on this site, it leads the list */
  read?: Route;
}) {
  if (links.length === 0 && read === undefined) return null;
  const ReadIcon = linkIcon.read;

  return (
    <ul className="flex flex-wrap gap-1.5">
      {read === undefined ? null : (
        <li>
          <Link href={read} className={linkChip()}>
            <ReadIcon size={13} aria-hidden="true" />
            Read
          </Link>
        </li>
      )}

      {links.map((link) => {
        const Icon = linkIcon[link.kind];
        const isExternal = link.href.startsWith("http");
        return (
          <li key={`${link.kind}:${link.href}`}>
            <a
              href={link.href}
              className={linkChip({
                tone: link.kind === "closed" ? "closed" : "default",
              })}
            >
              <Icon size={13} aria-hidden="true" />
              {link.label}
              {isExternal ? (
                <SquareArrowOutUpRight
                  size={11}
                  aria-hidden="true"
                  className="opacity-60"
                />
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
