## 1. New page: `/why-laser`

A standalone, fence-sitter-focused CRO funnel page to link from marketing emails/SMS. Same design system, fonts, gold tokens, and components as the offer page — no new visual language.

Route added in `App.tsx` as `/why-laser`, new file `src/pages/WhyLaser.tsx`.

Structure (PAS, education-led rather than offer-led):

1. **Sticky top bar** — same summer offer bar as the offer page.
2. **Hero** — "Why Laser Hair Removal?" with `leg-laser.jpg`, short subhead ("The honest answer for anyone still weighing it up"), CTA "Claim Your £100 Discount" → `#book`.
3. **The real cost of shaving/waxing** — comparison block: time spent per year, lifetime cost of razors/waxing vs a 6-session course, razor burn/ingrowns.
4. **How it actually works** — AW3 Crystal Freeze Diamond, Medical-Grade, why it's comfortable, 60-minute full-body sessions, all skin tones.
5. **Is it right for me?** — short reassurance grid (skin tones, hair types, all genders, sensitive areas), using existing before/after images.
6. **What real clients say** — see section 2 below.
7. **Objection-handling FAQ** — does it hurt, how many sessions, is it lasting, is it safe for dark skin, cheaper than waxing (reuse corrected £795/£895 copy).
8. **Offer + booking** — £895 → £795 pricing card and the inline GHL calendar (`#book`), iframe src built with `utm_content=why-laser` so bookings from this page are attributable in GHL.
9. **Footer** — same as offer page.
10. **Exit-intent popup** — same component behaviour as the offer page.

All primary CTAs anchor to `#book` (no external links).

## 2. Highlighted reviews

Because the ReputationHub widget can't feature individual reviews, add a hand-picked reviews section above the widget on the new page:

- Four quoted reviews from the uploaded screenshots, typed out as real text (not images): Reza Vahid Roudsari, Maisey Trainor, Shazad Ahmed, Z JJ — each with 5 gold stars, name, and relative date.
- Styled as cards in the existing champagne/blush card style, serif attribution, Inter body.
- The ReputationHub widget stays below them, labelled as "See all Google reviews".

Screenshots are used as source text only, not embedded as images.

## 3. Popup focus box fix

Remove the focus outline entirely from the "No thanks" links:
- `src/pages/Index.tsx` — drop the `focus-visible:ring-*` classes, keep `focus:outline-none` (plus `focus-visible:outline-none`).
- `src/pages/Training.tsx` — same treatment on its popup "No thanks" button, so both match.

## 4. SEO

`WhyLaser.tsx` gets its own document title and meta description via the existing head-tag approach used on the other pages, single H1, alt text on all imagery.

## Technical notes

- No backend changes; booking stays the inline GHL calendar.
- Reviews are static content in the page file (or a small local array), no new dependency.
- Shared pieces (sticky bar, exit-intent popup, footer) are copied in a page-local form to avoid refactoring the existing offer page.
