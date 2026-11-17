# Royal Creative AI — project guide for Claude Code

Next.js site for Royal Creative (royalcreative.co.uk). A visitor describes their business in the
hero prompt, an AI chat asks fixed questions, then shows an AI homepage concept and pushes them
to "Get this built" or "Book a call". Built in phases. The design lives in Figma.

## Start of every session
1. Read `docs/progress.md` → find the current phase and the next unchecked task.
2. Open that phase file in `docs/phases/` and work only on that phase.
3. Before UI work, open the matching Figma frame (IDs in `docs/figma.md`).

## How to work (owner: Bilal)
- Work alone. Run every command yourself (install, lint, type-check, build). Never ask Bilal to run commands.
- Ask Bilal ONLY when: a phase file says "ASK BILAL", Figma and the handoff conflict, or you need
  an API key / account. Otherwise make a sensible choice and note it in `docs/progress.md` → Decisions.
- After each task: run `npm run check` (lint + type-check + build). Fix all errors before moving on.
- After each task: tick it in `docs/progress.md` and add one short line to the log.
- At the end of a phase: run `/verify`, update progress, write a 5-line summary for Bilal
  (what's done, what's mocked, what needs his input). Do NOT start the next phase until he says so.
- Commit after each finished task: `git add -A && git commit -m "<phase>: <task>"`. Never push.
- Keep explanations to Bilal short and in plain words.

## Rules (always apply)
@docs/rules/coding.md
@docs/rules/design.md

Read when relevant (not every session): `docs/stack.md`, `docs/rules/ai-flow.md`, `docs/figma.md`.
