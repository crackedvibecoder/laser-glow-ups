import baUnderarm from "@/assets/ba-underarm.jpg.asset.json";
import baBikini from "@/assets/ba-bikini.jpg.asset.json";
import baNape from "@/assets/ba-nape-female.jpg.asset.json";
import baNeckMale from "@/assets/ba-neck-male.jpg.asset.json";
import chinBeforeAfter from "@/assets/chin-laser-before-after.jpg";
import bikiniBeforeAfter from "@/assets/laser-bikini-before-after.jpg";

type Result = {
  src: string;
  area: string;
  alt: string;
};

const RESULTS: Result[] = [
  {
    src: baUnderarm.url,
    area: "Underarms",
    alt: "Underarm laser hair removal before and after at Laser Location",
  },
  {
    src: baBikini.url,
    area: "Bikini Line",
    alt: "Bikini line laser hair removal before and after at Laser Location",
  },
  {
    src: baNape.url,
    area: "Nape & Hairline",
    alt: "Nape and neck hairline laser hair removal before and after at Laser Location",
  },
  {
    src: baNeckMale.url,
    area: "Men's Neck & Beard Line",
    alt: "Men's neck and beard line laser hair removal before and after at Laser Location",
  },
  {
    src: chinBeforeAfter,
    area: "Chin & Upper Lip",
    alt: "Chin and upper lip laser hair removal before and after at Laser Location",
  },
  {
    src: bikiniBeforeAfter,
    area: "Bikini & Intimate",
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
      <p className="text-base text-muted-foreground">
        Before &amp; after a course of sessions
      </p>
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
