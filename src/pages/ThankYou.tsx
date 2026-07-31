import { useEffect } from "react";
import { CheckCircle, CalendarPlus, MessageSquare, Clock } from "lucide-react";
import laserWatermark from "@/assets/laser-watermark.png";
import { ReviewBreak, reviewByName } from "@/components/GoogleReviews";

const ThankYou = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Schedule");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-4 pb-3.5 bg-[hsl(30,10%,6%)] border-b border-foreground/10 text-center">
        <img
          src={laserWatermark}
          alt="Laser Location"
          className="h-40 md:h-48 -mt-10 md:-mt-12 -mb-14 md:-mb-16 mx-auto"
          loading="eager"
        />
      </div>

      <main className="flex items-start md:items-center justify-center px-4 py-8 md:py-16">
        <div className="max-w-lg w-full text-center space-y-6 md:space-y-8">
          <div className="flex justify-center">
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-primary/15 flex items-center justify-center">
              <CheckCircle className="w-7 h-7 md:w-10 md:h-10 text-primary" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              You're Booked!
            </h1>
            <p className="text-lg text-muted-foreground">
              Quick next steps:
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-7 text-left space-y-5">
            <div className="flex items-center gap-3 border-b border-border pb-5">
              <MessageSquare className="w-5 h-5 text-primary shrink-0" />
              <p className="text-lg font-semibold text-foreground">Check your text/email for confirmation</p>
            </div>
            <div className="flex items-center gap-3 border-b border-border pb-5">
              <CalendarPlus className="w-5 h-5 text-primary shrink-0" />
              <p className="text-lg font-semibold text-foreground">Tap "Add to calendar" in that email</p>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary shrink-0" />
              <p className="text-lg font-semibold text-foreground">15-min consultation · £100 discount reserved for your treatment package</p>
            </div>
          </div>

          <p className="text-base text-muted-foreground">
            Need to reschedule? Please tell us ASAP so your slot can be offered to someone else.
          </p>

          <div className="pt-2 pb-2 border-t border-border">
            <p className="text-base font-medium tracking-widest uppercase text-primary mt-8 mb-6">
              You're In Good Hands
            </p>
            <ReviewBreak review={reviewByName("Maisey Trainor")} />
          </div>

          <p className="text-sm text-muted-foreground">
            Laser Location · Bury, Manchester
          </p>
        </div>
      </main>
    </div>
  );
};

export default ThankYou;
