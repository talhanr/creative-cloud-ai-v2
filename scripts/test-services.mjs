// QA: services rows expand on hover (desktop) / tap (mobile). node scripts/test-services.mjs [baseUrl] [outDir]
import { chromium } from "@playwright/test";
const base = process.argv[2] ?? "http://localhost:3457";
const out = process.argv[3] ?? ".";
const b = await chromium.launch({ channel: "chromium" });
for (const [w, touch] of [[1920, false], [1280, false], [1024, false], [390, true]]) {
  const p = await b.newPage({ viewport: { width: w, height: 1700 }, hasTouch: touch, isMobile: touch });
  await p.goto(base + "/", { waitUntil: "networkidle" });
  const title = p.getByRole("button", { name: process.argv[4] ?? "Branding" });
  await p.locator("#services-title").scrollIntoViewIfNeeded();
  if (touch) await title.tap(); else await title.hover();
  await p.waitForTimeout(700);
  const expanded = await title.getAttribute("aria-expanded");
  const sw = await p.evaluate(() => document.documentElement.scrollWidth);
  await p.locator("ul:has(#service-panel-0)").screenshot({ path: `${out}/services-${w}.png` });
  console.log(`${w}px expanded=${expanded} scrollWidth=${sw}`);
  await p.close();
}
await b.close();
