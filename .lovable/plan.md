

# Replace .mov with converted .mp4 and fix video sizing

## Changes

1. **Copy uploaded video** to `public/videos/first-visit.mp4` (replacing the .mov)
2. **Update `src/pages/Index.tsx`** (line 386): Change source from `/videos/first-visit.mov` to `/videos/first-visit.mp4`
3. **Reduce video container width** on both videos (lines 378 and 404): Change `max-w-lg` to `max-w-sm` (384px) for better desktop sizing
4. **Delete** `public/videos/first-visit.mov` (no longer needed)

