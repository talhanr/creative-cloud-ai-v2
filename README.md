# Royal Creative AI — how to start (for Bilal)

1. Put this folder where you keep projects and open a terminal in it.
2. One time only: connect Figma
   `claude mcp add --transport http figma https://mcp.figma.com/mcp`
   then start `claude`, type `/mcp`, choose figma → Authenticate.
3. Start Claude Code: `claude`
4. Type `/start-phase` — it reads the plan and builds the current phase.
5. When it says the phase is done, check it in the browser (`npm run dev` — it will tell you the URL).
6. Happy? Type `/next-phase`. Want changes? Just tell it in plain words.

Other commands:
- `/verify` — full check (lint, types, build, design compare) for the current phase
- `/status` — short summary of where the project is

Phases: see `docs/progress.md`.
