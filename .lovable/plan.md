

# Reduce Bounce Rate — Copy & Engagement Fixes

No structural or layout changes. Focused on copy rewrites and small visual tweaks that improve first-impression relevance for Facebook ad traffic on mobile.

## Changes

### 1. Hero headline rewrite
**Current:** "Lasting Smooth Skin Starts Here"
**Problem:** Aspirational but vague — doesn't match the urgency of a paid ad click. Users from Facebook expect the offer they clicked on.
**Proposed:** "Full-Body Laser Hair Removal — Save £100 This Spring" — leads with the offer and matches ad copy. The script accent can stay on a shorter phrase like "This Spring".

### 2. Hero subhead rewrite
**Current:** "Full-body laser hair removal. 6 sessions. Medical-grade technology. Safe for all skin types."
**Problem:** Reads like a feature list, not a benefit. No emotional hook.
**Proposed:** "Ditch the razor for good. 6 painless sessions, all skin types welcome — trusted by 1,000+ clients in Manchester."

### 3. Urgency bar copy
**Current:** Shows countdown only (via CountdownTimer component).
**Proposed:** Add explicit savings text alongside the timer: "Spring Special — Save £100 · Offer ends in [countdown]" — reinforces the discount before they even reach the pricing badge.

### 4. Form card subhead
**Current:** "Claim your £100 Spring Discount — no payment required"
**Proposed:** "Limited availability — secure your spot with no payment required" — shifts from discount language (which they've already seen) to scarcity.

### 5. Enable social proof toasts on mobile
Currently hidden with `hidden md:flex`. Remove that restriction so mobile users (90% of traffic) actually see them.

### 6. Sticky mobile CTA copy
If currently generic ("Book Now"), change to "Claim £100 Off — Book Free Consultation" to reinforce the offer on every scroll.

## Files to modify
- `src/pages/Index.tsx` — all 6 changes (copy updates + toast visibility class)

No structural, layout, or loading changes. No database changes.

