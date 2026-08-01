import { useEffect, useRef, useState } from "react";
import panel1 from "@/assets/story-panel-1.jpg";
import panel2 from "@/assets/story-panel-2.jpg";

const PANELS = [
  {
    src: panel1,
    alt: "As women, there are some things we don't discuss enough",
  },
  {
    src: panel2,
    alt: "One of those things is facial hair growth",
  },
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
        className="w-full object-cover"
        loading="lazy"
      />

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
