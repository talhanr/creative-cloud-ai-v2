"use client";

import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

// Figma: AI messages fade in character by character, left → right, over ~1s (linear).
// Screen readers get the plain text once; the animated characters are hidden from them.
export function RevealText({ text, animate }: { text: string; animate: boolean }) {
  const reduce = usePrefersReducedMotion();
  const paragraphs = text.split("\n\n");

  if (!animate || reduce) {
    return (
      <>
        {paragraphs.map((p, i) => (
          <p key={i} className={i > 0 ? "mt-[1.6em]" : undefined}>
            {p}
          </p>
        ))}
      </>
    );
  }

  const step = 1000 / Math.max(text.length, 1);
  // Character offset where each paragraph starts (paragraphs are joined by "\n\n").
  const starts = paragraphs.map((_, i) =>
    paragraphs.slice(0, i).reduce((sum, p) => sum + p.length + 2, 0),
  );
  return (
    <>
      <span className="sr-only">{text}</span>
      {paragraphs.map((p, i) => {
        const start = starts[i];
        return (
          <p key={i} aria-hidden className={i > 0 ? "mt-[1.6em]" : undefined}>
            {[...p].map((ch, j) => (
              <span
                key={j}
                className="animate-char-in opacity-0"
                style={{ animationDelay: `${Math.round((start + j) * step)}ms` }}
              >
                {ch}
              </span>
            ))}
          </p>
        );
      })}
    </>
  );
}
