## Two-step prospectus card to match reference

Restyle `ProspectusDownloadCard.tsx` so the initial view mirrors the uploaded reference exactly — no form fields visible until the user commits.

### Step 1 — Intro state (default)

Shown on first load. Centered stack, no visible form:

1. Gold eyebrow: **COSMETIC EDUCATION ACADEMY**
2. Prospectus mockup (unchanged image + soft shadow)
3. Serif headline: **Get the FREE Course Guide**
4. Serif sub-headline: **to Find Your Perfect Training Pathway**
5. Short gold divider
6. Body copy: **Courses, pricing, entry requirements and career pathways — everything you need before you commit.**
7. Gold trust line: **VTCT-accredited courses · Trusted by 500+ students**
8. Full-width gold pill CTA: **SEND ME THE GUIDE** — pressing this reveals the form (step 2), does NOT submit
9. Tertiary text button below: **NO THANKS, I'LL FIND MY OWN WAY** — uppercase, tracked, muted foreground, no border. On click, smooth-scrolls to the enquiry form further down the page (`#enquiry` or the existing lead form anchor).

### Step 2 — Form state (after CTA click)

Same card, replaces steps 8–9 with:

- First name, Email, Phone inputs (existing validation, honeypot, router wiring untouched)
- Full-width gold pill CTA: **SEND ME THE GUIDE** (now actually submits; shows "Sending…" during submit)
- Small consent line under the button (existing copy)
- Small **← Back** link above the fields so users can collapse back to the intro state

Header block (eyebrow → trust line) stays visible above the form so the card still reads like the reference; only the CTA area swaps.

### Step 3 — Success state

Unchanged from current behaviour: checkmark, "Your prospectus is ready", gold Download button, "sent to your email" line, auto-open PDF, `localStorage` set. Returning visitors still skip straight here.

### State machine

Local `view` state: `"intro" | "form" | "success"`.
- `intro` → click CTA → `form`
- `form` → submit success (or router failure) → `success`
- `localStorage.prospectus_downloaded === "true"` on mount → `success`

### Files touched

- `src/components/training/ProspectusDownloadCard.tsx` — add view state, split intro vs form CTA, add "No thanks" scroll-to-enquiry link, keep all existing router/validation/success logic.

### Out of scope

- No changes to `Training.tsx` layout, order, or any other section.
- No changes to `leadRouter.ts`, success behaviour, or PDF URL.
- No new assets or tokens.
