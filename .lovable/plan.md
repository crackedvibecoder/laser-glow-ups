

# Laser Location Funnel -- Refinements Plan

## Clarifications First

**This is the same project** that was on GitHub (the code Jordan built). I've been editing it directly here in Lovable. Whatever domain (offer.laserlocation.co.uk) is pointed at this project will serve the updated version -- no new links or forms need reconnecting. The GoHighLevel booking URL is unchanged.

**On headers/footers**: You're right -- traditional funnels deliberately strip navigation to prevent leakage. No header nav, no footer links to other pages. This is standard best practice for paid traffic landing pages.

---

## Changes to Implement

### 1. Remove black backgrounds
The dark pricing section currently uses `--dark-section-bg: 30 15% 12%` (very dark charcoal, near-black). Replace with a deep warm charcoal-brown (e.g. `30 15% 22%`) or switch to a rich navy-free dark champagne tone that stays within the brand's warm palette without reading as black.

### 2. Add the Laser Location logo
Place the logo as a small, centered brand mark at the very top of the page (above the urgency bar). No navigation links -- just the logo so visitors immediately recognise the brand. Use the existing Supabase-hosted logo: `https://fifmmrdngtgxxmmplvrb.supabase.co/storage/v1/object/public/website-photos/brand-logos/Laser%20final%20logo.webp`

### 3. Embed the reviews widget (carousel format, capped)
Replace the current static testimonials section with the ReputationHub review widget you provided. Embed it inside a contained section with a max-height or use the iframe in a horizontally scrollable/carousel container so it doesn't create endless scrolling. The widget code:
```html
<script src='https://reputationhub.site/reputation/assets/review-widget.js'></script>
<iframe src='https://reputationhub.site/reputation/widgets/review_widget/PWKfLNPWUuSeU4ukiccO' .../>
```
I'll wrap this in a fixed-height container (~400px) with overflow hidden and a "See all reviews" link, keeping the page tight. If the widget supports a carousel parameter we'll use that; otherwise we constrain it visually.

**Recommendation on review count**: Cap the visible area to show roughly 3-4 reviews at a time. A carousel or scroll-snap approach is ideal -- it provides social proof without the user having to scroll through dozens of reviews. The full widget can be linked out.

### 4. Learnings from the Queens Laser competitor funnel
What they do well that we should adopt:
- **Before & after transformation images** -- a dedicated section with 2-3 comparison images (you'd need to provide these from the client)
- **Video testimonials** -- embedded Vimeo/YouTube clips of real clients (again, need assets from the client)
- **Multiple CTAs throughout** -- add a "Claim Your Discount" button after every major section (pain points, testimonials, pricing), not just at the top and bottom
- **Location/map** -- a small Google Maps embed or address block near the footer for local trust

What we already do better:
- Cleaner, more premium design vs their basic GHL template
- Better typography and brand consistency
- Structured pricing card with inclusions list
- FAQ accordion

### 5. Additional CTA buttons throughout
Add a gold "Claim Your £100 Discount" button after the pain points section and after the reviews section, both scrolling to the final form. This matches the competitor's approach of multiple conversion points.

---

## Summary of Edits
1. **index.css** -- Lighten `--dark-section-bg` to avoid black
2. **Index.tsx** -- Add logo at top, embed review widget iframe, add mid-page CTA buttons, keep static testimonials as fallback above the widget
3. **index.html** -- Add the ReputationHub widget script tag

No new dependencies needed. All changes are in existing files.

