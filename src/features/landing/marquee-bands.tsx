import Image from "next/image";
import { Fragment } from "react";
import { marqueeWords } from "@/lib/content/landing";
import { cn } from "@/lib/utils";

// Figma "lines" 58698:3819 — two crossing bands (±15.27°), 608 tall area.
// White band: gradient words, moves right. Gradient band: white words, moves left. 18s loop.
export function MarqueeBands() {
  return (
    <section
      aria-label={marqueeWords.join(", ")}
      className="relative h-[20rem] overflow-hidden md:h-[24rem] lg:h-[28rem]"
    >
      <Band
        className="top-[30%] rotate-[15.27deg] bg-white"
        textClass="text-brand-gradient"
        star="/landing/star7.svg"
        anim="animate-marquee-rev"
      />
      <Band
        className="top-[30%] -rotate-[15.27deg]"
        style={{
          backgroundImage:
            "linear-gradient(88.9deg, var(--color-brand-pink) 42%, var(--color-brand-amber) 62%)",
        }}
        textClass="text-white"
        star="/landing/star8.svg"
        anim="animate-marquee"
      />
    </section>
  );
}

function Band({
  className,
  style,
  textClass,
  star,
  anim,
}: {
  className: string;
  style?: React.CSSProperties;
  textClass: string;
  star: string;
  anim: string;
}) {
  // Two identical halves → translateX(-50%) loops seamlessly.
  const words = [...marqueeWords, ...marqueeWords, ...marqueeWords];
  return (
    <div
      aria-hidden
      className={cn("absolute left-1/2 w-[300vw] -translate-x-1/2", className)}
      style={style}
    >
      <div className={cn("flex w-max items-center", anim)}>
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-6 pr-6">
            {words.map((w, i) => (
              <Fragment key={`${half}-${i}`}>
                <span
                  className={cn(
                    "font-display text-[2.75rem] leading-[1.3] font-semibold whitespace-nowrap md:text-[3rem] lg:text-display",
                    textClass,
                  )}
                >
                  {w}
                </span>
                <Image src={star} alt="" width={64} height={64} className="size-10 lg:size-16" />
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
