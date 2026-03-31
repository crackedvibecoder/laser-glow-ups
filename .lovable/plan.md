

# Analysis: March Facebook Ads Report vs Funnel Performance

## Key Findings from the Report

The ads team report reveals critical insights directly relevant to this funnel:

1. **The voucher campaigns (Campaigns 1 & 2) are the winners** — £0.15–£0.18 CPC, 2.86–9.32% CTR. These send traffic to a direct booking path.
2. **The form/website campaign (Campaign 3) has friction** — £0.47 CPC, 1.63% CTR, £5.74 CPL. The report explicitly says "the form or landing page is likely the bottleneck" and recommends "simplify form fields, strengthen the offer on-page."
3. **No retargeting exists** — warm prospects who engaged but didn't convert are lost.
4. **Page 3 recommendations include**: "Review load speed, headline clarity, offer visibility, trust signals, before/after imagery, mobile experience, and calendar friction."

## What This Means for Our Funnel

The report confirms our funnel IS Campaign 3's landing page — the one with the higher CPL. The voucher campaigns link directly to a booking page, bypassing our funnel entirely. So we need to make this funnel convert better for the form-based traffic it receives.

## Recommended Tweaks

### 1. Reduce form fields from 3 to 2
The report says "reduce form fields." Drop the email field — for a consultation booking via Facebook traffic, name + phone is sufficient. Email can be collected later. This is the single highest-impact change for reducing form friction.

### 2. Make the voucher code visible BEFORE form submission
Currently the voucher code (SPRING100) only appears after submission. The ads promote a voucher — visitors expect to see it immediately. Show "Your £100 Voucher" prominently in the hero and form header so there's instant message match with the ad creative.

### 3. Add "Bury, Manchester" more prominently to the hero
The report mentions targeting Bury and surrounding areas. Local relevance reduces bounce — visitors from Facebook need instant confirmation they're in the right place. Currently it's in small uppercase text above the headline. Make the location more prominent.

### 4. Strengthen the offer headline for ad-to-page message match
The voucher campaigns use voucher-based creative. Our hero headline says "Save £100 This Spring" which is good, but the form card header says "Book Your Free Consultation" — generic. Change it to "Claim Your £100 Voucher" to match the ad promise.

### 5. Add a "Limited spots" indicator near the form
The report recommends urgency-led messaging. Add a real-time-feeling "Only 4 consultation slots left this week" near the form to create booking urgency.

## Technical Details

All changes are in `src/pages/Index.tsx`:

- **Form fields**: Remove the email field from the `fields` array and `leadSchema`. Update the backend payload to make email optional.
- **Voucher visibility**: Add a voucher badge (e.g., "YOUR £100 VOUCHER: SPRING100") inside the form card, above the inputs.
- **Form card header**: Change "Book Your Free Consultation" to "Claim Your £100 Voucher".
- **Location emphasis**: Increase the kicker text size or add "Bury, Manchester" into the main headline.
- **Spots indicator**: Add a small line below the form card header: "⚡ Only 4 consultation slots left this week".

No database migrations needed — the `email` column in `leads` should be made nullable if we remove it from the form, but we can also keep it and send an empty string or skip that change if you'd prefer to keep collecting emails.

