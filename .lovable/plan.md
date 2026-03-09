

# Laser Location Landing Page / Sales Funnel Rebuild

## What I Found

**Jordan's existing funnel** (offer.laserlocation.co.uk) has all the right content -- Spring Special £695 for 6 sessions, free consultation offer, pain-point sections, testimonials, FAQ, and a GoHighLevel calendar embed. The structure is solid but the design doesn't match the main Laser Location website.

**Main website** (laserlocation.co.uk, built in Lovable as [Laser Location Refined](/projects/3940cb64-eee2-4571-b853-04c27e21bd81)) uses:
- Fonts: Playfair Display (serif headings), Inter (body), Great Vibes (script accents)
- Colors: Warm white backgrounds, champagne gold accents/buttons, charcoal text, dark sections
- Premium editorial aesthetic with gold metallic effects, marble overlays, rounded gold CTAs

**The bounce problem**: Jordan's funnel is a long-scroll page with the booking calendar at the very bottom. Users who click "Book Your Free Consultation" from ads land at the top and have to scroll through ~8 sections before reaching the form. The CTA should be immediate.

## Plan

### 1. Port the brand system from the main website
Copy the full design system (CSS variables, fonts, tailwind config, utility classes) from the Laser Location Refined project into this project. This ensures visual consistency with the main site -- same gold buttons, typography, warm tones.

### 2. Build a high-converting single-page funnel
Restructure the page for conversion, not information. Key changes from Jordan's version:

- **Hero with inline lead capture form** -- Name, email, phone fields right in the hero section alongside the offer (£695 for 6 sessions, save £100). No scrolling required to convert
- **Urgency bar** -- "Only 15 consultation spots left this month" sticky or prominent
- **Social proof strip** -- "5-Star Rated | 8,500+ Sessions | 1,000+ Clients" immediately visible
- **Pain points section** -- Keep the razor/waxing/cycle content (condensed)
- **How it works** -- 3-step process (kept brief)
- **Testimonials** -- 3 reviews with stars
- **Pricing card** -- Spring Special with crossed-out price
- **FAQ accordion** -- Keep the existing Q&As
- **Final CTA** -- Repeat the lead capture form at the bottom
- **GoHighLevel calendar embed** -- Available as a secondary path for those ready to book directly

### 3. Lead capture approach
The form collects name, email, and phone number. On submit, it can either:
- Redirect to the GoHighLevel booking calendar (currently embedded at the bottom of Jordan's page)
- Show a success message with a voucher code

Since you mentioned wanting to capture emails and offer a voucher discount, I'll build the form to capture details and then redirect to the booking calendar, giving them the discount code on the confirmation screen.

### 4. Mobile-first design
The funnel will be fully responsive with the form prominently placed on mobile, since ad traffic is predominantly mobile.

## Technical Details

- Copy `index.css` design system + `tailwind.config.ts` font/animation config from Laser Location Refined project
- Load Google Fonts (Playfair Display, Inter, Great Vibes) in `index.html`
- Build a single `LandingPage` component with all sections
- Form state managed with react-hook-form + zod validation
- All copy pulled from Jordan's existing funnel content
- GoHighLevel widget script added to index.html

