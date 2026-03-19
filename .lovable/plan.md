

# Training Courses Funnel Page

## Overview
Create a new conversion-focused landing page at `/training` promoting Laser Location's laser training courses. It will follow the same editorial luxury design system, CRO patterns, and lead capture mechanics as the existing laser hair removal funnel.

## Content Source
All course information comes from laserlocation.co.uk/training:

**Courses to feature:**
- **Ultimate Laser Hair Removal** (VTCT Level 3 & 4 combined) -- £2,295 without machine / £6,295 with machine -- 4 days hybrid
- **CPD Laser Hair Removal** -- £1,295 -- 2 days
- **Tattoo Removal CPD** -- £800 -- 1 day
- **VTCT Level 4 Laser** -- £1,800 -- 3 days hybrid

**Key selling points:** VTCT-accredited, insurance-ready certification, small class sizes, AW3 Crystal Freeze Diamond equipment, trained by Carmen Douglas (6+ years, 1,000+ clients), ongoing support, all models provided, free parking.

**Target audience:** Beauty therapists, newly qualified practitioners, clinic owners, career changers entering aesthetics.

## Page Structure (single-page funnel)

1. **Logo bar** -- same dark header with Laser Location watermark
2. **Urgency bar** -- countdown timer (e.g. "Limited spots -- Next cohort starts soon")
3. **Hero section** -- headline about building a career in laser, subhead about VTCT-accredited training, CTA to enquiry form
4. **Trust bar** -- VTCT Accredited, Insurance-Ready, 1,000+ Clients Treated, Small Class Sizes
5. **Pain points** -- why people hesitate (cost of unaccredited courses, lack of hands-on practice, no business support, etc.)
6. **Course cards** -- the 4 courses with pricing, duration, accreditation type, and CTA
7. **Trainer section** -- Carmen Douglas credentials, experience stats
8. **How It Works** -- 3 steps: Enquire, Train, Launch (with dashed timeline connectors)
9. **Why Train With Us** -- differentiators list (same format as existing funnel's benefit cards)
10. **FAQ accordion** -- training-specific questions
11. **Lead capture form** -- "Enquire About Training" with name, email, phone
12. **Footer** -- Privacy Policy popup, copyright

## Technical Approach

### New files:
- `src/pages/Training.tsx` -- the full funnel page, modelled closely on `Index.tsx`

### Modified files:
- `src/App.tsx` -- add route `/training` pointing to Training page

### Reused from existing funnel:
- Same design system (CSS classes, gold metallic buttons, dark sections, etc.)
- `CountdownTimer` component (extracted or duplicated)
- `LeadCaptureForm` component adapted for training enquiries (different webhook URL or same one with a source identifier)
- `ExitIntentPopup` adapted for training context
- `StickyDesktopCTA` and sticky mobile CTA adapted for training
- `PrivacyPolicyPopup` reused as-is
- Social proof toasts adapted (e.g. "Rebecca from Manchester just enrolled")
- Same `saveLeadToBackend` function -- leads table already supports this via `page_url` differentiation

### Lead tracking:
- Saves to the existing `leads` table with `source: 'website'` and `page_url` will naturally identify training leads
- Fires `fbq('track', 'Lead')` on form submission (same as existing)
- Microsoft Clarity and Meta Pixel already installed globally via `index.html`

### No database changes needed
The existing `leads` table schema already captures everything needed. Training leads will be distinguishable by their `page_url` containing `/training`.

## Images
Will use the training academy images from their existing CDN (the Supabase storage URLs found on their website), including:
- `rebecca.webp` (training instructor)
- `teaching-moment.jpg` (hands-on training)
- `carmen-aw3.jpg` (Carmen with laser equipment)
- `team laser.jpg` (training team)

