# Phase 1 — Landing page + AI flow with dummy AI
Goal: the full visitor journey works in the browser with FAKE AI, pixel-matched to Figma.
No real AI, database, email, CRM or calendar. Read `docs/rules/ai-flow.md` before 1.5.

## 1.0 Project setup
- This folder is not empty, so: `npx create-next-app@latest _app --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes`,
  then move everything from `_app/` into the root (keep our CLAUDE.md, README.md, docs/, .claude/)
  and delete `_app/`. Merge `.gitignore`. `git init` if no repo, first commit.
- Install: @tanstack/react-query, react-hook-form, zod, @hookform/resolvers, zustand, motion,
  lucide-react. Dev: prettier, prettier-plugin-tailwindcss, @playwright/test (+ chromium).
- `npx shadcn@latest init`, then add only: button, input, textarea, form, label, checkbox, dialog, sonner.
- Add scripts from `docs/stack.md`. Create folder structure from `docs/stack.md`.
- QueryClientProvider in `src/app/providers.tsx`. `.env.example` (empty for now).
- Done when: `npm run check` passes and the default page loads.

## 1.1 Design tokens + fonts
- From the landing frame and the flow frames, pull every colour, font family/weight/size, radius,
  shadow and gradient. Put them in `globals.css` `@theme`. Load fonts with `next/font`.
- If a font isn't on Google Fonts → ASK BILAL for the files.
- Export logo (crown + wordmark) and client logos as SVG to `public/`.

## 1.2 Header + footer
- From "Home new" `58698:3757`. Mobile menu (sheet/drawer) per mobile design or a clean version
  if mobile header is not designed (note it). Links to Phase 4 pages can point to `#` for now.

## 1.3 Landing page sections
- Build every section of `58698:3757` top to bottom as separate components in `src/features/landing/`.
- Images: export from Figma, `next/image`, sensible sizes. Animations as in Figma (subtle), with reduced motion.

## 1.4 Hero prompt
- Rotating examples exactly as `ai-flow.md`. Textarea, 300 max, arrow submit button inside right edge,
  Enter submits. On submit: save text to the concept store and go to `/concept`.

## 1.5 Content file
- Read every flow frame and fill `src/lib/content/concept.ts` with exact question copy, options,
  reactions, status lines, errors, confirmation copy. Also fill the "Exact copy" table in
  `docs/rules/ai-flow.md`. Use the illustrative Fade Factory answers from the handoff as test data.

## 1.6 Mock AI service (`src/lib/ai/`)
```ts
export interface ConceptAI {
  extract(text: string, answers: Answers): Promise<Partial<Answers>>; // pull any answers from free text
  nextStep(answers: Answers): Step;                                    // first missing step, in order
  react(step: Step, answers: Answers): Promise<string>;                // short personal reaction
  clarify(step: Step, attempt: number): string | null;                  // null after 2 attempts
  generate(answers: Answers): Promise<SiteContent>;                     // content for the template
}
```
- `mock.ts` implements it: keyword/regex extraction (name: "X, a … in Y" patterns; location: UK
  towns list + "in <Place>"; services: words after "we do / offer / sell"), canned reactions using
  the business name, ~1s delay, `generate` waits a random 10–20s and fills `SiteContent` from answers.
- `index.ts` exports `getConceptAI()` → returns mock now. Phase 2 swaps it here only.
- API routes `/api/concept/turn`, `/generate`, `/lead` call `getConceptAI()`; validate with Zod.
  `/lead` just logs and returns ok (no storage yet). Client uses React Query mutations.
- Answers type: name | noName, services, location, q1..q7 (q7: {mode: logo|colours|none, palette?, logoDataUrl?}).
- Must skip already-answered steps (e.g. hero prompt "Fade Factory, a barbershop in Manchester" →
  name + what they do + location known → start at Q1, with a short acknowledgement).

## 1.7–1.8 Chat UI (`src/features/concept/`)
- One route `/concept`, steps driven by the Zustand store (persist to localStorage).
- Build each state from its frame: missing name / services / location, unclear input, no-name,
  Q1–Q7 incl. logo upload (client-side only; read palette from the image with a small canvas
  sampler or show picker), colours picker, nothing yet. Typing dots. Progress label.
- aria-live polite on new messages. Enter/Shift+Enter. Auto-scroll to latest. 300 char counter.

## 1.9 Contact form
- RHF + Zod, inline in chat, rules from `ai-flow.md`. Disposable email check with a small local
  domain list. UK phone check (normalise to +44). Opt-in unticked. Privacy link → `#` for now.

## 1.10 Loading / generation
- Desktop: chat slides aside, browser mock builds nav → hero → sections; status list with ticks.
  Mobile: chat fades, status under browser. Over-20s message. Failure state (add `?fail=1` dev
  toggle to test). Reduced-motion version.

## 1.11 Modern template + preview
- Build `Template / modern` as a React template in `src/features/templates/modern/` that takes
  `SiteContent` + palette. It must look like Figma with the demo data. Preview reveal per design,
  slim Royal Creative chrome, label "AI concept — final design by Royal Creative".

## 1.12 CTAs + booking + welcome back (mocked)
- Get this built → confirmation copy by Europe/London time (today / after 5pm / weekend).
- Book a call → calendar UI with fake slots, phone/video choice → confirmation states.
- Returning visitor (store has a finished concept) → homepage returning-visitor state +
  "Welcome back" with original preview. Never re-ask questions.

## 1.13 Verify
- Run `/verify`. Test 10 different business inputs incl. nameless, nonsense and offensive.
- Summary for Bilal + list of anything that differs from Figma and why.
