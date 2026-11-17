import type { SiteContent } from "@/lib/ai/types";

// Exact copy from Figma "Template / modern — Desktop" 59015:21625 (Fade Factory demo answers).
// Used for visual QA against Figma and as the shape reference for the mock generator.
export const demoSiteContent: SiteContent = {
  businessName: "Fade Factory",
  isPlaceholderName: false,
  location: "Manchester",
  palette: { primary: "#17324D", accent: "#D8A84E" },
  logoDataUrl: null,
  cta: "Book an appointment",
  nav: ["Services", "The experience", "Manchester"],
  hero: {
    eyebrow: "Your Manchester barbershop",
    headline: ["Precise fades.", "A relaxed welcome."],
    body: "Skin fades, beard trims and hot towel shaves for local customers looking for a fresh cut. Welcome to Fade Factory, Manchester.",
    composition: {
      caption: "MANCHESTER / FADE FACTORY",
      words: ["CUT.", "RESET."],
      tagline: "PRECISE FADES. RELAXED WELCOME.",
    },
  },
  serviceBand: ["Skin fades", "Beard trims", "Hot towel shaves"],
  services: {
    eyebrow: "The services",
    title: "Find your fresh cut.",
    items: [
      { word: "FADE", title: "Skin fades", body: "A fresh cut with precise fades at the centre of it." },
      {
        word: "SHAPE",
        title: "Beard trims",
        body: "Bring your beard into the picture with a trim to complete your look.",
      },
      { word: "RESET", title: "Hot towel shaves", body: "A hot towel shave, with the same relaxed welcome." },
    ],
  },
  feature: {
    statement: ["Detail", "matters."],
    eyebrow: "Precise fades",
    title: "The fade is the focus.",
    body: "Precise fades are at the heart of Fade Factory. From a fresh skin fade to the shape of your cut, this is the detail at the centre of your visit.",
  },
  experience: {
    eyebrow: "The experience",
    title: "Sharp cut. Easy atmosphere.",
    body: "A relaxed welcome is as much a part of Fade Factory as a precise fade. Come in for your next fresh cut, beard trim or hot towel shave, and feel at home.",
    values: ["Bold in style.", "Modern in feel.", "Welcoming by nature."],
  },
  booking: {
    eyebrow: "Your next appointment",
    title: "Make room for a fresh cut.",
    body: "Choose the service you're looking for and book an appointment. Bring an idea for your cut, or tell us what you have in mind when you arrive.",
    steps: [
      { title: "Choose your service", body: "Skin fade, beard trim or hot towel shave." },
      { title: "Book an appointment", body: "Use the booking button to arrange your visit." },
      { title: "Make yourself at home", body: "A precise fade and a relaxed welcome." },
    ],
  },
  place: {
    eyebrow: "Manchester",
    title: "Your local fresh cut.",
    body: "Fade Factory is a barbershop in Manchester, for local customers looking for a fresh cut. Book an appointment for skin fades, beard trims and hot towel shaves.",
    cardTitle: "Manchester.",
    cardLines: ["Fade Factory", "Your barbershop. Your fresh cut."],
  },
  review: {
    eyebrow: "Customer stories",
    title: "Your customer review here",
    body: "A space for a customer’s own words, added when you share a review with us.",
  },
  closing: {
    title: "Ready for your next fresh cut?",
    body: "Precise fades. A relaxed welcome. Fade Factory, Manchester.",
  },
  footer: {
    lines: ["Manchester", "Skin fades · Beard trims · Hot towel shaves"],
    links: ["Services", "Book an appointment"],
  },
};
