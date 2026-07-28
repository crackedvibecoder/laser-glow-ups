import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Download, Check, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { sendLeadToRouter } from "@/lib/leadRouter";
import prospectusMockup from "@/assets/prospectus-mockup.png";

const PROSPECTUS_URL =
  "https://fifmmrdngtgxxmmplvrb.supabase.co/storage/v1/object/public/marketing-materials/CEA-Course-Prospectus.pdf";

const STORAGE_KEY = "prospectus_downloaded";

const schema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name").max(50),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(7, "Please enter your phone number").max(30),
  consent: z.boolean().default(true),
});

type FormData = z.infer<typeof schema>;
type View = "intro" | "form" | "success";

export function ProspectusDownloadCard() {
  const [view, setView] = useState<View>("intro");
  const hpRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: "", email: "", phone: "", consent: true },
  });

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "true") {
      setView("success");
    }
  }, []);

  const finish = () => {
    try {
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }
    } catch {}

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "true");
      try {
        window.open(PROSPECTUS_URL, "_blank", "noopener,noreferrer");
      } catch {}
    }
    setView("success");
  };

  const onSubmit = async (data: FormData) => {
    const hp = hpRef.current?.value ?? "";
    if (hp) {
      setView("success");
      return;
    }

    try {
      await sendLeadToRouter({
        name: data.firstName,
        email: data.email,
        phone: data.phone,
        formName: "Training prospectus download",
        message: "Prospectus download request",
        lead_type: "prospectus_lead",
        consent: data.consent,
        _hp: hp,
      });
    } catch (err) {
      console.error("Prospectus lead error:", err);
    }

    finish();
  };

  const scrollToEnquiry = () => {
    if (typeof window === "undefined") return;
    const el = document.getElementById("enquire");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative bg-[hsl(40_30%_96%)] rounded-2xl shadow-2xl overflow-hidden p-8 sm:p-10">
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(43_60%_70%)] to-transparent" />

      {/* Step 1 — The Hook */}
      {view === "intro" && (
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[hsl(42_50%_50%)] font-medium mb-4">
            Cosmetic Education Academy
          </p>

          <img
            src={prospectusMockup}
            alt="CEA Course Prospectus"
            className="mx-auto h-[140px] sm:h-[180px] w-auto object-contain mb-5"
            style={{ filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.12))" }}
          />

          <h2
            className="font-serif text-foreground leading-[1.3] max-w-[300px] sm:max-w-[380px] mx-auto mb-3"
            style={{ textWrap: "balance" as any }}
          >
            <span className="block text-[1.4rem] sm:text-[1.7rem] font-normal">
              Get the <span className="uppercase font-semibold tracking-wide">FREE</span> Course Guide
            </span>
            <span className="block text-base sm:text-lg font-sans text-muted-foreground font-normal mt-1">
              to Find Your Perfect Training Pathway
            </span>
          </h2>

          <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-[hsl(43_60%_70%)] to-transparent mb-3" />

          <p className="text-sm text-muted-foreground max-w-[320px] mx-auto leading-relaxed mb-2">
            Courses, pricing, entry requirements and career pathways — everything you need before you commit.
          </p>

          <p className="text-xs text-[hsl(42_50%_50%)] font-medium tracking-wide mb-6">
            VTCT-accredited courses · Trusted by 500+ students
          </p>

          <button
            type="button"
            onClick={() => setView("form")}
            className="w-full max-w-sm mx-auto btn-gold-metallic text-base font-semibold"
          >
            Send Me the Guide
          </button>

          <button
            type="button"
            onClick={scrollToEnquiry}
            className="w-full mt-5 text-center text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
          >
            No thanks, I'll find my own way
          </button>
        </div>
      )}

      {/* Step 2 — The Form */}
      {view === "form" && (
        <div className="text-center">
          <button
            type="button"
            onClick={() => setView("intro")}
            className="absolute top-4 left-4 p-2 text-muted-foreground hover:text-foreground transition-colors z-10"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <p className="text-xs uppercase tracking-[0.25em] text-[hsl(42_50%_50%)] font-medium mb-3">
            Almost there
          </p>

          <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground mb-1">
            Where should we send it?
          </h3>

          <p className="text-sm text-muted-foreground mb-6">
            Enter your details and we'll send the guide straight to your inbox.
          </p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 max-w-sm mx-auto">
            {/* Honeypot */}
            <input
              ref={hpRef}
              type="text"
              name="_hp"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-10000px", width: 1, height: 1, opacity: 0 }}
            />

            <div>
              <Input
                {...form.register("firstName")}
                placeholder="First Name"
                className="h-11 sm:h-12 bg-white border-[hsl(36_25%_80%)] focus:border-[hsl(42_55%_55%)] focus:ring-1 focus:ring-[hsl(42_55%_55%)] placeholder:text-[hsl(30_8%_55%)] text-foreground rounded-sm font-medium"
              />
              {form.formState.errors.firstName && (
                <p className="text-xs text-destructive mt-1.5 text-left">
                  {form.formState.errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...form.register("email")}
                type="email"
                placeholder="Email Address"
                className="h-11 sm:h-12 bg-white border-[hsl(36_25%_80%)] focus:border-[hsl(42_55%_55%)] focus:ring-1 focus:ring-[hsl(42_55%_55%)] placeholder:text-[hsl(30_8%_55%)] text-foreground rounded-sm font-medium"
              />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive mt-1.5 text-left">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...form.register("phone")}
                type="tel"
                placeholder="Phone Number"
                className="h-11 sm:h-12 bg-white border-[hsl(36_25%_80%)] focus:border-[hsl(42_55%_55%)] focus:ring-1 focus:ring-[hsl(42_55%_55%)] placeholder:text-[hsl(30_8%_55%)] text-foreground rounded-sm font-medium"
              />
              {form.formState.errors.phone && (
                <p className="text-xs text-destructive mt-1.5 text-left">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>

            <div className="flex items-start gap-3 text-left">
              <Checkbox
                id="prospectus-consent"
                checked={form.watch("consent")}
                onCheckedChange={(c) => form.setValue("consent", c as boolean)}
                className="mt-0.5 border-[hsl(36_25%_75%)] data-[state=checked]:bg-[hsl(42_50%_55%)] data-[state=checked]:border-[hsl(42_50%_55%)]"
              />
              <label
                htmlFor="prospectus-consent"
                className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
              >
                I agree to receive marketing emails about courses and training. Unsubscribe anytime.
              </label>
            </div>

            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full btn-gold-metallic mt-2 text-base font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {form.formState.isSubmitting ? "Sending..." : "Get Your Free Guide"}
            </button>
          </form>
        </div>
      )}

      {/* Step 3 — Success */}
      {view === "success" && (
        <div className="text-center py-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[hsl(42_50%_50%)] font-medium mb-4">
            You're In
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal mb-6 text-foreground">
            Your Guide is Ready
          </h3>
          <div className="mx-auto w-14 h-14 rounded-full border-2 border-[hsl(43_60%_70%)] flex items-center justify-center mb-6">
            <Check className="h-7 w-7 text-[hsl(43_55%_55%)]" strokeWidth={2.5} />
          </div>
          <a
            href={PROSPECTUS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-metallic inline-flex items-center gap-2 mb-4"
          >
            <Download className="w-4 h-4" />
            Download Now
          </a>
          <p className="text-xs text-muted-foreground tracking-wide">Also sent to your inbox</p>
        </div>
      )}
    </div>
  );
}
