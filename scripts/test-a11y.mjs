// QA: keyboard-only path + reduced motion + console errors. node scripts/test-a11y.mjs <baseUrl>
import { chromium } from "@playwright/test";
const base = process.argv[2] ?? "http://localhost:3457";
const b = await chromium.launch({ channel: "chromium" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
const errors = [];
p.on("pageerror", (e) => errors.push(e.message));
p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await p.goto(base + "/", { waitUntil: "networkidle" });
await p.evaluate(() => localStorage.clear());
await p.reload({ waitUntil: "networkidle" });
console.log("reduced-motion placeholder:", await p.locator("section[aria-labelledby=hero-title] form p[aria-hidden]").textContent());
// Tab until the hero textarea is focused
let found = false;
for (let i = 0; i < 25; i++) {
  await p.keyboard.press("Tab");
  const info = await p.evaluate(() => {
    const el = document.activeElement;
    const s = el ? getComputedStyle(el) : null;
    return { tag: el?.tagName, label: el?.getAttribute("aria-label") ?? el?.textContent?.trim().slice(0, 30), outline: s?.outlineStyle !== "none" || s?.boxShadow !== "none" };
  });
  if (i < 0) console.log(`tab ${i + 1}:`, info.tag, JSON.stringify(info.label), info.outline ? "focus-visible" : "NO FOCUS STYLE");
  if (info.tag === "TEXTAREA") { found = true; break; }
}
console.log("reached hero prompt by keyboard:", found);
await p.keyboard.type("We do dog grooming in Crawley");
await p.keyboard.press("Enter");
await p.waitForURL("**/concept");
await p.waitForTimeout(2500);
const ai = await p.locator("main p").allTextContents();
console.log("chat after nameless prompt:", ai.slice(-2));
// keyboard on no-name chip: Tab to it, Enter
for (let i = 0; i < 6; i++) {
  await p.keyboard.press("Tab");
  const t = await p.evaluate(() => document.activeElement?.textContent?.trim());
  if (t === "I haven't got a name yet") { await p.keyboard.press("Enter"); break; }
}
await p.waitForTimeout(2500);
console.log("after no-name chip:", (await p.locator("main p").allTextContents()).slice(-3));
console.log("live region:", await p.locator("[aria-live=polite]").last().textContent());
console.log("reveal spans (should be 0 with reduced motion):", await p.locator(".animate-char-in").count());
console.log("errors:", errors);
await b.close();
