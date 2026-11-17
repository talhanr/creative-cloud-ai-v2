---
description: Close the current phase and start the next one
---
1. Confirm every task of the CURRENT phase is ticked in `docs/progress.md`. If not, list what is
   left and stop.
2. Run the `/verify` steps. Fix anything that fails.
3. In `docs/progress.md`, mark the phase DONE (with date) and set the next phase as CURRENT.
4. Commit: `git commit -am "close <phase>"`.
5. Then follow the `/start-phase` steps for the new phase.
