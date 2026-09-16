import { contactIcon, navIcon } from "@/components/icons";
import { PaperEntry } from "@/components/paper-entry";
import { Rubric } from "@/components/rubric";
import { WorkRow } from "@/components/work-row";
import { papers } from "@/content/papers";
import { contact, epigraph } from "@/content/site";
import { work } from "@/content/work";
import { resolveHref } from "@/lib/base-path";
import { RAIL_GRID, WRAP } from "@/lib/styles";
import { cn } from "@/lib/utils";

const SECTION = "flex flex-col scroll-mt-20 gap-7";
// .hero-lede: font:400 12px/1.3 sans; color:--ink-soft; max-width:58ch; justify
const LEDE =
  "max-w-[58ch] text-justify font-sans text-[12px]/[1.3] font-normal text-ink-soft";

export default function Home() {
  return (
    <main>
      <div
        className={cn(
          WRAP,
          "flex flex-col gap-13 pt-9 pb-20 sm:pt-13 rail:gap-21",
        )}
      >
        {/* Set exactly as the mockup has it: one continuous italic run at
            12px/1.3 in --ink-soft, held to 58ch and justified, closed by a
            typed rule — no frame, no icon, no paragraph breaks. */}
        <section className="flex flex-col" aria-label="Epigraph">
          <p className={LEDE}>
            <i>
              {epigraph.opening} &lt;...&gt; {epigraph.middle}{" "}
              {epigraph.closing}
              <br />
              {epigraph.rule} <br />
            </i>
          </p>
          <p className={cn(LEDE, "text-right")}>{epigraph.cite}</p>
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
                    <span className={item.label == 'Discord' ? '' : "sr-only"}>{item.label}: </span>
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
                    href={resolveHref(item.href)}
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
