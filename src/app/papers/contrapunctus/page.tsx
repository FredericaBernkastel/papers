import type { Metadata } from "next";
import Link from "next/link";
import {
  CircleCheck,
  Grid2x2,
  Microscope,
  Network,
  Sigma,
  Waypoints,
  X,
} from "lucide-react";

import {
  ArrowLeft,
  Calendar,
  Info,
  kindIcon,
  Quote,
  SquareArrowOutUpRight,
  statusIcon,
} from "@/components/icons";
import { MathBlock } from "@/components/math";
import { BODY, MEASURE, RAIL_GRID, WRAP } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contrapunctus",
  description:
    "Fugue on the lattice: 73 states, a clique, and what Bach says about the rulebook.",
};

const REPO = "https://github.com/FredericaBernkastel/contrapunctus-whitepaper";

const P = cn(BODY, MEASURE, "mb-[1.15em] text-[16px]/[1.6]");
const H2 = cn(
  MEASURE,
  "mt-[2em] mb-[0.7em] flex items-center gap-2.5 text-[clamp(18px,2.6vw,21px)]/[1.36] font-bold tracking-[-0.012em]",
  "[&>svg]:shrink-0 [&>svg]:text-accent",
);
const TH =
  "border-b border-rule pr-5 pb-2.5 text-left font-medium text-[10.5px] tracking-[0.1em] uppercase text-ink-soft";
const TD = "border-b border-rule-soft py-2.5 pr-5 text-ink-mid";

interface RuleRow {
  readonly rule: string;
  readonly tier: 2 | 3 | 5;
  readonly renaissance: { readonly text: string; readonly holds: boolean };
  readonly bach: { readonly text: string; readonly holds: boolean };
}

const rules: readonly RuleRow[] = [
  {
    rule: "Parallel perfect consonances",
    tier: 2,
    renaissance: { text: "holds", holds: true },
    bach: { text: "holds", holds: true },
  },
  {
    rule: "Direct motion to a perfect, on a downbeat",
    tier: 2,
    renaissance: { text: "holds", holds: true },
    bach: { text: "holds", holds: true },
  },
  {
    rule: "Melodic prohibition",
    tier: 3,
    renaissance: { text: "holds", holds: true },
    bach: { text: "×38", holds: false },
  },
  {
    rule: "Suspension resolution",
    tier: 5,
    renaissance: { text: "fails", holds: false },
    bach: { text: "fails", holds: false },
  },
  {
    rule: "Passing-note departure",
    tier: 5,
    renaissance: { text: "fails", holds: false },
    bach: { text: "fails", holds: false },
  },
];

function Verdict({ text, holds }: { text: string; holds: boolean }) {
  const Icon = holds ? CircleCheck : X;
  return (
    <span
      className={cn(
        "inline-flex items-center justify-end gap-1.5",
        holds ? "text-accent" : "text-closed",
      )}
    >
      <Icon size={12} aria-hidden="true" />
      {text}
    </span>
  );
}

