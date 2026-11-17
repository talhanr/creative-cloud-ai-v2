// QA: drive /api/concept/turn through scripted conversations. node scripts/test-turns.mjs [baseUrl]
const base = process.argv[2] ?? "http://localhost:3457";
async function convo(label, inputs, start = {}) {
  console.log(`\n### ${label}`);
  let state = { step: "name", answers: start, attempt: 0, messageCount: 0 };
  for (const text of inputs) {
    const res = await fetch(`${base}/api/concept/turn`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...state, text }),
    }).then((r) => r.json());
    if (!res.ok) { console.log("  ERROR", res.error); return; }
    const d = res.data;
    console.log(`> ${text}\n  [${d.outcome} → ${d.step}] ${d.messages.map((m) => JSON.stringify(m)).join(" | ")}`);
    state = { step: d.step, answers: d.answers, attempt: d.attempt, messageCount: state.messageCount + 1 };
  }
  console.log("  answers:", JSON.stringify(state.answers));
}
await convo("demo", ["Fade Factory, a barbershop in Manchester", "Skin fades, beard trims and hot towel shaves", "Local customers looking for a fresh cut", "Precise fades and a relaxed welcome", "Skip", "Book", "Bold, modern and welcoming", "Yes, use navy and gold"]);
await convo("missing name", ["a barbershop in Manchester", "Fade Factory"]);
await convo("no name", ["Hello", "I haven't got a name yet", "We do dog grooming in Crawley"]);
await convo("partial", ["Fade Factory", "a barbershop", "Manchester"]);
await convo("nonsense x3", ["asdfgh", "qwerty", "zzzz"]);
await convo("offensive", ["fuck you"]);
