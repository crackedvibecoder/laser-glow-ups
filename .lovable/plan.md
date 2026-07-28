## Port the exact two-step design from the main site

Rewrite `src/components/training/ProspectusDownloadCard.tsx` using the step markup from `ProspectusPopup.tsx` in the "Laser Location Site" project so both step 1 (hook) and step 2 (form) visually match the reference exactly.

### What changes

Replace the current card body with the two-step markup from the source component, adapted for inline (non-dialog) use:

- **Container**: `bg-[hsl(40_30%_96%)] p-8 sm:p-10` with the gold gradient hairline at top and rounded corners. No Dialog wrapper — it's inline.
- **Step 1 (intro)**: exact source markup — eyebrow "COSMETIC EDUCATION ACADEMY", mockup image, serif headline "Get the FREE Course Guide" / "to Find Your Perfect Training Pathway", short gold divider, body copy, gold trust line, full-width `btn-gold-metallic` "Send Me the Guide", tertiary "NO THANKS, I'LL FIND MY OWN WAY" link (scrolls to `#enquire` instead of closing a dialog).
- **Step 2 (form)**: exact source markup — Back arrow (top-left of card), "ALMOST THERE" eyebrow, serif "Where should we send it?" heading, sub-copy, First Name / Email Address / Phone Number inputs styled with the source's white bg + gold focus ring + rounded-sm classes, consent checkbox with gold checked state, full-width `btn-gold-metallic` "Get Your Free Guide" (label "Sending..." while submitting).
- **Step 3 (success)**: keep the current success view (checkmark, Download Prospectus button, "sent to your email" line, PDF auto-open, `localStorage`).

### What stays

- Local `view: "intro" | "form" | "success"` state machine.
- Existing `sendLeadToRouter` call with `lead_type: "prospectus_lead"`, honeypot, and success/finish logic (auto-open PDF, set `localStorage`, fbq Lead track).
- `scrollToEnquiry` behaviour for the "No thanks" link (source uses `handleClose`; ours scrolls to `#enquire`).
- PDF URL constant.

### Files touched

- `src/components/training/ProspectusDownloadCard.tsx` — replace body with ported markup from the source `ProspectusPopup.tsx`, keeping our router/state/scroll wiring.

### Out of scope

- No changes to `Training.tsx`, `leadRouter.ts`, or any other file.
- No new assets — mockup image already copied over.
