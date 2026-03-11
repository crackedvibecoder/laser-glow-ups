

## Plan: Remove Lazy-Load Risk & Fix Before/After Captions

### 1. Remove LazyVideo — Revert to Direct Video Tags
Your concern is valid. The `rootMargin: "200px"` pre-load buffer helps, but on fast scrollers or slower connections there's still a risk of seeing a grey placeholder instead of content. Since you're not experiencing any speed issues, the lazy-load adds complexity with marginal benefit. The videos are small (mobile-shot MP4s) and the page is already performant.

**Changes in `src/pages/Index.tsx`:**
- Delete the `LazyVideo` component (lines 33-65)
- Replace the two `<LazyVideo>` usages (lines 628, 648) with standard `<video>` tags using `autoPlay muted playsInline controls`
- Keep `loading="lazy"` on the reviews iframe (this is native browser behavior and won't show a placeholder — it just defers the network request)

### 2. Update Before/After Captions
Change both caption lines from "Before & after 6 sessions" to "Before & after several sessions" to keep it vague and accurate.

**Lines 495 and 502** — replace `6 sessions` with `several sessions`.

