import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const offerSource = readFileSync(join(process.cwd(), "src/pages/Index.tsx"), "utf8");
const whyLaserSource = readFileSync(join(process.cwd(), "src/pages/WhyLaser.tsx"), "utf8");
const thankYouSource = readFileSync(join(process.cwd(), "src/pages/ThankYou.tsx"), "utf8");
const indexHtml = readFileSync(join(process.cwd(), "index.html"), "utf8");

describe("main offer funnel copy and routing", () => {
  it("keeps direct checkout primary and consultation secondary", () => {
    expect(offerSource).toContain(
      "https://link.fastpaydirect.com/payment-link/6a6cbce37b99151a540418e7",
    );
    expect(offerSource).toContain("Secure My 6 Sessions");
    expect(offerSource).toContain("Secure 6 Sessions for £795");
    expect(offerSource.match(/href=\{FULL_BODY_CHECKOUT_URL\}/g)?.length ?? 0).toBeGreaterThanOrEqual(5);
    expect(offerSource).toContain('href="#book"');
  });

  it("answers the buying questions raised by the offer", () => {
    expect(offerSource).toContain("What areas are included in the full-body package?");
    expect(offerSource).toContain("Is there any recovery time or downtime?");
    expect(offerSource).toContain("What happens during the free consultation?");
    expect(offerSource).toContain('href="/why-laser"');
    expect(offerSource).toContain("<ReviewsWidget />");
  });

  it("keeps the decision flow in the intended order", () => {
    const order = [
      "{/* Hero Section */}",
      "{/* Offer details */}",
      "{/* Pain Points */}",
      "{/* Real Results - Before & After */}",
      "{/* How It Works */}",
      "{/* Your First Visit - Video */}",
      "{/* Selected reviews */}",
      "{/* Full Google reviews widget */}",
      "{/* FAQ */}",
      "{/* Final decision */}",
      "{/* Booking Calendar */}",
    ].map((marker) => offerSource.indexOf(marker));

    expect(order.every((position) => position >= 0)).toBe(true);
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });

  it("does not reintroduce stale or unsupported offer copy", () => {
    expect(offerSource).not.toContain("Today Only");
    expect(offerSource).not.toContain("Payday");
    expect(offerSource).not.toContain("PAYDAY200");
    expect(offerSource).not.toContain("£695");
    expect(offerSource).not.toContain("£200");
    expect(offerSource).not.toContain("just booked a consultation");
    expect(offerSource).not.toContain("Payment plans available (from £133/mo)");
    expect(offerSource).not.toContain("up to 90% hair reduction");
  });

  it("keeps every public offer surface aligned to the £795 Summer Special", () => {
    for (const source of [offerSource, whyLaserSource, thankYouSource, indexHtml]) {
      expect(source).toContain("£795");
      expect(source).not.toContain("PAYDAY200");
      expect(source).not.toContain("£695");
      expect(source).not.toContain("£200");
    }
    expect(whyLaserSource).not.toContain("CountdownTimer");
    expect(indexHtml).toContain("Save £100 with the Summer Special");
  });

  it("keeps the thank-you duration aligned with the live calendar", () => {
    expect(thankYouSource).toContain("30-minute consultation");
    expect(thankYouSource).not.toContain("15-min consultation");
  });
});
