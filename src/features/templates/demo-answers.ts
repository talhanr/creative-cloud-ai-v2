import type { Answers } from "@/lib/validation/concept";

// Handoff "Illustrative answers · single source of truth" (59015:22306). Test data only.
export const demoAnswers: Answers = {
  name: "Fade Factory",
  services: "a barbershop",
  location: "Manchester",
  q1: "Skin fades, beard trims and hot towel shaves",
  q2: "Local customers looking for a fresh cut",
  q3: "Precise fades and a relaxed welcome",
  q4Skipped: true,
  q5: "Book an appointment",
  q6: "Bold, modern and welcoming",
  q7: { mode: "logo", palette: ["#17324D", "#D8A84E"], logoName: "fade-factory-logo.svg" },
};

export const demoContact = {
  name: "Alex Taylor",
  email: "alex@example.com",
  phone: "07700 900123",
} as const;
