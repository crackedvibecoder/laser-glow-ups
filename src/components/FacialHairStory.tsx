import { useEffect, useRef, useState } from "react";
import panel1 from "@/assets/story-panel-1.jpg.asset.json";
import panel2 from "@/assets/story-panel-2.jpg.asset.json";
import panel3 from "@/assets/story-panel-3.jpg.asset.json";

const PANELS = [
  {
    src: panel1.url,
    alt: "Practitioner performing laser hair removal on a client's face and neck",
  },
  {
    src: panel2.url,
    alt: "Qualified practitioner treating facial hair with a medical-grade laser",
  },
  {
    src: panel3.url,
    alt: "Client receiving a medical-grade facial laser hair removal session",
  },
];

const COPY = [
  <>
    As women, there are some things we <strong className="font-semibold">don't</strong>{" "}
    discuss enough.
  </>,
  <>
    One of those things is <strong className="font-semibold">facial hair growth</strong>.
  </>,
  <>
    And it's a lot more common than you think — up to{" "}
    <strong className="font-semibold">40% of women</strong> experience it at some point in
    their life.
  </>,
];

const Panel = ({ index }: { index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <img
        src={PANELS[index].src}
        alt={PANELS[index].alt}
        className="w-full aspect-[4/5] sm:aspect-[16/10] object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
      <p className="absolute inset-x-0 bottom-0 p-6 md:p-10 text-xl md:text-3xl font-serif leading-snug text-background text-center">
        {COPY[index]}
      </p>
    </div>
  );
};

const FacialHairStory = () => (
  <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
    {PANELS.map((_, i) => (
      <Panel key={i} index={i} />
    ))}
  </div>
);

export default FacialHairStory;
