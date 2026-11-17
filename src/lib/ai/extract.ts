import type { Answers } from "@/lib/validation/concept";
import { ukPlaces } from "./uk-places";

// Keyword / regex extraction used by the mock AI (Phase 2 swaps in a real model).

const ARTICLE = "(?:a|an|the|my|our)";
const LOCATION_LEAD = "(?:in|covering|based in|serving|around|across|near|from)";

const titleCase = (s: string) =>
  s
    .toLowerCase()
    .split(/\s+/)
    .map((w) => (w.length > 2 || w === "st" ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ")
    .replace(/^./, (c) => c.toUpperCase());

const clean = (s: string) =>
  s
    .trim()
    .replace(/^[\s,.;:–—-]+|[\s,.;:!?–—-]+$/g, "")
    .replace(/\s+(?:and|&)$/i, "")
    .replace(/\s+/g, " ");

/** "in Manchester", "covering Kent", or a known UK place anywhere in the text. */
export function extractLocation(text: string): string | undefined {
  const lead = new RegExp(
    `\\b${LOCATION_LEAD}\\s+((?:[A-Z][\\w'’&-]*)(?:\\s+(?:[A-Z][\\w'’&-]*|upon|on|le|de))*)`,
  );
  const m = text.match(lead);
  if (m) return clean(m[1]);
  const lower = ` ${text.toLowerCase()} `;
  const hit = [...ukPlaces]
    .sort((a, b) => b.length - a.length)
    .find((p) => new RegExp(`[^a-z]${p}[^a-z]`).test(lower));
  return hit ? titleCase(hit) : undefined;
}

/** "Fade Factory, a barbershop in Manchester" → "Fade Factory". Also "we're X", "called X". */
export function extractName(text: string): string | undefined {
  const t = text.trim();
  // "Name, a/an … " or "Name, plural trade covering/in …"
  const comma =
    t.match(new RegExp(`^([^,]{2,60}),\\s*${ARTICLE}\\b`, "i")) ??
    t.match(new RegExp(`^([^,]{2,60}),\\s*[a-z][^,]*?\\s+${LOCATION_LEAD}\\b`));
  if (comma && /[A-Z]/.test(comma[1])) return clean(comma[1]);
  const called = t.match(/\b(?:called|named|business is|company is|we're|we are|i run|i own)\s+([A-Z][\w'’&.-]*(?:\s+(?:&|and|[A-Z][\w'’&.-]*))*)/);
  if (called) return clean(called[1]);
  const isA = t.match(new RegExp(`^([A-Z][\\w'’&.-]*(?:\\s+(?:&|and|[A-Z][\\w'’&.-]*)){0,5})\\s+(?:is|are)\\s+${ARTICLE}\\b`));
  if (isA) return clean(isA[1]);
  return undefined;
}

/** "…, a barbershop in Manchester" → "a barbershop"; "we do / offer / sell X" → X. */
export function extractWhatTheyDo(text: string): string | undefined {
  const t = text.trim();
  const afterName = t.match(
    new RegExp(`(?:^[^,]{2,60},\\s*|\\b(?:is|are)\\s+)(${ARTICLE}\\s+[^,.]+?)(?:\\s+${LOCATION_LEAD}\\b|[,.]|$)`, "i"),
  );
  if (afterName) return clean(afterName[1]);
  const afterComma = t.match(new RegExp(`^[^,]{2,60},\\s*([a-z][^,.]*?)\\s+${LOCATION_LEAD}\\b`));
  if (afterComma) return clean(afterComma[1]);
  // Bare "a barbershop" / "an electrician"
  const bare = t.match(/^((?:a|an)\s+[^,.]+?)(?:[,.]|$)/i);
  if (bare) return clean(bare[1]);
  const verbs = t.match(
    new RegExp(`\\b(?:we|i)\\s+(?:do|offer|sell|make|provide|run|are)\\s+([^.]+?)(?:\\s+${LOCATION_LEAD}\\b|[.]|$)`, "i"),
  );
  if (verbs) return clean(verbs[1]);
  // Leading plural trade without a name: "electricians covering Kent"
  const lead = t.match(new RegExp(`^((?:[a-z][\\w'-]*\\s?){1,5}?)\\s+${LOCATION_LEAD}\\b`));
  if (lead) return clean(lead[1]);
  return undefined;
}

/** Everything we can learn from one free-text message, without overwriting known answers. */
export function extractEssentials(text: string, known: Answers): Partial<Answers> {
  const out: Partial<Answers> = {};
  if (!known.name && !known.noName) {
    const name = extractName(text);
    if (name) out.name = name;
  }
  if (!known.services) {
    const what = extractWhatTheyDo(text);
    if (what) out.services = what;
  }
  if (!known.location) {
    const loc = extractLocation(text);
    if (loc) out.location = loc;
  }
  return out;
}
