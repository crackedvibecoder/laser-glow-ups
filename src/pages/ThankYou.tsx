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
            Quick next steps:
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 md:p-7 text-left space-y-5">
          <div className="flex items-center gap-3 border-b border-border pb-5">
            <CalendarPlus className="w-5 h-5 text-primary shrink-0" />
            <p className="text-sm font-semibold text-foreground">Add your slot to calendar</p>
          </div>
          <div className="flex items-center gap-3 border-b border-border pb-5">
            <MessageSquare className="w-5 h-5 text-primary shrink-0" />
            <p className="text-sm font-semibold text-foreground">Check text/email for confirmation</p>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary shrink-0" />
            <p className="text-sm font-semibold text-foreground">15-min consultation · £100 discount applied</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Need to reschedule? Please tell us ASAP so your slot can be offered to someone else.
        </p>

        <p className="text-xs text-muted-foreground">
          Laser Location · Bury, Manchester
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
