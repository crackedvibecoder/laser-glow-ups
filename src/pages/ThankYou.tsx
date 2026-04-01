import { useEffect } from "react";
import { CheckCircle, Clock, Shield, Phone } from "lucide-react";

const ThankYou = () => {
  useEffect(() => {
    // Meta Pixel: fire Schedule conversion event
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Schedule");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Success icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            You're Booked!
          </h1>
          <p className="text-lg text-muted-foreground">
            Your free consultation has been confirmed. We can't wait to meet you.
          </p>
        </div>

        {/* What to expect */}
        <div className="bg-card border border-border rounded-xl p-6 text-left space-y-4">
          <h2 className="font-semibold text-foreground text-center">What Happens Next</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">
                You'll receive a confirmation text with your appointment details.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">
                Your consultation takes about 15 minutes — no pressure, no obligation.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">
                Your <strong className="text-primary">£100 Spring discount</strong> has been reserved and will be applied at your visit.
              </p>
            </div>
          </div>
        </div>

        {/* Trust line */}
        <p className="text-xs text-muted-foreground">
          Laser Location · Bury, Manchester · Trusted by 1,000+ clients
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
