

# Replace Form with CTA Buttons + Create /book Page

## What changes and why

The GoHighLevel booking calendar already collects name, phone, and email — so the current lead capture form creates double data entry. Replace it with a direct CTA button that sends users to a dedicated `/book` page with the calendar iframe. This matches the flow that performed best in the ads report (direct booking path = lowest CPC).

## Changes

### 1. Create `/book` page (`src/pages/Booking.tsx`)

Replicate the style of `laserlocation.co.uk/book/offer`:
- Clean, distraction-free page (no nav, no other sections)
- Heading: "Your £100 Off — Book Your Free Consultation"
- Subtitle: "Choose a time that works for you. No commitment, no pressure."
- GoHighLevel calendar iframe (same embed ID: `XFCIVqAZ7Ha6pnxEiKXH`)
- Small trust line at bottom: "No payment required · Free consultation · All skin types"
- Keep the urgency bar at top for consistency

### 2. Add route in `App.tsx`

Add `/book` route pointing to `Booking.tsx`.

### 3. Simplify hero section (`src/pages/Index.tsx`)

Remove the entire form card (right column, lines 537-558). Replace the two-column grid with a single centered column:

- Kicker
- Headline
- Location
- Subheading
- **CTA button**: "Claim Your £100 Discount →" (links to `/book`)
- Trust badges (below the button)

This cuts the hero height significantly on mobile — the CTA is visible almost immediately.

### 4. Replace final CTA section (lines 903-932)

Remove the `LeadCaptureForm` instance. Replace with a simple CTA button linking to `/book`, keeping the heading and trust checkmarks.

### 5. Update all `#claim` anchors to link to `/book`

All existing CTA buttons throughout the page (Pain Points, Before & After, Pricing, Reviews, sticky mobile bar, sticky desktop bar, exit intent popup) currently scroll to `#claim`. Change them to navigate to `/book` instead.

Affected locations (~7 buttons + sticky bars + exit intent).

### 6. Remove LeadCaptureForm component

Once no longer used anywhere on Index.tsx, remove the component definition (lines 228-360), the form schema (lines 25-30), the webhook/save logic, and the `useForm`/`zod` imports.

### 7. Keep lead saving for analytics

Move the lead context utilities (`getLeadContext`, `saveLeadToBackend`) to a shared util or keep them in Index.tsx — they're not needed if we're not capturing leads on this page anymore. The booking calendar handles contact capture directly in GoHighLevel.

## Files to modify/create
- `src/pages/Booking.tsx` — new page with calendar iframe
- `src/App.tsx` — add `/book` route
- `src/pages/Index.tsx` — remove form, simplify hero, update all CTAs to `/book`

No database changes needed.