export default function ContrapunctusPage() {
  const DraftIcon = statusIcon.draft;
  const PaperIcon = kindIcon.whitepaper;

  return (
    <main>
      <div className={cn(WRAP, "pt-9 pb-20 sm:pt-13")}>
        <div className={RAIL_GRID}>
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-[7px] font-mono text-[11.5px] leading-none font-medium tracking-[0.09em] text-ink-soft uppercase no-underline transition-colors hover:text-accent rail:pt-2"
            >
              <ArrowLeft size={13} aria-hidden="true" />
              Index
            </Link>
          </div>

          <article className="min-w-0">
            <h1
              className={cn(
                MEASURE,
                "mb-2.5 text-[clamp(26px,5vw,37px)]/[1.2] font-bold tracking-[-0.022em] text-balance",
              )}
            >
              Contrapunctus: Counterpoint is a regular language
            </h1>
            <p
              className={cn(
                MEASURE,
                "mb-5 text-[clamp(15px,2.4vw,18px)]/[1.5] text-ink-mid",
              )}
            >
              Fugue on the lattice: 73 states, a clique, and what Bach says about
              the rulebook.
            </p>

            <div
              className={cn(
                MEASURE,
                "flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-rule pb-5 font-mono text-[11.5px]/[1.6] tracking-[0.05em] text-ink-soft",
                "[&>*]:inline-flex [&>*]:items-center [&>*]:gap-1.5",
              )}
            >
              <span>
                <PaperIcon size={13} aria-hidden="true" />
                Whitepaper
              </span>
              <span>
                <Calendar size={13} aria-hidden="true" />
                2026
              </span>
              <span>
                <DraftIcon size={13} aria-hidden="true" />
                Draft
              </span>
              <a
                href={REPO}
                className="border-b border-rule text-ink-mid no-underline transition-colors hover:border-accent hover:text-accent"
              >
                Repository
                <SquareArrowOutUpRight
                  size={11}
                  aria-hidden="true"
                  className="opacity-60"
                />
              </a>
            </div>

            <p className={cn(P, "mt-6 text-ink-mid")}>
              Machine composition of fugue is usually attempted in one of two
              categories: fitting a model to a corpus, or searching a continuous
              relaxation of the score. Both are the wrong category. Fugue is a
              word problem over a finite alphabet under constraints of bounded
              memory, so the natural instruments are automata, dynamic
              programming and exact combinatorial search &mdash; none of which
              require training data, and all of which return proofs instead of
              samples.
            </p>

            <h2 className={H2}>
              <Microscope size={18} aria-hidden="true" />
              The argument opens as a post-mortem
            </h2>
            <p className={P}>
              An earlier attempt, <em>ricercar</em>, modelled counterpoint as a
              Lipschitz-certifiable roughness field over a continuum of entry
              placements. Its own measurements refute it. The legal region proved
              piecewise constant at the note grid, and rounding a certified
              placement onto the semitone grid costs about ten times the margin
              the certificate establishes &mdash; so the proof was taken over the
              wrong set. Everything expensive in that approach existed to bound a
              function whose answer is constant on a lattice.
            </p>

            <h2 className={H2}>
              <Network size={18} aria-hidden="true" />
              The state is the interval plus what you owe
            </h2>
            <p className={P}>
              A slice presents each pair of voices with a letter drawn from an
              alphabet of 4800. The state carries the vertical interval together
              with eight obligation bits &mdash; resolve a suspension in either
              voice, recover a leap up or down in either voice, leave a passing
              note in either voice:
            </p>

            <MathBlock k="obligationState" className="my-[1.5em]" />

            <p className={P}>
              Only 73 of those are reachable, and once an obligation dies with
              the dissonance that incurred it, the count is derivable rather than
              merely enumerable. Nine because each voice owes up, down, or
              nothing; five because a dissonance owes at most one of{" "}
              <em>suspension resolves below</em>, <em>above</em>,{" "}
              <em>passing note leaves below</em>, <em>above</em>, or nothing.
              Forty-five of the 256 obligation sets occur at all.
            </p>

            <MathBlock k="reachableStates" className="my-[1.5em]" />

            <p className={P}>
              Finiteness is not an approximation. Strict counterpoint requires
              debts settled on the next event, so no state carries history beyond
              one slice. The automaton distinguishes a prepared suspension from
              the same interval struck on the same beat &mdash; a distinction a
              field over instantaneous pitch is structurally unable to draw, and
              the device most of the repertoire worth imitating is built from.
            </p>

            <h2 className={H2}>
              <Waypoints size={18} aria-hidden="true" />
              Stretto is a clique
            </h2>
            <p className={P}>
              Densest stretto is not a search over the score but a question about
              the subject alone. Put a vertex at every placement on the shift
              group and an edge where the pair admits a legal fill; the densest
              stretto is then a maximum clique in a Cayley graph on that group,
              exactly computable &mdash; where the continuous formulation of the
              same question was abandoned at thirty minutes without a single
              placement.
            </p>

            <MathBlock k="capacity" className="my-[1.5em]" />

            <div className="my-[2em]">
              {/*<Plate figure={strettoFigureForArticle} />*/}
            </div>

            <p className={P}>
              Run as a checker over two corpora, the automaton stratifies its own
              five hard rules into a chain of tiers. Parallel perfect consonances
              and direct motion to a perfect consonance on a downbeat hold in
              both centuries at about one violation per thousand slices. The
              melodic prohibition holds in Renaissance vocal writing and fails in
              Bach by a factor of thirty-eight, making it repertoire-specific but
              not wrong. The two dissonance rules fail in the very repertoire
              they were written for.
            </p>

            <div className="my-[1.5em] overflow-x-auto">
              <table className="w-full border-collapse font-mono text-[12.6px]/[1.5] whitespace-nowrap tabular-nums">
                <thead>
                  <tr>
                    <th className={TH}>Hard rule</th>
                    <th className={TH}>Tier</th>
                    <th className={cn(TH, "pr-0 text-right")}>Renaissance</th>
                    <th className={cn(TH, "pr-0 text-right")}>Bach, WTC I</th>
                  </tr>
                </thead>
                <tbody>
                  {rules.map((row) => (
                    <tr key={row.rule}>
                      <td className={cn(TD, "whitespace-normal text-ink")}>
                        {row.rule}
                      </td>
                      <td className={TD}>
                        &#964;<sub>{row.tier}</sub>
                      </td>
                      <td className={cn(TD, "pr-0 text-right")}>
                        <Verdict {...row.renaissance} />
                      </td>
                      <td className={cn(TD, "pr-0 text-right")}>
                        <Verdict {...row.bach} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className={P}>
              The clique test selects that same two-rule tier a second time by an
              independent route. Under the full five-rule tier Bach&rsquo;s
              hyperstretto is not a clique; under the two-rule tier it is. Two
              tests converge on the same two rules &mdash; one counting rule
              frequencies across two centuries, the other asking whether a single
              passage is mutually compatible. Neither was designed to check the
              other, which makes the agreement the strongest result here.
            </p>

            <h2 className={H2}>
              <Sigma size={18} aria-hidden="true" />
              The characteristic difficulty inverts the usual one
            </h2>

            <blockquote
              className={cn(MEASURE, "my-[2em] flex gap-4 border-l-2 border-accent pl-5")}
            >
              <Quote
                size={18}
                aria-hidden="true"
                className="mt-1.5 shrink-0 text-accent-soft"
              />
              <p className="text-[clamp(17px,2.6vw,19.5px)]/[1.55] text-balance">
                A complete search fails not by finding nothing but by finding far
                too much.
              </p>
            </blockquote>

            <p className={P}>
              Holding one of Bach&rsquo;s subject entries fixed and filling the
              remainder exactly, the rulebook leaves seven to seventeen pitches
              open at every note, and between 10<sup>12</sup> and 10
              <sup>18</sup> complete legal fills of a three-bar span. Across
              every combination of rulebook and plan, agreement with what Bach
              wrote barely moves while the chance baseline nearly triples: the
              constraints do all of the work and the objective almost none.
            </p>

            <p className={P}>
              Two controls establish this. Reversing the sign of the objective
              scores 4.9% against minimising&rsquo;s 7.8%, so the soft criteria
              are not noise and do point the right way. Drawing from the legal
              set uniformly instead of optimising over it at all scores 6.9%, and
              paired per span that difference is not significant. Using the soft
              tier is therefore no better than ignoring it, and the draw is the
              endorsed mechanism &mdash; realised exactly by counting paths
              through the DAG once and then walking it backwards.
            </p>

            <pre className="my-[1.5em] overflow-x-auto border border-rule bg-plate px-5 py-4.5 font-mono text-[12.8px]/[1.72] text-ink">
              <code>
                <span className="text-ink-soft">
                  {
                    "// the legal set is a fold over the DAG, not an estimate:\n//     c(x) = 1 if x is a sink, else sum of c(y) over x -> y\n"
                  }
                </span>
                <span className="text-accent">{"pub fn"}</span>
                {" draw(dag: &Dag, c: &[u128], rng: &"}
                <span className="text-accent">{"mut impl"}</span>
                {" Rng) -> Path {\n    "}
                <span className="text-accent">{"let mut"}</span>
                {" x = dag.source_by_weight(c, rng);\n    "}
                <span className="text-accent">{"let mut"}</span>
                {" path = Path::from(x);\n\n    "}
                <span className="text-accent">{"while let"}</span>
                {" Some(succ) = dag.successors(x) {\n        "}
                <span className="text-ink-soft">
                  {"// Pr[y | x] = c(y) / c(x) — exactly uniform over L(Pi)"}
                </span>
                {"\n        x = succ.choose_weighted(rng, |&y| c[y]).expect("}
                <span className="text-accent">{'"live layer"'}</span>
                {");\n        path.push(x);\n    }\n\n    path\n}"}
              </code>
            </pre>

            <p className={P}>
              The draw must be asked for rather than reached by setting the
              weights to zero: to a shortest path a zero objective means every
              path ties and the first found wins, which is a degenerate line and
              not a sample. Where taste enters is the central problem, not an
              afterthought &mdash; and this document takes the Pareto front over
              the soft criteria in place of a weighted sum, on the ground that no
              weighting in the literature is defensible and Fux supplies none.
            </p>

            <h2 className={H2}>
              <Grid2x2 size={18} aria-hidden="true" />
              Space filling, in the right category
            </h2>
            <p className={P}>
              The space-filling work and this one share a search, not a subject.
              There, admissibility is a signed distance and the greedy step is
              farthest-point insertion; here, admissibility is an automaton
              transition and the greedy step is the next slice. Both are cheap
              only when the admissible region can be <em>queried</em> faster than
              it can be sampled, which is the whole engineering problem in each
              case.
            </p>

            <p
              className={cn(
                MEASURE,
                "mt-[2.6em] flex gap-2.5 border-t border-rule pt-4 text-[13.5px]/[1.72] text-ink-mid",
              )}
            >
              <Info
                size={14}
                aria-hidden="true"
                className="mt-1 shrink-0 text-ink-soft"
              />
              <span>
                Draft. This page condenses the whitepaper&rsquo;s abstract and
                formalization; every figure, formula and measured number is taken
                from it. The full argument, the corpus harness and the changelog
                of the four claims it replaced are in the repository.
              </span>
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
