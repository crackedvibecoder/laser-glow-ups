

# Exit Intent Redesign + Inline Booking Cleanup

## Changes in `src/pages/Index.tsx`

### 1. Exit Intent Popup — Better Visual Hierarchy (lines 195–211)
- Add a large gold "£100 OFF" badge at top (oversized text, `bg-primary/15` rounded pill)
- Headline in `font-serif text-2xl`: "Your Spring Discount Is Still Waiting"
- Social proof line: "Trusted by 1,000+ clients in Manchester"
- CTA: full-width `btn-gold-metallic` — "Claim My £100 Discount →"
- Dismiss: small muted link — "No thanks, I'll pay full price"
- Keep trust line below

### 2. Inline Booking — Remove Gap (lines 286–313)
- Reduce spacing between voucher code and iframe: `mb-6` → `mb-3` on the text-center wrapper, `mb-3` → `mb-2` on voucher elements
- Remove the `rounded-xl border border-border` wrapper div around the iframe (causes visual gap)
- Keep `minHeight: 800px` on iframe but add `overflow: hidden` to prevent double scrollbars
- Tighten the "Book your free consultation below:" text — reduce bottom margin

### Files modified
- `src/pages/Index.tsx` — exit intent popup markup + post-submission spacing

No database or routing changes.

