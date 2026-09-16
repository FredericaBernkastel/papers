import { Tag } from "@/components/icons";

export function Terms({ terms }: { terms: readonly string[] }) {
  if (terms.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Key terms">
      {terms.map((term) => (
        <li
          className="inline-flex items-center gap-1.5 rounded-sm bg-paper-2 px-2 py-[3px] font-mono text-[10.5px] leading-[1.5] tracking-[0.04em] text-ink-mid"
          key={term}
        >
          <Tag size={10} aria-hidden="true" className="text-accent-soft" />
          {term}
        </li>
      ))}
    </ul>
  );
}
