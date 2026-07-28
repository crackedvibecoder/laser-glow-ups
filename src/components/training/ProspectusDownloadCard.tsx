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
    <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
      {/* Gold top hairline */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="p-6 md:p-8 text-center">
        <p className="text-[11px] md:text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">
          Cosmetic Education Academy
        </p>

        <img
          src={prospectusMockup}
          alt="CEA course prospectus cover"
          className="mx-auto h-36 md:h-44 w-auto object-contain mb-5"
          style={{ filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.12))" }}
        />

        <h2 className="text-2xl md:text-3xl font-serif leading-tight mb-1">
          Get the <strong className="font-bold">FREE</strong> Course Guide
        </h2>
        <p className="text-lg md:text-xl font-serif text-foreground/80 mb-4">
          to Find Your Perfect Training Pathway
        </p>

        <div className="gold-divider mb-4" />

        <p className="text-sm md:text-base text-muted-foreground max-w-sm mx-auto mb-3">
          Courses, pricing, entry requirements and career pathways — everything you need before you commit.
        </p>
        <p className="text-sm font-medium text-primary mb-6">
          VTCT-accredited courses · Trusted by 500+ students
        </p>

        {view === "success" && (
          <div className="space-y-4 py-2">
            <div className="mx-auto w-12 h-12 rounded-full border-2 border-primary/40 flex items-center justify-center">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <p className="text-foreground font-medium">Your prospectus is ready</p>
            <a
              href={PROSPECTUS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-metallic inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Prospectus
            </a>
            <p className="text-xs text-muted-foreground">
              We've also sent a copy to your email.
            </p>
          </div>
        )}

        {view === "intro" && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setView("form")}
              className="btn-gold-metallic w-full !py-4 !text-base"
            >
              Send Me the Guide
            </button>
            <button
              type="button"
              onClick={scrollToEnquiry}
              className="block w-full text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              No thanks, I'll find my own way
            </button>
          </div>
        )}

        {view === "form" && (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 text-left">
            <button
              type="button"
              onClick={() => setView("intro")}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>

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
                placeholder="First name"
                className="h-12 rounded-lg text-base bg-background border-border"
              />
              {form.formState.errors.firstName && (
                <p className="text-destructive text-sm mt-1">{form.formState.errors.firstName.message}</p>
              )}
            </div>
            <div>
              <Input
                {...form.register("email")}
                type="email"
                placeholder="Email address"
                className="h-12 rounded-lg text-base bg-background border-border"
              />
              {form.formState.errors.email && (
                <p className="text-destructive text-sm mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div>
              <Input
                {...form.register("phone")}
                type="tel"
                placeholder="Phone number"
                className="h-12 rounded-lg text-base bg-background border-border"
              />
              {form.formState.errors.phone && (
                <p className="text-destructive text-sm mt-1">{form.formState.errors.phone.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="btn-gold-metallic w-full !py-4 !text-base disabled:opacity-50 mt-2"
            >
              {form.formState.isSubmitting ? "Sending..." : "Send Me the Guide"}
            </button>

            <div className="flex items-start gap-2 pt-1">
              <Checkbox
                id="prospectus-consent"
                checked={form.watch("consent")}
                onCheckedChange={(c) => form.setValue("consent", c as boolean)}
                className="mt-0.5"
              />
              <label
                htmlFor="prospectus-consent"
                className="text-[11px] text-muted-foreground leading-relaxed cursor-pointer"
              >
                I agree to receive marketing emails about courses and training news. Unsubscribe anytime.
              </label>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
