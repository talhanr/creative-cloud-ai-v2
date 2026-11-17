# Design rules
- Figma is the source of truth. Match spacing, font sizes, weights, line heights, colours, radii,
  shadows and layout exactly. Use `get_design_context` + `get_screenshot` for each frame you build.
- Tokens first: colours, fonts, spacing, radii from Figma go into `globals.css` `@theme`.
  Components use tokens only.
- Desktop frames are 1440 (landing is 1920). Mobile frames are 390. Build mobile-first and make
  the in-between widths look intentional (no broken layouts at 768/1024/1280).
- Export logos/icons/illustrations from Figma as SVG/WebP into `public/`. Use `next/image`.
- Use real text from Figma. Never invent testimonials, ratings, prices, awards or addresses.
- Motion: follow the timings in the Figma handoff. Every animation needs a reduced-motion version.
- Accessibility: visible keyboard focus, 44px touch targets on mobile, 16px min input text,
  labels on all inputs, aria-live for chat/loading updates, colour contrast AA.
- If Figma has an obvious UX problem, build it as designed and list the issue for Bilal.
