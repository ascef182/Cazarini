import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TeamSectionA from "./TeamSectionA";
import TeamSectionB from "./TeamSectionB";
import TeamSectionC from "./TeamSectionC";
import TeamSectionD from "./TeamSectionD";
import TeamSectionE from "./TeamSectionE";

interface TeamCarouselProps {
  content: any;
  lang: "en" | "pt";
}

const SLIDES = [
  { name: "Editorial Grid", Component: TeamSectionA },
  { name: "Asymmetric Story", Component: TeamSectionB },
  { name: "Circular Portraits", Component: TeamSectionC },
  { name: "Cinematic Duo", Component: TeamSectionD },
  { name: "Executive Cards", Component: TeamSectionE },
];

const TeamCarousel: React.FC<TeamCarouselProps> = ({ content, lang }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const syncActiveIndex = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIndex(Math.min(Math.max(index, 0), SLIDES.length - 1));
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener("scroll", syncActiveIndex);
    return () => el.removeEventListener("scroll", syncActiveIndex);
  }, [syncActiveIndex]);

  const scrollToIndex = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-white py-10 lg:py-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.3em] text-accent-green">
          {SLIDES[activeIndex].name}
        </p>
      </div>

      <div
        ref={carouselRef}
        className="flex h-[560px] overflow-x-auto scroll-smooth scrollbar-hide sm:h-[740px] lg:h-[820px]"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {SLIDES.map(({ name, Component }) => (
          <div
            key={name}
            className="h-full w-full shrink-0 overflow-y-auto"
            style={{ scrollSnapAlign: "start" }}
          >
            <Component content={content} lang={lang} />
          </div>
        ))}
      </div>

      <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-4 px-4 pt-6 sm:px-6 lg:px-10">
        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous slide"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-brand-900 shadow-[0_8px_20px_rgba(1,2,5,0.08)] transition-all hover:scale-105 hover:border-accent-green hover:text-accent-green disabled:pointer-events-none disabled:opacity-30 lg:h-11 lg:w-11"
        >
          <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5" />
        </button>

        <div className="flex items-center gap-2">
          {SLIDES.map(({ name }, idx) => (
            <button
              key={name}
              type="button"
              onClick={() => scrollToIndex(idx)}
              title={name}
              aria-label={name}
              className={`h-2.5 rounded-full transition-all ${
                idx === activeIndex ? "w-8 bg-accent-green" : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollToIndex(activeIndex + 1)}
          disabled={activeIndex === SLIDES.length - 1}
          aria-label="Next slide"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-brand-900 shadow-[0_8px_20px_rgba(1,2,5,0.08)] transition-all hover:scale-105 hover:border-accent-green hover:text-accent-green disabled:pointer-events-none disabled:opacity-30 lg:h-11 lg:w-11"
        >
          <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" />
        </button>
      </div>
    </section>
  );
};

export default TeamCarousel;
