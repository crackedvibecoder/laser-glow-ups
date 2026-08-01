import { Check } from "lucide-react";
import maleNeckResult from "@/assets/ba-neck-male.jpg";

const MensLaserSection = ({ backgroundClass = "bg-secondary" }: { backgroundClass?: string }) => (
  <section className={`section-padding-compact ${backgroundClass}`}>
    <div className="content-container">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
        <div className="order-2 md:order-1">
          <p className="text-base font-medium tracking-widest uppercase text-primary mb-3">
            Laser Hair Removal For Men
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Less Shaving. Cleaner Lines. Smoother Skin.
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Laser is not just for women. Men choose it to reduce unwanted hair, tidy difficult areas and stop constantly dealing with shaving irritation, bumps and ingrowns.
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
            Book A Free Consultation →
          </a>
        </div>

        <figure className="order-1 md:order-2 rounded-2xl overflow-hidden border border-border shadow-lg bg-card">
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
