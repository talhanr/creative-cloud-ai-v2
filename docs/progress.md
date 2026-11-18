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
- [x] 1.5 Content file: exact copy from Figma
- [x] 1.6 Mock AI service
- [x] 1.7 Chat shell + Getting started states
- [x] 1.8 Q1–Q7 (incl. Q7 branding sub-states)
- [x] 1.9 Contact form
- [x] 1.10 Loading / generation states
- [x] 1.11 Modern template + preview reveal
- [x] 1.12 CTA, booking and welcome-back states (mocked)
- [x] 1.13 /verify and phase summary

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
- 2026-11-17 — "Get this built" frames (today / after 5pm / weekend) have identical text in Figma → kept Figma heading/body and added the handoff's time-based call line ("Brilliant! We'll give you a call today…" / "first thing tomorrow" / "first thing Monday").
- 2026-11-17 — Preview reveal frame shows a Lora-font variant of the Fade Factory page ("The art of a fade.", "Grooming, considered.") that differs from "Template / modern". Phase spec says modern → preview renders the modern template. Flag for Bilal.
- 2026-11-17 — Figma copy kept verbatim but flagged for Bilal: "…and the next steps" (no full stop); "please check your email for verification" (lowercase); "Illustrative available slots · UK time" / "Illustrative scheduled slot" read like design notes; "Testimonals" spelling on landing.
- 2026-11-17 — Chat history: full history kept; only the latest exchange shows by default with "↑ View earlier messages" (Figma Q2+). AI text fades in letter by letter over 1s (Figma motion); typing dots pulse 2s.
- 2026-11-18 — Landing looked zoomed-in on laptops (built from 1920 frame in fixed px). Landing px → rem; on ≥1024 the root font-size follows the viewport (`clamp(81.25%, 0.8333vw, 100%)`, only on pages with `data-fluid-root`), so 1920 matches Figma 1:1 and smaller screens keep its proportions. Sections now keep side padding at 1280–1700 (were touching edges). Mobile unchanged; /concept flow untouched.
- 2026-11-18 — Bilal: still too big → root now `clamp(75%, 0.729vw, 87.5%)` (1920 → 14px, ≤1646 → 12px) and landing content column 90rem (header, showcase, sections, footer) for more side space. Landing is now intentionally smaller than Figma 1:1.
- 2026-11-18 — Bilal: services too big → row titles 80→56px, row padding 40→24px, open panel shorter, body 28→22px, image 688→480px wide (fits inside open row). Smaller than Figma on purpose.
- 2026-11-18 — Bilal: less side space → landing content column 90rem → 104rem (1440: ~96px each side, 1920: ~232px).
- 2026-11-17 — Q7 colours: picker opens inline in the colours card (Figma shows an extra "Let's set the exact shades…" AI bubble first — skipped to keep the card in one place). Logo upload is client-side only; logo never sent to the server, saved in localStorage only if under ~1.5MB. Upload before-state ("Upload your logo" button) isn't in Figma — built in the same card style.
- 2026-11-17 — Q5: composer still shown so visitors can type their own action (Figma shows it too).
- 2026-11-17 — Contact header shows "One last step" + dots on both default and error states (Figma default shows dots only).
- 2026-11-17 — Template made responsive with container queries (@container) so the preview's Desktop/Tablet/Mobile toggle reflows it inside the browser frame. Device toggle hidden on phones.
- 2026-11-17 — Saved-concept mini card uses Inter (Figma uses Lora there, matching its Lora preview variant) — kept one font family with the modern template.
- 2026-11-17 — Booking: fake slots = weekdays from tomorrow for 4 weeks at 09:30 / 10:30 / 14:00 (Figma times). Bank holidays not handled (Phase 3, ASK BILAL).
- 2026-11-17 — Next 16 keeps the previous page mounted but hidden — QA scripts must target :visible elements. Next dev badge turned off (devIndicators: false) because it covers the mobile Skip pill.
- 2026-11-17 — Dev toggle: /concept?fail=1 makes generation fail (non-production only).
- 2026-11-17 — Verify: QA scripts in scripts/ — test-flow (full journey), test-cta (CTAs/booking/returning), test-a11y (keyboard + reduced motion), test-businesses (10 inputs), test-widths (no overflow 390→1920), test-turns, test-prompt. Lead route logs name/email/phone to the server console (Phase 1 "log only") — remove when Phase 3 stores leads.
- 2026-11-17 — Bilal answers: (1) Call Now → "01293 365070", tel:+441293365070, kept in src/lib/content/site.ts (`phone`); header button keeps "Call Now" text (Figma), number shown in mobile menu button + footer "Get in touch". (2) Keep handoff call-back lines. (3) Keep Modern in preview; Phase 2 template choice from Q6 covers the serif variant. (4) Copy fixed: "Testimonials"; "…and the next steps."; phone booking note → "We'll email your homepage link to {email}."; "Illustrative available slots / scheduled slot" removed. (5) Claude-written lines approved for now, tagged "// not from Figma — review before launch" in concept.ts. (6) Bank holidays → treat like weekend: "We'll call you first thing on the next working day." using gov.uk/bank-holidays.json (England & Wales) — Phase 3 task 3.8, not built yet.
- 2026-11-18 — Services hover-expand (prototype 58698:3757) built from Bilal's prototype screenshots: Figma MCP had no access to the file from the new account. Sizes estimated from the screenshots (image 688×480, body 28px, arrow 48px). Image cropped from the screenshot → public/landing/service-maison-wue.webp (536×374, low-res — re-export from Figma when access is back). Figma uses the Branding body + same image for all 5 services → ASK BILAL for real copy/images per service. Mouse hover opens, tap toggles (touch), keyboard focus opens; old hover gradient on titles removed (prototype keeps titles white). Arrow aria-label "Explore {service}" is not from Figma. QA: scripts/test-services.mjs.

