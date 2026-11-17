# AI concept flow — behaviour rules
Source: Figma handoff board `59015:22306`. If this file and the handoff disagree, the handoff wins
(note the difference in progress.md). Fill the "Exact copy" table from Figma in Phase 1.

## Flow
Landing hero prompt → `/concept` chat → Getting started (name, what they do, location)
→ Q1 services → Q2 customers → Q3 differentiator → Q4 trust (optional, Skip) → Q5 main action
(tap options) → Q6 feeling → Q7 branding (logo upload / pick colours / nothing yet)
→ Contact form inline (name, email, phone) → Loading (browser build 10–20s) → Preview
→ CTAs: "Get this built" (primary), "Book a call" (secondary) → confirmations.
Returning visitor (same browser) sees "Welcome back" with their original preview.

## Conversation rules
- Collect business name (or "I haven't got a name yet"), what they do and location BEFORE Q1.
  Progress label = "Getting started" until those are known.
- Never suggest business names. Only special tap option: "I haven't got a name yet".
  Then use "Your Business Name" in the logo spot.
- If an answer was already given (in the hero prompt or any earlier message): acknowledge it
  briefly and SKIP that question. Never ask twice.
- AI typing ≈ 1s. Reactions short and personal, then the next fixed question.
- Free text answers, except Q5/Q7 options and the no-name option. Only Q4 has Skip.
- Max 300 characters per message. Max 2 clarification attempts per question, then:
  "No worries, we can go through that on a call." and move on.
- Session limit ~20 messages, then go to contact form.
- Offensive input: "I can't build a homepage around that. Want to tell me about your real business?"
  No generation for offensive content.
- Keep full chat history; latest messages visible. Enter sends, Shift+Enter = new line.

## Contact form
- Name, Email, Phone required. Inline in chat (never a popup). Errors next to fields, keep values.
- Disposable email → "Please use a permanent email address so we can send your homepage link."
- Separate, optional, UNTICKED marketing opt-in: "Send me tips and offers from Royal Creative."
- Privacy policy = small separate link.
- Generation starts ONLY after a valid contact submission.

## Generation & preview
- Desktop: chat moves aside. Mobile: chat fades out. Browser build order: nav → hero → sections,
  using their palette and business name in the tab. Status list with ticks. No % bar, spinner
  or confetti. Over 20s: "Nearly there, good design takes a moment…". Failure keeps the lead and
  shows the supplied reassurance copy. Reveal fade ≈ 0.5s.
- Always label: "AI concept — final design by Royal Creative".
- Only facts the customer gave. Review blocks read "Your customer review here".

## UK callback copy (Europe/London time)
- Working day before 5pm: "Brilliant! We'll give you a call today to talk through your website."
- After 5pm: "We'll call you first thing tomorrow."
- Friday evening / weekend: "We'll call you first thing Monday."
- Bank holidays: ASK BILAL (Phase 3).

## Hero prompt examples (rotate in this order)
Harbour Café, a family-run café in Whitstable · Fade Factory, a barbershop in Manchester ·
Bright Sparks Electrical, electricians covering Kent · Bloom & Co, a wedding florist in Brighton ·
Iron Core Fitness, a personal training studio in Leeds.
Type 40ms/letter, hold 2s, delete 20ms/letter, blinking cursor, example text lighter grey.
Focus stops + clears the example; empty blur resumes. Reduced motion: static
"Tell us about your business…".

## Exact copy (filled from Figma, Phase 1 — code source: `src/lib/content/concept.ts`)
| Step | Question / text shown | Options |
|---|---|---|
| Getting started | Intro: "Great to meet you! Before I start designing, I'd like to get to know your business properly. It'll only take a couple of minutes." · Missing name: "{What they do} in {location}, love it! What's your business called?" · Missing services: "Great name! What does {name} do?" · Missing location: "Where are you based, or which areas do you cover?" · Unclear: "Tell me a bit more. What's your business and what do you do?" · No name: "No problem, I'll use a placeholder for now and our team can help you with a name later." + "What does your business do, and where are you based?" (card: "Your Business Name" / "We'll carry on once we know what you do and where.") | "I haven't got a name yet" |
| Q1 | "{name}, {what} in {location}, lovely! Tell me more about what you offer. What do people come to you for?" | |
| Q2 | "Who are your customers? The more I know about them, the better I can design for them." | |
| Q3 | "What do your customers love most about you? This is what I'll build your homepage around." | |
| Q4 | "Anything that helps people trust you? Years in business, qualifications, awards, or something a customer once said about you." | Skip (inside composer) → "No problem, we'll leave that out for now." |
| Q5 | "What should visitors do when they find you?" | Book · Call · Order · Visit · Enquire (Book → "Book an appointment") |
| Q6 | "How do you want people to feel when they land on your website?" | |
| Q7 | "Do you already have branding, like a logo or colours you use?" | "Yes, I have a logo" · "I have colours, but no logo" · "Nothing yet" |

Reactions (demo): Q1 "A clear set of services for Fade Factory — got it." · Q3 "Precise work and a relaxed welcome — that gives us a strong focus." · Q5 "I'll make booking an appointment the main action." · Q6 "Bold, modern and welcoming — a clear direction." · After Q7: "Perfect, I've got a clear picture of your business. Pop your details in and I'll show you your new homepage."
Full per-frame copy (incl. contact, loading, preview, booking): see `src/lib/content/concept.ts`.
