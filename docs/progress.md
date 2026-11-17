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
- [ ] 1.2 Header + footer
- [ ] 1.3 Landing page sections
- [ ] 1.4 Hero prompt (rotating examples, submit → /concept)
- [ ] 1.5 Content file: exact copy from Figma
- [ ] 1.6 Mock AI service
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

## Log
<!-- date — task — one line -->
- 2026-11-17 — 0.9 — All figma.md IDs valid on live page (109 nodes); added 14 missing campaign-part/component IDs.
- 2026-11-17 — 1.0 — Next.js app set up, deps + shadcn installed, folders, providers, `npm run check` passes.
- 2026-11-17 — 1.1 — Figma tokens in globals.css @theme, Inter + Stack Sans Headline via next/font, logo + landing assets exported.
