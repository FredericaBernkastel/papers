import type { Route } from "next";

export interface NavItem {
  /** kept separate from the hash so the href stays a typed Route */
  readonly pathname: Route;
  readonly hash: string;
  readonly label: string;
  readonly icon: "papers" | "work" | "about";
}

export interface ContactItem {
  readonly icon: "email" | "discord" | "repo" | "feed";
  readonly label: string;
  readonly value: string;
  readonly href?: string;
}

export const site = {
  name: "Liserotte W.",
  role: "independent researcher",
  description:
    "Papers and active research: counterpoint as a regular language, space filling as optimization over a compound distance field.",
} as const;

export const nav: readonly NavItem[] = [
  { pathname: "/", hash: "papers", label: "Papers", icon: "papers" },
  { pathname: "/", hash: "work", label: "Active work", icon: "work" },
  { pathname: "/", hash: "about", label: "About", icon: "about" },
];

export const contact: readonly ContactItem[] = [
  {
    icon: "email",
    label: "Email",
    value: "bernkastel.frederica@protonmail.com",
    href: "mailto:bernkastel.frederica@protonmail.com",
  },
  { icon: "discord", label: "Discord", value: "@liserotte" },
  {
    icon: "repo",
    label: "GitHub",
    value: "FredericaBernkastel",
    href: "https://github.com/FredericaBernkastel",
  },
  { icon: "feed", label: "Feed", value: "feed.xml", href: "/feed.xml" },
];

export interface Epigraph {
  /** the three runs set as one continuous paragraph, elision inline between
      the first and second — not as separate stacked paragraphs */
  readonly opening: string;
  readonly middle: string;
  readonly closing: string;
  /** the typed rule that closes the quotation */
  readonly rule: string;
  readonly cite: string;
}

/** Camus, The Myth of Sisyphus. */
export const epigraph: Epigraph = {
  opening:
    "The mind’s first step is to distinguish what is true from what is false. However, as soon as thought reflects on itself, what it first discovers is a contradiction.",
  middle:
    "The cat’s universe is not the universe of the anthill. The truism “All thought is anthropomorphic” has no other meaning. Likewise, the mind that aims to understand reality can consider itself satisfied only by reducing it to terms of thought.",
  closing:
    "If thought were to discover in the infinite mirrors of phenomena eternal relations capable of summing them up and summing themselves up in a single principle, one could speak of an intellectual joy of which the myth of the blessed would be but a ridiculous imitation.",
  rule: "-".repeat(58),
  cite: "— A. Camus, The Myth of Sisyphus",
};
