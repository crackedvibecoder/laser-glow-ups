

# Hero Cleanup — Honest Adjustments

## What's actually worth changing

### 1. Simplify location line
**Current:** "Bury, Manchester — Serving Bolton, Prestwich, Whitefield & beyond"
**Change to:** "Bury, Manchester"
Listing neighbouring towns implies multi-location and adds confusion for geo-targeted Facebook traffic.

### 2. Move pricing badge into the form card
The pricing badge (£895 → £795) currently sits in the hero copy column between the subheading and trust badges. It's a conversion element that belongs next to the form — seeing the price saving right where you're asked to claim the voucher is more persuasive.

Move it inside the form card, between the voucher badge and the form heading.

### 3. Keep trust badges where they are
They're lightweight, serve as a scanning layer for people who haven't scrolled yet, and moving them into the form card would make it cluttered.

## Technical details
All changes in `src/pages/Index.tsx`:
- Line 511: shorten location text to "Bury, Manchester"
- Lines 518–525: remove pricing badge from hero copy column
- Lines 548–550 area: insert pricing badge inside form card (above or below the voucher pill)

No structural, database, or routing changes.

