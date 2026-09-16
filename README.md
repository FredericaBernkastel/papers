# papers

Personal research site — papers and active work. Static site, deployed to GitHub
Pages.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router), output `export` |
| Runtime | [Bun](https://bun.com) |
| Language | TypeScript, `strict` plus `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `verbatimModuleSyntax` |
| Styling | Tailwind CSS 4 — tokens in `src/app/globals.css`, everything else a utility class |
| Components | shadcn/ui conventions over [Base UI](https://base-ui.com) primitives |
| Icons | lucide-react |
| Math | MathJax at build time, MathML in the output |

## Commands

```bash
bun install
bun run dev        # gen:math, then next dev
bun run build      # gen:math, then static export to ./out
bun run preview    # serve ./out
bun run check      # gen:math + typecheck + lint
```

## Math

The TeX in `src/content/math.ts` is verbatim from the papers.
`scripts/gen-math.ts` converts it to MathML once, at build time, and writes
`src/generated/math.ts`; the pages embed that markup directly.

This is what github.com does for ` ```math ` blocks: MathJax is used only as a
TeX→MathML converter, and the browser's own math engine and math font do the
typesetting — which is why it reads as real TeX rather than as glyphs assembled
into HTML boxes. Doing the conversion at build time rather than in the browser
means no MathJax ships to the client and there is no flash of raw LaTeX.

Native MathML needs an OpenType MATH font, or a stretchy `\underbrace` has no
horizontal size variants to grow into and every brace renders at one fixed
width. [Fira Math](https://github.com/firamath/firamath) supplies them and is
self-hosted from `public/fonts/`.

## Feed

`/feed.xml` is an Atom feed, generated at build time by
`src/app/feed.xml/route.ts` from the same `src/content/papers.tsx` the pages
render. **Never hand-edit the XML** — add a paper to the content module and the
feed follows.

Three categories are published, tagged with Atom `<category>`: `paper`, `work`
(a project) and `note` (an open question).

Two fields are load-bearing and effectively permanent once published:

- **`published`** — the real publication date, frozen at first appearance.
  Nothing in the generator calls `Date.now()`: a feed stamped at build time
  republishes its entire contents to every subscriber on every deploy.
- **the entry `<id>`** — a `tag:` URI built from the slug, not a URL, so moving
  to a custom domain doesn't re-notify everyone that all the old entries are
  new. Never reuse or change one.

**`updated` is the separate, honest answer to "has this changed?"** It defaults
to `published`. Bump it when a project's status moves or a question is revised,
and readers re-surface the entry; leave it alone for a typo fix. This is why the
feed is Atom and not RSS 2.0 — RSS has one date and no way to say this.

Work items and open questions share one id namespace (`work/`), not one per
category, so a question that grows into a project keeps its identity and only
its `<category>` changes. They have no page of their own, so each entry links to
`#<id>` on the index — which is why `WorkItem.id` is the row's anchor and must
never be renamed.

To publish: give the entry a `feed: { published, abstract }`. On a `Paper` it is
required; on a `WorkItem` it is optional, and **omitting it withholds the row
from the feed**. Write the `abstract` for a reader — it is read with no
surrounding page, so it has to name its own context.

## Conventions

- No `any`, and no `as` assertions. Where a dependency's types are loose
  (mathjax-full declares `convert()` as `any`), take the value as `unknown` and
  narrow it with a real type predicate — see `isMmlNode` in `scripts/gen-math.ts`.
- `typedRoutes` is on: internal `href`s are checked against the route tree, so a
  renamed page breaks the build rather than the site.
- Content lives in `src/content/` as typed modules, not in the components.

## Deploying

`.github/workflows/deploy.yml` publishes to GitHub Pages on every push to
`master`, running the same `bun run check` gate before it builds. Enable it once
under **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The sub-path is not hard-coded: `actions/configure-pages` reports it
(`/papers` for this repo, `/` for a user or custom-domain site) and the workflow
passes it as `NEXT_PUBLIC_BASE_PATH`.

`next/link` applies `basePath` on its own, but nothing else does — per the
`basePath` docs, even `next/image` needs the prefix added to `src`. So every
hand-written path into `public/` goes through `asset()` or `resolveHref()` from
`src/lib/base-path.ts`, and the Fira Math file is loaded with `next/font/local`
rather than a `url()` in CSS, so Next fingerprints it and prefixes it.

To reproduce a sub-path build locally:

```bash
NEXT_PUBLIC_BASE_PATH=/papers bun run build
```

On Git Bash prefix that with `MSYS_NO_PATHCONV=1`, or MSYS rewrites `/papers`
into `C:/Program Files/Git/papers` on its way to `bun.exe` and the build dies on
the colon.

The design mockup this was built from is kept at `design/mockup.html`.
