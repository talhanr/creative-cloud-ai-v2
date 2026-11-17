import { fill } from "@/lib/ai/fill";
import { describeColours, nearestName } from "@/lib/colour";
import { gettingStartedCopy, loadingCopy } from "@/lib/content/concept";
import type { Answers } from "@/lib/validation/concept";
import { DEFAULT_PALETTE } from "@/lib/ai/generate-content";

/** The five personalised build lines (Figma loading-building), from the visitor's answers. */
export function statusLines(a: Answers): string[] {
  const name = a.name ?? gettingStartedCopy.placeholderName;
  const differentiator = (a.q3 ?? "")
    .toLowerCase()
    .replace(/\b(a|an|the)\s+/g, "")
    .replace(/[.!?]+$/, "")
    .trim();
  const hexes = a.q7?.palette?.length ? a.q7.palette : [DEFAULT_PALETTE.primary, DEFAULT_PALETTE.accent];
  const colours = describeColours(hexes.map((hex) => ({ hex, name: nearestName(hex) })));
  const source = loadingCopy.colourSource[a.q7?.mode ?? "none"];
  const [readLine, headlineLine, colourLine, ctaLine, finalLine] = loadingCopy.statuses;
  return [
    fill(readLine, { name }),
    differentiator ? fill(headlineLine, { differentiator }) : loadingCopy.headlineFallback,
    fill(colourLine, { colours, colourSource: source }),
    a.q5 ? fill(ctaLine, { cta: a.q5 }) : loadingCopy.ctaFallback,
    finalLine,
  ];
}

/** Figma timeline: line i appears at 3i s and is ticked at 3i + 2.5 s (last stays pending). */
export const LINE_EVERY_MS = 3000;
export const TICK_AFTER_MS = 2500;
export const SLOW_AFTER_MS = 20_000;
