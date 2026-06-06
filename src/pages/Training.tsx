import { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Star, Clock, Shield, Users, Sparkles, X, GraduationCap, Award, BookOpen, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import laserWatermark from "@/assets/laser-watermark.png";
import { sendLeadToRouter } from "@/lib/leadRouter";
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

const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20),
});

type LeadFormData = z.infer<typeof leadSchema>;

type LeadInsertPayload = {
  full_name: string;
  email: string;
  phone: string;
  source: "website" | "meta";
  page_url: string;
  referrer: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  raw_payload: Record<string, unknown>;
};

const getLeadContext = () => {
  if (typeof window === "undefined") {
    return { pageUrl: "", referrer: "", utmSource: null, utmMedium: null, utmCampaign: null };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    pageUrl: window.location.href,
    referrer: document.referrer || "",
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
  };
};

const saveLeadToBackend = async (payload: LeadInsertPayload) => {
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Lead save failed with status ${response.status}`);
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
    <span>
      Limited spots — next cohort starts in{" "}
      <strong className="text-primary">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
      </strong>
    </span>
  );
};

/* ──────────────────── Social Proof Toasts ──────────────────── */
const SOCIAL_PROOF = [
  { name: "Rebecca", area: "Manchester" },
  { name: "Sarah", area: "Bolton" },
  { name: "Chloe", area: "Leeds" },
  { name: "Fatima", area: "Birmingham" },
  { name: "Jessica", area: "Liverpool" },
  { name: "Amina", area: "Sheffield" },
  { name: "Lauren", area: "Stockport" },
  { name: "Priya", area: "Preston" },
];

const useSocialProofToasts = () => {
  useEffect(() => {
    let index = Math.floor(Math.random() * SOCIAL_PROOF.length);
    const initialDelay = setTimeout(() => {
      const show = () => {
        const person = SOCIAL_PROOF[index % SOCIAL_PROOF.length];
        toast(`${person.name} from ${person.area} just enrolled in training`, {
          duration: 4000,
          position: "bottom-left",
          className: "hidden md:flex",
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
    if (sessionStorage.getItem("exit_popup_training_shown")) return;

    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem("exit_popup_training_shown")) {
        sessionStorage.setItem("exit_popup_training_shown", "1");
        setOpen(true);
      }
    };

    let scrollTriggered = false;
    const startTime = Date.now();
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const timeOnPage = (Date.now() - startTime) / 1000;
      if (scrollPercent > 0.6 && timeOnPage > 15 && !scrollTriggered && !sessionStorage.getItem("exit_popup_training_shown")) {
        scrollTriggered = true;
        sessionStorage.setItem("exit_popup_training_shown", "1");
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

  const scrollToEnquire = () => {
    setOpen(false);
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg text-center p-10 md:p-12 border-2 border-primary/30">
        <DialogHeader>
          <div className="mb-4">
            <span className="inline-block bg-primary/15 text-primary font-bold text-lg px-5 py-2 rounded-full">
              Limited Spots Available
            </span>
          </div>
          <DialogTitle className="text-3xl md:text-4xl font-serif leading-tight">
            Your Career in Aesthetics<br />Starts Here
          </DialogTitle>
          <DialogDescription className="text-lg text-muted-foreground mt-3">
            Our next <strong className="text-primary">VTCT-accredited cohort</strong> is filling fast. Don't miss your chance to train with Manchester's most trusted laser clinic.
          </DialogDescription>
        </DialogHeader>
        <button onClick={scrollToEnquire} className="btn-gold-metallic w-full mt-6 !py-5 !text-lg tracking-wider">
          Enquire About Training →
        </button>
        <button
          onClick={() => setOpen(false)}
          className="text-sm text-muted-foreground hover:text-foreground mt-3 underline underline-offset-4 transition-colors"
        >
          No thanks, I'll miss out
        </button>
      </DialogContent>
    </Dialog>
  );
};

/* ──────────────────── Lead Capture Form ──────────────────── */
const TrainingLeadForm = ({ variant = "light" }: { variant?: "light" | "dark" }) => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadFormData) => {
    try {
      await sendLeadToRouter({
        name: data.name,
        email: data.email,
        phone: data.phone,
        formName: "training_enquiry",
        message: "Training enquiry from website",
      });
    } catch (err) {
      console.error("Lead router error:", err);
    }

    // Fire Meta Pixel lead event
    try {
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }
    } catch {}

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="animate-fade-up text-center py-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-3">
          <Check className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-serif mb-2">Enquiry Received!</h3>
        <p className="text-muted-foreground text-sm">
          Thank you for your interest. We'll be in touch within 24 hours to discuss your training pathway.
        </p>
      </div>
    );
  }

  const isDark = variant === "dark";
  const fields = [
    { name: "name" as const, placeholder: "Your name", type: "text" },
    { name: "email" as const, placeholder: "Email address", type: "email" },
    { name: "phone" as const, placeholder: "Phone number", type: "tel" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <Input
            type={field.type}
            placeholder={field.placeholder}
            {...register(field.name)}
            className={`h-12 rounded-lg text-base ${isDark ? "bg-foreground/5 border-foreground/20 placeholder:text-foreground/40" : "bg-background border-border"}`}
          />
          {errors[field.name] && (
            <p className="text-destructive text-sm mt-1">{errors[field.name]?.message}</p>
          )}
        </div>
      ))}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold-metallic w-full !py-4 !text-base disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Enquire About Training →"}
      </button>
      <p className="text-xs text-center text-muted-foreground">
        No obligation. We'll discuss your goals and the right course for you.
      </p>
    </form>
  );
};

/* ──────────────────── Privacy Policy Popup ──────────────────── */
const PrivacyPolicyPopup = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-primary hover:underline text-xs">
        Privacy Policy
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">Privacy Policy</DialogTitle>
            <DialogDescription className="text-muted-foreground">Laser Location — Privacy Policy</DialogDescription>
          </DialogHeader>
          <div className="text-sm text-muted-foreground space-y-4 leading-relaxed">
            <p><strong className="text-foreground">1. Who We Are</strong><br />Laser Location ("we", "us", "our") operates from Bury, Manchester. We are committed to protecting your personal data and respecting your privacy.</p>
            <p><strong className="text-foreground">2. Information We Collect</strong><br />When you submit a training enquiry, we collect your name, email address, and phone number. We may also collect information about your visit through cookies and analytics tools.</p>
            <p><strong className="text-foreground">3. How We Use Your Information</strong><br />We use your personal information to: contact you about your training enquiry, send course information and updates, and improve our services.</p>
            <p><strong className="text-foreground">4. Data Sharing</strong><br />We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
            <p><strong className="text-foreground">5. Data Retention</strong><br />We retain your personal information only for as long as necessary to fulfil the purposes for which it was collected, or as required by law.</p>
            <p><strong className="text-foreground">6. Your Rights</strong><br />You have the right to access, correct, or delete your personal data. Contact us at <a href="mailto:info@laserlocation.co.uk" className="text-primary hover:underline">info@laserlocation.co.uk</a>.</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

/* ──────────────────── Sticky Desktop CTA ──────────────────── */
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
          <span className="font-serif">VTCT-Accredited Training</span> — Laser courses from{" "}
          <strong className="text-primary">£800</strong>
        </p>
        <a
          href="#enquire"
          className="btn-gold-metallic !py-2 !px-6 !text-xs"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Enquire Now →
        </a>
      </div>
    </div>
  );
};

/* ──────────────────── Course Data ──────────────────── */
const COURSES = [
  {
    badge: "VTCT",
    title: "Ultimate Laser Hair Removal",
    subtitle: "Combined VTCT Level 3 & Level 4",
    price: "£2,295",
    priceNote: "without machine",
    priceAlt: "£6,295 with machine included",
    duration: "4 Days (Hybrid)",
    highlights: [
      "Full VTCT Level 3 & 4 qualifications",
      "Insurance-ready on completion",
      "Theory + practical with live models",
      "Option to include AW3 laser machine",
    ],
  },
  {
    badge: "CPD",
    title: "Laser Hair Removal",
    subtitle: "CPD Certificate",
    price: "£1,295",
    priceNote: null,
    priceAlt: null,
    duration: "2 Days",
    highlights: [
      "Comprehensive CPD certification",
      "Hands-on practical training",
      "Insurance-accepted qualification",
      "Ideal for career starters",
    ],
  },
  {
    badge: "CPD",
    title: "Tattoo Removal",
    subtitle: "CPD Certificate",
    price: "£800",
    priceNote: null,
    priceAlt: null,
    duration: "1 Day",
    highlights: [
      "Tattoo removal techniques",
      "Laser science & safety protocols",
      "Practical experience included",
      "Add to your service menu",
    ],
  },
  {
    badge: "VTCT",
    title: "Level 4 Laser Hair Removal",
    subtitle: "VTCT Level 4 Laser and Light Therapy",
    price: "£1,800",
    priceNote: null,
    priceAlt: null,
    duration: "3 Days (Hybrid)",
    highlights: [
      "Advanced VTCT Level 4 qualification",
      "For existing laser practitioners",
      "Upgrade your credentials",
      "Insurance-ready certification",
    ],
  },
];

/* ──────────────────── Main Page ──────────────────── */
const Training = () => {
  useSocialProofToasts();

  const scrollToEnquire = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" });
  };

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

      {/* Urgency Bar */}
      <div className="bg-primary/10 border-b border-primary/20 py-2.5 px-4 text-center">
        <p className="text-sm font-medium text-foreground flex items-center justify-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <CountdownTimer />
          <Clock className="w-4 h-4 text-primary" />
        </p>
      </div>

      {/* Hero Section */}
      <section
        data-hero
        className="relative py-16 md:py-24"
        style={{ backgroundColor: "hsl(var(--hero-bg, 36 30% 92%))" }}
      >
        <div className="content-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Copy */}
            <div className="animate-fade-up">
              <p className="text-sm font-medium tracking-widest uppercase text-primary mb-4">
                Professional Training · Bury, Greater Manchester
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-6">
                Build Your Expertise{" "}
                <span className="text-script-accent text-primary text-[1.15em]">
                  with Confidence
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                VTCT-accredited laser, skin, and aesthetics qualifications. Comprehensive training from practitioners who treat clients daily.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-primary" /> VTCT Accredited
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-primary" /> Insurance-Ready
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-primary" /> 1,000+ Clients Treated
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-primary" /> Small Class Sizes
                </span>
              </div>
            </div>

            {/* Right - Lead Capture Form */}
            <div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
              <div className="bg-background rounded-2xl shadow-xl border border-border p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-serif mb-2">Enquire About Training</h2>
                  <p className="text-muted-foreground text-sm">
                    Discuss your goals and find the <strong className="text-primary">right course</strong> for you
                  </p>
                </div>
                <TrainingLeadForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="py-6 border-y border-border bg-background">
        <div className="content-container">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            {[
              { number: "1,000+", label: "Clients Treated" },
              { number: "6+", label: "Years Experience" },
              { number: "5★", label: "Average Rating" },
              { number: "VTCT", label: "Accredited Centre" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-serif text-gold-metallic font-semibold">{stat.number}</p>
                <p className="text-xs text-muted-foreground tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="section-padding-compact bg-secondary">
        <div className="content-container text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">Who It's For</p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Training for Every Stage of Your Career</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Whether you're taking your first steps into aesthetics or looking to formalise years of experience with recognised qualifications.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { emoji: "💆‍♀️", title: "Beauty Therapists", desc: "Expanding into laser services to grow your offering" },
              { emoji: "🎓", title: "Newly Qualified", desc: "Entering aesthetics with an accredited qualification" },
              { emoji: "🏥", title: "Clinic Owners", desc: "Investing in team development and new revenue streams" },
              { emoji: "🔄", title: "Career Changers", desc: "Entering the aesthetics industry with confidence" },
              { emoji: "📈", title: "Existing Practitioners", desc: "Seeking VTCT qualifications to upgrade credentials" },
              { emoji: "💼", title: "Entrepreneurs", desc: "Starting your own laser business with full support" },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl bg-card border border-border text-center">
                <span className="text-3xl mb-3 block">{item.emoji}</span>
                <h3 className="text-lg font-serif mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a href="#enquire" className="btn-gold-metallic" onClick={scrollToEnquire}>
              Enquire About Training →
            </a>
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section className="section-padding-compact bg-background">
        <div className="content-container text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">Our Courses</p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Choose Your Training Pathway</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            From foundation certificates to complete business packages — VTCT-accredited and CPD courses across laser and aesthetics.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {COURSES.map((course) => (
              <div key={course.title} className="bg-card border border-border rounded-2xl p-8 text-left shadow-lg relative overflow-hidden">
                {/* Badge */}
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/15 text-primary mb-4">
                  {course.badge}
                </span>
                <h3 className="text-xl font-serif mb-1">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{course.subtitle}</p>

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-serif text-gold-metallic font-semibold">{course.price}</span>
                  {course.priceNote && <span className="text-sm text-muted-foreground">{course.priceNote}</span>}
                </div>
                {course.priceAlt && (
                  <p className="text-sm text-primary mb-4">{course.priceAlt}</p>
                )}
                {!course.priceAlt && <div className="mb-4" />}

                <p className="text-sm text-muted-foreground mb-5 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" /> {course.duration}
                </p>

                <div className="space-y-2.5 mb-6">
                  {course.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{h}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#enquire"
                  className="btn-gold-metallic w-full !block !text-center !py-3"
                  onClick={scrollToEnquire}
                >
                  Enquire Now →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainer Section */}
      <section className="section-padding-compact bg-accent">
        <div className="content-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://fifmmrdngtgxxmmplvrb.supabase.co/storage/v1/object/public/website-photos/founder-photos/carmen-aw3.jpg"
                alt="Carmen Douglas with AW3 Crystal Freeze laser equipment at Laser Location"
                className="rounded-2xl shadow-lg w-full object-cover max-h-[500px]"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">Your Trainer</p>
              <h2 className="text-3xl md:text-4xl font-serif mb-4">Learn from Experience</h2>
              <p className="text-muted-foreground mb-6">
                Our training is led by Carmen Douglas, founder of Laser Location, who brings over six years of specialist experience in advanced laser and aesthetic treatments.
              </p>
              <p className="text-muted-foreground mb-8">
                Having treated over 1,000 clients and built a thriving clinic in Greater Manchester, Carmen understands both the technical precision required and the business realities of running a successful practice.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: "6+", label: "Years Specialist" },
                  { number: "1,000+", label: "Clients Treated" },
                  { number: "VTCT L4", label: "Qualified" },
                  { number: "Manchester", label: "Based" },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl bg-background border border-border text-center">
                    <p className="text-xl font-serif text-gold-metallic font-semibold">{stat.number}</p>
                    <p className="text-xs text-muted-foreground tracking-wide uppercase">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding-compact bg-secondary">
        <div className="content-container text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">The Process</p>
          <h2 className="text-3xl md:text-4xl font-serif mb-12">Your Training Journey</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Enquire & Choose Your Pathway",
                desc: "Discuss your goals with us and select the right course — from CPD certificate to full VTCT qualifications with equipment.",
              },
              {
                step: "02",
                title: "Complete Theory & Practical",
                desc: "Master laser science, skin anatomy, Fitzpatrick typing, consultation protocols, and hands-on treatment techniques with live models.",
              },
              {
                step: "03",
                title: "Certify & Launch",
                desc: "Receive your accredited qualifications, insurance-ready documentation, and ongoing support as you build your career.",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className={`p-8 rounded-xl bg-card border border-border text-center relative ${index < 2 ? "how-it-works-has-connector" : ""}`}
              >
                <span className="text-5xl font-serif text-gold-metallic font-semibold block mb-4">{item.step}</span>
                <h3 className="text-xl font-serif mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Train With Us */}
      <section className="section-padding-compact bg-background">
        <div className="content-container text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">The Difference</p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Why Train With Us?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            We don't just teach techniques — we prepare you for a successful career. Our training combines rigorous theoretical knowledge with extensive practical experience.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Users, title: "Small Class Sizes", desc: "Personalised attention for every student" },
              { icon: Zap, title: "AW3 Crystal Freeze", desc: "Train on industry-leading laser systems" },
              { icon: Shield, title: "Insurance-Ready", desc: "Certification accepted by all major insurers" },
              { icon: BookOpen, title: "Ongoing Support", desc: "Business guidance after qualification" },
              { icon: GraduationCap, title: "VTCT Accredited", desc: "Nationally recognised qualifications" },
              { icon: Star, title: "Models Provided", desc: "All models for training and assessments" },
              { icon: Sparkles, title: "Flexible Scheduling", desc: "Hybrid learning to fit your life" },
              { icon: Check, title: "Free Parking", desc: "Private car parking at the academy" },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl bg-card border border-border text-center">
                <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="text-base font-serif mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <a href="#enquire" className="btn-gold-metallic" onClick={scrollToEnquire}>
              Enquire About Training →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding-compact bg-accent">
        <div className="content-container max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">Training FAQ</p>
            <h2 className="text-3xl md:text-4xl font-serif">Common Questions</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {[
              {
                q: "Do I need prior experience to train with you?",
                a: "No prior experience is required for our CPD courses. For the VTCT Level 4, we recommend having a foundation in laser or beauty therapy. We'll help you choose the right pathway during your enquiry.",
              },
              {
                q: "What qualifications will I receive?",
                a: "Depending on the course, you'll receive either a CPD certificate or a nationally recognised VTCT qualification (Level 3 and/or Level 4 in Laser and Light Therapy). Both are accepted by major insurance providers.",
              },
              {
                q: "Will I be able to get insurance after completing the course?",
                a: "Yes. All our qualifications are insurance-ready. Upon completion, you'll receive the documentation needed to obtain professional indemnity insurance from major providers.",
              },
              {
                q: "Do you provide models for practical training?",
                a: "Yes. All models for both training sessions and assessments are provided by us. You don't need to bring your own clients.",
              },
              {
                q: "Where is the academy and is there parking?",
                a: "Our academy is located in Bury, Greater Manchester, with free private car parking on-site. We'll send full directions upon booking.",
              },
              {
                q: "Are payment plans available?",
                a: "Yes. We offer flexible payment plans across all courses. We'll discuss all options during your initial enquiry to find what works best for you.",
              },
              {
                q: "What laser equipment do you train on?",
                a: "We train on the AW3 Crystal Freeze Diamond — a professional 3-wavelength laser system (755/810/1064nm) with patented Crystal Freeze cooling technology. The same equipment used in our clinic daily.",
              },
              {
                q: "What support do I get after qualifying?",
                a: "We provide ongoing support after qualification, including business guidance for starting your practice, technical advice, and access to our practitioner community.",
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
      <section id="enquire" className="section-padding bg-secondary">
        <div className="content-container max-w-xl text-center">
          <GraduationCap className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Ready to Start Your Training{" "}
            <span className="text-script-accent text-primary text-[1.1em]">Journey?</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Get in touch to discuss your goals and find the right qualification pathway for you.
          </p>

          <div className="bg-background rounded-2xl shadow-xl border border-border p-8">
            <TrainingLeadForm />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-primary" /> No obligation
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-primary" /> Flexible scheduling
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-primary" /> Payment plans available
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="content-container text-center text-xs text-muted-foreground space-y-4">
          <p>© {new Date().getFullYear()} Laser Location. All rights reserved.</p>
          <p className="max-w-2xl mx-auto">
            Laser Location collects the personal information you submit for the purpose of contacting you about your training enquiry. Your details are used only for enquiry follow-up. We do not sell your data.{" "}
            <a href="mailto:info@laserlocation.co.uk" className="text-primary hover:underline">info@laserlocation.co.uk</a>
          </p>
          <p>Course availability subject to demand. Prices may vary — confirm during enquiry.</p>
          <PrivacyPolicyPopup />
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[hsl(30,10%,6%)] border-t border-primary/20 p-3">
        <a
          href="#enquire"
          className="btn-gold-metallic w-full !block !text-center !py-3.5"
          onClick={scrollToEnquire}
        >
          Enquire About Training →
        </a>
      </div>
    </div>
  );
};

export default Training;
