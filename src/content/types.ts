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

export interface Figure {
  readonly src: string;
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
  readonly formula?: MathKey;
  readonly summary?: ReactNode;
  readonly terms: readonly string[];
  readonly links: readonly Resource[];
  /** present when the full text lives on this site */
  readonly article?: Route;
  readonly figures: readonly Figure[];
}

export interface WorkItem {
  readonly id: string;
  /** a package name renders in mono; a question renders as a sentence */
  readonly name: ReactNode;
  readonly mono: boolean;
  readonly status: Status;
  readonly kind: Kind;
  readonly kindLabel: string;
  /** the project a stray open question belongs to */
  readonly from?: string;
  readonly body: ReactNode;
  readonly links: readonly Resource[];
  readonly figures: readonly Figure[];
}
