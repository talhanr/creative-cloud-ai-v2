import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { footer } from "@/lib/content/site";
import { BackToTop } from "./back-to-top";

// Figma "Footer" 58698:3758 (1920 frame, 120px side padding, 80px gaps).
export function SiteFooter() {
  return (
    <footer className="relative mx-auto flex w-full max-w-[1920px] flex-col gap-12 px-4 pt-16 md:px-8 lg:gap-20 lg:pt-20 xl:px-[120px]">
      <section
        aria-label="Start a project"
        className="flex flex-col items-start gap-6 rounded-panel bg-gray-950 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-16 md:py-12"
      >
        <div className="flex flex-col gap-3">
          <h2 className="text-[28px] leading-[1.1] font-extrabold text-white md:text-cta">
            {footer.cta.title}
          </h2>
          <p className="text-body-lg leading-normal text-gray-3">{footer.cta.body}</p>
        </div>
        <Link
          href={footer.cta.href}
          className="inline-flex min-h-11 shrink-0 items-center rounded-[50px] bg-warm-cta-gradient px-10 py-5 text-body-lg leading-normal font-bold text-gray-950 shadow-glow-lg"
        >
          {footer.cta.button}
        </Link>
      </section>

      <Image src="/brand/logo.svg" alt="Royal Creative" width={159} height={48} />

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:flex lg:items-start lg:justify-between">
        <div className="flex flex-col gap-4 lg:w-[360px]">
          <p className="text-h5 font-extrabold text-white">{footer.tagline}</p>
          <p className="text-body text-gray-3">{footer.subline}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-6 lg:w-[240px]">
          <p className="text-body-lg font-bold text-white">{footer.exploreTitle}</p>
          <ul className="flex flex-col gap-4">
            {footer.explore.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-body text-gray-3 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-6 lg:w-[360px]">
          <p className="text-body-lg font-bold text-white">{footer.contactTitle}</p>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-3.5">
              <IconTile src="/landing/mail.svg" />
              <a href={`mailto:${footer.email}`} className="text-body text-white hover:underline">
                {footer.email}
              </a>
            </li>
            <li className="flex items-center gap-3.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-chip bg-warm-gradient">
                <Phone className="size-4 text-white" aria-hidden />
              </span>
              <a href={footer.phone.href} className="text-body text-white hover:underline">
                {footer.phone.display}
              </a>
            </li>
            <li className="flex items-center gap-3.5">
              <IconTile src="/landing/map-pin.svg" />
              <span className="text-body text-white">{footer.address}</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-row items-end justify-between gap-8 sm:flex-col lg:w-[280px]">
          <div className="flex flex-col gap-6 sm:items-end">
            <p className="text-body-lg font-bold text-white sm:text-right">{footer.followTitle}</p>
            <ul className="flex gap-4">
              {footer.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="flex size-12 items-center justify-center rounded-panel border border-brand-hot bg-gray-950 shadow-soft"
                  >
                    <Image src={s.icon} alt="" width={20} height={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <BackToTop label={footer.backToTop} />
        </div>
      </div>

      <div className="border-t border-ink-1">
        <div className="flex flex-col gap-4 py-10 text-link leading-normal tracking-normal text-gray-3 md:flex-row md:items-center md:justify-between">
          <p className="leading-6">{footer.copyright}</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {footer.legal.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function IconTile({ src }: { src: string }) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-chip bg-warm-gradient">
      <Image src={src} alt="" width={16} height={16} />
    </span>
  );
}
