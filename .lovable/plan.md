## Simplify the prospectus card intro + reduce hero repetition

### Card intro (`ProspectusDownloadCard.tsx`, step 1 only)

Trim the stack between the headline and the CTA. Keep it to: eyebrow → mockup → headline pair → gold divider → CTA → "No thanks" link.

Remove:
- The body paragraph "Courses, pricing, entry requirements and career pathways — everything you need before you commit."
- The gold trust line "VTCT-accredited courses · Trusted by 500+ students"

Tighten spacing where those elements were so the CTA sits closer to the divider.

Step 2 (form) and step 3 (success) are unchanged.

### Hero left column (`Training.tsx`, ~lines 495–525)

The hero currently repeats the same beats the card carries. Slim it to headline + one supporting line + trust badges.

Remove:
- The second paragraph "Courses, pricing, entry requirements & career pathways — everything you need before you enrol." (duplicates the card's promise)
- The "1,000+ Clients Treated" and "Small Class Sizes" trust badges (keep only "VTCT Accredited" and "Insurance-Ready" — the two credentials that matter for a training decision; the other two are lifted verbatim from the treatments funnel and dilute focus)

Keep: eyebrow, H1, the "VTCT-accredited laser, skin, and aesthetics qualifications…" lede, and the two remaining trust badges.

### Files touched

- `src/components/training/ProspectusDownloadCard.tsx` — remove the two paragraphs from the intro view.
- `src/pages/Training.tsx` — remove the duplicate paragraph and the two extra trust badges in the hero left column.

### Out of scope

No changes to form step, success step, layout order, colors, or any section below the hero.
