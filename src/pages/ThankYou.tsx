import { useEffect } from "react";
import { CheckCircle, CalendarPlus, MessageSquare, Clock } from "lucide-react";

const ThankYou = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Schedule");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-start md:items-center justify-center px-4 py-8 md:py-16">
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
            Here's how to make sure you're all set.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 md:p-7 text-left space-y-4">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground text-center">What To Do Now</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 border-b border-border pb-4">
              <CalendarPlus className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">Add it to your calendar</p>
                <p className="text-sm text-muted-foreground">
                  Check your email for a confirmation and tap "Add to Calendar" so you don't forget your slot.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 border-b border-border pb-4">
              <MessageSquare className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">Keep an eye on your messages</p>
                <p className="text-sm text-muted-foreground">
                  You'll receive a confirmation with your appointment details — check your texts and email.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">Your consultation is 15 minutes</p>
                <p className="text-sm text-muted-foreground">
                  No pressure, no obligation. We'll assess your skin, answer questions, and apply your <strong className="text-primary">£100 discount</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Slots are limited — if you need to reschedule, please let us know as soon as possible so we can offer your spot to someone else.
        </p>

        <p className="text-xs text-muted-foreground">
          Laser Location · Bury, Manchester · Trusted by 1,000+ clients
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
