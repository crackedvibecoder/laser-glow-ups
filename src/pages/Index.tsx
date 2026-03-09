import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Star, Clock, Shield, Users, Sparkles, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import laserWatermark from "@/assets/laser-watermark.png";
import chinBeforeAfter from "@/assets/chin-laser-before-after.jpg";
import bikiniBeforeAfter from "@/assets/laser-bikini-before-after.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20),
});

type LeadFormData = z.infer<typeof leadSchema>;

const LeadCaptureForm = ({ variant = "light" }: { variant?: "light" | "dark" }) => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = (data: LeadFormData) => {
    console.log("Lead captured:", data);
    setSubmitted(true);
    // Redirect to GoHighLevel booking after short delay
    setTimeout(() => {
      window.open(
        "https://api.leadconnectorhq.com/widget/booking/sY2JEbJCGznFxOJLfgMC",
        "_blank"
      );
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="text-center py-8 animate-fade-up">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl mb-2">You're In!</h3>
        <p className="text-muted-foreground mb-4">
          Your Spring Special voucher code is:
        </p>
        <div className="inline-block px-6 py-3 rounded-lg bg-primary/10 border border-primary/30 mb-4">
          <span className="text-2xl font-semibold tracking-widest text-primary">SPRING100</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Redirecting you to book your free consultation...
        </p>
      </div>
    );
  }

  const isDark = variant === "dark";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          placeholder="Your name"
          {...register("name")}
          className={`h-12 rounded-lg text-base ${isDark ? "bg-foreground/5 border-foreground/20 placeholder:text-foreground/40" : "bg-background border-border"}`}
        />
        {errors.name && (
          <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Input
          type="email"
          placeholder="Email address"
          {...register("email")}
          className={`h-12 rounded-lg text-base ${isDark ? "bg-foreground/5 border-foreground/20 placeholder:text-foreground/40" : "bg-background border-border"}`}
        />
        {errors.email && (
          <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Input
          type="tel"
          placeholder="Phone number"
          {...register("phone")}
          className={`h-12 rounded-lg text-base ${isDark ? "bg-foreground/5 border-foreground/20 placeholder:text-foreground/40" : "bg-background border-border"}`}
        />
        {errors.phone && (
          <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold-metallic w-full !py-4 !text-base disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Claim Your £100 Discount →"}
      </button>
      <p className="text-xs text-center text-muted-foreground">
        No payment required. No obligation. We'll be in touch within 24 hours.
      </p>
    </form>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
          <span>
            Only <strong className="text-primary">15 consultation spots</strong> left this month
          </span>
          <Clock className="w-4 h-4 text-primary" />
        </p>
      </div>

      {/* Hero Section */}
      <section
        className="relative py-16 md:py-24"
        style={{ backgroundColor: "hsl(var(--hero-bg, 36 30% 92%))" }}
      >
        <div className="content-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Copy */}
            <div className="animate-fade-up">
              <p className="text-sm font-medium tracking-widest uppercase text-primary mb-4">
                Medical-Grade Laser Hair Removal · Bury, Manchester
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-6">
                Lasting Smooth Skin{" "}
                <span className="text-script-accent text-primary text-[1.15em]">
                  Starts Here
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Full-body laser hair removal. 6 sessions. Medical-grade
                technology. Safe for all skin types.
              </p>

              {/* Pricing Badge */}
              <div className="inline-flex items-baseline gap-3 mb-8 px-6 py-3 rounded-full bg-background/80 border border-border">
                <span className="text-lg text-muted-foreground line-through">£795</span>
                <span className="text-3xl font-serif text-gold-metallic font-semibold">£695</span>
                <span className="text-sm text-muted-foreground">for 6 sessions</span>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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

            {/* Right - Lead Capture Form */}
            <div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
              <div className="bg-background rounded-2xl shadow-xl border border-border p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-serif mb-2">Book Your Free Consultation</h2>
                  <p className="text-muted-foreground text-sm">
                    Claim your <strong className="text-primary">£100 Spring Discount</strong> — no payment required
                  </p>
                </div>
                <LeadCaptureForm />
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
                <p className="text-sm text-muted-foreground">Before & after 6 sessions</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
              <img src={bikiniBeforeAfter} alt="Bikini line laser hair removal before and after" className="w-full h-64 object-cover" loading="lazy" />
              <div className="bg-card p-4">
                <p className="font-serif text-lg">Bikini Line</p>
                <p className="text-sm text-muted-foreground">Before & after 6 sessions</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <a
              href="#claim"
              className="btn-gold-metallic"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("claim")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Claim Your £100 Discount →
            </a>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                  index >= 3 ? "md:col-span-1 lg:last:col-start-2 lg:[&:nth-child(4)]:col-start-auto" : ""
                }`}
              >
                <span className="text-4xl mb-4 block">{item.emoji}</span>
                <h3 className="text-xl font-serif mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <a
              href="#claim"
              className="btn-gold-metallic"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("claim")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
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

          <div className="grid md:grid-cols-3 gap-8">
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
            ].map((item) => (
              <div key={item.step} className="p-8 rounded-xl bg-card border border-border text-center">
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
            <video
              autoPlay
              muted
              playsInline
              controls
              preload="auto"
              className="w-full"
            >
              <source src="/videos/first-visit.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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
            <video
              autoPlay
              muted
              playsInline
              controls
              className="w-full"
            >
              <source src="/videos/testimonial.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="max-w-4xl mx-auto rounded-2xl border border-border overflow-hidden" style={{ maxHeight: "480px", overflowY: "auto" }}>
            <iframe
              className="lc_reviews_widget"
              src="https://reputationhub.site/reputation/widgets/review_widget/PWKfLNPWUuSeU4ukiccO"
              frameBorder="0"
              scrolling="no"
              style={{ minWidth: "100%", width: "100%" }}
              title="Laser Location Reviews"
            />
          </div>

          {/* Post-reviews CTA */}
          <div className="mt-12">
            <a
              href="#claim"
              className="btn-gold-metallic"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("claim")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Claim Your £100 Discount →
            </a>
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
                £795
              </span>
              <span className="text-5xl font-serif text-gold-metallic font-semibold">
                £695
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
                "Payment plans available (from £116/mo)",
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
              href="#claim"
              className="btn-gold-metallic w-full !block !text-center"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("claim")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Claim Your £100 Discount →
            </a>

            <p className="text-xs mt-4 text-muted-foreground">
              Save £100 when you book your free consultation this month
            </p>
          </div>
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
                a: "Yes. Most clients spend £50+ every 4–6 weeks on waxing — that's over £500 a year, indefinitely. Our 6-session course costs £695 (or £595 with the Spring Discount) for lasting results, making it a fraction of the long-term cost of waxing.",
              },
              {
                q: "Are payment plans available?",
                a: "Yes. We offer flexible payment plans from £116 per month over 6 months. We'll discuss all options during your free consultation.",
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
      <section id="claim" className="section-padding bg-secondary">
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

          <div className="bg-background rounded-2xl shadow-xl border border-border p-8">
            <LeadCaptureForm />
          </div>

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
          <p className="space-x-2">
            <a href="https://laserlocation.co.uk/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>
            <span>·</span>
            <a href="https://laserlocation.co.uk/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Terms of Service</a>
          </p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[hsl(30,10%,6%)] border-t border-primary/20 p-3">
        <a
          href="#claim"
          className="btn-gold-metallic w-full !block !text-center !py-3.5"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("claim")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Claim Your £100 Discount →
        </a>
      </div>
    </div>
  );
};

export default Index;
