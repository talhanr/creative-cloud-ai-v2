# Phase 3 — Complete the flow (real leads, email, CRM, booking, security)
Goal: every confirmation screen becomes true. A lead is never lost.

## ASK BILAL (before starting) — recommend an option for each, let him pick
- Database: MongoDB Atlas (Mongoose) or Postgres (Neon + Drizzle).
- Email: Resend (recommended) + sender domain.
- CRM: HubSpot (private app token).
- Calendar: Google Calendar API + Meet, or Cal.com. Business hours + bank holiday rules.
- Bot protection: Cloudflare Turnstile keys. Rate limit: Upstash Redis.
- Where team alerts go (email / Slack / WhatsApp).
- Data retention period and privacy policy text (client/privacy owner approval).

## Tasks
- [ ] 3.1 DB models: Lead (contact, consent, answers, preview id, timestamps, attempts, hotLead),
      Concept (SiteContent, palette, template, status). Indexes on normalised email + phone.
- [ ] 3.2 Save lead on valid contact submit BEFORE generation. Generation failure keeps the lead
      and alerts the team.
- [ ] 3.3 Dedupe: trim/lowercase email, normalise Gmail dots/+aliases for matching (keep the
      original for sending), UK phone → +44. One preview per email OR phone: a match returns the
      original concept, no regeneration. >5 attempts/day = monitoring flag only (no IP bans).
- [ ] 3.4 Preview page by secure unguessable id (`/concept?p=<id>` or as designed — still 2 routes).
- [ ] 3.5 Email the preview link after successful generation (React Email template, brand styled).
- [ ] 3.6 HubSpot: create/update contact + deal; "Get this built" and "Book a call" set hot-lead
      flag + instant team alert.
- [ ] 3.7 Booking: real availability, no double booking (transaction/lock), phone uses given number,
      video creates Meet link and emails it. Confirm date, time, timezone, type.
- [ ] 3.8 Callback copy with real Europe/London business-time + bank holiday rules.
- [ ] 3.9 Turnstile before chat, rate limits per session/IP, disposable email block, monthly AI
      spend cap, cost-per-lead tracking.
- [ ] 3.10 Returning visitor: browser marker + lookup by email/phone shows original concept.
- [ ] 3.11 Privacy: privacy policy page, consent stored with timestamp, delete/access procedure doc.
- [ ] 3.12 Error monitoring (e.g. Sentry) + structured logs. Idempotency keys on lead/booking POSTs.
- [ ] 3.13 End-to-end tests (Playwright) for the full journey with mocked third parties. `/verify`.
