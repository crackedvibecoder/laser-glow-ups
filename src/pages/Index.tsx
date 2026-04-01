import { useState, useEffect, useCallback } from "react";
import { Check, Star, Clock, Shield, Users, Sparkles } from "lucide-react";
import { toast } from "sonner";
import laserWatermark from "@/assets/laser-watermark.png";
import chinBeforeAfter from "@/assets/chin-laser-before-after.jpg";
import bikiniBeforeAfter from "@/assets/laser-bikini-before-after.jpg";
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
      <span>Spring Special — Save £100</span>
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

/* ──────────────────── Social Proof Toasts ──────────────────── */
const SOCIAL_PROOF = [
  { name: "Sophie", area: "Didsbury" },
  { name: "James", area: "Bury" },
  { name: "Amira", area: "Salford" },
  { name: "Rachel", area: "Prestwich" },
  { name: "Dan", area: "Bolton" },
  { name: "Priya", area: "Whitefield" },
  { name: "Emma", area: "Ramsbottom" },
  { name: "Liam", area: "Rochdale" },
];

const useSocialProofToasts = () => {
  useEffect(() => {
    let index = Math.floor(Math.random() * SOCIAL_PROOF.length);
    const initialDelay = setTimeout(() => {
      const show = () => {
        const person = SOCIAL_PROOF[index % SOCIAL_PROOF.length];
        toast(`${person.name} from ${person.area} just booked a consultation`, {
          duration: 4000,
          position: "bottom-left",
          className: "",
        });
        index++;
      };
      show();
      const interval = setInterval(show, 25000 + Math.random() * 10000);
      return () => clearInterval(interval);
    }, 10000);
    return () => clearTimeout(initialDelay);
  }, []);
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
        <DialogHeader className="space-y-5">
          <div className="mx-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary/15">
            <span className="text-5xl md:text-6xl font-bold text-primary tracking-tight">£100 OFF</span>
          </div>
          <DialogTitle className="text-3xl md:text-4xl font-serif leading-tight">
            Your Spring Discount Is Still Waiting
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-lg">
            Trusted by <strong className="text-foreground">1,000+ clients</strong> in Manchester
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-primary font-medium mt-2 animate-pulse">
          ⏳ Limited spots available this week
        </p>
         <a href="#book" onClick={() => setOpen(false)} className="btn-gold-metallic w-full mt-3 text-lg py-5 tracking-wider inline-block text-center">
           Claim My £100 Discount →
         </a>
        <button
          onClick={() => setOpen(false)}
          className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors mt-1 underline underline-offset-2"
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
          <span className="font-serif">Spring Special</span> — Full-body laser hair removal{" "}
          <strong className="text-primary">£795</strong>{" "}
          <span className="text-[hsl(40,20%,60%)] line-through">£895</span>
        </p>
        <a
          href="#book"
          className="btn-gold-metallic !py-2 !px-6 !text-xs"
        >
          Book Now →
        </a>
      </div>
    </div>
  );
};

