# Phase 2 — Real AI + all templates
Goal: replace the mock with a real model. UI and API routes stay the same.

## ASK BILAL (before starting)
- Which AI provider (recommended: Anthropic Claude API) and the API key in `.env.local`.
- Monthly spending cap per month.

## Tasks
- [ ] 2.1 `src/lib/ai/real.ts` implementing `ConceptAI`. Keep `mock.ts`; switch with env
      `AI_MODE=mock|real` in `getConceptAI()`.
- [ ] 2.2 Small/fast model for chat turns (extract, react, clarify); larger model for `generate`.
      Check the provider docs for current model names; keep them in env vars, not in code.
- [ ] 2.3 Model must return JSON only; validate every response with Zod. On invalid JSON: retry once,
      then fall back to mock behaviour for that turn. Never show raw model output.
- [ ] 2.4 Prompts in `src/lib/ai/prompts/` as files. System prompt includes the rules from
      `ai-flow.md` (no invented facts, never ask twice, short reactions, offensive input handling).
      The model fills `SiteContent` fields only — it never writes HTML.
- [ ] 2.5 Template choice from Q6 feeling (cosy / modern / bold / premium). Build the other 3
      templates from Figma (IDs in `docs/figma.md`).
- [ ] 2.6 Server-side limits: 300 chars, ~20 messages per session, timeouts (chat 15s, generate 45s),
      graceful failure state.
- [ ] 2.7 Log tokens/cost per session (console + simple JSON log for now).
- [ ] 2.8 Test 20–30 business types; save examples in `docs/ai-samples.md`. Check facts are only
      from the user. Tune prompts.
- [ ] 2.9 `/verify` + summary.
