

## Fix: Balance the Pain Points Grid on Desktop

**Problem**: 5 cards in a 3-column grid produces a row of 3 + a row of 2, with the bottom two left-aligned and unbalanced.

**Solution**: On large screens, center the last two cards by making all 5 items use a 6-column sub-grid approach. The first 3 cards each span 2 columns (filling 6), and the last 2 cards each span 3 columns (filling 6), centering them naturally.

### Changes in `src/pages/Index.tsx` (lines 319-357)

Replace the grid container with a **6-column grid on `lg`**:
- Grid: `grid md:grid-cols-2 lg:grid-cols-6 gap-8 max-w-5xl mx-auto`
- First 3 cards: `lg:col-span-2` (3 × 2 = 6, fills the row)
- Last 2 cards: `lg:col-span-3` (2 × 3 = 6, fills and centers the second row)
- Remove the existing messy conditional class logic on the cards

This keeps `md` as a 2-column layout (mobile/tablet) unchanged.

