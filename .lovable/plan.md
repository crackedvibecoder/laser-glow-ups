## Restyle the prospectus card + lead with it on mobile

Match the uploaded reference for the prospectus opt-in on `/training`, reorder the mobile hero so the form is the first thing users see, and tighten the post-submit behaviour.

### 1. Restyle `ProspectusDownloadCard.tsx` to match the reference

Keep the same form fields, validation, honeypot, router wiring, and success state — only the visual composition and copy change.

- Card: cream/`bg-card` background, softer rounded corners, generous padding, thin gold top hairline (matches the reference's gold rule at the top).
- Content stack (all centered):
  1. Gold uppercase eyebrow: **"COSMETIC EDUCATION ACADEMY"** (tracking-widest, `text-primary`).
  2. Prospectus mockup image, centered, slightly smaller with a soft ground-shadow (not the current heavy drop-shadow).
  3. Serif headline: **"Get the FREE Course Guide"** (`FREE` bolded, same font).
  4. Serif sub-headline one size down: **"to Find Your Perfect Training Pathway"**.
  5. Short gold divider (reuse `.gold-divider`).
  6. Body copy: **"Courses, pricing, entry requirements and career pathways — everything you need before you commit."**
  7. Trust line in gold: **"VTCT-accredited courses · Trusted by 500+ students"**.
  8. Form fields (First name, Email, Phone) — kept, but visually de-emphasised until the user engages (still visible, no accordion).
  9. Full-width gold pill CTA: **"SEND ME THE GUIDE"** (uppercase, tracked, using existing `.btn-gold-metallic`).
  10. Tiny consent line under the button (kept, smaller).

No new design tokens, no new dependencies — reuse existing `.btn-gold-metallic`, `.gold-divider`, `font-serif`, `text-primary`.

### 2. Lead with the form on mobile

In `src/pages/Training.tsx` hero, swap the DOM order so the prospectus card renders first on mobile and the copy column second. On desktop keep the current left-copy / right-card layout.

Implementation: use `order-first lg:order-none` on the card column and `lg:order-first` on the copy column (or equivalent flex/grid order utilities). No copy changes to the left column beyond what's already in place.

### 3. What happens after "Send Me the Guide"

Current behaviour (kept, with two small refinements):

1. Zod validation runs on the 3 fields.
2. Honeypot `_hp` checked — if filled, silently short-circuits to the success state (no network call).
3. `sendLeadToRouter({ formName: "Training prospectus download", lead_type: "prospectus_lead", consent, ... })` POSTs to the existing lead router (same endpoint the offer/enquiry forms use). GHL tags the lead as a prospectus download via `lead_type`.
4. Meta Pixel `Lead` event fires.
5. `localStorage.prospectus_downloaded = "true"` so returning visitors skip straight to the download state.
6. Card swaps to success state: checkmark, "Your prospectus is ready", gold **"Download Prospectus"** button linking to the hosted PDF (`CEA-Course-Prospectus.pdf`) in a new tab, and "We've also sent a copy to your email."

Refinements this turn:
- **Auto-open the PDF** in a new tab immediately on success (in addition to showing the download button), so the user gets the guide without a second click. Wrapped in a try/catch to survive popup blockers — the visible Download button is the fallback.
- **Button loading state** already exists ("Sending…"); no change.
- Router failure currently logs to console and leaves the form in place. Change to still advance to the success state on network failure so the user always gets the PDF — the router already audits + retries server-side, and the enquiry form further down the page remains as the "talk to us" path.

### Files touched

- `src/components/training/ProspectusDownloadCard.tsx` — full visual restyle to match reference; auto-open PDF on success; always advance to success state.
- `src/pages/Training.tsx` — mobile order swap in the hero grid only.

### Out of scope

- No changes below the hero.
- No changes to `/` (offer page).
- No new backend, endpoints, or secrets.
- No changes to `leadRouter.ts`.
