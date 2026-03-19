

# Reorder Sections for Better Conversion Flow

Two swaps in `src/pages/Index.tsx`:

## Swap 1: Pain Points before Before & After
Move the Pain Points section (lines 609–727) above the Before & After section (lines 571–607). This follows Problem → Proof flow — agitate the pain first, then show results.

## Swap 2: Pricing above Reviews
Move the Pricing Card section (lines 770–824) above the Reviews Widget section (lines 729–768). Present the offer while motivation is high, then use reviews to overcome hesitation.

### Resulting section order:
1. Hero + Form
2. Social Proof Strip
3. **Pain Points** (moved up)
4. **Before & After** (moved down)
5. How It Works
6. First Visit Video
7. **Pricing** (moved up)
8. **Reviews** (moved down)
9. FAQ
10. Final CTA

### File modified
- `src/pages/Index.tsx` — reorder only, no content changes

