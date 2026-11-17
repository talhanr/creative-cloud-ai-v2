// AI concept flow copy — single source of truth.
// Source: Figma handoff board 59015:22306 + flow frames (docs/figma.md). Filled in task 1.5.

export const heroPrompt = {
  // Handoff: "Use these exact examples, in order".
  examples: [
    "Harbour Café, a family-run café in Whitstable",
    "Fade Factory, a barbershop in Manchester",
    "Bright Sparks Electrical, electricians covering Kent",
    "Bloom & Co, a wedding florist in Brighton",
    "Iron Core Fitness, a personal training studio in Leeds",
  ],
  typeMs: 40,
  holdMs: 2000,
  deleteMs: 20,
  staticPlaceholder: "Tell us about your business…",
  label: "Tell us about your business",
  submitLabel: "Start my website concept",
  maxLength: 300,
} as const;
