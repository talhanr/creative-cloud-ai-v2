/* eslint-disable @next/next/no-img-element -- logo is a client-side data URL */
import type { SiteContent } from "@/lib/ai/types";
import { Body, CtaButton, Eyebrow } from "./modern-ui";

const fadeRhythm = [
  { h: "h-1", o: "opacity-[0.13]" },
  { h: "h-2", o: "opacity-25" },
  { h: "h-3", o: "opacity-[0.44]" },
  { h: "h-4", o: "opacity-[0.69]" },
  { h: "h-5", o: "opacity-100" },
] as const;

// Business navigation + hero + service band.
export function ModernHero({ content }: { content: SiteContent }) {
  const { hero } = content;
  return (
    <>
      <header className="flex items-center justify-between gap-4 border-b border-(--t-primary)/15 px-5 py-6 md:px-16">
        {content.logoDataUrl ? (
          <img src={content.logoDataUrl} alt={content.businessName} className="h-10 w-auto max-w-48 object-contain" />
        ) : (
          <p className="text-[22px] font-semibold md:text-h4 md:leading-normal">{content.businessName}</p>
        )}
        <nav aria-label={`${content.businessName} navigation`} className="flex items-center gap-7">
          <ul className="hidden items-center gap-7 text-link tracking-normal lg:flex">
            {content.nav.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <span className="hidden sm:block">
            <CtaButton label={content.cta} />
          </span>
        </nav>
      </header>

      <section className="flex flex-col gap-10 px-5 py-14 md:px-16 md:py-24 lg:flex-row lg:items-center lg:gap-14">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-6">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="text-[40px] leading-[1.1] font-semibold md:text-[64px]">
            {hero.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <Body>{hero.body}</Body>
          <CtaButton label={content.cta} />
        </div>
        <div
          aria-hidden
          className="flex min-h-[380px] w-full flex-col justify-between overflow-hidden bg-(--t-primary) p-7 lg:min-h-[460px] lg:w-[430px] lg:shrink-0"
        >
          <p className="text-caption text-(--t-accent)">{hero.composition.caption}</p>
          <div className="flex flex-col gap-2">
            {fadeRhythm.map((r) => (
              <span key={r.h} className={`${r.h} ${r.o} w-full bg-(--t-accent)`} />
            ))}
          </div>
          <p
            className={
              Math.max(...hero.composition.words.map((w) => w.length)) > 6
                ? "text-[52px] leading-[0.92] break-words text-(--t-accent) md:text-[64px]"
                : "text-[72px] leading-[0.92] text-(--t-accent) md:text-[92px]"
            }
          >
            {hero.composition.words.map((w) => (
              <span key={w} className="block">
                {w}
              </span>
            ))}
          </p>
          <p className="text-caption text-tpl-cream">{hero.composition.tagline}</p>
        </div>
      </section>

      <ul className="flex flex-col gap-3 bg-(--t-accent) px-5 py-6 text-[22px] text-tpl-ink md:flex-row md:gap-5 md:px-16 md:text-h4 md:leading-normal">
        {content.serviceBand.map((s) => (
          <li key={s} className="min-w-0 flex-1">
            {s} ↗
          </li>
        ))}
      </ul>
    </>
  );
}
