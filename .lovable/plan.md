

## CRO & Bounce Rate Optimization Plan

All changes in `src/pages/Index.tsx` and `src/index.css`. No new dependencies. SEO schema dropped per your note about paid traffic.

### 1. Lazy-Load Videos & Review Widget
Wrap the two `<video>` elements and the reviews `<iframe>` with an `IntersectionObserver`-based lazy loader. Videos will only load when they enter the viewport, significantly improving initial page load time (the #1 factor in bounce rate from paid ads).

- Create a `LazySection` wrapper component inside Index.tsx that renders a placeholder until visible
- Replace `autoPlay` with programmatic `.play()` on intersection
- Add `loading="lazy"` to the reviews iframe

### 2. Sticky Desktop CTA Bar
Add a slim fixed top bar on `md+` screens that appears after the user scrolls past the hero section. Contains the offer headline and a "Book Now" button. Uses `IntersectionObserver` on the hero to toggle visibility.

- Fixed bar with `bg-[hsl(30,10%,6%)]` to match the logo header
- Slides in with a CSS transition
- Hidden on mobile (already has sticky bottom CTA)

### 3. Exit-Intent Popup
Create an exit-intent dialog using the existing `Dialog` component:
- **Desktop**: triggers on `mouseout` from the top of the viewport
- **Mobile**: triggers after 60% scroll depth + 15 seconds on page
- Shows once per session (tracked via `sessionStorage`)
- Contains urgency copy and a simplified CTA button that scrolls to `#claim`

### 4. Social Proof Toast Notifications
Use `sonner` (already installed) to show rotating "recent booking" notifications every 25-30 seconds after the user has been on the page for 10 seconds.

- Array of realistic names + Manchester area locations
- Subtle, non-intrusive positioning (bottom-left on desktop, hidden on mobile since sticky CTA is there)
- Auto-dismiss after 4 seconds

### 5. Dynamic Countdown Timer
Replace the static "15 spots left" urgency bar with a countdown to end of current month. Shows days, hours, minutes remaining. Updates every minute.

### 6. How It Works Timeline Connectors
Add horizontal dashed connecting lines between the 3 step cards on desktop using CSS `::after` pseudo-elements on the first two cards. Reinforces the sequential journey.

### 7. Form Progress Indicator
Add a subtle "Step 1 of 3" label above each form field in `LeadCaptureForm` to reduce perceived friction and increase completion rate.

### Priority Order
1. Lazy-load (bounce rate)
2. Sticky desktop CTA (conversion)
3. Exit-intent popup (conversion)
4. Social proof toasts (conversion)
5. Countdown timer (urgency)
6. Timeline connectors (trust)
7. Form step labels (completion)

