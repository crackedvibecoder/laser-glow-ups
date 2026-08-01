import { useEffect, useState, useCallback } from "react";
import { CalendarCheck, Check, Clock, CreditCard, HeartHandshake, MapPin, ShieldCheck, Sparkles, Star } from "lucide-react";
import laserWatermark from "@/assets/laser-watermark.png";
import carmenLaserMachine from "@/assets/carmen-laser-machine.jpeg";
import embarrassedSlide from "@/assets/why-laser/embarrassed.jpg";
import sizeSlide from "@/assets/why-laser/size.jpg";
import ingrownSlide from "@/assets/why-laser/ingrown.jpg";
import sweatingSlide from "@/assets/why-laser/sweating.jpg";
import nervousSlide from "@/assets/why-laser/nervous.jpg";
import hairCyclesSlide from "@/assets/why-laser/hair-cycles.jpg";
import hormonesRoleSlide from "@/assets/why-laser/hormones-role.jpg";
import longTermSmoothnessSlide from "@/assets/why-laser/long-term-smoothness.jpg";
import faceLaserReasonsSlide from "@/assets/why-laser/face-laser-reasons.jpg";
import faceLaserObjectionsSlide from "@/assets/why-laser/face-laser-objections.jpg";
import notForEveryoneSlide from "@/assets/why-laser/not-for-everyone.jpg";
import ingrownFreeSlide from "@/assets/why-laser/one-last-thought-ingrown-free.jpg";
import noShavingSlide from "@/assets/why-laser/one-last-thought-no-shaving.jpg";
import panicShaveSlide from "@/assets/why-laser/panic-shave.jpg";
import smoothAllYearSlide from "@/assets/why-laser/smooth-all-year.jpg";
import maintenanceMatterSlide from "@/assets/why-laser/maintenance-matter.jpg";
import maintainingResultsSlide from "@/assets/why-laser/maintaining-results.jpg";
import ResultsGallery from "@/components/ResultsGallery";
import FacialHairStory from "@/components/FacialHairStory";
import MensLaserSection from "@/components/MensLaserSection";
import {
  ReviewCard,
  ReviewBreak,
  ReviewsWidget,
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

type SocialSlide = {
  src: string;
  alt: string;
};

const REASSURANCE_SLIDES: SocialSlide[] = [
  { src: embarrassedSlide, alt: "Laser Location reassurance slide: things you do not need to be embarrassed about" },
  { src: sizeSlide, alt: "Laser Location body confidence slide: every shape and size is welcome" },
  { src: ingrownSlide, alt: "Laser Location ingrown hairs reassurance slide" },
  { src: sweatingSlide, alt: "Laser Location sweating reassurance slide" },
  { src: nervousSlide, alt: "Laser Location feeling nervous reassurance slide" },
];

const EDUCATION_SLIDES: SocialSlide[] = [
  { src: maintenanceMatterSlide, alt: "Why laser maintenance sessions matter slide" },
  { src: hairCyclesSlide, alt: "Laser hair grows in cycles education slide" },
  { src: hormonesRoleSlide, alt: "Hormones can affect laser hair removal regrowth education slide" },
  { src: longTermSmoothnessSlide, alt: "Maintenance sessions help preserve long-term smoothness slide" },
  { src: maintainingResultsSlide, alt: "Maintaining laser hair removal results slide" },
];

const FACE_LASER_SLIDES: SocialSlide[] = [
  { src: faceLaserReasonsSlide, alt: "Reasons face laser might be the treatment you need" },
  { src: faceLaserObjectionsSlide, alt: "Face laser reasons: hormonal growth, irritation, time and maintenance" },
];

const FINAL_NUDGE_SLIDES: SocialSlide[] = [
  { src: notForEveryoneSlide, alt: "Laser hair removal is not for everyone final thought slide" },
  { src: ingrownFreeSlide, alt: "Being ingrown hair free is not for everyone humorous final thought slide" },
  { src: noShavingSlide, alt: "Not everyone wants the convenience of not having to shave humorous final thought slide" },
  { src: panicShaveSlide, alt: "Panic shaving final thought slide" },
  { src: smoothAllYearSlide, alt: "Smooth skin all year round final thought slide" },
];

const SocialProofCarousel = ({ slides }: { slides: SocialSlide[] }) => (
  <div className="-mx-6 px-6 md:mx-0 md:px-0">
    <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {slides.map((slide, index) => (
        <figure key={slide.src} className="snap-center shrink-0 w-[84%] md:w-auto rounded-2xl overflow-hidden border border-border shadow-lg bg-card">
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full aspect-[4/5] object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </figure>
      ))}
    </div>
    <p className="md:hidden text-sm text-muted-foreground text-center">Swipe to keep reading →</p>
  </div>
);

/* ──────────────────── Countdown Timer ──────────────────── */
const CountdownTimer = () => {
  const getTimeLeft = useCallback(() => {
    const now = new Date();
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    const diff = endOfToday.getTime() - now.getTime();
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
        Payday Offer — Save £200
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
              £200 OFF
            </span>
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
        <a
          href="#book"
          onClick={() => setOpen(false)}
          className="btn-gold-metallic w-full mt-3 text-lg py-5 tracking-wider inline-block text-center"
        >
          Book My Free Consultation →
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

const StickyMobileCTA = () => {
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
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[hsl(30,10%,6%)] border-t border-primary/20 p-3 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a href="#book" className="btn-gold-metallic w-full !block !text-center !py-3.5">
        Claim £200 Off — Book Free Consultation →
      </a>
    </div>
  );
};

/* ──────────────────── Page ──────────────────── */
const WhyLaser = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Why Laser Hair Removal? | Laser Location, Bury Manchester";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? "";
    meta?.setAttribute(
      "content",
      "Still deciding? The honest case for medical-grade laser hair removal — cost vs waxing, comfort, results and safety for all skin tones. Save £200 with the Payday Offer.",
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
    <div className="min-h-screen bg-background overflow-x-hidden pb-20 md:pb-0">
      <ExitIntentPopup />
      <StickyMobileCTA />

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
        data-hero
        className="relative py-10 md:py-16"
        style={{ backgroundColor: "hsl(var(--hero-bg, 36 30% 92%))" }}
      >
        <div className="content-container max-w-4xl text-center animate-fade-up">
          <p className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
            Still Thinking It Over?
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.08] mb-4">
            You clicked because shaving is annoying.
            <span className="block text-script-accent text-primary text-[1.15em] mt-1">
              Here&apos;s why laser hair removal is worth booking.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            If you&apos;re hesitating, it&apos;s usually one of three things: pain, price, or whether it actually works. This page answers those properly before you book anything.
          </p>

          <a
            href="#book"
            className="btn-gold-metallic inline-block !py-4 !px-10 !text-lg mb-7"
          >
            Book Free Consultation →
          </a>

          <div className="grid sm:grid-cols-3 gap-3 max-w-3xl mx-auto mb-7 text-left">
            {[
              { label: "Will it hurt?", text: "Built-in cooling. Most clients say it is easier than waxing." },
              { label: "Is it worth it?", text: "Waxing repeats forever. A course is built for long-term reduction." },
              { label: "Will it work for me?", text: "All skin tones are assessed before treatment, with medical-grade tech." },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-card border border-border p-4">
                <p className="font-semibold text-foreground mb-1">{item.label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <p className="text-base text-muted-foreground">
            Free consultation · No payment required · Bury, Manchester
          </p>
        </div>
      </section>

      {/* Reassurance carousel */}
      <section className="section-padding-compact bg-secondary">
        <div className="content-container text-center">
          <p className="text-base font-medium tracking-widest uppercase text-primary mb-3">
            No Judgement Here
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            The Stuff People Worry About Before Booking
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Ingrowns, shaving spots, post-waxing bumps, sweating, body confidence, feeling nervous — none of it is embarrassing to us. It is exactly what we help with every day.
          </p>
          <SocialProofCarousel slides={REASSURANCE_SLIDES} />
          <div className="mt-10">
            <a href="#book" className="btn-gold-metallic">
              Book Free Consultation →
            </a>
          </div>
        </div>
      </section>

      {/* Proof break */}
      <section className="py-12 md:py-16 bg-background">
        <ReviewBreak review={reviewByName("Maisey Trainor")} />
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

          <div className="text-center mt-12 mb-6">
            <h3 className="text-2xl md:text-3xl font-serif mb-3">
              Why Women Choose Face Laser
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Persistent chin, neck or hormonal growth is common. Laser can reduce the cycle of regrowth, irritation, shaving and constant maintenance.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <SocialProofCarousel slides={FACE_LASER_SLIDES} />
          </div>

          <div className="text-center mt-10">
            <a href="#book" className="btn-gold-metallic">
              Book Free Consultation →
            </a>
          </div>
        </div>
      </section>

      <MensLaserSection backgroundClass="bg-accent" />

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
                title: "£500+ A Year on Waxing",
                desc: "Waxing at £50 every 4–6 weeks can add up fast. A 6-session laser course is built for longer-term reduction instead of constant repeat appointments.",
              },
              {
                emoji: "🪒",
                title: "Razor Burn, Spots & Ingrowns",
                desc: "Constant shaving and waxing can irritate skin, trigger spots or bumps, cause ingrown hairs and leave darkening behind.",
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
              Book Free Consultation →
            </a>
          </div>
        </div>
      </section>

      {/* Course education */}
      <section className="section-padding-compact bg-accent">
        <div className="content-container text-center">
          <p className="text-base font-medium tracking-widest uppercase text-primary mb-3">
            Why It Takes a Course
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Laser Works With Your Hair Cycle, Not Against It
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            If you are wondering why it is not a one-and-done treatment, this is the simple version: hair grows in cycles, hormones can trigger regrowth, and consistency protects the result.
          </p>
          <SocialProofCarousel slides={EDUCATION_SLIDES} />
          <div className="mt-10">
            <a href="#book" className="btn-gold-metallic">
              Check If Laser Is Right For Me →
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
              src={carmenLaserMachine}
              alt="Carmen at Laser Location with the AW3 Crystal Freeze Diamond laser machine"
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
              Book Free Consultation →
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
            Laser Can Work For More People Than You Think
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Different genders, skin tones, hair types and treatment areas can be suitable — always assessed properly before we treat you.
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

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[reviewByName("Reza Vahid Roudsari"), reviewByName("Shazad Ahmed")].map(
              (review) => (
                <ReviewCard key={review.name} review={review} />
              ),
            )}
          </div>


          <div className="text-center mt-12">
            <a href="#book" className="btn-gold-metallic">
              Book Free Consultation →
            </a>
          </div>
        </div>
      </section>

      {/* Why Laser Location */}
      <section className="section-padding-compact bg-background">
        <div className="content-container text-center">
          <p className="text-base font-medium tracking-widest uppercase text-primary mb-3">
            Why Laser Location
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Not Just Laser. The Right Place To Start.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            If you are comparing clinics, choose the place that checks suitability properly, explains the plan clearly and makes you feel comfortable before treatment.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            {[
              {
                icon: CalendarCheck,
                title: "Free consultation first",
                desc: "No payment pressure before you understand your options, treatment areas and suitability.",
              },
              {
                icon: ShieldCheck,
                title: "Medical-grade 3-wavelength tech",
                desc: "AW3 Crystal Freeze Diamond technology is built to treat different skin tones and areas safely with cooling for comfort.",
              },
              {
                icon: Star,
                title: "Real local results",
                desc: "You can see actual before-and-after examples and client reviews from people treated by the team.",
              },
              {
                icon: HeartHandshake,
                title: "Private, judgement-free appointments",
                desc: "Face, chin, bikini, hormonal growth, ingrowns or body confidence - the consultation is practical and discreet.",
              },
              {
                icon: CreditCard,
                title: "Clear course pricing",
                desc: "A structured 6-session full-body course, with payment-plan options and no vague per-area surprises.",
              },
              {
                icon: MapPin,
                title: "Bury, Manchester clinic",
                desc: "A local clinic you can speak to, visit and book with directly instead of a faceless chain or home device guesswork.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
              <div key={item.title} className="p-6 rounded-xl bg-card border border-border">
                <div className="w-11 h-11 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-base">{item.desc}</p>
              </div>
              );
            })}
          </div>

          <div className="mt-10">
            <a href="#book" className="btn-gold-metallic">
              Book Free Consultation →
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
          <h2 className="text-3xl md:text-4xl font-serif mb-12">Payday Offer</h2>

          <div className="max-w-lg mx-auto bg-card border border-border shadow-xl rounded-2xl p-10">
            <div className="mb-6">
              <span className="text-2xl text-muted-foreground line-through mr-3">£895</span>
              <span className="text-5xl font-serif text-gold-metallic font-semibold">£695</span>
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
              Book Free Consultation →
            </a>

            <p className="text-sm mt-4 text-muted-foreground">
              Save £200 with code PAYDAY200 before tonight at 11:59pm
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

      {/* All Google reviews (widget) */}
      <section className="section-padding-compact bg-background overflow-hidden">
        <ReviewsWidget />
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
                q: "Is laser hair removal suitable for men?",
                a: "Yes. We treat men across the back, shoulders, chest, neck, beard line, underarms and other areas. Your free consultation confirms the right treatment plan for your skin, hair and goals.",
              },
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
                a: "Yes. Most clients spend £50+ every 4–6 weeks on waxing — that's over £500 a year, indefinitely. Our 6-session course costs £695 with the £200 Payday Offer (normally £895) for lasting results, making it a fraction of the long-term cost of waxing.",
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

      {/* Playful final nudge */}
      <section className="section-padding-compact bg-accent">
        <div className="content-container text-center">
          <p className="text-base font-medium tracking-widest uppercase text-primary mb-3">
            One Last Thought
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            You Could Keep Panic Shaving. Or Not.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            If you are still here, you probably already know which problem you want gone. The consultation is just the next low-pressure step.
          </p>
          <SocialProofCarousel slides={FINAL_NUDGE_SLIDES} />
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
            Book your free, no-obligation consultation and claim your £200 Payday Offer.
          </p>

          <a href="#book" className="btn-gold-metallic inline-block !py-4 !px-10 !text-lg">
            Book Free Consultation →
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
            Payday offer subject to availability. Treatment suitability assessed during
            consultation.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default WhyLaser;
