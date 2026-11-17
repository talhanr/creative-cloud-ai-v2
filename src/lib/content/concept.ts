// AI concept flow copy — single source of truth.
// Source: Figma handoff board 59015:22306 + flow frames (docs/figma.md). Exact text from Figma.
// {name} {services} {location} {answer} are filled in by the mock AI (src/lib/ai/mock.ts).

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

export const chatCopy = {
  studioLabel: "Website studio",
  gettingStarted: "Getting started",
  oneLastStep: "One last step",
  placeholder: "Type your answer…",
  inputLabel: "Your answer",
  sendLabel: "Send answer",
  enterHint: "Press Enter to send",
  earlier: "↑ View earlier messages",
  typing: "Royal Creative AI is typing",
  /** Screen-reader name for the 7-dot progress row. */
  progress: (n: number) => `Question ${n} of 7`,
} as const;

/** Getting started (before Q1). */
export const gettingStartedCopy = {
  intro:
    "Great to meet you! Before I start designing, I'd like to get to know your business properly. It'll only take a couple of minutes.",
  /** All three essentials known → reaction, then Q1. */
  essentialsReady: "{name}, {services} in {location}, lovely!",
  askName: "{Services} in {location}, love it! What's your business called?",
  askNameNoContext: "What's your business called?",
  noNameOption: "I haven't got a name yet",
  noNameReply:
    "No problem, I'll use a placeholder for now and our team can help you with a name later.",
  placeholderName: "Your Business Name",
  placeholderHint: "We'll carry on once we know what you do and where.",
  askServicesAndLocation: "What does your business do, and where are you based?",
  askServices: "Great name! What does {name} do?",
  askServicesNoName: "What does your business do?",
  askLocation: "Where are you based, or which areas do you cover?",
  unclear: "Tell me a bit more. What's your business and what do you do?",
} as const;

/** Fixed questions. Each AI turn = short reaction + blank line + question. */
export const questions = {
  q1: "Tell me more about what you offer. What do people come to you for?",
  q2: "Who are your customers? The more I know about them, the better I can design for them.",
  q3: "What do your customers love most about you? This is what I'll build your homepage around.",
  q4: "Anything that helps people trust you? Years in business, qualifications, awards, or something a customer once said about you.",
  q5: "What should visitors do when they find you?",
  q6: "How do you want people to feel when they land on your website?",
  q7: "Do you already have branding, like a logo or colours you use?",
} as const;

/** Reactions to the answer just given. Figma demo lines generalised with the visitor's words. */
export const reactions = {
  q1: "A clear set of services for {name} — got it.",
  q2: "{Answer} — I'll keep them in mind.",
  q3: "{Answer} — that gives us a strong focus.",
  q4: "That's really useful — I'll use it to help people trust you.",
  q4Skipped: "No problem, we'll leave that out for now.",
  q5: "I'll make {action} the main action.",
  q6: "{Answer} — a clear direction.",
  q7: "Perfect, I've got a clear picture of your business. Pop your details in and I'll show you your new homepage.",
} as const;

export const skipLabel = "Skip";

/**
 * Q5 tap options. Figma shows the five labels and only the "Book" outcome
 * ("Book an appointment" / "booking an appointment"); the others follow the same pattern.
 */
export const mainActions = [
  { label: "Book", answer: "Book an appointment", action: "booking an appointment" },
  { label: "Call", answer: "Call us", action: "calling you" },
  { label: "Order", answer: "Order online", action: "ordering online" },
  { label: "Visit", answer: "Visit us", action: "visiting you" },
  { label: "Enquire", answer: "Send an enquiry", action: "sending an enquiry" },
] as const;

export const clarifyCopy = {
  first: "Sorry, I didn't quite catch that. Could you tell me a little more?",
  second: "Just a few words is fine — {question}",
  giveUp: "No worries, we can go through that on a call.",
  offensive: "I can't build a homepage around that. Want to tell me about your real business?",
  sessionLimit: "Thanks, that's plenty to go on. Pop your details in and I'll show you your homepage.",
} as const;

export const brandingCopy = {
  options: {
    logo: "Yes, I have a logo",
    colours: "I have colours, but no logo",
    none: "Nothing yet",
  },
  logoReply: "I've picked these colours from your logo. Shall I use them?",
  uploadLabel: "Upload your logo",
  uploadHint: "PNG, SVG or JPG · up to 5MB",
  uploaded: "✓ Uploaded successfully",
  replace: "Replace file",
  uploadTooBig: "That file is over 5MB. Please choose a smaller one.",
  uploadWrongType: "Please upload a PNG, SVG or JPG.",
  yes: "Yes",
  change: "Change",
  coloursAsk: "What colours do you use?",
  coloursLabel: "Your colours",
  coloursPlaceholder: "e.g. navy and gold",
  openPicker: "Open colour picker",
  addColour: "+ Add colour",
  useColours: "Use colours",
  pickerReply: "Let's set the exact shades for your homepage.",
  editColour: "Edit {colour}",
  closePicker: "Close colour picker",
  hex: "HEX",
  removeColour: "Remove {colour}",
  noneReply:
    "No problem, I'll choose colours that suit your business and the feel you described.",
  noneTitle: "{Feeling}",
  noneBody:
    "Deep navy brings confident contrast; warm gold keeps the welcome. I'll use a simple {name} name treatment for now.",
  changeColours: "Change colours",
  useDirection: "Use this direction",
  /** Visitor bubble after confirming colours. */
  confirmed: "Yes, use {colours}",
  confirmedDirection: "Use this direction",
} as const;

export const contactCopy = {
  title: "Your details",
  required: "All three fields are required.",
  name: { label: "Name *", placeholder: "Your name", error: "Enter your name." },
  email: {
    label: "Email *",
    placeholder: "you@example.com",
    error: "Enter a valid email address.",
    disposable: "Please use a permanent email address so we can send your homepage link.",
  },
  phone: {
    label: "Phone *",
    placeholder: "Your phone number",
    error: "Enter a complete UK phone number.",
  },
  optIn: "Send me tips and offers from Royal Creative.",
  privacy: "Privacy policy",
  privacyHref: "#",
  summary: "Check the fields above to see your homepage. Your answers are still saved.",
  submit: "Show me my homepage →",
  submitting: "Sending…",
  serverError: "Something went wrong sending your details. Please try again.",
} as const;

export const loadingCopy = {
  title: "Designing your homepage",
  subtitle: "Turning your answers into something real.",
  statuses: [
    "Reading everything you told me about {name}…",
    "Writing your headline around your {differentiator}…",
    "Using the {colours} {colourSource}…",
    "Adding your '{cta}' button…",
    "Putting the finishing touches on…",
  ],
  colourSource: { logo: "from your logo", colours: "you chose", none: "I picked for you" },
  slow: "Nearly there, good design takes a moment…",
  failure: {
    title: "Your details are safe.",
    body: "Something went wrong on our side, but don't worry, we've got your details and our team will send your homepage over shortly.",
    note: "There's no need to fill anything in again.",
    back: "Back to homepage",
  },
} as const;
