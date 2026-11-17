// Mock-level input checks. Phase 2 replaces these with the AI provider's moderation.

// Small blocklist of clearly abusive / hateful terms (matched as whole words).
const blocked = [
  "fuck", "fucking", "cunt", "nigger", "nigga", "faggot", "retard", "paki", "kike", "spastic",
  "nazi", "rape", "porn", "cocaine", "heroin", "meth",
];

const blockedRe = new RegExp(`\\b(${blocked.join("|")})\\b`, "i");

export function isOffensive(text: string): boolean {
  return blockedRe.test(text);
}

/** Rough "is this an answer at all" test: keyboard mash, no real words, single characters. */
export function isUnclear(text: string): boolean {
  const t = text.trim();
  if (t.length < 2) return true;
  const words = t.toLowerCase().match(/[a-z']+/g) ?? [];
  if (words.length === 0) return true;
  const real = words.filter((w) => /[aeiouy]/.test(w) && !/(.)\1{3,}/.test(w) && w.length < 25);
  if (real.length === 0) return true;
  // keyboard mash like "asdfgh jkl" / "qwerty"
  if (/^(asdf|qwer|zxcv|hjkl|jkl;|sdfg)/.test(t.toLowerCase())) return true;
  const vowelRatio = (t.match(/[aeiouy]/gi)?.length ?? 0) / Math.max(1, t.replace(/\W/g, "").length);
  return vowelRatio < 0.15;
}

const fillers = new Set([
  "hello", "hi", "hey", "hiya", "yo", "test", "testing", "yes", "no", "ok", "okay", "thanks",
  "thank you", "help", "start", "go", "hmm", "um", "idk", "what", "?", "good morning", "good afternoon",
]);

/** Greetings / filler that don't answer a getting-started question ("Hello" in Figma). */
export function isFiller(text: string): boolean {
  return fillers.has(text.trim().toLowerCase().replace(/[!.?,]+$/g, ""));
}
