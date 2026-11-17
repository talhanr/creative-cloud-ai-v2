# Stack

| Area | Choice | Notes |
|---|---|---|
| Framework | Next.js (latest stable, App Router), React, TypeScript strict | `src/` dir, `@/*` alias |
| Styling | Tailwind CSS v4 | Design tokens in `src/app/globals.css` (`@theme`), no hard-coded colours in components |
| UI kit | shadcn/ui | Install only components you use. Restyle to Figma, don't keep shadcn defaults |
| Server state | TanStack Query | All `/api/*` calls go through hooks in `src/features/*/api.ts` |
| Forms | React Hook Form + Zod | Zod schemas in `src/lib/validation/`, shared by client + API routes |
| Client state | Zustand (+ persist) | Chat/concept session state only |
| Motion | Framer Motion (`motion` package) | Always add a reduced-motion version |
| Icons | lucide-react | Brand/Figma icons as SVG components in `src/components/icons/` |
| Fonts | `next/font` | Exact families/weights from Figma. Self-host if not on Google Fonts (ASK BILAL for files) |
| Lint/format | ESLint (Next config) + Prettier + prettier-plugin-tailwindcss | |
| Visual QA | Playwright (screenshots only, dev dependency) | |

Later phases (decided at phase start, see phase files): AI provider SDK, database, email, CRM,
calendar, bot protection, rate limiting, analytics.

## package.json scripts (create in Phase 1)
- `dev`, `build`, `start`
- `lint` → eslint
- `typecheck` → `tsc --noEmit`
- `format` → prettier --write .
- `check` → `npm run lint && npm run typecheck && npm run build`

## Folder structure
```
src/
  app/
    (marketing)/page.tsx        # landing "/"
    concept/page.tsx            # whole AI flow on ONE route
    api/concept/turn/route.ts
    api/concept/generate/route.ts
    api/concept/lead/route.ts
    layout.tsx, globals.css
  components/
    ui/                         # shadcn components (restyled)
    layout/                     # header, footer, nav
    icons/
  features/
    landing/                    # landing sections
    concept/                    # chat UI, steps, contact form, loading, preview
      components/ hooks/ store.ts api.ts
    templates/                  # generated-site templates (modern, cosy, bold, premium)
  lib/
    ai/                         # ConceptAI interface + implementations (mock now, real later)
    validation/                 # zod schemas
    content/                    # copy, questions, examples (single source of truth)
    utils.ts
public/                         # images, logos exported from Figma
```
Phase 4 pages go under `src/app/(marketing)/<page>/page.tsx`.