## Log
<!-- date — task — one line -->
- 2026-11-17 — 0.9 — All figma.md IDs valid on live page (109 nodes); added 14 missing campaign-part/component IDs.
- 2026-11-17 — 1.0 — Next.js app set up, deps + shadcn installed, folders, providers, `npm run check` passes.
- 2026-11-17 — 1.1 — Figma tokens in globals.css @theme, Inter + Stack Sans Headline via next/font, logo + landing assets exported.
- 2026-11-17 — 1.2 — Floating pill header (desktop nav + Marketing dropdown, mobile sheet) and footer from Figma.
- 2026-11-17 — 1.3 — All landing sections built (hero glow, logos, showcase, services, projects, about, testimonials, marquee, CTA); 1920 page 9484px vs Figma 9424.
- 2026-11-17 — 1.4 — Hero prompt: handoff examples typed 40ms/held 2s/deleted 20ms, focus clears, blur resumes, Enter submits → /concept with text in store, reduced-motion static text. Tested with Playwright.
- 2026-11-17 — 1.6 — Mock AI: extractor (name / what they do / location), filler + nonsense + offensive checks, turn engine, generator, API routes with Zod. Demo conversation reproduces Figma copy exactly (scripts/test-turns.mjs).
- 2026-11-17 — 1.5 — All flow copy from 32 desktop frames in src/lib/content/concept.ts; ai-flow.md exact-copy table filled.
- 2026-11-17 — 1.7 — /concept chat: header (Getting started / dots / One last step), bubbles, composer, typing, earlier-messages, no-name chip + card, live region, retry on error.
- 2026-11-17 — 1.8 — Q1–Q7 incl. Skip, Q5 chips, Q7 chooser / logo upload + palette sampler / colours field + picker / nothing-yet direction.
- 2026-11-17 — 1.9 — Inline contact form: RHF + Zod, disposable-email list, UK phone → +44, unticked opt-in, error summary, first invalid field focused.
- 2026-11-17 — 1.10 — Generation: browser mock builds nav → hero → sections, 5 personalised status lines on Figma timing, over-20s line, failure state, reduced-motion (no mock).
- 2026-11-17 — 1.11 — Modern template from Figma (demo copy fixture matches Figma), mock generator, preview reveal with device toggle, concept label, email notice, "Want changes?" card.
- 2026-11-17 — 1.12 — Get this built (UK callback line by Europe/London time, tested), Book a call calendar + phone/video + confirmations, welcome back + homepage returning link. E2E: scripts/test-flow.mjs, scripts/test-cta.mjs pass at 1440 and 390.
- 2026-11-17 — 1.13 — /verify: check passes; full flow, CTAs, keyboard, reduced motion, 10 businesses, widths 390–1920 all pass. Fixed: "I'm a …" extraction, booking date timezone shift, removed 2 unused SVGs. Phase 1 complete — waiting for Bilal.
- 2026-11-17 — Bilal's Phase 1 feedback applied (phone, copy fixes, tags, bank-holiday task added to Phase 3).
- 2026-11-18 — Services rows expand on hover/tap with body, arrow link and laptop image (Figma prototype); check + widths + a11y pass.
- 2026-11-18 — Project card tag pills hug their text on desktop (were stretching full panel width).
