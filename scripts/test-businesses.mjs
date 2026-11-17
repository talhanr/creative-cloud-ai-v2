// QA: first-message handling for 10 different businesses. node scripts/test-businesses.mjs [baseUrl]
const base = process.argv[2] ?? "http://localhost:3457";
const inputs = [
  "Harbour Café, a family-run café in Whitstable",
  "Bright Sparks Electrical, electricians covering Kent",
  "Bloom & Co, a wedding florist in Brighton",
  "Iron Core Fitness, a personal training studio in Leeds",
  "I'm a freelance photographer based in Bristol",
  "We sell handmade candles online",
  "Luna Yoga",
  "dsfjkhsdkjfh",
  "Hello",
  "This is a shitty fucking test",
];
for (const text of inputs) {
  const r = await fetch(`${base}/api/concept/turn`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ step: "name", text, answers: {}, attempt: 0, messageCount: 0 }) }).then((x) => x.json());
  const d = r.data;
  console.log(`\n> ${text}\n  ${d.outcome} → ${d.step} ${JSON.stringify({ n: d.answers.name, s: d.answers.services, l: d.answers.location })}\n  AI: ${d.messages.at(-1)}`);
}
