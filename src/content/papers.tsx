import type { Paper } from "@/content/types";

const SPACE_FILLING = "https://github.com/FredericaBernkastel/space-filling";
const INFINITE_DIMENSIONS = `${SPACE_FILLING}/blob/master/doc/publications/infinite_dimensions/readme.md`;
const FIGURES = `${SPACE_FILLING}/blob/master/doc/publications/infinite_dimensions/figures`;

const strettoFigure = {
  src: "/img/contrapunctus-stretto.svg",
  width: 1480,
  height: 545,
  dense: true,
  alt:
    "Panel a: five statements of the BWV 867 subject on five voice lanes, " +
    "entering at offsets 0, 2, 4, 6 and 8 quarters. Panel b: the same five " +
    "placements as vertices of a graph; under the five-rule tier two of the ten " +
    "pairs are inadmissible so the set is not a clique, and under the two-rule " +
    "tier every pair is legal so it is.",
};

export const papers: readonly Paper[] = [
  {
    slug: "contrapunctus",
    title: <>Contrapunctus: Counterpoint is a regular language</>,
    plainTitle: "Contrapunctus: Counterpoint is a regular language",
    status: "draft",
    year: "2026",
    kind: "whitepaper",
    formula: "fugueSentence",
    article: "/papers/contrapunctus",
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
        kind: "repo",
        label: "Repository",
        href: "https://github.com/FredericaBernkastel/contrapunctus-whitepaper",
      },
    ],
    figures: [
      {
        ...strettoFigure,
        caption: (
          <>
            <b>Figure 1.</b> The five-voice hyperstretto of BWV 867 and the
            rulebook tier that admits it. (a) Five statements of the subject at
            offsets <b>{"{0, 2, 4, 6, 8}"}</b> quarters &mdash; an arithmetic
            progression, and a clique in a Cayley graph on the shift group,
            emphatically not a Sidon set. (b) Under the full five-rule tier two
            of the ten pairs are inadmissible and the passage is not a clique;
            under the two-rule tier every pair is legal and it is. Two
            independent tests &mdash; rule frequency across two centuries, and
            mutual compatibility in a single passage &mdash; select the same two
            rules.
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

export const strettoFigureForArticle = {
  ...strettoFigure,
  caption: (
    <>
      <b>Figure 1.</b> Bach&rsquo;s five-voice hyperstretto in BWV 867 and the
      tier that admits it. (a) Five statements at offsets{" "}
      <b>{"{0, 2, 4, 6, 8}"}</b> quarters. (b) Under &#964;<sub>5</sub> two of
      the ten pairs are inadmissible and the passage is not a clique; under
      &#964;<sub>2</sub> it is, on both contested readings of the subject. A
      control run on the written notes rather than idealised transpositions
      locates the fault in the rulebook, not in the model of an entry.
    </>
  ),
};
