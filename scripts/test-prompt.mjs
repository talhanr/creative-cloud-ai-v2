// QA: hero prompt behaviour. node scripts/test-prompt.mjs <outdir>
import { chromium } from "@playwright/test";
const out = process.argv[2];
const b = await chromium.launch({ channel: "chromium" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3456/", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
const ex = () => p.locator("#hero-title ~ * p[aria-hidden], form p[aria-hidden]").first().textContent();
console.log("example while idle:", JSON.stringify(await ex()));
const ta = p.locator("form textarea").first();
await ta.focus();
console.log("example visible after focus:", await p.locator("form p[aria-hidden]").first().isVisible().catch(() => false));
await ta.fill("Fade Factory, a barbershop in Manchester");
await p.screenshot({ path: `${out}/prompt-typed.png`, clip: { x: 300, y: 300, width: 840, height: 300 } });
await ta.press("Enter");
await p.waitForURL("**/concept");
console.log("url:", p.url());
console.log("store:", await p.evaluate(() => localStorage.getItem("rc-concept")));
// reduced motion
const r = await b.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
await r.goto("http://localhost:3456/", { waitUntil: "networkidle" });
await r.waitForTimeout(800);
console.log("reduced-motion text:", JSON.stringify(await r.locator("form p[aria-hidden]").first().textContent()));
await r.screenshot({ path: `${out}/hero-390-reduced.png` });
await b.close();
