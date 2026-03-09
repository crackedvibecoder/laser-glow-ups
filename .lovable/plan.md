

# Funnel Optimization: Logo, Images, and Section Order

## Research Summary

Based on industry best practices for med spa landing pages, the highest-converting structure follows this pattern:

1. **Hero** (headline + form above the fold -- you have this, good)
2. **Problem/Pain** (emotional bridge -- you have this)
3. **Social Proof / Before & After** (2-3 results max, not a gallery dump)
4. **How It Works** (simple 3-step process)
5. **Reviews / Testimonials**
6. **Pricing / Offer** (with urgency)
7. **FAQ**
8. **Final CTA with form**

Key conversion insights:
- Every extra form field drops conversions 10-15% (yours has 3 fields -- that's the sweet spot)
- Before/after photos convert 300% better than stock images -- but quality over quantity
- "Special Offer" pages should be SHORT -- two screen-lengths is ideal for low-ticket offers
- Sticky mobile CTA button dramatically improves conversions on mobile
- No navigation menu -- remove exit points (you already do this, good)

## What's Changing

### 1. Logo: Make it much larger
The watermark PNG has large internal padding. Use negative margins (`-my-6`) on the `<img>` tag to visually crop the padding, and increase from `h-10 md:h-12` to `h-20 md:h-24`. This makes the gold logo prominent without editing the image file.

### 2. Header: Slightly darker
Change from `hsl(30,10%,10%)` to `hsl(30,10%,6%)` -- deeper near-black.

### 3. Streamline the Results section
Remove the 3-column "Treatment in Action" grid (arm, practitioner, leg). Keep only the 2 before/after images (chin and bikini) -- these are the conversion drivers. One professional practitioner photo moves to the hero section background or is removed entirely. The action shots add visual noise without proving results.

**Reasoning**: Before/after images prove the outcome. Action shots of someone being lasered don't answer "will this work for me?" -- they just fill space. Two strong before/afters are more persuasive than five mixed images.

### 4. Add sticky mobile CTA
A fixed bottom bar on mobile with "Claim Your £100 Discount" that scrolls to the form. This catches visitors who scroll past the hero form without converting.

### 5. Reorder sections slightly
Current: Hero → Pain Points → Results → How It Works → Reviews → Pricing → FAQ → Final CTA

Optimized: Hero → Social Proof (before/afters) → Pain Points → How It Works → Reviews → Pricing → FAQ → Final CTA

Moving before/afters right after the hero puts visual proof immediately after the initial pitch -- visitors see "here's the offer" then instantly "here's the proof." Pain points come after to deepen desire for those still scrolling.

## Files to change
- **`src/pages/Index.tsx`**: Enlarge logo with negative margins, darken header, remove 3-column action grid, keep only 2 before/afters, reorder sections (move Results above Pain Points), add sticky mobile CTA bar

