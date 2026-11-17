import { clientLogos, hero } from "@/lib/content/landing";

// Figma "Border" band (58698:4245): #17191c, 140px, logos as white alpha masks.
// Figma slides the row 710px then jumps back; built as a seamless loop instead.
export function ClientLogos() {
  const row = [...clientLogos, ...clientLogos];
  return (
    <section
      aria-label={hero.logosTitle}
      className="relative flex h-[140px] w-full flex-col items-center justify-center overflow-hidden bg-gray-950 px-0 py-5"
    >
      <p className="text-[15px] leading-normal font-semibold text-white">{hero.logosTitle}</p>
      <ul className="sr-only">
        {clientLogos.map((l) => (
          <li key={l.name}>{l.name}</li>
        ))}
      </ul>
      <div aria-hidden className="flex h-[72px] w-max animate-logos items-center">
        {row.map((l, i) => (
          <span
            key={`${l.name}-${i}`}
            className="mx-6 block shrink-0 bg-white md:mx-[52px]"
            style={{
              width: l.w,
              height: l.h,
              maskImage: `url("${l.src}")`,
              WebkitMaskImage: `url("${l.src}")`,
              maskSize: `${l.w}px ${l.h}px`,
              WebkitMaskSize: `${l.w}px ${l.h}px`,
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
        ))}
      </div>
    </section>
  );
}
