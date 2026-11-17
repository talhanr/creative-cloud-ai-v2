import type { Answers, QuestionStep } from "@/lib/validation/concept";

export type { Answers, QuestionStep };

export type Palette = {
  /** Main brand colour (Figma demo navy #17324D). */
  primary: string;
  /** Highlight colour (Figma demo gold #D8A84E). */
  accent: string;
};

/**
 * Content a generated-site template renders. Only facts the visitor gave — no invented
 * reviews, prices, hours, awards or street addresses.
 * Shape follows Figma "Template / modern" 59015:21625 section by section.
 */
export type SiteContent = {
  businessName: string;
  /** True when the visitor has no name yet → logo spot reads "Your Business Name". */
  isPlaceholderName: boolean;
  location: string | null;
  palette: Palette;
  logoDataUrl: string | null;
  /** Primary call to action (Q5), e.g. "Book an appointment". */
  cta: string;
  nav: string[];
  hero: {
    eyebrow: string;
    headline: string[];
    body: string;
    composition: { caption: string; words: string[]; tagline: string };
  };
  serviceBand: string[];
  services: {
    eyebrow: string;
    title: string;
    items: { word: string; title: string; body: string }[];
  };
  feature: { statement: string[]; eyebrow: string; title: string; body: string };
  experience: { eyebrow: string; title: string; body: string; values: string[] };
  booking: { eyebrow: string; title: string; body: string; steps: { title: string; body: string }[] };
  place: { eyebrow: string; title: string; body: string; cardTitle: string; cardLines: string[] } | null;
  review: { eyebrow: string; title: string; body: string };
  closing: { title: string; body: string };
  footer: { lines: string[]; links: string[] };
};

export interface ConceptAI {
  /** Pull any answers out of free text (e.g. name / what they do / location from the hero prompt). */
  extract(text: string, answers: Answers): Promise<Partial<Answers>>;
  /** First missing step, in order. Null when everything is answered. */
  nextStep(answers: Answers): QuestionStep | null;
  /** Short personal reaction to the answer just given. */
  react(step: QuestionStep, answers: Answers): Promise<string>;
  /** Clarification prompt for an unclear answer, or null after 2 attempts. */
  clarify(step: QuestionStep, attempt: number): string | null;
  /** Content for the template. */
  generate(answers: Answers): Promise<SiteContent>;
}
