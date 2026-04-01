

# Hero Copy & Trust Badge Cleanup

## Changes in `src/pages/Index.tsx`

### 1. Reword hero paragraph (line 311-313)
Change from: "Ditch the razor for good. 6 painless sessions, all skin types welcome."
To two lines:
- "Ditch the razor for good."
- "60-minute sessions, all skin types welcome."

This fixes flow and removes "6 painless sessions" (which was slightly confusing as copy).

### 2. Update trust badges below CTA (lines 323-336)
Remove "Medical-Grade" (already in kicker above headline) and "All Skin Tones" (already in paragraph above). Replace with:
- **Users icon** — "1,000+ Clients"
- **Star icon** — "5-Star Rated"  
- **Zap/Clock icon** — "8,500+ Sessions" or "6+ Years Experience"

### 3. Remove Social Proof Strip section (lines 341-362)
The stats (1,000+ clients, 8,500+ sessions, 5★, 6+ years) are now redundant since we're putting key ones in the trust badges. Remove this entire section to eliminate repetition.

## File modified
- `src/pages/Index.tsx`

