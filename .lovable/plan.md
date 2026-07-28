## Add a prospectus lead magnet to the training funnel hero

The main Laser Location site (`Laser Location Site` project) uses a **free course prospectus PDF** as its main training lead magnet — a mockup image of the brochure, a short "get the free course guide" pitch, and a 3-field form (name, email, phone) that unlocks the PDF download. We'll port that pattern into this funnel's `/training` hero, replacing the current generic "Enquire About Training" form so first-touch conversion is a low-friction brochure download instead of a sales enquiry.

### What the hero becomes

Two-column hero (stacked on mobile, side-by-side on desktop) matching the current layout:

- **Left column — copy** (mostly kept):
  - Eyebrow: "Professional Training · Bury, Greater Manchester"
  - H1: "Build Your Expertise *with Confidence*"
  - Short intro paragraph (kept)
  - New line under intro: what's inside the guide — "Courses, pricing, entry requirements & career pathways — everything you need before you enrol."
  - Trust badges (VTCT Accredited · Insurance-Ready · 1,000+ Clients Treated · Small Class Sizes) — moved up under the copy instead of under the form.

- **Right column — lead-magnet card** (replaces `TrainingLeadForm`):
  - Prospectus mockup image at the top of the card (`prospectus-mockup.png` copied over from the main site).
  - Small eyebrow: "FREE Course Prospectus"
  - Heading: "Get the Free Course Guide"
  - Sub: "Find your perfect training pathway"
  - Form (3 fields, stacked): First name, Email, Phone + tiny consent line + honeypot `_hp`.
  - Submit button: "Send Me the Guide" (keeps `.btn-gold-metallic` styling).
  - Success state (replaces the form once submitted): checkmark, "Your prospectus is ready", gold "Download Prospectus" button that opens the PDF in a new tab, and "We've also sent a copy to your email." A `localStorage` flag (`prospectus_downloaded`) keeps the success state on repeat visits so returning users see the download button, not the form again.

### Rest of the page

The existing `TrainingLeadForm` section (the current `#enquire` block further down the page) stays as the "ready to enquire" step for warmer leads — no layout or copy changes there. All other sections (Who It's For, Course Cards, FAQ, footer, etc.) are untouched.

### Lead router wiring

The download form posts through the existing `sendLeadToRouter` helper (`src/lib/leadRouter.ts`) — same endpoint, same UTM capture, same honeypot behaviour as the current enquiry form. New/changed fields on the payload:

- `formName`: `"Training prospectus download"`
- `message`: `"Prospectus download request"`
- `lead_type`: `"prospectus_lead"` (passed through as an extra key so GHL can tag/segment brochure leads separately from enquiries).
- `consent`: boolean from the checkbox.

No new API keys, no new endpoints.

### Assets

Copy `src/assets/prospectus-mockup.png` from the `Laser Location Site` project into this project's `src/assets/` via `cross_project--copy_project_asset`. Import it into the new component the same way as other hero assets.

For the PDF itself, reuse the main site's hosted URL:
`https://fifmmrdngtgxxmmplvrb.supabase.co/storage/v1/object/public/marketing-materials/CEA-Course-Prospectus.pdf`
stored as a `PROSPECTUS_URL` constant next to the component. (Easy to swap later if you want a funnel-specific PDF.)

### Technical notes

- New component: `src/components/training/ProspectusDownloadCard.tsx` — self-contained card (image + form + success state), styled to match the existing hero card (rounded-2xl, shadow-xl, border, `bg-background`).
- `src/pages/Training.tsx`: swap the right-column card in the hero from `TrainingLeadForm` → `<ProspectusDownloadCard />`, move trust badges under the left copy column, tweak copy per above. No changes below the hero.
- Form uses the same react-hook-form + zod pattern already in `TrainingLeadForm` for consistency.
- Dev-only `console.log` of the router response is already inside `sendLeadToRouter`; no changes needed.

### Out of scope

- No changes to the existing enquiry form further down the page (`#enquire`).
- No changes to `/` (offer page).
- No design-system, color, or typography changes.
- No new backend, no new secrets.

### Files touched

- `src/assets/prospectus-mockup.png` (copied from the main site project)
- `src/components/training/ProspectusDownloadCard.tsx` (new)
- `src/pages/Training.tsx` (hero swap + copy tweak)
