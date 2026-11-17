import type { Answers } from "@/lib/validation/concept";
import type { Palette, SiteContent } from "./types";

// Mock generator: fills the template from the visitor's own words only.
// Phase 2 replaces this with the real model (same SiteContent shape).

export const DEFAULT_PALETTE: Palette = { primary: "#17324D", accent: "#D8A84E" };
export const PLACEHOLDER_NAME = "Your Business Name";
export const REVIEW_PLACEHOLDER = "Your customer review here";

const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);
const low = (s: string) => (s && !/^[A-Z]{2}/.test(s) ? s[0].toLowerCase() + s.slice(1) : s);
const stripEnd = (s: string) => s.trim().replace(/[.!?]+$/, "");
const stripArticle = (s: string) => s.replace(/^(a|an|the)\s+/i, "");

/** "Skin fades, beard trims and hot towel shaves" → ["Skin fades","Beard trims","Hot towel shaves"] */
export function splitList(text: string | undefined, max = 3): string[] {
  if (!text) return [];
  return stripEnd(text)
    .split(/\s*(?:,|;|\band\b|&|\+)\s*/i)
    .map((s) => cap(s.trim()))
    .filter((s) => s.length > 1)
    .slice(0, max);
}

const joinList = (items: string[]) =>
  items.length <= 1 ? (items[0] ?? "") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
/** Sentence-case list: first item keeps its capital, the rest are lower-cased. */
const joinSentence = (items: string[]) => joinList(items.map((s, i) => (i === 0 ? s : low(s))));
/** List used mid-sentence: every item lower-cased. */
const joinInline = (items: string[]) => joinList(items.map(low));

function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

/** Darker colour becomes `primary` (text/backgrounds on cream), lighter becomes `accent`. */
export function paletteFrom(colours: string[] | undefined): Palette {
  if (!colours || colours.length === 0) return DEFAULT_PALETTE;
  if (colours.length === 1) {
    const c = colours[0];
    return luminance(c) > 0.35
      ? { primary: DEFAULT_PALETTE.primary, accent: c }
      : { primary: c, accent: DEFAULT_PALETTE.accent };
  }
  const [a, b] = [...colours.slice(0, 2)].sort((x, y) => luminance(x) - luminance(y));
  return { primary: a, accent: b };
}

export function buildSiteContent(answers: Answers): SiteContent {
  const isPlaceholderName = !answers.name;
  const name = answers.name ?? PLACEHOLDER_NAME;
  const location = answers.location ? cap(answers.location) : null;
  const tradeFull = stripEnd(answers.services ?? "business");
  const trade = stripArticle(tradeFull);
  const services = splitList(answers.q1);
  const serviceItems = services.length ? services : [cap(trade)];
  const audience = low(stripEnd(answers.q2 ?? "people who need what you do"));
  const diffParts = splitList(answers.q3, 2);
  const headline = (diffParts.length ? diffParts : [cap(trade)]).map((p) => `${cap(p)}.`);
  const cta = cap(stripEnd(answers.q5 ?? "Get in touch"));
  const feelings = splitList(answers.q6, 3);
  const valuePatterns = ["{w} in style.", "{w} in feel.", "{w} by nature."];
  const where = location ? `, ${location}` : "";
  const servicesSentence = joinSentence(serviceItems);

  return {
    businessName: name,
    isPlaceholderName,
    location,
    palette: paletteFrom(answers.q7?.palette),
    logoDataUrl: answers.q7?.mode === "logo" ? (answers.q7.logoDataUrl ?? null) : null,
    cta,
    nav: ["Services", "The experience", ...(location ? [location] : [])],
    hero: {
      eyebrow: location ? `Your ${location} ${trade}` : `Your ${trade}`,
      headline,
      body: `${servicesSentence} for ${audience}. Welcome to ${name}${where}.`,
      composition: {
        caption: [location, name].filter(Boolean).join(" / ").toUpperCase(),
        words: [`${(diffParts[0] ?? trade).split(/\s+/)[0].toUpperCase()}.`, "WELCOME."],
        tagline: headline.join(" ").toUpperCase(),
      },
    },
    serviceBand: serviceItems,
    services: {
      eyebrow: "The services",
      title: `What ${name} offers.`,
      items: serviceItems.map((s) => ({
        word: s.split(/\s+/)[0].toUpperCase().slice(0, 8),
        title: s,
        body: `${s}, with ${joinInline(diffParts) || `the care of a local ${trade}`}.`,
      })),
    },
    feature: {
      statement: ["Detail", "matters."],
      eyebrow: diffParts[0] ?? "What sets us apart",
      title: `${cap(diffParts[0] ?? trade)} come first.`,
      body: `${cap(stripEnd(answers.q3 ?? `A ${trade} you can rely on`))}. That's what sets ${name} apart.`,
    },
    experience: {
      eyebrow: "The experience",
      title: feelings.length ? `${joinSentence(feelings)}.` : `Made for ${audience}.`,
      body: `${name} is for ${audience}. ${servicesSentence}, with ${joinInline(diffParts) || "care"}.`,
      values: feelings.map((w, i) => valuePatterns[i].replace("{w}", cap(w))),
    },
    booking: {
      eyebrow: "Your next step",
      title: "Ready when you are.",
      body: `Choose what you're looking for and ${low(cta)}.`,
      steps: [
        { title: "Choose your service", body: `${servicesSentence}.` },
        { title: cta, body: "Use the button to get started." },
        { title: "Leave the rest to us", body: `${headline.join(" ")}` },
      ],
    },
    place: location
      ? {
          eyebrow: location,
          title: `Your local ${trade}.`,
          body: `${name} is ${tradeFull.match(/^(a|an|the)\s/i) ? tradeFull : `a ${tradeFull}`} in ${location}, for ${audience}.`,
          cardTitle: `${location}.`,
          cardLines: [name, `Your ${trade}.`],
        }
      : null,
    review: {
      eyebrow: "Customer stories",
      title: REVIEW_PLACEHOLDER,
      body: "A space for a customer’s own words, added when you share a review with us.",
    },
    closing: {
      title: `Ready to ${low(cta)}?`,
      body: `${headline.join(" ")} ${name}${where}.`,
    },
    footer: {
      lines: [...(location ? [location] : []), serviceItems.join(" · ")],
      links: ["Services", cta],
    },
  };
}
