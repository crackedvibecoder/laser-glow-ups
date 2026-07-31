import { Star } from "lucide-react";

export type GoogleReview = {
  name: string;
  when: string;
  text: string;
};

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    name: "Reza Vahid Roudsari",
    when: "2 years ago",
    text: "I'm only three sessions into my laser hair removal treatment and I am over the moon with my results! I've saved hours on shaving already and my skin is now free of unsightly razor rashes, all thanks to the incredible skills of Carmen, my therapist. Carmen is extremely experienced and a true expert in her field. She goes above and beyond to make sure you are comfortable throughout the session while giving you excellent results. My only regret: I should have started coming to Carmen years ago!!",
  },
  {
    name: "Shazad Ahmed",
    when: "4 months ago",
    text: "I've had six sessions so far on my laser journey. Incredibly pleased with the results. As an Asian male I have darker skin and thick prominent hair. Laser Location were able to tailor my treatments to my specific needs. Carmen and her team are consummate professionals. I highly recommend this clinic.",
  },
  {
    name: "Maisey Trainor",
    when: "a year ago",
    text: "The girls in there are absolutely lovely & the results speak for themselves. Your made to feel so comfortable and the only thing I ever say is I wish I went sooner, can't recommend this place enough.",
  },
  {
    name: "Z JJ",
    when: "a month ago",
    text: "Have been coming here for a while getting different areas lasered — the results I have are amazing! The girls are so friendly and everything is always clean and tidy. They offer good prices as well.",
  },
];

export const reviewByName = (name: string): GoogleReview =>
  GOOGLE_REVIEWS.find((r) => r.name === name) ?? GOOGLE_REVIEWS[0];

export const Stars = ({ className = "" }: { className?: string }) => (
  <div className={`flex gap-0.5 ${className}`} aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map((i) => (
      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
    ))}
  </div>
);

/** Full card, used in review grids. */
export const ReviewCard = ({ review }: { review: GoogleReview }) => (
  <figure className="p-7 rounded-xl bg-card border border-border text-left">
    <Stars className="mb-3" />
    <blockquote className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
      “{review.text}”
    </blockquote>
    <figcaption className="font-serif text-lg text-foreground">
      {review.name}
      <span className="block text-sm text-muted-foreground font-sans">
        Google review · {review.when}
      </span>
    </figcaption>
  </figure>
);

/** Single quiet quote used as a "proof break" between sections. */
export const ReviewBreak = ({ review }: { review: GoogleReview }) => (
  <figure className="max-w-2xl mx-auto text-center px-6">
    <Stars className="justify-center mb-4" />
    <blockquote className="font-serif text-xl md:text-2xl leading-snug text-foreground mb-4">
      “{review.text}”
    </blockquote>
    <figcaption className="text-base text-muted-foreground">
      {review.name} · Google review · {review.when}
    </figcaption>
  </figure>
);

/** ReputationHub embed, kept visually quiet. */
export const ReviewsWidget = () => (
  <div className="content-container">
    <p className="text-center text-base font-medium tracking-widest uppercase text-primary mb-4">
      See All Google Reviews
    </p>
    <div
      className="max-w-4xl mx-auto rounded-2xl border border-border overflow-hidden"
      style={{ height: "480px" }}
    >
      <iframe
        className="lc_reviews_widget"
        src="https://reputationhub.site/reputation/widgets/review_widget/PWKfLNPWUuSeU4ukiccO"
        frameBorder="0"
        scrolling="no"
        loading="lazy"
        style={{ width: "100%", height: "100%", display: "block" }}
        title="Laser Location Reviews"
      />
    </div>
  </div>
);
