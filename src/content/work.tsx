import { MathInline } from "@/components/math";
import type { WorkItem } from "@/content/types";

const SPACE_FILLING = "https://github.com/FredericaBernkastel/space-filling";
const CONTACT = "mailto:bernkastel.frederica@protonmail.com";

export const work: readonly WorkItem[] = [
  {
    id: "adaptive-distance-field",
    name: "adaptive-distance-field",
    mono: true,
    status: "done",
    kind: "library",
    kindLabel: "Rust library",
    body: (
      <p>
        Adaptively sampled distance fields in &#8477;<sup>N</sup>, with
        Lipschitz-certified pruning.
      </p>
    ),
    links: [
      {
        kind: "docs",
        label: "docs.rs",
        href: "https://docs.rs/adaptive-distance-field/latest/adaptive_distance_field/",
      },
      {
        kind: "video",
        label: "Video lecture",
        href: "https://www.youtube.com/watch?v=R6c1XMGf9x8",
      },
      {
        kind: "repo",
        label: "Source",
        href: `${SPACE_FILLING}/tree/master/adaptive-distance-field`,
      },
    ],
    figures: [],
  },

  {
    id: "space-filling",
    name: "space-filling",
    mono: true,
    status: "active",
    kind: "library",
    kindLabel: "Rust library",
    body: (
      <p>
        A library on top of &ldquo;adaptive-distance-field&rdquo;. Two solvers
        over a compound signed distance field. <em>Argmax2D</em> maximizes
        exactly over a bitmap in Z-order and pays quadratically for resolution;{" "}
        <em>GD-ADF</em> climbs to a local maximum, sampling the tree in
        logarithmic time, at 10&#8211;100&#215; less memory. Both are <i>N</i>
        -dimensional as of 0.6.0. Arbitrary SDF primitives, k-d tree pruning
        under Lipschitz certificates, and manifold domains past{" "}
        <code>D=12</code> &mdash; where the effective dimension is far below the
        ambient one.
      </p>
    ),
    links: [
      { kind: "docs", label: "docs.rs", href: "https://docs.rs/space-filling" },
      { kind: "repo", label: "Source", href: SPACE_FILLING },
    ],
    figures: [],
  },

  {
    id: "gallery-of-babel",
    name: "gallery-of-babel",
    mono: true,
    status: "planned",
    kind: "binary",
    kindLabel: "Rust binary",
    body: (
      <p>A user interface on top of &ldquo;space-filling&rdquo;.</p>
    ),
    links: [],
    figures: [],
  },

  {
    id: "contrapunctus",
    name: "contrapunctus",
    mono: true,
    status: "active",
    kind: "library",
    kindLabel: "Rust library",
    body: (
      <p>
        The reference implementation of the &ldquo;Contrapunctus: Counterpoint is
        a regular language&rdquo; whitepaper. The pair automaton and its
        reachability closure, harmonic automaton, layered-DAG realiser with exact
        path counting, stretto capacity by maximum clique, and the ten-line form
        grammar. Exact arithmetic over finite sets throughout.
      </p>
    ),
    links: [{ kind: "closed", label: "Closed source", href: CONTACT }],
    figures: [],
  },

  {
    id: "contrapunctus-ui",
    name: "contrapunctus-ui",
    mono: true,
    status: "active",
    kind: "binary",
    kindLabel: "Rust binary",
    body: <p>User interface on top of the &ldquo;contrapunctus&rdquo; library.</p>,
    links: [{ kind: "closed", label: "Closed source", href: CONTACT }],
    figures: [
      {
        src: "/img/contrapunctus-ui.webp",
        width: 1160,
        height: 951,
        dense: false,
        alt: "Screenshot of the contrapunctus user interface, showing a score view alongside the generator's controls.",
        caption: <>The generator&rsquo;s working interface.</>,
      },
    ],
  },

  {
    id: "harmonic-objective",
    name: "A design objective that is harmonic",
    mono: false,
    status: "open",
    kind: "questions",
    kindLabel: "Questions",
    from: "contrapunctus",
    body: (
      <p>
        Capacity ranks subjects and cannot design one: both surviving rules need
        a perfect consonance to fire, and a fugal answer lies at the fifth, so
        the measure penalises the very interval the form is built on. Optimising
        a contour against it yields a monotone. What replaces it has to be
        harmonic, and that is open.
      </p>
    ),
    links: [],
    figures: [],
  },

  {
    id: "orientation",
    name: (
      <>
        Orientation, and the factor of &#954;<sup>N</sup>
      </>
    ),
    mono: false,
    status: "open",
    kind: "questions",
    kindLabel: "Questions",
    from: "space-filling",
    body: (
      <p>
        The present greedy step never optimizes orientation, and leaves a factor
        of &#954;<sup>N</sup> of placed volume unclaimed &mdash; a factor of five
        already for a shape of aspect 1:2 in a 2&#215;1 region. The repair is a{" "}
        <MathInline k="configurationLift" /> configuration-space lift, so that
        pose and position are optimized together rather than one after the other.
      </p>
    ),
    links: [],
    figures: [],
  },
];
