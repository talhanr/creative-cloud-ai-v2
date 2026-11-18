import { clientLogos, hero } from "@/lib/content/landing";

// Figma "Border" band (58698:4245): #17191c, logos as white alpha masks.
// Figma slides the row 710px then jumps back; built as a seamless loop instead.
// All logos share one height (width from each PNG's ratio) so the row sits on one line.
export function ClientLogos() {
  const row = [...clientLogos, ...clientLogos];
  return (
    <section
      aria-label={hero.logosTitle}
      className="relative flex w-full flex-col items-center gap-4 overflow-hidden bg-gray-950 py-6 lg:gap-5 lg:py-8"
    >
      <p className="text-[0.9375rem] leading-normal font-semibold text-white">{hero.logosTitle}</p>
      <ul className="sr-only">
        {clientLogos.map((l) => (
          <li key={l.name}>{l.name}</li>
        ))}
      </ul>
      <div aria-hidden className="flex h-12 w-max animate-logos items-center lg:h-16">
        {row.map((l, i) => (
          <span
            key={`${l.name}-${i}`}
            className="mx-8 block h-full shrink-0 bg-white md:mx-14"
            style={{
              aspectRatio: `${l.w} / ${l.h}`,
              maskImage: `url("${l.src}")`,
              WebkitMaskImage: `url("${l.src}")`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
        ))}
      </div>
    </section>
  );
}
