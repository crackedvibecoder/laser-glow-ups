import { Check } from "lucide-react";
import maleNeckResult from "@/assets/ba-neck-male.jpg";

const MensLaserSection = ({
  backgroundClass = "bg-secondary",
  contextualIntro = false,
}: {
  backgroundClass?: string;
  contextualIntro?: boolean;
}) => (
  <section id="laser-for-men" className={`section-padding-compact scroll-mt-4 ${backgroundClass}`}>
    <div className="content-container">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
        <div className="order-1">
          <p className="text-base font-medium tracking-widest uppercase text-primary mb-3">
            {contextualIntro ? "For Men" : "Not Just For Women"}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            {contextualIntro ? "Men Have Their Own Version Of This" : "Laser Hair Removal For Men"}
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            {contextualIntro
              ? "It may be talked about less, but the frustration is real. Laser can reduce regrowth over time and make day-to-day grooming easier."
              : "Less shaving, cleaner lines and smoother skin. Laser offers a lower-maintenance option for areas that are awkward to manage on your own."}
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {[
              "Back, shoulders and chest",
              "Neck and beard-line shaping",
              "Underarms and intimate areas",
              "Shaving bumps and ingrown hairs",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                <span className="text-base text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <a href="#book" className="btn-gold-metallic inline-block">
            {contextualIntro ? "Talk Through My Options →" : "Book A Free Consultation →"}
          </a>
        </div>

        <figure className="order-2 rounded-2xl overflow-hidden border border-border shadow-lg bg-card">
          <img
            src={maleNeckResult}
            alt="Male neck and beard-line laser hair removal result after three sessions at Laser Location"
            className="w-full aspect-[4/5] object-cover"
            loading="lazy"
          />
          <figcaption className="p-4">
            <p className="text-lg font-semibold tracking-tight">Men&apos;s Neck &amp; Beard Line</p>
            <p className="text-base text-muted-foreground">Visible progress after three sessions</p>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
);

export default MensLaserSection;
