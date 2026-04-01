

# Landing Page Overhaul — Apply Pending Changes

## What needs doing

Several agreed changes from earlier conversations were never applied to `src/pages/Index.tsx`. Here's everything outstanding:

### 1. Strip the booking section down to just the calendar
**Lines 620–646** — Remove the "Book Now" kicker, "Book Your Free Consultation" heading, the description paragraph, and the SPRING100 voucher pill. The GoHighLevel calendar already has its own copy. Keep only the `<section id="book">` wrapper, the iframe, and the small trust line underneath. This stops users having to scroll past redundant text to reach the calendar.

### 2. Add CTA buttons after each video section
- **After "Your First Visit" video (~line 519)**: Add a "Claim Your £100 Discount →" CTA button linking to `#book`
- The testimonial video section (line 596) already has a post-reviews CTA below it, so that's fine

### 3. Fix exit-intent popup — auto-close on CTA click
**Line 140**: The CTA link inside `ExitIntentPopup` should call `setOpen(false)` when clicked, so users don't have to manually dismiss it after clicking through. Add an `onClick` handler that closes the dialog.

### 4. Tighten content — reduce repetition
- **"How It Works" section (lines 465–501)**: Sits between the first video and pricing with no CTA after it. Add a CTA button after this section.
- **Social Proof Strip (lines 342–363)**: "1,000+ Happy Clients" is repeated in hero text, social proof strip, reviews heading, and exit popup. Keep it in the strip and reviews heading only — remove "trusted by 1,000+ clients in Manchester" from the hero paragraph (line 313). Change to: "Ditch the razor for good. 6 painless sessions, all skin types welcome."
- **Before & After section (lines 427–463)**: "Real Results" kicker is used both here and in the Reviews section. Change Reviews kicker to "What Our Clients Say" to differentiate.

### 5. Summary of all CTA placements (after changes)
1. Hero ✓ (exists)
2. After Pain Points ✓ (exists)
3. After Before & After ✓ (exists)
4. After How It Works — **ADD**
5. After First Visit video — **ADD**
6. After Reviews ✓ (exists)
7. Final CTA ✓ (exists)
8. Sticky mobile ✓ (exists)
9. Sticky desktop ✓ (exists)

## Technical details

All changes in `src/pages/Index.tsx`:

- **Lines 620–633**: Remove heading, description, and voucher pill from booking section — keep only section wrapper + iframe + trust line
- **Line 519**: Insert CTA block after the video `</div>`
- **Line 500**: Insert CTA block after How It Works grid
- **Line 140**: Add `onClick={() => setOpen(false)}` to exit popup CTA link
- **Line 313**: Remove "trusted by 1,000+ clients in Manchester" from hero copy
- **Line 581**: Change Reviews kicker from "Real Results" to "What Our Clients Say"

No database, routing, or backend changes.

## Files to modify
- `src/pages/Index.tsx`

