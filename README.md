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

## Conventions

- No `any`, and no `as` assertions. Where a dependency's types are loose
  (mathjax-full declares `convert()` as `any`), take the value as `unknown` and
  narrow it with a real type predicate — see `isMmlNode` in `scripts/gen-math.ts`.
- `typedRoutes` is on: internal `href`s are checked against the route tree, so a
  renamed page breaks the build rather than the site.
- Content lives in `src/content/` as typed modules, not in the components.

## Deploying

`bun run build` emits `./out`. For a project page served from a subpath, build
with `NEXT_PUBLIC_BASE_PATH=/<repo>`; a user or custom-domain site needs nothing.

The design mockup this was built from is kept at `design/mockup.html`.
