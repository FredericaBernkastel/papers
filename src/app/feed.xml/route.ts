import { papers } from "@/content/papers";
import { site, siteUrl } from "@/content/site";
import type { FeedCategory, FeedMeta, Paper, WorkItem } from "@/content/types";
import { work } from "@/content/work";

/**
 * The feed, generated from the same content modules the pages render.
 *
 * Atom rather than RSS 2.0: <id> is required and defined as permanent, and it
 * separates <published> from <updated> — which is what makes it possible to
 * publish a work item at all. A project's status moves over time; RSS 2.0 has
 * one date and no honest way to say "this changed". Here, `published` is frozen
 * at first appearance and `updated` answers "has it changed since?", so bumping
 * a status re-surfaces the entry in a reader and a typo fix does not.
 *
 * Rules this file exists to enforce, none of which survive hand-editing XML:
 *
 *   - Entry ids are permanent, and are tag: URIs built from the slug rather
 *     than URLs, so moving to a custom domain does not re-notify every
 *     subscriber that all the old entries are new.
 *   - Work items and open questions share one id namespace (`work/`), not one
 *     per category. A question that grows into a project keeps its identity;
 *     only its <category> changes, which is free.
 *   - Nothing calls Date.now(). A feed stamped at build time republishes its
 *     whole contents on every deploy.
 *   - <updated> on the feed is the newest entry's date, for the same reason.
 */

// Static export supports GET route handlers, but only when marked explicitly.
export const dynamic = "force-static";

/** Frozen: the tag URI authority and date must never change once published. */
const TAG_AUTHORITY = "fredericabernkastel.github.io";
const TAG_DATE = "2026";

interface Entry {
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly category: FeedCategory;
  readonly published: string;
  readonly updated: string;
  readonly abstract: string;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;") // must run first
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function iso(value: string): string {
  return new Date(value).toISOString();
}

/** An entry's own date, defaulting to the day it first appeared. */
function dates(meta: FeedMeta): { published: string; updated: string } {
  return { published: iso(meta.published), updated: iso(meta.updated ?? meta.published) };
}

function paperEntry(paper: Paper): Entry {
  const read = paper.links.find((link) => link.kind === "read");
  return {
    id: `tag:${TAG_AUTHORITY},${TAG_DATE}:paper/${paper.slug}`,
    title: paper.plainTitle,
    // trailingSlash is on, so a page that lives here is at .../slug/
    url:
      paper.article === undefined
        ? (read?.href ?? `${siteUrl}/`)
        : `${siteUrl}${paper.article}/`,
    category: "paper",
    ...dates(paper.feed),
    abstract: paper.feed.abstract,
  };
}

function workEntry(item: WorkItem, meta: FeedMeta): Entry {
  return {
    id: `tag:${TAG_AUTHORITY},${TAG_DATE}:work/${item.id}`,
    title: item.plainName,
    // work rows have no page of their own; item.id is their anchor on the index
    url: `${siteUrl}/#${item.id}`,
    category: item.kind === "questions" ? "note" : "work",
    ...dates(meta),
    abstract: meta.abstract,
  };
}

function render(entry: Entry): string {
  return `  <entry>
    <title>${escapeXml(entry.title)}</title>
    <id>${escapeXml(entry.id)}</id>
    <link rel="alternate" type="text/html" href="${escapeXml(entry.url)}"/>
    <category term="${entry.category}"/>
    <published>${entry.published}</published>
    <updated>${entry.updated}</updated>
    <summary type="text">${escapeXml(entry.abstract)}</summary>
  </entry>`;
}

export function GET(): Response {
  const entries: Entry[] = [
    ...papers.map(paperEntry),
    // a row without `feed` is deliberately withheld
    ...work.flatMap((item) =>
      item.feed === undefined ? [] : [workEntry(item, item.feed)],
    ),
  ].sort((a, b) => Date.parse(b.updated) - Date.parse(a.updated));

  // the newest entry's date — never the build's
  const updated = entries[0]?.updated ?? iso("1970-01-01T00:00:00Z");

  const body = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(site.name)}</title>
  <subtitle>${escapeXml(site.description)}</subtitle>
  <id>tag:${TAG_AUTHORITY},${TAG_DATE}:feed</id>
  <link rel="alternate" type="text/html" href="${escapeXml(`${siteUrl}/`)}"/>
  <link rel="self" type="application/atom+xml" href="${escapeXml(`${siteUrl}/feed.xml`)}"/>
  <updated>${updated}</updated>
  <author><name>${escapeXml(site.name)}</name></author>
${entries.map(render).join("\n")}
</feed>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/atom+xml; charset=utf-8" },
  });
}
