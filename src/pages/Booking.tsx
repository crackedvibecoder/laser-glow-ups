import { useEffect } from "react";
import { Clock } from "lucide-react";

const Booking = () => {
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
      {/* Urgency bar */}
      <div className="bg-primary/10 border-b border-primary/20 py-2.5 px-4 text-center">
        <div className="text-sm font-medium text-foreground flex items-center justify-center gap-2">
          <Clock className="w-4 h-4 text-primary shrink-0" />
          <span>Spring Special — Save £100 on Full-Body Laser Hair Removal</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12 md:py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-serif mb-3">
          Your £100 Off — Book Your Free Consultation
        </h1>
        <p className="text-muted-foreground text-lg mb-2">
          Choose a time that works for you. No commitment, no pressure.
        </p>
        <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 mb-8">
          <span className="text-sm font-semibold tracking-widest text-primary">VOUCHER: SPRING100</span>
        </div>

        <iframe
          src="https://api.leadconnectorhq.com/widget/booking/XFCIVqAZ7Ha6pnxEiKXH"
          style={{ width: "100%", border: "none", minHeight: "800px", overflow: "hidden" }}
          id="WKJHfaDYyUDdQrbeGrlS_1774829119118"
          title="Book Your Consultation"
        />

        <p className="text-xs text-muted-foreground mt-6">
          No payment required · Free consultation · All skin types welcome
        </p>
      </div>
    </div>
  );
};

export default Booking;
