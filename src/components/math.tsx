import { MATH, type MathKey } from "@/content/math";
import { MATHML } from "@/generated/math";
import { MATH_SHELL } from "@/lib/styles";
import { cn } from "@/lib/utils";

/**
 * The MathML is produced at build time by scripts/gen-math.ts from our own TeX
 * in src/content/math.ts — never from user input — so the markup is trusted.
 * The TeX rides along in data-tex, so the source stays copy-pasteable the way
 * it is in the papers themselves.
 */

export function MathBlock({
  k,
  className,
}: {
  k: MathKey;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-x-auto overflow-y-hidden border border-rule bg-plate px-4 py-5 sm:px-6",
        MATH_SHELL,
        "[&>math>mrow]:px-0.5",
        className,
      )}
      data-tex={MATH[k].tex}
      dangerouslySetInnerHTML={{ __html: MATHML[k] }}
    />
  );
}

export function MathInline({ k }: { k: MathKey }) {
  return (
    <span
      // A long expression scrolls rather than stretching the line box. The y
      // axis must be pinned too: with overflow-x auto and overflow-y visible,
      // CSS computes overflow-y to auto, and a sub-pixel tall glyph then draws
      // a stray vertical scrollbar mid-sentence. GitHub sets `auto hidden` here
      // for the same reason.
      className={cn(
        "inline-block",
        MATH_SHELL,
        "[&>math]:overflow-x-auto [&>math]:overflow-y-hidden",
      )}
      data-tex={MATH[k].tex}
      dangerouslySetInnerHTML={{ __html: MATHML[k] }}
    />
  );
}
