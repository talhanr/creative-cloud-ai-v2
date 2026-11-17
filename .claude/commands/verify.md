---
description: Full quality check of the current phase
---
1. `npm run check` (lint + type-check + build). Fix every error and warning you introduced.
2. Start the dev server and check every page/state of the CURRENT phase at 1440px and 390px with
   Playwright screenshots. Compare against the Figma frames in `docs/figma.md` (get_screenshot).
   Fix visible differences in spacing, font, colour, size, alignment.
3. Check: keyboard only, visible focus, reduced motion, loading/error/empty states, no console errors.
4. Review the phase diff: dead code, duplicated logic, secrets, `any`, unexplained TODOs.
5. Report to Bilal in max 6 short lines: passed / fixed / still open.
