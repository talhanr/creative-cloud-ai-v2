"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { testimonials } from "@/lib/content/landing";
import { cn } from "@/lib/utils";
import { SectionIntro } from "./section-intro";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Figma "Testimonials" 58698:4091 — four cards, dots left, arrows right.
// Sliding loop: the list is rendered twice and the track slides one card per step; at the end
// it jumps back (no transition) to the matching card in the first copy. Swipe on touch.
export function TestimonialsSection() {
  const items = testimonials.items;
  const count = items.length;
  const [pos, setPos] = useState(0); // 0..count (count = first card of the second copy)
  const [animate, setAnimate] = useState(true);
  const busy = useRef(false);
  const swipeX = useRef<number | null>(null);
  const active = pos % count;

  const slideTo = (next: number) => {
    if (reducedMotion()) return setPos(((next % count) + count) % count);
    if (busy.current || next === pos) return;
    busy.current = true;
    if (next < 0) {
      // Jump to the same card in the second copy, then slide back one.
      setAnimate(false);
      setPos(count);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setPos(count - 1);
        }),
      );
      return;
    }
    setAnimate(true);
    setPos(next);
  };

  const onSlideEnd = () => {
    busy.current = false;
    if (pos >= count) {
      setAnimate(false);
      setPos(pos - count);
    }
  };

  return (
    <section
      aria-labelledby="testimonials-title"
      aria-roledescription="carousel"
      className="mx-auto flex w-full max-w-[108rem] flex-col gap-12 px-4 md:px-8 lg:gap-16"
    >
      <SectionIntro
        id="testimonials-title"
        eyebrow={testimonials.eyebrow}
        title={testimonials.title}
        intro={testimonials.intro}
      />
      <div className="flex flex-col gap-8">
        <div
          className="touch-pan-y overflow-hidden"
          onPointerDown={(e) => (swipeX.current = e.clientX)}
          onPointerUp={(e) => {
            const dx = swipeX.current === null ? 0 : e.clientX - swipeX.current;
            swipeX.current = null;
            if (Math.abs(dx) > 40) slideTo(dx < 0 ? pos + 1 : pos - 1);
          }}
        >
          <ul
            onTransitionEnd={(e) => e.target === e.currentTarget && onSlideEnd()}
            style={{ "--i": pos } as React.CSSProperties}
            className={cn(
              "flex gap-(--gap) [--card:85%] [--gap:1.5rem] sm:[--card:calc((100%-var(--gap))/2)] lg:[--gap:2.5rem] xl:[--card:calc((100%-3*var(--gap))/4)]",
              "translate-x-[calc(var(--i)*-1*(var(--card)+var(--gap)))]",
              animate && "transition-transform duration-500 ease-in-out motion-reduce:transition-none",
            )}
          >
            {[...items, ...items].map((t, i) => (
              <li
                key={i}
                aria-label={i < count ? `${i + 1} of ${count}` : undefined}
                aria-hidden={i >= count || undefined}
                inert={i >= count}
                className="flex w-(--card) shrink-0 flex-col gap-[1.5625rem] rounded-card bg-ink-3 p-6 select-none"
              >
                <Image
                  src={t.logo}
                  alt={t.company}
                  width={100}
                  height={100}
                  draggable={false}
                  className="size-[6.25rem] rounded-card object-cover"
                />
                <figure className="flex flex-col gap-8">
                  <blockquote className="flex flex-col gap-2">
                    <Image src="/landing/testimonial-icon.svg" alt="" width={28} height={28} />
                    <p className="text-body-lg leading-normal text-white">{t.quote}</p>
                  </blockquote>
                  <figcaption className="flex flex-col gap-2">
                    <span className="text-body-lg leading-normal text-white">{t.name}</span>
                    <span className="text-body leading-normal text-gray-3">{t.company}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => slideTo(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === active}
                className="flex size-11 items-center justify-center lg:size-6"
              >
                <span
                  className={cn(
                    "size-6 rounded-panel transition-colors duration-300",
                    i === active ? "bg-white" : "bg-ink-1",
                  )}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-4">
            <ArrowButton label={testimonials.prev} dir="left" onClick={() => slideTo(pos - 1)} />
            <ArrowButton label={testimonials.next} dir="right" onClick={() => slideTo(pos + 1)} />
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
