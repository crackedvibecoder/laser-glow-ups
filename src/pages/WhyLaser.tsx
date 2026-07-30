import { useEffect, useState, useCallback } from "react";
import { Check, Clock, Star, Sparkles } from "lucide-react";
import laserWatermark from "@/assets/laser-watermark.png";
import legLaser from "@/assets/leg-laser.jpg";
import armLaser from "@/assets/arm-laser.jpg";
import ResultsGallery from "@/components/ResultsGallery";
import FacialHairStory from "@/components/FacialHairStory";
import storyShaving from "@/assets/story-shaving.jpg";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const BOOKING_WIDGET_URL =
  "https://api.leadconnectorhq.com/widget/booking/XFCIVqAZ7Ha6pnxEiKXH";

/**
 * Booking iframe URL with funnel attribution for this page.
 * Preserves incoming UTMs / click IDs and always forces
 * utm_content=why-laser so bookings from this page are identifiable in GHL.
 */
const buildBookingSrc = () => {
  const search = typeof window !== "undefined" ? window.location.search : "";
  const params = new URLSearchParams(search);
  if (!params.get("utm_source")) params.set("utm_source", "direct");
  if (!params.get("utm_medium")) params.set("utm_medium", "funnel");
  params.set("utm_content", "why-laser");
  return `${BOOKING_WIDGET_URL}?${params.toString()}`;
};

/* ──────────────────── Countdown Timer ──────────────────── */
const CountdownTimer = () => {
  const getTimeLeft = useCallback(() => {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const diff = endOfMonth.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 60000);
    return () => clearInterval(interval);
  }, [getTimeLeft]);

  return (
    <span className="flex flex-col md:flex-row items-center gap-0.5 md:gap-1">
      <span className="inline-flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary shrink-0" />
        Summer Special — Save £100
      </span>
      <span className="hidden md:inline">·</span>
      <span>
        Offer ends in{" "}
        <strong className="text-primary">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
        </strong>
      </span>
    </span>
  );
};

/* ──────────────────── Exit Intent Popup ──────────────────── */
const ExitIntentPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("exit_popup_shown")) return;

    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem("exit_popup_shown")) {
        sessionStorage.setItem("exit_popup_shown", "1");
        setOpen(true);
      }
    };

    let scrollTriggered = false;
    const startTime = Date.now();
    const handleScroll = () => {
      const scrollPercent =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const timeOnPage = (Date.now() - startTime) / 1000;
      if (
        scrollPercent > 0.6 &&
        timeOnPage > 15 &&
        !scrollTriggered &&
        !sessionStorage.getItem("exit_popup_shown")
      ) {
        scrollTriggered = true;
        sessionStorage.setItem("exit_popup_shown", "1");
        setOpen(true);
      }
    };

    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg text-center p-10 md:p-12 border-2 border-primary/30 shadow-2xl">
        <DialogHeader className="space-y-5 text-center sm:text-center items-center">
          <div className="mx-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary/15">
            <span className="text-5xl md:text-6xl font-bold text-primary tracking-tight">
              £100 OFF
            </span>
          </div>
          <DialogTitle className="text-3xl md:text-4xl font-serif leading-tight">
            Your Summer Discount Is Still Waiting
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-lg">
            Trusted by <strong className="text-foreground">1,000+ clients</strong> in Manchester
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-primary font-medium mt-2 animate-pulse">
          ⏳ Limited spots available this week
        </p>
        <a
          href="#book"
          onClick={() => setOpen(false)}
          className="btn-gold-metallic w-full mt-3 text-lg py-5 tracking-wider inline-block text-center"
        >
          Claim My £100 Discount →
        </a>
        <button
          onClick={() => setOpen(false)}
          className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors mt-1 underline underline-offset-2 outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          No thanks, I'll pay full price
        </button>
        <p className="text-xs text-muted-foreground mt-1">
          No payment required · Free consultation · No obligation
        </p>
      </DialogContent>
    </Dialog>
  );
};

/* ──────────────────── Highlighted Reviews ──────────────────── */
const HIGHLIGHTED_REVIEWS = [
  {
    name: "Reza Vahid Roudsari",
    when: "2 years ago",
    text: "I'm only three sessions into my laser hair removal treatment and I am over the moon with my results! I've saved hours on shaving already and my skin is now free of unsightly razor rashes, all thanks to the incredible skills of Carmen, my therapist. Carmen is extremely experienced and a true expert in her field. She goes above and beyond to make sure you are comfortable throughout the session while giving you excellent results. My only regret: I should have started coming to Carmen years ago!!",
  },
  {
    name: "Shazad Ahmed",
    when: "4 months ago",
    text: "I've had six sessions so far on my laser journey. Incredibly pleased with the results. As an Asian male I have darker skin and thick prominent hair. Laser Location were able to tailor my treatments to my specific needs. Carmen and her team are consummate professionals. I highly recommend this clinic.",
  },
  {
    name: "Maisey Trainor",
    when: "a year ago",
    text: "The girls in there are absolutely lovely & the results speak for themselves. Your made to feel so comfortable and the only thing I ever say is I wish I went sooner, can't recommend this place enough.",
  },
  {
    name: "Z JJ",
    when: "a month ago",
    text: "Have been coming hear for awhile getting different areas lasered — the results I have are amazing! The girls are so friendly and everything is always clean and tidy. The offer good prices as well.",
  },
];

