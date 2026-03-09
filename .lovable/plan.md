

# Add inclusivity callouts

## Changes to `src/pages/Index.tsx`

### 1. Hero trust badges (lines ~174-184)
Add a 4th badge: **"All Skin Tones"** with a `Sparkles` icon alongside the existing 3 trust badges.

### 2. Pain points section (lines 284-316)
Add a 5th card:
- **Emoji**: 💪
- **Title**: "All Genders. All Areas."
- **Desc**: "Back, chest, shoulders, jawline — laser hair removal is for everyone. Discreet, professional sessions with lasting results."

Update grid: `md:grid-cols-2 lg:grid-cols-3` so it flows as 3+2 on desktop (last row centered), 2-col on tablet, 1-col on mobile. Add `justify-items-center` to the grid and conditionally widen the last row items using a wrapper or letting them naturally center.