/* ──────────────────── Main Page ──────────────────── */
const Index = () => {
  useSocialProofToasts();

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
    <div className="min-h-screen bg-background">
      <StickyDesktopCTA />
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

      {/* Urgency Bar with Countdown */}
      <div className="bg-primary/10 border-b border-primary/20 py-2 md:py-2.5 px-4 text-center">
        <div className="text-sm font-medium text-foreground flex items-center justify-center gap-2">
          <Clock className="w-4 h-4 text-primary shrink-0" />
          <CountdownTimer />
        </div>
      </div>

      {/* Hero Section */}
      <section
        data-hero
        className="relative py-16 md:py-24"
        style={{ backgroundColor: "hsl(var(--hero-bg, 36 30% 92%))" }}
      >
        <div className="content-container max-w-3xl text-center">
          <div className="animate-fade-up">
            <p className="text-xs font-medium tracking-widest uppercase text-primary mb-4">
              Medical-Grade Laser Hair Removal
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-4">
              Full-Body Laser Hair Removal — Save £100{" "}
              <span className="text-script-accent text-primary text-[1.15em]">
                This Spring
              </span>
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              Bury, Manchester
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-lg mx-auto">
              Ditch the razor for good. 6 painless sessions, all skin types
              welcome — trusted by 1,000+ clients in Manchester.
            </p>

            <a
              href="#book"
              className="btn-gold-metallic inline-block !py-4 !px-10 !text-lg mb-8"
            >
              Claim Your £100 Discount →
            </a>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground justify-center">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-primary" /> Medical-Grade
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-primary" /> 1,000+ Clients
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-primary" /> 5-Star Rated
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary" /> All Skin Tones
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="py-6 border-y border-border bg-background">
        <div className="content-container">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            {[
              { number: "1,000+", label: "Happy Clients" },
              { number: "8,500+", label: "Sessions Completed" },
              { number: "5★", label: "Average Rating" },
              { number: "6+", label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-serif text-gold-metallic font-semibold">
                  {stat.number}
                </p>
                <p className="text-xs text-muted-foreground tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="section-padding-compact bg-background">
        <div className="content-container text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
            Sound Familiar?
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            The Endless Hair Removal Cycle
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Temporary fixes cost time, money, and confidence. There's a permanent solution.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 max-w-5xl mx-auto">
            {[
              {
                emoji: "🪒",
                title: "Razor Burn & Ingrown Hairs",
                desc: "Shaving damages your skin and the results barely last a day.",
              },
              {
                emoji: "😣",
                title: "Painful, Expensive Waxing",
                desc: "£50+ every 4–6 weeks. The pain never gets easier. The bill never stops.",
              },
              {
                emoji: "🔄",
                title: "The Never-Ending Cycle",
                desc: "You've spent thousands on temporary fixes. It's time for a long-term solution.",
              },
              {
                emoji: "🌸",
                title: "PCOS or Hormonal Hair Growth?",
                desc: "Excessive or coarse facial and body hair affects 1 in 10 women. Laser targets the root cause — not just the surface.",
              },
              {
                emoji: "💪",
                title: "All Genders. All Areas.",
                desc: "Back, chest, shoulders, jawline — laser hair removal is for everyone. Discreet, professional sessions with lasting results.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={`p-8 rounded-xl bg-card border border-border text-center ${
                  index < 3 ? "lg:col-span-2" : "lg:col-span-3"
                }`}
              >
                <span className="text-4xl mb-4 block">{item.emoji}</span>
                <h3 className="text-xl font-serif mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
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

      {/* Real Results - Before & After */}
      <section className="section-padding-compact bg-secondary">
        <div className="content-container text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
            Real Results
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            See the Difference
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Real clients. Real results. Medical-grade laser hair removal that delivers.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
              <img src={chinBeforeAfter} alt="Chin laser hair removal before and after" className="w-full h-64 object-cover" loading="lazy" />
              <div className="bg-card p-4">
                <p className="font-serif text-lg">Chin & Upper Lip</p>
                <p className="text-sm text-muted-foreground">Before & after several sessions</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
              <img src={bikiniBeforeAfter} alt="Bikini line laser hair removal before and after" className="w-full h-64 object-cover" loading="lazy" />
              <div className="bg-card p-4">
                <p className="font-serif text-lg">Bikini Line</p>
                <p className="text-sm text-muted-foreground">Before & after several sessions</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <a href="#book" className="btn-gold-metallic">
              Claim Your £100 Discount →
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding-compact bg-secondary">
        <div className="content-container text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
            Simple Process
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8 how-it-works-grid">
            {[
              {
                step: "01",
                title: "Free Consultation",
                desc: "We assess your skin type, hair, and goals. No cost. No pressure. No payment.",
              },
              {
                step: "02",
                title: "Your Treatment Plan",
                desc: "6 sessions spaced with your natural hair growth cycle for maximum results.",
              },
              {
                step: "03",
                title: "Lasting Results",
                desc: "Enjoy smooth, confident skin with up to 90% hair reduction and occasional maintenance as needed.",
              },
            ].map((item, index) => (
              <div key={item.step} className={`how-it-works-step p-8 rounded-xl bg-card border border-border text-center relative ${index < 2 ? "how-it-works-has-connector" : ""}`}>
                <span className="text-5xl font-serif text-gold-metallic font-semibold block mb-4">
                  {item.step}
                </span>
                <h3 className="text-xl font-serif mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your First Visit - Video */}
      <section className="section-padding-compact bg-accent">
        <div className="content-container text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
            What to Expect
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Your First Visit
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            See what to expect at your first session
          </p>
          <div className="max-w-sm mx-auto rounded-2xl overflow-hidden border border-border shadow-lg">
            <video autoPlay muted playsInline controls className="w-full">
              <source src="/videos/first-visit.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="bg-accent section-padding-compact">
        <div className="content-container text-center relative z-10">
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
            Limited Time
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-12">
            Spring 2026 Special
          </h2>

          <div className="max-w-lg mx-auto bg-card border border-border shadow-xl rounded-2xl p-10">
            <div className="mb-6">
              <span className="text-2xl text-muted-foreground line-through mr-3">
                £895
              </span>
              <span className="text-5xl font-serif text-gold-metallic font-semibold">
                £795
              </span>
            </div>
            <p className="text-lg font-serif mb-8 text-foreground">
              for 6 Full-Body Sessions
            </p>

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
                  <span className="text-sm text-muted-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#book"
              className="btn-gold-metallic w-full !block !text-center"
            >
              Claim Your £100 Discount →
            </a>

            <p className="text-xs mt-4 text-muted-foreground">
              Save £100 when you book your free consultation this month
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Widget */}
      <section className="section-padding-compact bg-background">
        <div className="content-container text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
            Real Results
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-12">
            Trusted by 1,000+ Clients in Manchester
          </h2>

          {/* Testimonial Video */}
          <div className="max-w-sm mx-auto rounded-2xl overflow-hidden border border-border shadow-lg mb-12">
            <p className="text-sm font-medium tracking-widest uppercase text-primary py-4 bg-card">
              Hear From Our Clients
            </p>
            <video autoPlay muted playsInline controls className="w-full">
              <source src="/videos/testimonial.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="max-w-4xl mx-auto rounded-2xl border border-border overflow-hidden" style={{ maxHeight: "480px", overflowY: "auto" }}>
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

          {/* Post-reviews CTA */}
          <div className="mt-12">
            <a href="#book" className="btn-gold-metallic">
              Claim Your £100 Discount →
            </a>
          </div>
        </div>
      </section>

      {/* Booking Calendar */}
      <section id="book" className="section-padding-compact bg-secondary scroll-mt-24">
        <div className="content-container max-w-2xl text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
            Book Now
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-3">
            Book Your Free Consultation
          </h2>
          <p className="text-muted-foreground mb-2">
            Choose a time that works for you. No commitment, no pressure.
          </p>
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 mb-6">
            <span className="text-sm font-semibold tracking-widest text-primary">VOUCHER: SPRING100</span>
          </div>

          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/XFCIVqAZ7Ha6pnxEiKXH"
            style={{ width: "100%", border: "none", minHeight: "800px", overflow: "hidden" }}
            id="WKJHfaDYyUDdQrbeGrlS_1774829119118"
            title="Book Your Consultation"
          />

          <p className="text-xs text-muted-foreground mt-4">
            No payment required · Free consultation · All skin types welcome
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding-compact bg-background">
        <div className="content-container max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">
              Got Questions?
            </p>
            <h2 className="text-3xl md:text-4xl font-serif">Common Questions</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {[
              {
                q: "Does laser hair removal hurt?",
                a: "Most clients describe it as a warm snapping sensation, much less painful than waxing. Our AW3 Crystal Freeze Diamond laser features patented Crystal Freeze cooling technology for maximum comfort during treatment.",
              },
              {
                q: "Is it safe for all skin types?",
                a: "Yes. Our AW3 Crystal Freeze Diamond laser uses 3-wavelength technology (755/810/1064nm) that is clinically proven safe and effective for all skin types and tones (Fitzpatrick I–VI).",
              },
              {
                q: "How many sessions do I need?",
                a: "6 sessions is the standard course, spaced 4–6 weeks apart to align with your hair growth cycle. Most clients see significant reduction after just 2–3 sessions, with up to 90% hair reduction overall.",
              },
              {
                q: "How long does each session take?",
                a: "A full-body session typically takes 60–90 minutes. Individual areas like underarms take just 10–15 minutes.",
              },
              {
                q: "Who performs the treatments?",
                a: "All treatments are carried out by fully qualified and insured practitioners with VTCT-accredited laser hair removal qualifications (Level 3 & Level 4).",
              },
              {
                q: "What happens during the free consultation?",
                a: "We'll assess your skin type and hair, discuss your goals, answer all your questions, and create a personalised treatment plan. No cost, no obligation, no pressure.",
              },
              {
                q: "Is laser cheaper than waxing long-term?",
                a: "Yes. Most clients spend £50+ every 4–6 weeks on waxing — that's over £500 a year, indefinitely. Our 6-session course costs £795 (or £695 with the Spring Discount) for lasting results, making it a fraction of the long-term cost of waxing.",
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
                <AccordionTrigger className="text-left font-serif text-base hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
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
            <span className="text-script-accent text-primary text-[1.1em]">
              For Good?
            </span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Book your free, no-obligation consultation and claim your £100 Spring Discount.
          </p>

          <a
            href="#book"
            className="btn-gold-metallic inline-block !py-4 !px-10 !text-lg"
          >
            Claim Your £100 Discount →
          </a>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-primary" /> No payment required
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-primary" /> Instant scheduling
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-primary" /> Tailored to your skin
            </span>
          </div>
        </div>
      </section>

      {/* Footer / Legal */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="content-container text-center text-xs text-muted-foreground space-y-4">
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
            Spring 2026 offer subject to availability. Treatment suitability
            assessed during consultation.
          </p>
          <PrivacyPolicyPopup />
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[hsl(30,10%,6%)] border-t border-primary/20 p-3">
        <a
          href="#book"
          className="btn-gold-metallic w-full !block !text-center !py-3.5"
        >
          Claim £100 Off — Book Free Consultation →
        </a>
      </div>
    </div>
  );
};

export default Index;
