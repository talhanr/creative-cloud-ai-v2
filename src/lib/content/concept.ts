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
  label: "Tell us about your business", // not from Figma — review before launch
  submitLabel: "Start my website concept", // not from Figma — review before launch
  maxLength: 300,
} as const;

export const chatCopy = {
  studioLabel: "Website studio",
  gettingStarted: "Getting started",
  oneLastStep: "One last step",
  placeholder: "Type your answer…",
  inputLabel: "Your answer", // not from Figma — review before launch
  sendLabel: "Send answer", // not from Figma — review before launch
  enterHint: "Press Enter to send",
  mobileHint: "Type your answer",
  earlier: "↑ View earlier messages",
  typing: "Royal Creative AI is typing", // not from Figma — review before launch
  q5Options: "What should visitors do?", // not from Figma — review before launch
  turnError: "Sorry, that didn't send.", // not from Figma — review before launch
  retry: "Try again", // not from Figma — review before launch
  /** Screen-reader name for the 7-dot progress row. */
  progress: (n: number) => `Question ${n} of 7`, // not from Figma — review before launch
} as const;

/** Getting started (before Q1). */
export const gettingStartedCopy = {
  intro:
    "Great to meet you! Before I start designing, I'd like to get to know your business properly. It'll only take a couple of minutes.",
  /** All three essentials known → reaction, then Q1. */
  essentialsReady: "{name}, {services} in {location}, lovely!",
  askName: "{Services} in {location}, love it! What's your business called?",
  askNameNoContext: "What's your business called?", // not from Figma — review before launch
  noNameOption: "I haven't got a name yet",
  noNameReply:
    "No problem, I'll use a placeholder for now and our team can help you with a name later.",
  placeholderName: "Your Business Name",
  placeholderHint: "We'll carry on once we know what you do and where.",
  askServicesAndLocation: "What does your business do, and where are you based?",
  askServices: "Great name! What does {name} do?",
  askServicesNoName: "What does your business do?", // not from Figma — review before launch
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
  q4: "That's really useful — I'll use it to help people trust you.", // not from Figma — review before launch
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
  { label: "Call", answer: "Call us", action: "calling you" }, // not from Figma — review before launch
  { label: "Order", answer: "Order online", action: "ordering online" }, // not from Figma — review before launch
  { label: "Visit", answer: "Visit us", action: "visiting you" }, // not from Figma — review before launch
  { label: "Enquire", answer: "Send an enquiry", action: "sending an enquiry" }, // not from Figma — review before launch
] as const;

export const clarifyCopy = {
  first: "Sorry, I didn't quite catch that. Could you tell me a little more?", // not from Figma — review before launch
  second: "Just a few words is fine — {question}", // not from Figma — review before launch
  giveUp: "No worries, we can go through that on a call.",
  offensive: "I can't build a homepage around that. Want to tell me about your real business?",
  sessionLimit: "Thanks, that's plenty to go on. Pop your details in and I'll show you your homepage.", // not from Figma — review before launch
} as const;

export const brandingCopy = {
  options: {
    logo: "Yes, I have a logo",
    colours: "I have colours, but no logo",
    none: "Nothing yet",
  },
  logoReply: "I've picked these colours from your logo. Shall I use them?",
  uploadLabel: "Upload your logo", // not from Figma — review before launch
  uploadHint: "PNG, SVG or JPG · up to 5MB",
  uploaded: "✓ Uploaded successfully",
  replace: "Replace file",
  uploadTooBig: "That file is over 5MB. Please choose a smaller one.", // not from Figma — review before launch
  uploadWrongType: "Please upload a PNG, SVG or JPG.", // not from Figma — review before launch
  yes: "Yes",
  change: "Change",
  coloursAsk: "What colours do you use?",
  coloursLabel: "Your colours",
  coloursPlaceholder: "e.g. navy and gold", // not from Figma — review before launch
  openPicker: "Open colour picker",
  addColour: "+ Add colour",
  useColours: "Use colours",
  pickerReply: "Let's set the exact shades for your homepage.",
  editColour: "Edit {colour}",
  closePicker: "Close colour picker", // not from Figma — review before launch
  hex: "HEX",
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
  submitting: "Sending…", // not from Figma — review before launch
  serverError: "Something went wrong sending your details. Please try again.", // not from Figma — review before launch
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
  colourSource: { logo: "from your logo", colours: "you chose", none: "I picked for you" }, // not from Figma — review before launch
  slow: "Nearly there, good design takes a moment…",
  /** Used when the visitor's Q3 / Q5 answer was skipped after clarification. */
  headlineFallback: "Writing your headline…", // not from Figma — review before launch
  ctaFallback: "Adding your main button…", // not from Figma — review before launch
  failure: {
    title: "Your details are safe.",
    body: "Something went wrong on our side, but don't worry, we've got your details and our team will send your homepage over shortly.",
    note: "There's no need to fill anything in again.",
    back: "Back to homepage",
  },
} as const;

export const previewCopy = {
  conceptLabel: "AI concept — final design by Royal Creative",
  emailNotice: "Your concept link has also been sent to {email}.",
  browserTitle: "{name} · Homepage concept",
  devices: { desktop: "Desktop", tablet: "Tablet", mobile: "Mobile" },
  deviceGroup: "Preview size", // not from Figma — review before launch
  getBuilt: "Get this built",
  bookCall: "Book a call",
  changesTitle: "Want changes? That's what our designers are for.",
  changesBody: "Talk through your concept with the Royal Creative team.",
  savedLabel: "{name} · Original homepage concept",
  revealed: "Your homepage concept is ready.", // not from Figma — review before launch
} as const;

/** "Get this built" confirmations. Figma frames share one text; the call line follows the handoff UK rules. */
export const builtCopy = {
  eyebrow: "Your Website Concept",
  title: "We'll be in touch shortly.",
  body: "Thank you for your interest. A member of our team will be in touch to discuss your website and the next steps.",
  callLine: {
    today: "Brilliant! We'll give you a call today to talk through your website.",
    tomorrow: "We'll call you first thing tomorrow.",
    monday: "We'll call you first thing Monday.",
  },
} as const;

export const bookingCopy = {
  title: "Let's talk about {name}.",
  body: "Pick a time that suits you. We already have your contact details.",
  prevMonth: "‹",
  nextMonth: "›",
  prevMonthLabel: "Previous month", // not from Figma — review before launch
  nextMonthLabel: "Next month", // not from Figma — review before launch
  weekdays: ["M", "T", "W", "T", "F", "S", "S"],
  pickDay: "Pick a day to see times.", // not from Figma — review before launch
  callTypeLabel: "How would you like to talk?",
  phone: "Phone",
  video: "Video",
  phoneInfo: "We’ll contact you using your saved details.",
  videoInfo: "Video: a Google Meet link will be emailed to {email}.",
  confirmPhone: "Confirm phone call",
  confirmVideo: "Confirm video call", // not from Figma — review before launch
  confirmedPhone: {
    title: "Your call is booked.",
    when: "{date} · {time} UK time",
    note: "We'll email your homepage link to {email}.",
    body: "We’ll send you a confirmation email with your booking details.",
  },
  confirmedVideo: {
    title: "Your video call is booked.",
    when: "{date} · {time} UK time",
    body: "Your Google Meet link will be emailed to {email}.",
  },
} as const;

export const returningCopy = {
  homeLink: "You've already got a homepage concept. View it here.",
  welcomeBack: "Welcome back! Here's the homepage we designed for {name}.",
} as const;
