import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const offerSource = readFileSync(join(process.cwd(), "src/pages/Index.tsx"), "utf8");
const thankYouSource = readFileSync(join(process.cwd(), "src/pages/ThankYou.tsx"), "utf8");

describe("main offer funnel copy and routing", () => {
  it("keeps direct checkout primary and consultation secondary", () => {
    expect(offerSource).toContain(
      "https://link.fastpaydirect.com/payment-link/6a6cbce37b99151a540418e7",
    );
    expect(offerSource).toContain("Secure My 6 Sessions");
    expect(offerSource).toContain("Secure 6 Sessions for £695");
    expect(offerSource.match(/href=\{PAYDAY_CHECKOUT_URL\}/g)?.length ?? 0).toBeGreaterThanOrEqual(5);
    expect(offerSource).toContain('href="#book"');
  });

  it("answers the buying questions raised by the offer", () => {
    expect(offerSource).toContain("What areas are included in the full-body package?");
    expect(offerSource).toContain("Is there any recovery time or downtime?");
    expect(offerSource).toContain("What happens during the free consultation?");
  });

  it("keeps the decision flow in the intended order", () => {
    const order = [
      "{/* Hero Section */}",
      "{/* Offer details */}",
      "{/* Pain Points */}",
      "{/* Real Results - Before & After */}",
      "{/* How It Works */}",
      "{/* Your First Visit - Video */}",
      "{/* Reviews Widget */}",
      "{/* FAQ */}",
      "{/* Final decision */}",
      "{/* Booking Calendar */}",
    ].map((marker) => offerSource.indexOf(marker));

    expect(order.every((position) => position >= 0)).toBe(true);
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });

  it("does not reintroduce stale or unsupported offer copy", () => {
    expect(offerSource).not.toContain("Today Only");
    expect(offerSource).not.toContain("£100 off");
    expect(offerSource).not.toContain("just booked a consultation");
    expect(offerSource).not.toContain("Payment plans available (from £133/mo)");
    expect(offerSource).not.toContain("up to 90% hair reduction");
  });

  it("keeps the thank-you duration aligned with the live calendar", () => {
    expect(thankYouSource).toContain("30-minute consultation");
    expect(thankYouSource).not.toContain("15-min consultation");
  });
});
