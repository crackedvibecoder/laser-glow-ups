import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Download, Check } from "lucide-react";
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

export function ProspectusDownloadCard() {
  const [submitted, setSubmitted] = useState(false);
  const hpRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: "", email: "", phone: "", consent: true },
  });

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "true") {
      setSubmitted(true);
    }
  }, []);

  const onSubmit = async (data: FormData) => {
    const hp = hpRef.current?.value ?? "";
    if (hp) {
      setSubmitted(true);
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

    try {
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }
    } catch {}

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "true");
    }
    setSubmitted(true);
  };

  return (
    <div className="bg-background rounded-2xl shadow-xl border border-border p-6 md:p-8">
      <img
        src={prospectusMockup}
        alt="CEA course prospectus cover"
        className="mx-auto h-40 md:h-48 w-auto object-contain mb-5 drop-shadow-lg"
      />
      <div className="text-center mb-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">
          Free Course Prospectus
        </p>
        <h2 className="text-2xl md:text-3xl font-serif mb-2">Get the Free Course Guide</h2>
        <p className="text-muted-foreground text-base">
          Find your <strong className="text-primary">perfect training pathway</strong>
        </p>
      </div>

      {submitted ? (
        <div className="text-center space-y-4 py-2">
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
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          <div className="flex items-start gap-3 text-left">
            <Checkbox
              id="prospectus-consent"
              checked={form.watch("consent")}
              onCheckedChange={(c) => form.setValue("consent", c as boolean)}
              className="mt-0.5"
            />
            <label
              htmlFor="prospectus-consent"
              className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
            >
              I agree to receive marketing emails about courses and training news. Unsubscribe anytime.
            </label>
          </div>

          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="btn-gold-metallic w-full !py-4 !text-base disabled:opacity-50"
          >
            {form.formState.isSubmitting ? "Sending..." : "Send Me the Guide →"}
          </button>
        </form>
      )}
    </div>
  );
}
