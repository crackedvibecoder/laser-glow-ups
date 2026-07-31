## 1. Blank space under the footer (homepage, mobile)

Note on current state: I reproduced the homepage at 394px in a headless browser and the document ends exactly at the footer (no gap) — because the ReputationHub review iframe stays collapsed there. So the cause is unconfirmed, and step one is to confirm it rather than guess.

Most likely culprit is a third-party iframe (ReputationHub reviews or the GHL booking widget) reporting a height that overflows its container in a real mobile browser.

Steps:
1. Reproduce with the widgets actually loaded, measuring `document.scrollHeight` vs the footer's bottom.
2. Fix the offending container: wrap the review widget in a fixed-height, `overflow-hidden` box, and make the booking iframe container `overflow-hidden` with a sane min-height, so no child can push page height past the footer.
3. Add `overflow-x-hidden` on the page wrapper and bottom padding equal to the sticky mobile CTA height, so the last content isn't hidden behind it.

## 2. Homepage hero — emotive text-on-image

Keep the same `leg-laser` photo, but turn it into the hook:

- Image becomes a full-bleed hero panel on mobile (and the right-hand panel on desktop keeps its current shape).
- Add a soft dark gradient overlay (bottom-weighted, via a design token) so text stays legible.
- Overlay copy in the existing serif, echoing the emotive social post tone: a short line such as "Still shaving every single day?" with the eyebrow "Medical-Grade Laser Hair Removal" above it.
- The main H1, "Save £100" highlight, CTA and "Bury, Manchester" stay exactly as they are, below the image — so only one H1 remains and the offer hierarchy is unchanged.

## 3. `/why-laser` page

- **Hero image**: keep it, but reduce its height and move the question headline above it, so the question leads and the image supports. (Not scrapping it — the page needs a visual anchor.)
- **"WTF is shaving every day" break image**: remove it from its current spot after the three-panel story (too much imagery in a row). Reuse it as the hero treatment on the homepage per section 2 — the same emotive idea, in the place where it actually hooks people.

## 4. Reviews — stop the design clash

- Keep the four hand-styled review cards, but split them up: two stay in the reviews section on `/why-laser`, and one or two get sprinkled as single-quote "proof breaks" after the cost-comparison section and after the FAQ.
- Move the ReputationHub widget **below the pricing card / booking calendar** on both pages, under a quieter heading ("See all Google reviews"), so the styled cards and the raw widget never sit back to back.

## 5. Thank-you page

- Reorder the next steps: 1) Check text/email for confirmation, 2) Add your slot to calendar, 3) 15-min consultation + discount note.
- Add light social proof below the steps: one styled Google review card (same style as the funnel) plus a single before/after image, with a short reassurance line reinforcing the decision.

## Technical notes

- No backend changes, no new dependencies; all edits in `src/pages/Index.tsx`, `src/pages/WhyLaser.tsx`, `src/pages/ThankYou.tsx`, plus a small shared review-card component so the quotes can be reused across pages.
- Overlay colours come from existing tokens (no hardcoded `bg-black`), gold/serif system untouched.
- All CTAs continue to anchor to `#book`; booking UTM attribution unchanged.
