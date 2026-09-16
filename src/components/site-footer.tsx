import { contactIcon } from "@/components/icons";
import { contact, site } from "@/content/site";
import { WRAP } from "@/lib/styles";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div
        className={cn(
          WRAP,
          "flex flex-wrap items-center justify-between gap-x-7 gap-y-3.5 pt-5 pb-10 font-mono text-[11.5px]/[1.8] tracking-[0.04em] text-ink-soft",
        )}
      >
        <span>
          &#169; {new Date().getFullYear().toString()} {site.name}
        </span>

        <span className="flex flex-wrap gap-1.5">
          {contact
            .filter((item) => item.href !== undefined)
            .map((item) => {
              const Icon = contactIcon[item.icon];
              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="inline-flex items-center rounded-sm p-2 text-ink-mid transition-colors hover:bg-paper-2 hover:text-accent"
                >
                  <Icon size={14} aria-hidden="true" />
                </a>
              );
            })}
        </span>
      </div>
    </footer>
  );
}