const Stars = () => (
  <div className="flex gap-0.5 mb-3" aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map((i) => (
      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
    ))}
  </div>
);

/* ──────────────────── Page ──────────────────── */
const WhyLaser = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Why Laser Hair Removal? | Laser Location, Bury Manchester";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? "";
    meta?.setAttribute(
      "content",
      "Still deciding? The honest case for medical-grade laser hair removal — cost vs waxing, comfort, results and safety for all skin tones. Save £100 this summer.",
    );
    return () => {
      document.title = prevTitle;
      meta?.setAttribute("content", prevDesc);
    };
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <ExitIntentPopup />

      {/* Logo */}
      <div className="pt-4 pb-3.5 bg-[hsl(30,10%,6%)] border-b border-foreground/10 text-center">
        <img
          src={laserWatermark}
          alt="Laser Location"
          className="h-40 md:h-48 -mt-10 md:-mt-12 -mb-14 md:-mb-16 mx-auto"
          loading="eager"
        />
      </div>

      {/* Urgency bar */}
      <div className="bg-primary/10 border-b border-primary/20 py-2 md:py-2.5 px-4 text-center">
        <div className="text-base font-medium text-foreground flex items-center justify-center leading-tight">
          <CountdownTimer />
        </div>
      </div>

      {/* Hero */}
      <section
        className="relative py-10 md:py-16"
        style={{ backgroundColor: "hsl(var(--hero-bg, 36 30% 92%))" }}
      >
        <div className="content-container">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 animate-fade-up">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="md:hidden mb-5">
                <img
                  src={legLaser}
                  alt="Medical-grade laser hair removal session at Laser Location in Bury, Manchester"
                  className="w-full h-48 sm:h-56 object-cover rounded-2xl shadow-lg"
                  loading="eager"
                />
              </div>

              <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
                Medical-Grade Laser Hair Removal
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-4">
                Why Laser Hair{" "}
                <span className="whitespace-nowrap">Removal?</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                The honest answer, for anyone still weighing it up.
              </p>

              <a
                href="#book"
                className="btn-gold-metallic inline-block !py-4 !px-10 !text-lg mb-4"
              >
                Claim Your £100 Discount →
              </a>

              <p className="text-base text-muted-foreground">Bury, Manchester</p>
            </div>

            <div className="hidden md:block w-full md:w-1/2">
              <img
                src={legLaser}
                alt="Medical-grade laser hair removal session at Laser Location in Bury, Manchester"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Facial hair story */}
      <section className="section-padding-compact bg-secondary">
        <div className="content-container">
          <div className="text-center mb-10">
            <p className="text-base font-medium tracking-widest uppercase text-primary mb-3">
              Let's Talk About It
            </p>
            <h2 className="text-3xl md:text-4xl font-serif">
              The Thing Nobody Talks About
            </h2>
          </div>

          <FacialHairStory />

          <div className="text-center mt-10">
            <a href="#book" className="btn-gold-metallic">
              Claim Your £100 Discount →
            </a>
          </div>
        </div>
      </section>

      {/* Shaving break */}
      <section className="section-padding-compact bg-background">
        <div className="content-container">
          <div className="max-w-md mx-auto rounded-2xl overflow-hidden shadow-lg">
            <img
              src={storyShaving}
              alt="Medical-grade laser hair removal treatment on a client's leg — an end to shaving every day"
              className="w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>


      {/* The real cost */}

      <section className="section-padding-compact bg-background">
        <div className="content-container text-center">
          <p className="text-base font-medium tracking-widest uppercase text-primary mb-3">
            The Maths
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            What Shaving &amp; Waxing Really Cost You
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Temporary hair removal never ends — and the bill never stops.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
            {[
              {
                emoji: "⏳",
                title: "Hours You Never Get Back",
                desc: "Shaving 3–4 times a week adds up to days of your life every single year — and the results barely last 24 hours.",
              },
              {
                emoji: "💷",
                title: "£500+ Every Year, Forever",
                desc: "Waxing at £50 every 4–6 weeks is over £500 a year, indefinitely. A 6-session laser course is a one-off £795.",
              },
              {
                emoji: "🪒",
                title: "Razor Burn & Ingrowns",
                desc: "Constant shaving and waxing irritates skin, causes ingrown hairs and leaves darkening and bumps behind.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-8 rounded-xl bg-card border border-border"
              >
                <span className="text-4xl mb-4 block">{item.emoji}</span>
                <h3 className="text-xl font-semibold tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-base">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <a href="#book" className="btn-gold-metallic">
              Claim Your £100 Discount →
            </a>
          </div>
        </div>
      </section>

      {/* How it actually works */}
      <section className="section-padding-compact bg-secondary">
        <div className="content-container">
          <div className="text-center mb-12">
            <p className="text-base font-medium tracking-widest uppercase text-primary mb-3">
              How It Actually Works
            </p>
            <h2 className="text-3xl md:text-4xl font-serif">
              Medical-Grade Technology, Not a Home Gadget
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <img
              src={armLaser}
              alt="Practitioner treating a client's arm with the AW3 Crystal Freeze Diamond laser"
              className="w-full h-72 object-cover rounded-2xl shadow-lg"
              loading="lazy"
            />
            <div className="space-y-4">
              {[
                "The AW3 Crystal Freeze Diamond laser targets the pigment in the hair follicle, disabling its ability to regrow.",
                "3 wavelengths (755/810/1064nm) mean it's clinically proven safe and effective for every skin tone, Fitzpatrick I–VI.",
                "Patented Crystal Freeze cooling keeps the skin comfortable — most clients describe a warm snapping sensation, far easier than waxing.",
                "A full-body session takes around 60 minutes, with 6 sessions spaced to your natural hair growth cycle.",
                "Up to 90% lasting hair reduction, with occasional maintenance as needed.",
              ].map((line) => (
                <div key={line} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <p className="text-lg text-muted-foreground">{line}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <a href="#book" className="btn-gold-metallic">
              Claim Your £100 Discount →
            </a>
          </div>
        </div>
      </section>

      {/* Is it right for me */}
      <section className="section-padding-compact bg-background">
        <div className="content-container text-center">
          <p className="text-base font-medium tracking-widest uppercase text-primary mb-3">
            Is It Right For Me?
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Laser Is For Everyone
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            All genders, all skin tones, all areas — assessed properly before we ever treat you.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {[
              {
                title: "Every Skin Tone",
                desc: "3-wavelength technology safely treats Fitzpatrick I–VI, including darker skin.",
              },
              {
                title: "Coarse or Hormonal Hair",
                desc: "PCOS and hormonal growth affect 1 in 10 women. Laser targets the follicle, not just the surface.",
              },
              {
                title: "All Genders",
                desc: "Back, chest, shoulders, jawline — discreet, professional sessions for men and women.",
              },
              {
                title: "Sensitive Areas",
                desc: "Bikini, underarms, face and chin treated with cooling and care by qualified practitioners.",
              },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl bg-card border border-border text-left">
                <h3 className="text-lg font-semibold tracking-tight mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-base">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-left">
            <h3 className="text-2xl md:text-3xl font-serif text-center mb-6">
              Real Client Results
            </h3>
            <ResultsGallery />
          </div>

        </div>
      </section>

      {/* Reviews */}
      <section className="section-padding-compact bg-secondary">
        <div className="content-container">
          <div className="text-center mb-12">
            <p className="text-base font-medium tracking-widest uppercase text-primary mb-3">
              What Our Clients Say
            </p>
            <h2 className="text-3xl md:text-4xl font-serif">
              Trusted by 1,000+ Clients in Manchester
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
            {HIGHLIGHTED_REVIEWS.map((review) => (
              <figure
                key={review.name}
                className="p-7 rounded-xl bg-card border border-border text-left"
              >
                <Stars />
                <blockquote className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  “{review.text}”
                </blockquote>
                <figcaption className="font-serif text-lg text-foreground">
                  {review.name}
                  <span className="block text-sm text-muted-foreground font-sans">
                    Google review · {review.when}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="text-center text-base font-medium tracking-widest uppercase text-primary mb-4">
            See All Google Reviews
          </p>
          <div
            className="max-w-4xl mx-auto rounded-2xl border border-border overflow-hidden"
            style={{ maxHeight: "480px", overflowY: "auto" }}
          >
            <iframe
              className="lc_reviews_widget"
              src="https://reputationhub.site/reputation/widgets/review_widget/PWKfLNPWUuSeU4ukiccO"
              frameBorder="0"
              scrolling="no"
              loading="lazy"
              style={{ minWidth: "100%", width: "100%" }}
              title="Laser Location Reviews"
            />
          </div>

          <div className="text-center mt-12">
            <a href="#book" className="btn-gold-metallic">
              Claim Your £100 Discount →
            </a>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-accent section-padding-compact">
        <div className="content-container text-center relative z-10">
          <p className="text-base font-medium tracking-widest uppercase text-primary mb-3">
            Limited Time
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-12">Summer 2026 Special</h2>

          <div className="max-w-lg mx-auto bg-card border border-border shadow-xl rounded-2xl p-10">
            <div className="mb-6">
              <span className="text-2xl text-muted-foreground line-through mr-3">£895</span>
              <span className="text-5xl font-serif text-gold-metallic font-semibold">£795</span>
            </div>
            <p className="text-lg font-serif mb-8 text-foreground">for 6 Full-Body Sessions</p>

            <div className="text-left space-y-3 mb-8">
              {[
                "6 full-body sessions (legs, arms, underarms, bikini, back, chest, stomach)",
                "AW3 Crystal Freeze Diamond laser system (3-wavelength)",
                "Qualified, fully insured practitioner",
                "Personalised treatment plan",
                "Aftercare guidance included",
                "Payment plans available (from £133/mo)",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-lg text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>

            <a href="#book" className="btn-gold-metallic w-full !block !text-center">
              Claim Your £100 Discount →
            </a>

            <p className="text-sm mt-4 text-muted-foreground">
              Save £100 when you book your free consultation this month
            </p>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="pt-2 pb-16 bg-secondary scroll-mt-4">
        <div className="content-container max-w-2xl text-center">
          <iframe
            src={buildBookingSrc()}
            style={{ width: "100%", border: "none", minHeight: "800px", overflow: "hidden" }}
            title="Book Your Consultation"
          />
          <p className="text-base text-muted-foreground mt-4">
            No payment required · Free consultation · All skin types welcome
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding-compact bg-background">
        <div className="content-container max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-base font-medium tracking-widest uppercase text-primary mb-3">
              Still On The Fence?
            </p>
            <h2 className="text-3xl md:text-4xl font-serif">Your Questions, Answered</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {[
              {
                q: "Does laser hair removal hurt?",
                a: "Most clients describe it as a warm snapping sensation, much less painful than waxing. Our AW3 Crystal Freeze Diamond laser features patented Crystal Freeze cooling technology for maximum comfort during treatment.",
              },
              {
                q: "How many sessions will I actually need?",
                a: "6 sessions is the standard course, spaced 4–6 weeks apart to align with your hair growth cycle. Most clients see significant reduction after just 2–3 sessions, with up to 90% hair reduction overall.",
              },
              {
                q: "Are the results really lasting?",
                a: "Yes. Once a follicle is disabled it doesn't regrow. Most clients achieve up to 90% lasting reduction, with occasional maintenance sessions to keep on top of any hormonal regrowth.",
              },
              {
                q: "Is it safe for darker skin tones?",
                a: "Yes. Our AW3 Crystal Freeze Diamond laser uses 3-wavelength technology (755/810/1064nm) that is clinically proven safe and effective for all skin types and tones (Fitzpatrick I–VI).",
              },
              {
                q: "Is laser cheaper than waxing long-term?",
                a: "Yes. Most clients spend £50+ every 4–6 weeks on waxing — that's over £500 a year, indefinitely. Our 6-session course costs £795 with the £100 summer discount (normally £895) for lasting results, making it a fraction of the long-term cost of waxing.",
              },
              {
                q: "What happens during the free consultation?",
                a: "We'll assess your skin type and hair, discuss your goals, answer all your questions, and create a personalised treatment plan. No cost, no obligation, no pressure.",
              },
              {
                q: "Are payment plans available?",
                a: "Yes. We offer flexible payment plans from £133 per month over 6 months. We'll discuss all options during your free consultation.",
              },
            ].map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-left font-serif text-lg hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-lg leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-secondary">
        <div className="content-container max-w-xl text-center">
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Ready to Ditch the Razor{" "}
            <span className="text-script-accent text-primary text-[1.1em]">For Good?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Book your free, no-obligation consultation and claim your £100 Summer Discount.
          </p>

          <a href="#book" className="btn-gold-metallic inline-block !py-4 !px-10 !text-lg">
            Claim Your £100 Discount →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="content-container text-center text-sm text-muted-foreground space-y-4">
          <p>© {new Date().getFullYear()} Laser Location. All rights reserved.</p>
          <p className="max-w-2xl mx-auto">
            Laser Location collects the personal information you submit for the purpose of
            contacting you about your enquiry. Your details are used only for booking and
            follow-up. We do not sell your data.{" "}
            <a href="mailto:info@laserlocation.co.uk" className="text-primary hover:underline">
              info@laserlocation.co.uk
            </a>
          </p>
          <p>
            Summer 2026 offer subject to availability. Treatment suitability assessed during
            consultation.
          </p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[hsl(30,10%,6%)] border-t border-primary/20 p-3">
        <a href="#book" className="btn-gold-metallic w-full !block !text-center !py-3.5">
          Claim £100 Off — Book Free Consultation →
        </a>
      </div>
    </div>
  );
};

export default WhyLaser;
