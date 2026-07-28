## 1. Urgency bar icon alignment (real fix)
The previous fix didn't work because on mobile the countdown text is a two-line stack (`flex-col`: "Summer Special — Save £100" / "Offer ends in Xd Yh Zm"). `items-center` on the row centers the icon against the two-line block, so the icon lands between the lines.

Fix: move the `<Clock>` icon *inside* the first `<span>` of `CountdownTimer` so it flows as part of the first text line and aligns naturally regardless of wrapping. Remove the standalone icon from the outer container.

## 2. Body copy still too small — another pass
Bump the following in `src/pages/Index.tsx`:
- Section intro paragraphs beneath h2s (e.g. lines 349, 437 area): explicit `text-lg text-muted-foreground`
- Pricing card feature bullets: `text-base` → `text-lg`
- FAQ answers: `text-base` → `text-lg`
- Final CTA trust badges (line 731): `text-sm` → `text-base`
- Footer legal copy: keep `text-sm` (appropriate for fine print)

And in `src/pages/ThankYou.tsx`:
- Three step labels: `text-base` → `text-lg`

## 3. Thin dark outline on ALL gold numbers/text across the funnel
The `.text-gold-metallic` utility uses a gradient that fades to near-white at the top, killing contrast on light backgrounds. This affects the How It Works step numbers (01/02/03), the pricing "£795", and the training-page stats and course-price numbers.

Fix in `src/index.css` directly on the `.text-gold-metallic` utility:
- Add `-webkit-text-stroke: 1px hsl(30 25% 18%)` (dark brown that matches the palette) and a soft `text-shadow: 0 1px 0 hsl(30 25% 18% / 0.35)` fallback for browsers without text-stroke.
- Because the outline is applied to the utility class itself, every gold number/text across `/`, `/training`, and any other page picks it up automatically. Buttons use a different class (`.btn-gold-metallic`), so they are unaffected.

If the outline ends up too heavy on the smaller gold text (like the 2xl stats), we can dial the stroke down to 0.5px or scope the outline to a variant class — but starting with 1px on the utility gives the visibility boost you asked for everywhere.

## Files touched
- `src/pages/Index.tsx` — CountdownTimer JSX, intro paragraphs, pricing features, FAQ answers, final CTA badges
- `src/pages/ThankYou.tsx` — step label sizes
- `src/index.css` — add outline to `.text-gold-metallic`

No color tokens changed, no layout shifts.
