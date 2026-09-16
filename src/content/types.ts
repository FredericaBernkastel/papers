import type { Route } from "next";
import type { ReactNode } from "react";
import type { MathKey } from "@/content/math";

/** Lifecycle of a paper or a piece of work. Drives the rail icon and its tone. */
export type Status = "draft" | "done" | "active" | "planned" | "open";

/** What the thing *is*, as opposed to how far along it is. */
export type Kind =
  | "whitepaper"
  | "report"
  | "library"
  | "binary"
  | "questions";

/** What a link leads to. Chooses the icon, so it has to be about the target. */
export type LinkKind = "read" | "repo" | "docs" | "video" | "closed";

export interface Resource {
  readonly kind: LinkKind;
  readonly label: string;
  /** absolute URL or mailto: — internal navigation uses `article` instead */
  readonly href: string;
}

/** What an entry is, for the feed's <category>. Free to change over time. */
export type FeedCategory = "paper" | "work" | "note";

/**
 * What it takes to publish something to the feed.
 *
 * `published` is frozen at first appearance and never touched again. `updated`
 * is the separate, honest answer to "has this changed since?" — bumping it
 * re-surfaces the entry in a reader, which is exactly what a work item whose
 * status moved should do, and what a typo fix should not.
 */
export interface FeedMeta {
  /** ISO 8601, frozen at first publication */
  readonly published: string;
  /** ISO 8601; defaults to `published`. Bump only for a real change. */
  readonly updated?: string;
  /**
   * Plain-text summary. Deliberately separate from the page copy: a feed entry
   * is read in someone else's reader, with no surrounding page to lean on, so
   * it has to name its own context.
   */
  readonly abstract: string;
}

export interface Figure {
  /** rooted in public/; `asset()` adds the deployment's base path */
  readonly src: `/${string}`;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  /** a dense journal figure scrolls rather than shrinking below legibility */
  readonly dense: boolean;
  readonly caption: ReactNode;
  /** links the plate through to the figure's source file */
  readonly source?: string;
}

export interface Paper {
  readonly slug: string;
  readonly title: ReactNode;
  /** plain-text form, for <title> and metadata */
  readonly plainTitle: string;
  readonly status: Status;
  readonly year: string;
  readonly kind: Kind;
  readonly feed: FeedMeta;
  readonly formula?: MathKey;
  readonly summary?: ReactNode;
  readonly terms: readonly string[];
  readonly links: readonly Resource[];
  /** present when the full text lives on this site */
  readonly article?: Route;
  readonly figures: readonly Figure[];
}

export interface WorkItem {
  /** stable: it is the page anchor and the feed id, so never rename it */
  readonly id: string;
  /** a package name renders in mono; a question renders as a sentence */
  readonly name: ReactNode;
  /** the same name as plain text, for the feed */
  readonly plainName: string;
  readonly mono: boolean;
  /** present when this row is published to the feed; omit to withhold it */
  readonly feed?: FeedMeta;
  readonly status: Status;
  readonly kind: Kind;
  readonly kindLabel: string;
  /** the project a stray open question belongs to */
  readonly from?: string;
  readonly body: ReactNode;
  readonly links: readonly Resource[];
  readonly figures: readonly Figure[];
}
