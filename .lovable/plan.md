

# Funnel Polish: Logo, Compliance, How It Works, and Copy

## Key Research Findings

From the laserlocation.co.uk website, the equipment they use is the **AW3 Crystal Freeze Diamond** laser system -- a professional 3-wavelength platform (755/810/1064nm) with patented Crystal Freeze cooling technology. The website describes it as "medical-grade equipment" and states it is "safe for all skin types (Fitzpatrick I-VI)." The website never uses the term "FDA approved" or "CE marked" -- it simply says "medical-grade" and "clinically proven."

Their practitioners are described as "fully qualified and insured." The training academy offers **VTCT-accredited** qualifications (Level 3 & Level 4). The website says results are "up to 90% hair reduction" with "6-12 sessions average" and "years of smooth skin with occasional maintenance as needed" -- notably avoiding the word "permanent."

You're absolutely right about FDA being wrong. I should have caught that immediately given the .co.uk domain and Manchester address. I'll mirror the language their own website uses rather than inventing regulatory claims.

## Changes

### 1. Logo: Double the size again
Change from `h-20 md:h-24 -my-6` to `h-40 md:h-48 -my-14 md:-my-16`. The aggressive negative margins crop the internal padding so the actual logo artwork fills the header prominently.

### 2. Remove all "FDA" references -- use their actual language
Replace every instance with what the website actually says:
- Hero subtitle: "FDA approved for all skin types" → "Safe for all skin types"
- Trust badge: "FDA Approved" → "Medical-Grade"
- Pricing bullet: "Medical-grade laser technology (FDA approved)" → "AW3 Crystal Freeze Diamond laser system"
- FAQ about skin types: remove "FDA-approved" → "Our AW3 Crystal Freeze Diamond laser uses 3-wavelength technology (755/810/1064nm) that is clinically proven safe and effective for all skin types and tones (Fitzpatrick I-VI)."

### 3. Fix compliance in copy
- Hero H1: "Permanently Smooth Skin" → "Lasting Smooth Skin" (their website says "up to 90% hair reduction" and "years of smooth skin with occasional maintenance")
- How It Works step 3: "Smooth For Life" / "permanently smooth" → "Lasting Results" / "enjoy smooth, confident skin with occasional maintenance as needed"
- Pain Points: "permanent solution" → "long-term solution"

### 4. How It Works: Wrap steps in cards
Change each step from bare text to contained cards with `bg-card border border-border rounded-xl p-8` to match the Pain Points section styling.

### 5. Update FAQs for accuracy and conversion
- "Is it safe for all skin types?" -- answer references AW3 Crystal Freeze Diamond and Fitzpatrick I-VI
- Add: "Who performs the treatments?" -- qualified, fully insured practitioners; VTCT-accredited training
- Add: "Is laser hair removal cheaper than waxing long-term?" -- conversion objection handler
- Existing pain/sessions/consultation questions stay, with copy tightened

### 6. Video placement recommendation (no code yet)
Best placement if videos become available:
- **Client testimonial** (highest value): embed in the Reviews section, above or replacing the widget
- **Salon interior**: small autoplay-muted clip near the final CTA to build trust
- Treatment footage: skip, doesn't convert as well as outcomes
- Recommend 1-2 videos maximum. The testimonial would be the single highest-priority video.

## Files to change
- **`src/pages/Index.tsx`**: Logo size, all FDA removals, compliance copy fixes, How It Works card redesign, FAQ updates

