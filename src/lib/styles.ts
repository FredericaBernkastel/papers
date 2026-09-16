import { cva, type VariantProps } from "class-variance-authority";

/** The page shell: one measured column, centred. */
export const WRAP = "mx-auto w-full max-w-[980px] px-5 sm:px-8";

/**
 * The quiet grid used by every entry, row and article: a mono rail of fixed
 * width beside the content. Below `rail` the two stack and the rail turns into
 * a horizontal chip row.
 */
export const RAIL_GRID =
  "grid grid-cols-1 items-start gap-4 rail:grid-cols-[104px_minmax(0,1fr)] rail:gap-8";

/** Running text stops short of the column so the measure stays readable. */
export const MEASURE = "max-w-[780px]";

/** Small uppercase mono, used for every label on the site. */
export const MICRO =
  "font-mono text-[11px] leading-[1.4] tracking-[0.06em] uppercase";

/** Justified body copy with hyphenation, as the papers set it. */
export const BODY = "text-justify hyphens-auto";

/** MathML is injected as markup, so it is reached through the wrapper. */
export const MATH_SHELL = "[&_math]:font-math [&_math]:text-ink";

export const linkChip = cva(
  "inline-flex items-center gap-[7px] rounded-sm border px-[11px] py-1.5 font-mono text-[11px] leading-[1.4] tracking-[0.08em] uppercase no-underline transition-colors",
  {
    variants: {
      tone: {
        default:
          "border-rule bg-plate text-ink-mid hover:border-accent-soft hover:text-accent",
        closed:
          "border-closed/30 bg-plate text-closed hover:border-closed hover:text-closed",
      },
    },
    defaultVariants: { tone: "default" },
  },
);

export type LinkChipVariants = VariantProps<typeof linkChip>;

export const railItem = cva(
  "inline-flex items-center gap-1.5 whitespace-nowrap",
  {
    variants: {
      tone: {
        accent: "text-accent",
        soft: "text-ink-soft",
      },
    },
    defaultVariants: { tone: "soft" },
  },
);
