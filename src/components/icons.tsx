/**
 * One registry for every icon on the site.
 *
 * Icons here are ideographic, not decorative: each one stands for a fact the
 * reader would otherwise have to read a word to learn — how far along a thing
 * is, what kind of artifact it is, where a link goes. Keeping the mapping in a
 * single typed record means a new Status or LinkKind cannot be added without
 * choosing its glyph.
 */
import {
  AppWindow,
  ArrowLeft,
  AtSign,
  BookMarked,
  BookOpen,
  Calendar,
  Circle,
  CircleCheck,
  CircleDot,
  CircleHelp,
  FileText,
  GitBranch,
  Hammer,
  Info,
  Library,
  Lock,
  Mail,
  Menu,
  MessageSquare,
  PenLine,
  Quote,
  Rss,
  ScrollText,
  SquareArrowOutUpRight,
  Tag,
  Video,
  Waypoints,
  X,
  type LucideIcon,
} from "lucide-react";

import type { Kind, LinkKind, Status } from "@/content/types";
import type { ContactItem, NavItem } from "@/content/site";

export type Tone = "accent" | "soft";

export const statusIcon: Readonly<Record<Status, LucideIcon>> = {
  draft: PenLine,
  done: CircleCheck,
  active: CircleDot,
  planned: Circle,
  open: CircleHelp,
};

/** Shipped or under way reads in the accent; not-yet and unresolved stay quiet. */
export const statusTone: Readonly<Record<Status, Tone>> = {
  draft: "soft",
  done: "accent",
  active: "accent",
  planned: "soft",
  open: "soft",
};

export const statusLabel: Readonly<Record<Status, string>> = {
  draft: "Draft",
  done: "Done",
  active: "Active",
  planned: "Planned",
  open: "Open",
};

export const kindIcon: Readonly<Record<Kind, LucideIcon>> = {
  whitepaper: ScrollText,
  report: FileText,
  library: Library,
  binary: AppWindow,
  questions: CircleHelp,
};

export const kindLabel: Readonly<Record<Kind, string>> = {
  whitepaper: "Whitepaper",
  report: "Report",
  library: "Rust library",
  binary: "Rust binary",
  questions: "Questions",
};

export const linkIcon: Readonly<Record<LinkKind, LucideIcon>> = {
  read: BookOpen,
  repo: GitBranch,
  docs: BookMarked,
  video: Video,
  closed: Lock,
};

export const navIcon: Readonly<Record<NavItem["icon"], LucideIcon>> = {
  papers: ScrollText,
  work: Hammer,
  about: AtSign,
};

export const contactIcon: Readonly<Record<ContactItem["icon"], LucideIcon>> = {
  email: Mail,
  discord: MessageSquare,
  repo: GitBranch,
  feed: Rss,
};

export {
  ArrowLeft,
  Calendar,
  Info,
  Menu,
  Quote,
  SquareArrowOutUpRight,
  Tag,
  Waypoints,
  X,
};
export type { LucideIcon };
