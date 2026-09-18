import { TODO_DATE } from "@/content/feed-dates";
import type { Figure, Paper } from "@/content/types";

const SPACE_FILLING = "https://github.com/FredericaBernkastel/space-filling";
const INFINITE_DIMENSIONS = `${SPACE_FILLING}/blob/master/doc/publications/infinite_dimensions/readme.md`;
const FIGURES = `${SPACE_FILLING}/blob/master/doc/publications/infinite_dimensions/figures`;

// annotated so `src` keeps its `/${string}` type instead of widening to string
const contrapunctusMap: Omit<Figure, "caption"> = {
  src: "/img/contrapunctus-algorithm-map.svg",
  width: 3840,
  height: 2712,
  dense: true,
  alt: "",
};

export const papers: readonly Paper[] = [
  {
    slug: "contrapunctus",
    title: <>Contrapunctus: Counterpoint is a regular language</>,
    plainTitle: "Contrapunctus: Counterpoint is a regular language",
    status: "draft",
    year: "2026",
    kind: "whitepaper",
    feed: {
      published: TODO_DATE,
      abstract:
        "Fugue as a word problem over a finite alphabet under constraints of " +
        "bounded memory: a 73-state obligation automaton, voices filled by " +
        "shortest path through a layered DAG, and densest stretto as a maximum " +
        "clique in a Cayley graph. No training data, and proofs instead of samples.",
    },
    formula: "fugueSentence",
    //article: "/papers/contrapunctus",
    summary: (
      <>
        Machine composition of fugue is usually attempted in one of two
        categories: fitting a model to a corpus, or searching a continuous
        relaxation of the score. I argue that both are the wrong category. Fugue
        is a <b>word problem over a finite alphabet under constraints of bounded
        memory</b>, so the natural instruments are automata, dynamic programming
        and exact combinatorial search &mdash; none of which need training data,
        and all of which return proofs instead of samples. <b>Counterpoint</b> is
        a finite automaton whose state is the interval together with its
        outstanding obligations.
      </>
    ),
    terms: [
      "finite automata",
      "maximum clique",
      "Cayley graph",
      "layered DAG",
      "formal grammars",
      "counterpoint",
    ],
    links: [
      {
        kind: "read",
        label: "Read",
        href: "https://github.com/FredericaBernkastel/contrapunctus-whitepaper",
      },
    ],
    figures: [
      {
        ...contrapunctusMap,
        caption: (
          <>
            <b>Figure 1.</b> From a subject to complete fugue.
          </>
        ),
      },
    ],
  },

  {
    slug: "infinite-dimensions",
    title: (
      <>
        Beyond &#8477;<sup>N</sup>: space filling in infinite-dimensional
        function spaces
      </>
    ),
    plainTitle:
      "Beyond R^N: space filling in infinite-dimensional function spaces",
    status: "draft",
    year: "2026",
    kind: "report",
    feed: {
      published: TODO_DATE,
      abstract:
        "What survives when the domain stops being finite-dimensional. Exact " +
        "global optimization does not, and fails for an information-theoretic " +
        "reason no engineering repairs; greedy insertion keeps its dimension-free " +
        "2-approximation. Weighted coordinates trade cost exponential in N for " +
        "cost polynomial in 1/ε.",
    },
    terms: [
      "signed distance fields",
      "Lipschitz branch-and-bound",
      "covering numbers",
      "Frank–Wolfe",
      "greedy maximin",
    ],
    links: [
      { kind: "read", label: "Read", href: INFINITE_DIMENSIONS },
      { kind: "repo", label: "Repository", href: SPACE_FILLING },
    ],
    figures: [
      {
        src: "/img/fig1-readings.svg",
        width: 1480,
        height: 940,
        dense: true,
        source: `${FIGURES}/fig1-readings.svg`,
        alt:
          'Figure 1. Four readings of "infinite-dimensional": A the domain ' +
          "becomes a Hilbert ball or weighted ellipsoid; B each primitive's " +
          "boundary becomes a function; C the field itself becomes the variable, " +
          "ranging over a lattice of 1-Lipschitz functions; D the field is drawn " +
          "from a parametric family with a certified Lipschitz bound. A " +
          "comparison table gives, for each, what is varied, where it lives, the " +
          "form the gradient takes, whether the Lipschitz certificate survives, " +
          "and what drives the cost.",
        caption: (
          <>
            <b>Figure 2.</b> Four readings of &ldquo;infinite-dimensional&rdquo;:{" "}
            <b>A</b> the domain becomes a Hilbert ball or weighted ellipsoid;{" "}
            <b>B</b> each primitive&rsquo;s boundary becomes a function; <b>C</b>{" "}
            the field itself becomes the variable; <b>D</b> the field is drawn
            from a parametric family with a certified Lipschitz bound. The table
            gives, for each, what is varied, where it lives, the form the
            gradient takes, whether the certificate survives, and what drives the
            cost.
          </>
        ),
      },
      {
        src: "/img/fig4-survival.svg",
        width: 1480,
        height: 760,
        dense: true,
        source: `${FIGURES}/fig4-survival.svg`,
        alt:
          "Figure 4. The asymmetry at the centre of the report. (a) " +
          "Farthest-first traversal, illustrated by five greedy insertions and " +
          "their clearance balls, is a 2-approximation to k-center in any metric " +
          "space, so the quality of the strategy is indifferent to dimension. (b) " +
          "The pruning test must reach boxes of half-diagonal below delta over " +
          "the summed Lipschitz constants, and the number of such boxes is " +
          "exponential in N and infinite when the unit ball is non-compact; the " +
          "test then remains sound but proves nothing below the root box. (c) On " +
          "a compact weighted ellipsoid the entropy is polynomial in one over " +
          "epsilon with the exponent set by the smoothness of the weight decay, " +
          "so the ambient dimension leaves the exponent entirely.",
        caption: (
          <>
            <b>Figure 3.</b> The asymmetry at the centre of the report. (a)
            Farthest-first traversal is a 2-approximation to k-center in any
            metric space, so the quality of the strategy is indifferent to
            dimension. (b) The pruning test must reach boxes whose half-diagonal
            falls below &#948; over the summed Lipschitz constants; the number of
            such boxes is exponential in <i>N</i> and infinite when the unit ball
            is non-compact, so the test stays sound but proves nothing below the
            root box. (c) On a compact weighted ellipsoid the entropy is
            polynomial in 1/&#949;, and the ambient dimension leaves the exponent
            entirely.
          </>
        ),
      },
    ],
  },
];
