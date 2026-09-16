import { contactIcon, navIcon, Quote } from "@/components/icons";
import { PaperEntry } from "@/components/paper-entry";
import { Rubric } from "@/components/rubric";
import { WorkRow } from "@/components/work-row";
import { papers } from "@/content/papers";
import { contact, epigraph } from "@/content/site";
import { work } from "@/content/work";
import { BODY, RAIL_GRID, WRAP } from "@/lib/styles";
import { cn } from "@/lib/utils";

const SECTION = "flex flex-col scroll-mt-20 gap-7";

export default function Home() {
  return (
    <main>
      <div
        className={cn(
          WRAP,
          "flex flex-col gap-13 pt-9 pb-20 sm:pt-13 rail:gap-21",
        )}
      >
        <section aria-label="Epigraph">
          <figure className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 border border-rule-soft border-l-2 border-l-accent-soft bg-plate px-4 py-4.5 sm:gap-4 sm:px-6 sm:py-5.5">
            <Quote
              size={18}
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-accent-soft"
            />
            <blockquote>
              {epigraph.paragraphs.map((text, index) => (
                <p
                  key={text.slice(0, 32)}
                  className={cn(
                    BODY,
                    "text-[13.5px]/[1.62] text-ink-mid",
                    index > 0 && "mt-[0.9em]",
                  )}
                >
                  {index === 1 ? <>&lt;&hellip;&gt; </> : null}
                  {text}
                </p>
              ))}
              <cite className="mt-[0.9em] block text-right font-mono text-[11.5px]/[1.5] tracking-[0.04em] text-ink-soft not-italic">
                {epigraph.cite}
              </cite>
            </blockquote>
          </figure>
        </section>

        <section className={SECTION} id="papers">
          <Rubric icon={navIcon.papers}>Papers</Rubric>
          {papers.map((paper) => (
            <PaperEntry key={paper.slug} paper={paper} />
          ))}
        </section>

        <section className={SECTION} id="work">
          <Rubric icon={navIcon.work}>Active work</Rubric>
          {/* first row carries no rule: the rubric already divides it */}
          <div className="flex flex-col [&>*:first-child]:border-t-0 [&>*:first-child]:pt-0">
            {work.map((item) => (
              <WorkRow key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className={SECTION} id="about">
          <Rubric icon={navIcon.about}>About</Rubric>
          <div className={RAIL_GRID}>
            <div className="font-mono text-[11px] leading-[1.4] tracking-[0.06em] text-ink-soft uppercase rail:pt-1.5">
              Contact
            </div>
            <div className="flex flex-col gap-1">
              {contact.map((item) => {
                const Icon = contactIcon[item.icon];
                const inner = (
                  <>
                    <Icon
                      size={15}
                      aria-hidden="true"
                      className="shrink-0 text-accent"
                    />
                    <span className="sr-only">{item.label}: </span>
                    <span>{item.value}</span>
                  </>
                );
                const shell =
                  "-ml-2.5 flex w-fit max-w-full items-center gap-3 rounded-sm px-2.5 py-[7px] font-mono text-[13px]/[1.6] break-words text-ink-mid";
                return item.href === undefined ? (
                  <span className={shell} key={item.label}>
                    {inner}
                  </span>
                ) : (
                  <a
                    className={cn(
                      shell,
                      "no-underline transition-colors hover:bg-paper-2 hover:text-accent",
                    )}
                    href={item.href}
                    key={item.label}
                  >
                    {inner}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
