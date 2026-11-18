import Image from "next/image";
import { showcaseImages } from "@/lib/content/landing";
import { cn } from "@/lib/utils";

// Figma "Animation" 58698:3907 — 1682×800 card, image columns tilted -20°, middle column
// drifts down while the outer columns drift up (18s loop), dark radial vignette on top.
const columns = [
  { anim: "animate-column-up", offset: "translate-y-[-15rem]" },
  { anim: "animate-column-down", offset: "" },
  { anim: "animate-column-up", offset: "translate-y-[-7.5rem]" },
] as const;

export function Showcase() {
  const tiles = [...showcaseImages, ...showcaseImages];
  return (
    <section aria-label="Recent website designs" className="relative px-4 md:px-8 xl:px-[7.4375rem]">
      <div className="relative mx-auto h-[26.25rem] max-w-[105.125rem] overflow-hidden rounded-panel-lg bg-ink-3 md:h-[37.5rem] lg:h-[50rem]">
        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 -rotate-20 gap-4">
          {columns.map((col, c) => (
            <div key={c} className={cn("w-[16.25rem] md:w-[23.75rem] lg:w-[31.0625rem]", col.offset)}>
              <div className={cn("flex flex-col gap-4", col.anim)}>
                {tiles.map((img, i) => (
                  <div key={i} className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 497px, (min-width: 768px) 380px, 260px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 68% 68% at 50% 50%, rgb(1 1 1 / 0) 23.6%, rgb(1 1 1 / 0.3) 73.9%, rgb(1 1 1 / 1) 99.3%)",
          }}
        />
      </div>
    </section>
  );
}
