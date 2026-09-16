/**
 * TeX sources, verbatim from the papers.
 *
 * These are converted to MathML once, at build time, by scripts/gen-math.ts.
 * github.com renders ```math blocks the same way — MathJax is used only to
 * produce MathML, and the browser's native math engine and math font do the
 * typesetting — which is why the result reads as real TeX rather than as glyphs
 * assembled into HTML boxes. Doing it at build time rather than in the browser
 * costs the page nothing at runtime and leaves no flash of raw LaTeX.
 */

export type MathKey =
  | "fugueSentence"
  | "obligationState"
  | "reachableStates"
  | "capacity"
  | "configurationLift";

export interface MathSource {
  /** verbatim TeX; also emitted as data-tex so it stays copy-pasteable */
  readonly tex: string;
  /** display block vs. inline in running prose */
  readonly display: boolean;
}

export const MATH: Readonly<Record<MathKey, MathSource>> = {
  fugueSentence: {
    display: true,
    tex: String.raw`\begin{aligned}
  \underbrace{
    \mathrm{fugue}\big(
      \underbrace{D}_{\text{material}},\;
      \underbrace{\Lambda}_{\text{plan}},\;
      \underbrace{\tau}_{\text{rulebook}},\;
      \underbrace{s}_{\text{seed}}
    \big)
  }_{\text{sentence}}
  \;&=\;
  \underbrace{B}_{
    \substack{
      \mathrm{derive}(D,\Lambda)\\
      \text{"symbols"}
    }
  }
  \;\times\;
  \underbrace{V}_{
    \underbrace{
      \begin{pmatrix}
        n_{1,1} & \cdots & n_{1,k_1}\\
        \vdots  &        & \vdots\\
        n_{m,1} & \cdots & n_{m,k_m}
      \end{pmatrix}
    }_{\text{notes per voice}}
  }
  \;\times\;
  \underbrace{\mathrm{parse}(B)}_{
    \substack{
      \text{is sentence}\\
      \text{grammatically}\\
      \text{correct?}
    }
  }\;\times\;
  \underbrace{\mathrm{check}_{\tau_2}(V)}_{\text{rulebook violations}}
\end{aligned}`,
  },

  obligationState: {
    display: true,
    tex: String.raw`Q=(\mathcal{W}\cup\lbrace \bot\rbrace )\times 2^{O},\qquad |O|=8,\qquad |Q|=5\cdot 256=1280`,
  },

  reachableStates: {
    display: true,
    tex: String.raw`\underbrace{1}_{\text{start}}+\underbrace{3\cdot 9}_{\text{consonant}\times\text{leap debts}}+\underbrace{5\cdot 9}_{\text{dissonance readings}\times\text{leap debts}}=73`,
  },

  capacity: {
    display: true,
    tex: String.raw`\mathrm{cap}(\text{subject})=\frac{2|E|}{|\mathcal{S}|\,(|\mathcal{S}|-1)}`,
  },

  configurationLift: {
    display: false,
    tex: String.raw`\mathbb{R}^N \rtimes SO(N)`,
  },
};
