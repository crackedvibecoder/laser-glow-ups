import baUnderarm from "@/assets/ba-underarm.jpg";
import baBikini from "@/assets/ba-bikini.jpg";
import baNape from "@/assets/ba-nape-female.jpg";
import baNeckMale from "@/assets/ba-neck-male.jpg";
import chinBeforeAfter from "@/assets/chin-laser-before-after.jpg";
import bikiniBeforeAfter from "@/assets/laser-bikini-before-after.jpg";

type Result = {
  src: string;
  area: string;
  caption: string;
  alt: string;
};

const RESULTS: Result[] = [
  {
    src: baUnderarm,
    area: "Underarms",
    caption: "Before and after 6 sessions",
    alt: "Underarm laser hair removal before and after 6 sessions at Laser Location",
  },
  {
    src: baBikini,
    area: "Bikini Line",
    caption: "Visible reduction across a treatment course",
    alt: "Bikini line laser hair removal before and after at Laser Location",
  },
  {
    src: baNape,
    area: "Nape & Hairline",
    caption: "Cleaner hairline and smoother neck area",
    alt: "Nape and neck hairline laser hair removal before and after at Laser Location",
  },
  {
    src: baNeckMale,
    area: "Men's Neck & Beard Line",
    caption: "Before and after 3 sessions of laser hair removal",
    alt: "Men's neck and beard line laser hair removal before and after 3 sessions at Laser Location",
  },
  {
    src: chinBeforeAfter,
    area: "Chin & Neck",
    caption: "Before: 5 days no shaving. After: 5 weeks no shaving.",
    alt: "Chin and neck laser hair removal before after 5 days no shaving and after 5 weeks no shaving at Laser Location",
  },
  {
    src: bikiniBeforeAfter,
    area: "Bikini & Intimate",
    caption: "Progress after a structured treatment plan",
    alt: "Intimate area laser hair removal before and after at Laser Location",
  },
];

const ResultCard = ({ item, eager }: { item: Result; eager?: boolean }) => (
  <figure className="rounded-2xl overflow-hidden border border-border shadow-lg bg-card">
    <img
      src={item.src}
      alt={item.alt}
      className="w-full aspect-[4/5] object-cover"
      loading={eager ? "eager" : "lazy"}
    />
    <figcaption className="p-4">
      <p className="text-lg font-semibold tracking-tight">{item.area}</p>
      <p className="text-base text-muted-foreground">{item.caption}</p>
    </figcaption>
  </figure>
);

const ResultsGallery = () => {
  return (
    <div>
      {/* Mobile: snap scroll strip */}
      <div className="md:hidden -mx-6 px-6">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {RESULTS.map((item, i) => (
            <div key={item.area} className="snap-center shrink-0 w-[85%]">
              <ResultCard item={item} eager={i === 0} />
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Swipe to see more results →
        </p>
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {RESULTS.map((item, i) => (
          <ResultCard key={item.area} item={item} eager={i === 0} />
        ))}
      </div>
    </div>
  );
};

export default ResultsGallery;
