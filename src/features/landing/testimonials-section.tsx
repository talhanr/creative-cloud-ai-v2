"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { testimonials } from "@/lib/content/landing";
import { cn } from "@/lib/utils";
import { SectionIntro } from "./section-intro";

// Figma "Testimonials" 58698:4091 — four cards (gap 70), dots left, arrows right.
export function TestimonialsSection() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const count = testimonials.items.length;

  const cardStep = () => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return 0;
    return first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
  };

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(count - 1, i));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: next * cardStep(), behavior: reduce ? "auto" : "smooth" });
    setActive(next);
  };

  const onScroll = () => {
    const track = trackRef.current;
    const step = cardStep();
    if (!track || !step) return;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    setActive(atEnd ? count - 1 : Math.round(track.scrollLeft / step));
  };

  return (
    <section
      aria-labelledby="testimonials-title"
      aria-roledescription="carousel"
      className="mx-auto flex w-full max-w-[109.125rem] flex-col gap-12 px-4 md:px-8 lg:gap-[7.5rem]"
    >
      <SectionIntro
        id="testimonials-title"
        eyebrow={testimonials.eyebrow}
        title={testimonials.title}
        intro={testimonials.intro}
      />
      <div className="flex flex-col gap-8">
        <ul
          ref={trackRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto [scrollbar-width:none] lg:gap-[4.375rem] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.items.map((t, i) => (
            <li
              key={i}
              aria-label={`${i + 1} of ${count}`}
              className="flex w-[85%] shrink-0 snap-start flex-col gap-[1.5625rem] rounded-card bg-ink-3 p-6 sm:w-[calc((100%-1.5rem)/2)] xl:w-[calc((100%-13.125rem)/4)]"
            >
              <Image
                src={t.logo}
                alt={t.company}
                width={100}
                height={100}
                className="size-[6.25rem] rounded-card object-cover"
              />
              <figure className="flex flex-col gap-8">
                <blockquote className="flex flex-col gap-2">
                  <Image src="/landing/testimonial-icon.svg" alt="" width={28} height={28} />
                  <p className="text-lead leading-normal text-white">{t.quote}</p>
                </blockquote>
                <figcaption className="flex flex-col gap-2">
                  <span className="text-h5 leading-normal text-white">{t.name}</span>
                  <span className="text-body leading-normal text-gray-3">{t.company}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {testimonials.items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === active}
                className="flex size-11 items-center justify-center lg:size-6"
              >
                <span
                  className={cn("size-6 rounded-panel", i === active ? "bg-white" : "bg-ink-1")}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-4">
            <ArrowButton label={testimonials.prev} dir="left" onClick={() => goTo(active - 1)} />
            <ArrowButton label={testimonials.next} dir="right" onClick={() => goTo(active + 1)} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowButton({
  label,
  dir,
  onClick,
}: {
  label: string;
  dir: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-11 items-center justify-center lg:size-8"
    >
      <span className="flex size-8 items-center justify-center rounded-panel-lg bg-ink-1">
        <Image
          src="/landing/arrow-arrow-up-icon.svg"
          alt=""
          width={24}
          height={24}
          className={dir === "right" ? "rotate-90" : "-rotate-90"}
        />
      </span>
    </button>
  );
}
