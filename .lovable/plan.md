## Fix gold numbers appearance

**Problem:** The `-webkit-text-stroke: 1px` I added sits on top of the gradient fill and eats into the glyphs, which is why the numbers now look darker/duller and no longer gold. The stroke is also visually too thick.

**Fix in `src/index.css` — `.text-gold-metallic`:**
- Remove `-webkit-text-stroke` (it conflicts with `-webkit-text-fill-color: transparent` and mutes the gradient).
- Replace it with `filter: drop-shadow(...)` using two very subtle dark-brown shadows. This gives the numbers a thin definition/outline against light backgrounds without overwriting the gold gradient.
- Keep the existing gradient stops exactly as they were originally so the gold color is fully restored.

Result: numbers look gold again (as before), with only a faint dark-brown edge for contrast — no thick outline.

No other files change.