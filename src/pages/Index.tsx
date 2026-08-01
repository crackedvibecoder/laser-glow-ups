import { useState, useEffect } from "react";
import { Check, Clock, Sparkles } from "lucide-react";
import laserWatermark from "@/assets/laser-watermark.png";
import heroShavingEveryday from "@/assets/hero-shaving-everyday.jpg";
import ResultsGallery from "@/components/ResultsGallery";
import {
  ReviewCard,
  ReviewBreak,
  reviewByName,
} from "@/components/GoogleReviews";


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

/* ──────────────────── Offer links ──────────────────── */
const BOOKING_WIDGET_URL = "https://api.leadconnectorhq.com/widget/booking/XFCIVqAZ7Ha6pnxEiKXH";
const PAYDAY_CHECKOUT_URL =
  "https://link.fastpaydirect.com/payment-link/6a6cbce37b99151a540418e7";

/**
 * Builds the GHL booking iframe URL with funnel attribution.
 * - Preserves any incoming UTMs / click IDs (fbclid, gclid, utm_campaign, etc.)
 * - Defaults utm_source to "direct" and utm_medium to "funnel" when missing
 * - Always forces utm_content=offer-funnel so bookings from this page are
 *   identifiable in GHL even for direct/organic traffic
 */
const buildBookingSrc = () => {
  const search = typeof window !== "undefined" ? window.location.search : "";
  const params = new URLSearchParams(search);
  if (!params.get("utm_source")) params.set("utm_source", "direct");
  if (!params.get("utm_medium")) params.set("utm_medium", "funnel");
  params.set("utm_content", "offer-funnel");
  return `${BOOKING_WIDGET_URL}?${params.toString()}`;
};

const OfferBanner = () => {
  return (
    <span className="flex flex-col md:flex-row items-center gap-0.5 md:gap-1">
      <span className="inline-flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary shrink-0" />
        <span className="whitespace-nowrap">
          Payday Offer — 6 sessions for <strong className="text-primary">£695</strong>
        </span>
      </span>
      <span className="hidden md:inline">·</span>
      <span>Usually £895 · Save £200</span>
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
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const timeOnPage = (Date.now() - startTime) / 1000;
      if (scrollPercent > 0.6 && timeOnPage > 15 && !scrollTriggered && !sessionStorage.getItem("exit_popup_shown")) {
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
            <span className="text-5xl md:text-6xl font-bold text-primary tracking-tight">£200 OFF</span>
          </div>
          <DialogTitle className="text-3xl md:text-4xl font-serif leading-tight">
            Your Payday Offer Is Still Waiting
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-lg">
            Trusted by <strong className="text-foreground">1,000+ clients</strong> in Manchester
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-primary font-medium mt-2 animate-pulse">
          ⏳ Limited spots available this week
        </p>
         <a href={PAYDAY_CHECKOUT_URL} onClick={() => setOpen(false)} className="btn-gold-metallic w-full mt-3 text-lg py-5 tracking-wider inline-block text-center">
           Secure 6 Sessions for £695 →
         </a>
        <button
          onClick={() => setOpen(false)}
          className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors mt-1 underline underline-offset-2 outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          No thanks, I'll keep reading
        </button>
        <p className="text-xs text-muted-foreground mt-1">
          Use code PAYDAY200 at checkout · Book your first appointment later
        </p>
      </DialogContent>
    </Dialog>
  );
};

/* ──────────────────── Privacy Policy Popup ──────────────────── */
const PrivacyPolicyPopup = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-primary hover:underline text-xs"
      >
        Privacy Policy
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">Privacy Policy</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Laser Location — Privacy Policy
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm text-muted-foreground space-y-4 leading-relaxed">
            <p>
              <strong className="text-foreground">1. Who We Are</strong><br />
              Laser Location ("we", "us", "our") operates from Bury, Manchester. We are committed to protecting your personal data and respecting your privacy.
            </p>
            <p>
              <strong className="text-foreground">2. Information We Collect</strong><br />
              When you submit a consultation request, we collect your name, email address, and phone number. We may also collect information about your visit through cookies and analytics tools.
            </p>
            <p>
              <strong className="text-foreground">3. How We Use Your Information</strong><br />
              We use your personal information to: contact you about your consultation enquiry, send appointment confirmations and reminders, provide aftercare information, and improve our services.
            </p>
            <p>
              <strong className="text-foreground">4. Data Sharing</strong><br />
              We do not sell, rent, or share your personal data with third parties for marketing purposes. We may share data with service providers who assist us in operating our business (e.g., booking systems, email platforms), under strict data processing agreements.
            </p>
            <p>
              <strong className="text-foreground">5. Data Retention</strong><br />
              We retain your personal information only for as long as necessary to fulfil the purposes for which it was collected, or as required by law.
            </p>
            <p>
              <strong className="text-foreground">6. Your Rights</strong><br />
              You have the right to access, correct, or delete your personal data. You may also withdraw consent at any time. To exercise these rights, contact us at{" "}
              <a href="mailto:info@laserlocation.co.uk" className="text-primary hover:underline">info@laserlocation.co.uk</a>.
            </p>
            <p>
              <strong className="text-foreground">7. Contact</strong><br />
              For any privacy-related questions, please email{" "}
              <a href="mailto:info@laserlocation.co.uk" className="text-primary hover:underline">info@laserlocation.co.uk</a>.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};


const StickyDesktopCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 hidden md:block bg-[hsl(30,10%,6%)] border-b border-primary/20 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="content-container flex items-center justify-between py-2.5">
        <p className="text-sm text-[hsl(40,20%,85%)]">
          <span className="font-serif">Payday Offer</span> — Full-body laser hair removal{" "}
          <strong className="text-primary">£695</strong>{" "}
          <span className="text-[hsl(40,20%,60%)] line-through">£895</span>
        </p>
        <a
          href={PAYDAY_CHECKOUT_URL}
          className="btn-gold-metallic !py-2 !px-6 !text-xs"
        >
          Secure £695 Offer →
        </a>
      </div>
    </div>
  );
};

const StickyMobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) return;
    const updateVisibility = () => setVisible(hero.getBoundingClientRect().bottom <= 0);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[hsl(30,10%,6%)] border-t border-primary/20 p-3 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={PAYDAY_CHECKOUT_URL}
        className="btn-gold-metallic w-full !block !text-center !py-3.5"
      >
        Secure 6 Sessions for £695 →
      </a>
    </div>
  );
};

/* ──────────────────── Main Page ──────────────────── */
const Index = () => {

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
    <div className="min-h-screen bg-background overflow-x-hidden pb-24 md:pb-0">
      <StickyDesktopCTA />
      <StickyMobileCTA />
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

      {/* Offer bar */}
      <div className="bg-primary/10 border-b border-primary/20 py-2 md:py-2.5 px-4 text-center">
        <div className="text-base font-medium text-foreground flex items-center justify-center leading-tight">
          <OfferBanner />
        </div>
      </div>

      {/* Hero Section */}
      <section
        data-hero
        className="relative py-10 md:py-16"
        style={{ backgroundColor: "hsl(var(--hero-bg, 36 30% 92%))" }}
      >
        <div className="content-container">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 animate-fade-up">
            {/* Text content — leads on mobile, sits left on desktop */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              {/* Mobile-only image with emotive overlay */}
              <div className="md:hidden mb-5 relative rounded-2xl overflow-hidden shadow-lg bg-foreground">
                <img
                  src={heroShavingEveryday}
                  alt="Laser hair removal treatment at Laser Location"
                  className="w-full h-56 sm:h-64 object-cover object-[50%_52%]"
                  loading="eager"
                />
              </div>


              <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
                Payday Offer · Bury, Manchester
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.08] mb-4">
                6 Full-Body Laser Sessions{" "}
                <span className="block text-script-accent text-primary text-[1.1em]">for £695</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0 mb-6">
                Usually £895. Secure the complete six-session course, then book your consultation so the team can confirm suitability and personalise your treatment plan.
              </p>

              <div className="flex flex-col items-center md:items-start gap-2 mb-4">
                <a
                  href={PAYDAY_CHECKOUT_URL}
                  className="btn-gold-metallic inline-block !py-4 !px-8 !text-lg w-full sm:w-auto text-center"
                >
                  Secure My 6 Sessions →
                </a>
                <a href="#book" className="text-sm text-primary underline underline-offset-4 py-3">
                  Prefer to talk first? Book free
                </a>
              </div>

              <p className="text-sm text-muted-foreground">
                Enter PAYDAY200 at checkout · Treatment starts after your suitability assessment
              </p>
            </div>

            {/* Desktop-only image — sits right on desktop */}
            <div className="hidden md:block w-full md:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-lg bg-foreground">
                <img
                  src={heroShavingEveryday}
                  alt="Laser hair removal treatment at Laser Location"
                  className="w-full h-80 object-cover object-[50%_42%]"
                  loading="eager"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Offer details */}
      <section id="offer" className="bg-accent section-padding-compact scroll-mt-6">
        <div className="content-container text-center relative z-10">
          <p className="text-base font-medium tracking-widest uppercase text-primary mb-3">
            What You Get
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            The Complete 6-Session Package
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            One clear package, a proper suitability assessment and a treatment plan built around your skin, hair and goals.
          </p>

          <div className="max-w-lg mx-auto bg-card border border-border shadow-xl rounded-2xl p-8 md:p-10">
            <div className="mb-5">
              <span className="text-2xl text-muted-foreground line-through mr-3">£895</span>
              <span className="text-5xl font-serif text-gold-metallic font-semibold">£695</span>
            </div>
            <p className="text-lg font-serif mb-8 text-foreground">for 6 Full-Body Sessions</p>

            <div className="text-left space-y-3 mb-8">
              {[
                "6 full-body sessions covering legs, arms, underarms, bikini, back, chest and stomach",
                "Consultation before treatment to confirm suitability and personalise your plan",
                "3-wavelength AW3 Crystal Freeze Diamond laser",
                "Qualified, fully insured practitioner",
                "Aftercare guidance throughout your course",
                "Payment-plan options available",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-lg text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>

            <a href={PAYDAY_CHECKOUT_URL} className="btn-gold-metallic w-full !block !text-center">
              Secure 6 Sessions for £695 →
            </a>
            <p className="text-sm mt-4 text-muted-foreground">
              Enter PAYDAY200 at checkout to reduce the package from £895 to £695.
            </p>
            <a href="#book" className="inline-block mt-4 text-sm text-primary underline underline-offset-4">
              Not ready to purchase? Book a free consultation
            </a>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="section-padding-compact bg-background">
        <div className="content-container text-center">
          <p className="text-base font-medium tracking-widest uppercase text-primary mb-3">
            Why People Make the Switch
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Stop Paying for the Same Hair to Come Back
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Shaving and waxing solve the next few days. A structured laser course is designed to reduce the amount of hair that returns and the time you spend managing it.
          </p>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              {
                emoji: "🪒",
                title: "Less Shaving, Less Planning",
                desc: "Spend less time organising outfits, trips and last-minute plans around shaving and fast regrowth.",
              },
              {
                emoji: "💷",
                title: "A Fixed Course, Not Repeat Waxing",
                desc: "At £50+ every 4–6 weeks, waxing costs keep restarting. This offer fixes the price for a complete six-session course.",
              },
              {
                emoji: "✦",
                title: "Fewer Bumps and Ingrowns",
                desc: "Laser can reduce the regrowth that often leads to shaving irritation, bumps and ingrown hairs.",
              },
              {
                emoji: "✓",
                title: "A Plan Built Around You",
                desc: "Your consultation confirms suitability, settings, treatment areas and realistic expectations before treatment begins.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-8 rounded-xl bg-card border border-border text-center"
              >
                <span className="text-4xl mb-4 block">{item.emoji}</span>
                <h3 className="text-xl font-semibold tracking-tight mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-base">{item.desc}</p>
              </div>
            ))}
          </div>

          <a href="/why-laser" className="inline-block mt-10 text-primary underline underline-offset-4">
            Still deciding? Read why laser hair removal is worth it →
          </a>
        </div>
      </section>

      {/* Real Results - Before & After */}
      <section className="section-padding-compact bg-background">
        <div className="content-container text-center">
          <p className="text-base font-medium tracking-widest uppercase text-primary mb-3">
            Real Client Progress
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            See What a Structured Course Can Change
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Results vary, but these clients show the visible reduction possible with consistent treatment and a plan suited to their skin and hair.
          </p>

          <div className="text-left">
            <ResultsGallery />
          </div>

          <div className="mt-10">
            <a href={PAYDAY_CHECKOUT_URL} className="btn-gold-metallic">
              Secure My 6 Sessions for £695 →
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding-compact bg-secondary">
        <div className="content-container text-center">
          <p className="text-base font-medium tracking-widest uppercase text-primary mb-3">
            From Checkout to Treatment
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">What Happens Next</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            You can secure the offer now or speak to the team first. Either way, suitability is assessed before treatment begins.
          </p>

          <div className="grid md:grid-cols-3 gap-8 how-it-works-grid">
            {[
              {
                step: "01",
                title: "Secure the Offer",
                desc: "Purchase the six-session package with PAYDAY200, or book a free consultation first if you would rather talk it through.",
              },
              {
                step: "02",
                title: "Consultation and Treatment Plan",
                desc: "The team assesses your skin and hair, confirms suitability and explains timing, aftercare and realistic expectations.",
              },
              {
                step: "03",
                title: "Complete Your Course",
                desc: "Your six sessions are spaced around your hair-growth cycle, with progress and settings reviewed as you go.",
              },
            ].map((item, index) => (
              <div key={item.step} className={`how-it-works-step p-8 rounded-xl bg-card border border-border text-center relative ${index < 2 ? "how-it-works-has-connector" : ""}`}>
                <span className="text-5xl font-serif text-gold-metallic font-semibold block mb-4">
                  {item.step}
                </span>
                <h3 className="text-xl font-semibold tracking-tight mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your First Visit - Video */}
      <section className="section-padding-compact bg-accent">
        <div className="content-container text-center">
          <p className="text-base font-medium tracking-widest uppercase text-primary mb-3">
            Meet the Team
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Know What to Expect Before You Start
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            A quick look at the clinic, the team and what happens before your treatment course begins.
          </p>
          <div className="max-w-sm mx-auto rounded-2xl overflow-hidden border border-border shadow-lg">
            <video autoPlay muted playsInline controls className="w-full">
              <source src="/videos/first-visit.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Reviews Widget */}
      <section className="section-padding-compact bg-background">
        <div className="content-container text-center">
           <p className="text-base font-medium tracking-widest uppercase text-primary mb-3">
             What Our Clients Say
           </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Trusted by 1,000+ Clients in Manchester
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Hear what clients say about the treatment, the team and the results they have seen.
          </p>

          {/* Testimonial Video */}
          <div className="max-w-sm mx-auto rounded-2xl overflow-hidden border border-border shadow-lg mb-12">
            <p className="text-base font-medium tracking-widest uppercase text-primary py-4 bg-card">
              Hear From Our Clients
            </p>
            <video autoPlay muted playsInline controls className="w-full">
              <source src="/videos/testimonial.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[reviewByName("Maisey Trainor"), reviewByName("Shazad Ahmed")].map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </div>

          {/* Post-reviews CTA */}
          <div className="mt-12">
            <a href={PAYDAY_CHECKOUT_URL} className="btn-gold-metallic">
              Secure the £695 Package →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding-compact bg-background">
        <div className="content-container max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-base font-medium tracking-widest uppercase text-primary mb-3">
              Before You Decide
            </p>
            <h2 className="text-3xl md:text-4xl font-serif">Your Questions, Answered</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {[
              {
                q: "What areas are included in the full-body package?",
                a: "The package covers legs, arms, underarms, bikini, back, chest and stomach. It is available to women and men; confirm any specific area with the team during your consultation.",
              },
              {
                q: "Does laser hair removal hurt?",
                a: "Most clients describe a warm snapping sensation and find it easier than waxing. Integrated cooling is used throughout treatment for comfort.",
              },
              {
                q: "Is it suitable for all skin types?",
                a: "The AW3 system is designed for Fitzpatrick skin types I–VI. Your skin, hair and treatment settings are still assessed individually, and treatment only proceeds if it is suitable for you.",
              },
              {
                q: "Is there any recovery time or downtime?",
                a: "Most people return to their normal daily activities straight away. Mild redness or sensitivity can happen and usually settles quickly. The team will explain your aftercare and any short-term precautions.",
              },
              {
                q: "Why does the package include six sessions?",
                a: "Hair grows in cycles, so one session cannot catch every hair at the right stage. This package includes six sessions, with the timing set around your growth cycle after assessment.",
              },
              {
                q: "How long does each session take?",
                a: "A full-body session typically takes 60–90 minutes. The team will confirm the expected appointment length based on the areas in your plan.",
              },
              {
                q: "Who performs the treatments?",
                a: "Treatments are carried out by fully qualified and insured practitioners with VTCT-accredited Level 3 and Level 4 laser hair removal qualifications.",
              },
              {
                q: "What happens during the free consultation?",
                a: "The team assesses your skin and hair, discusses your goals, completes any required patch testing and explains the treatment plan and aftercare. There is no cost or obligation.",
              },
              {
                q: "Is laser cheaper than waxing long-term?",
                a: "Regular waxing can cost hundreds each year because every appointment is temporary. This six-session course is £695 with the Payday Offer, normally £895, and is designed for longer-term reduction.",
              },
              {
                q: "Are payment plans available?",
                a: "Yes. Available options depend on the package, and the team can talk them through with you before you commit.",
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

      {/* Proof break */}
      <section className="py-12 md:py-16 bg-accent">
        <ReviewBreak review={reviewByName("Z JJ")} />
      </section>



      {/* Final decision */}
      <section className="section-padding bg-secondary">
        <div className="content-container max-w-xl text-center">
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Secure the Full Course for £695
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Enter PAYDAY200 at checkout to save £200. If you would rather confirm suitability first, book the free consultation instead.
          </p>

          <div className="flex flex-col items-center gap-4">
            <a
              href={PAYDAY_CHECKOUT_URL}
              className="btn-gold-metallic inline-block !py-4 !px-10 !text-lg w-full sm:w-auto"
            >
              Secure My 6 Sessions →
            </a>
            <a href="#book" className="text-sm text-primary underline underline-offset-4">
              Book a free consultation first
            </a>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            Offer subject to availability · Treatment starts after a suitability assessment
          </p>
        </div>
      </section>

      {/* Booking Calendar */}
      <section id="book" className="section-padding-compact bg-background scroll-mt-4 overflow-hidden">
        <div className="content-container max-w-2xl text-center">
          <p className="text-base font-medium tracking-widest uppercase text-primary mb-3">
            Prefer to Talk First?
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Book Your Free Consultation
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Ask questions, confirm the areas you want treated and let the team assess suitability before you make a decision.
          </p>
          <iframe
            src={buildBookingSrc()}
            style={{ width: "100%", border: "none", minHeight: "960px", overflow: "hidden" }}
            id="WKJHfaDYyUDdQrbeGrlS_1774829119118"
            title="Book Your Consultation"
          />

          <p className="text-base text-muted-foreground mt-4">
            No payment required · Free consultation · No obligation
          </p>
        </div>
      </section>

      {/* Footer / Legal */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="content-container text-center text-sm text-muted-foreground space-y-4">
          <p>
            © {new Date().getFullYear()} Laser Location. All rights reserved.
          </p>
          <p className="max-w-2xl mx-auto">
            Laser Location collects the personal information you submit for the
            purpose of contacting you about your enquiry. Your details are used
            only for booking and follow-up. We do not sell your data.{" "}
            <a
              href="mailto:info@laserlocation.co.uk"
              className="text-primary hover:underline"
            >
              info@laserlocation.co.uk
            </a>
          </p>
          <p>
            Payday offer subject to availability. Treatment suitability
            assessed during consultation.
          </p>
          <PrivacyPolicyPopup />
        </div>
      </footer>

    </div>
  );
};

export default Index;
