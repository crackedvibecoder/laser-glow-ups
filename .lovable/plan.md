

# Move Calendar Inline + Remove /book Page

## Why this is better

You're right — sending users to a separate page adds friction. Keeping the calendar on the same page means all CTAs just smooth-scroll down to it. One page, one flow, no context switch.

The calendar iframe URL (`https://api.leadconnectorhq.com/widget/booking/XFCIVqAZ7Ha6pnxEiKXH`) and embed script are correct — the calendar likely isn't rendering in the Lovable preview due to sandbox iframe restrictions, but will work on the published domain.

## Changes

### 1. Add booking calendar section at bottom of `src/pages/Index.tsx`

Place it just before the FAQ section (or after final CTA). Add an `id="book"` anchor so all CTAs scroll to it:

- Heading: "Book Your Free Consultation"
- Subtitle: "Choose a time that works for you. No commitment, no pressure."
- SPRING100 voucher display
- GoHighLevel calendar iframe (same embed ID)
- Trust line: "No payment required · Free consultation · All skin types welcome"
- Load the `form_embed.js` script via useEffect

### 2. Update all CTA links from `/book` to `#book`

Change every `href="/book"` across the page (~10 instances including sticky bars, exit intent, section CTAs) to `href="#book"` for smooth in-page scrolling. Add `scroll-mt-24` class to the booking section for proper offset.

### 3. Remove `/book` route and `Booking.tsx`

- Remove the `/book` route from `src/App.tsx`
- Delete `src/pages/Booking.tsx` (no longer needed)

## Files modified
- `src/pages/Index.tsx` — add inline booking section, update all CTA hrefs
- `src/App.tsx` — remove `/book` route
- `src/pages/Booking.tsx` — delete

