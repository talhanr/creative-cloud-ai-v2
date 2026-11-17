# Progress
CURRENT PHASE: Phase 1

| Phase | File | Status |
|---|---|---|
| 1 Landing + AI flow with dummy AI | phases/phase-1-landing-dummy-ai.md | CURRENT |
| 2 Real AI + all templates | phases/phase-2-real-ai.md | todo |
| 3 Complete the flow (leads, email, CRM, booking, security) | phases/phase-3-complete-flow.md | todo |
| 4 Other website pages | phases/phase-4-other-pages.md | todo |
| 5 Launch (SEO, performance, deploy, QA) | phases/phase-5-launch.md | todo |

## Phase 1 tasks
- [x] 0.9 Check docs/figma.md IDs against live Figma, fix wrong ones
- [x] 1.0 Project setup
- [x] 1.1 Design tokens + fonts
- [x] 1.2 Header + footer
- [x] 1.3 Landing page sections
- [x] 1.4 Hero prompt (rotating examples, submit → /concept)
- [ ] 1.5 Content file: exact copy from Figma
- [x] 1.6 Mock AI service
- [ ] 1.7 Chat shell + Getting started states
- [ ] 1.8 Q1–Q7 (incl. Q7 branding sub-states)
- [ ] 1.9 Contact form
- [ ] 1.10 Loading / generation states
- [ ] 1.11 Modern template + preview reveal
- [ ] 1.12 CTA, booking and welcome-back states (mocked)
- [ ] 1.13 /verify and phase summary

(Claude: copy the task list of the next phase here when it starts.)

## Decisions
<!-- date — decision — reason. Also Bilal's answers to "ASK BILAL" questions. -->
- 2026-11-17 — Current landing page is "Home new" `58698:3757`; `3277:227` is old, ignore — Bilal confirmed.
- 2026-11-17 — Desktop default hero = hero section of `58698:3757` (no separate 1440 frame exists) — Bilal confirmed.
- 2026-11-17 — Desktop focused-input state: follow mobile `59016:23839` behaviour + desktop hero styling — Bilal confirmed.
- 2026-11-17 — Before task 1.0: check all IDs in docs/figma.md against the live Figma file and fix wrong ones.
- 2026-11-17 — Scaffolded in `app-tmp/` not `_app/` — npm rejects names starting with `_`. Next.js 16.4.6, React 19.3, Tailwind 4.3.
- 2026-11-17 — shadcn base-nova has no `form` component; added `field` (its replacement) and use it with React Hook Form. Also pulled in `separator` (field needs it).
- 2026-11-17 — shadcn added deps `cn` (shadcn's own clsx+tailwind-merge replacement, checked: official maintainer, no install scripts), `@base-ui/react`, `class-variance-authority`, `tw-animate-css`, `sonner`, `next-themes`, `shadcn` — all required by the shadcn components.
- 2026-11-17 — `typecheck` script runs `next typegen` first so Next's generated types (LayoutProps) exist before tsc.
- 2026-11-17 — Fonts: Inter + Stack Sans Headline (both Google Fonts, no files needed). Build warns Next can't make a fallback for Stack Sans Headline — harmless.
- 2026-11-17 — Client logos in Figma are raster PNGs, not vectors, so exported as PNG (public/landing/white-logo-ink*.png). Royal Creative logo + crown symbol exported as SVG (public/brand/).
- 2026-11-17 — Site is dark-only: shadcn semantic colours mapped to Figma tokens in :root, no light theme.
- 2026-11-17 — Header: no mobile landing header in Figma → pill bar with menu button opening a right-hand sheet (brand tokens). Marketing dropdown not designed → simple list of marketing service pages. Phase 4 links → "#".
- 2026-11-17 — "Call Now" has no phone number in Figma → links to "#". ASK BILAL for the number.
- 2026-11-17 — Hero examples: handoff list (Harbour Café…) used, not the placeholder lines in the landing frame ("Modern construction website…"). Handoff wins per ai-flow.md.
- 2026-11-17 — Below 1024px the hero follows the mobile focused-input frame 59016:23839 (44px semibold title, 2px #ff8658 focus border, 48px gradient submit). Desktop keeps the landing hero styling. Mobile frame subtitle says "homepage concept"; desktop says "website concept" — used desktop copy everywhere (one string).
- 2026-11-17 — Prompt border: Figma's rotated outline SVGs export with a 32×32 viewBox that clips as <img>, so the four cross-fading gradient outlines are CSS (same colours/directions/timings).
- 2026-11-17 — Figma's "arrow-right" SVG path points left (flipped on the instance) → mirrored with CSS.
- 2026-11-17 — Loops simplified where Figma's prototype jumps: client logos + marquee bands loop seamlessly; projects auto-advance every 6s (pause on hover/focus); showcase columns follow Figma's 15s move + 3s hold. All off with reduced motion (projects then stack).
- 2026-11-17 — Gotcha: `cn()` treats custom `text-<token>` size utilities (text-display-m, text-h1…) as colours and drops them when a colour class follows. Keep size and colour classes in separate cn calls/elements.
- 2026-11-17 — QA helpers in scripts/: serve.sh (restart prod server on :3456), shot.mjs (full-page screenshot), test-prompt.mjs (hero prompt behaviour).
- 2026-11-17 — Mock AI: every visitor message (incl. taps: no-name, Skip, Q5 option, Q7 confirm) goes through POST /api/concept/turn → runTurn() (src/lib/ai/turn.ts). Q7 branding is picked in the UI and sent with the answers.
- 2026-11-17 — Copy NOT in Figma, written by Claude (Bilal to approve): clarification lines for Q1–Q6 ("Sorry, I didn't quite catch that…"), Q4 answered reaction, session-limit line, upload errors, Q5 answers for Call/Order/Visit/Enquire (only "Book" → "Book an appointment" is in Figma), sending/server-error lines. All in src/lib/content/concept.ts.
- 2026-11-17 — Reactions generalise the Figma demo lines with the visitor's own words (e.g. Q2 "{answer} — I'll keep them in mind."); Figma's Q2 line "A fresh cut for your Manchester neighbours…" needs real AI wording (Phase 2).
- 2026-11-17 — Mock generator (src/lib/ai/generate-content.ts) fills the modern template only from answers; darker chosen colour becomes primary. Figma demo copy kept as a fixture (src/features/templates/demo-content.ts). Dev-only QA page /dev/template (404 in production).

## Log
<!-- date — task — one line -->
- 2026-11-17 — 0.9 — All figma.md IDs valid on live page (109 nodes); added 14 missing campaign-part/component IDs.
- 2026-11-17 — 1.0 — Next.js app set up, deps + shadcn installed, folders, providers, `npm run check` passes.
- 2026-11-17 — 1.1 — Figma tokens in globals.css @theme, Inter + Stack Sans Headline via next/font, logo + landing assets exported.
- 2026-11-17 — 1.2 — Floating pill header (desktop nav + Marketing dropdown, mobile sheet) and footer from Figma.
- 2026-11-17 — 1.3 — All landing sections built (hero glow, logos, showcase, services, projects, about, testimonials, marquee, CTA); 1920 page 9484px vs Figma 9424.
- 2026-11-17 — 1.4 — Hero prompt: handoff examples typed 40ms/held 2s/deleted 20ms, focus clears, blur resumes, Enter submits → /concept with text in store, reduced-motion static text. Tested with Playwright.
- 2026-11-17 — 1.6 — Mock AI: extractor (name / what they do / location), filler + nonsense + offensive checks, turn engine, generator, API routes with Zod. Demo conversation reproduces Figma copy exactly (scripts/test-turns.mjs).
