import React, { useMemo, useRef, useState, useEffect } from "react";

const filterButtons = [
  { id: "all", label: "All" },
  { id: "fine-cup", label: "Fine Cup" },
  { id: "good-cup", label: "Good Cup" },
  { id: "rio-minas", label: "Rio Minas" },
  { id: "conilon", label: "Conilon" },
];

const categoryLabels = filterButtons.reduce(
  (map, filter) => ({ ...map, [filter.id]: filter.label }),
  {}
);

const varietyGallery = [
  {
    id: 1,
    category: "fine-cup",
    title: "NY 2/3 SEMI WASHED 17/18",
    type: "FINE CUP",
    region: "Semi Washed • Screen 17/18",
    image: "/photos/grade-cafe.jpg",
  },
  {
    id: 2,
    category: "fine-cup",
    title: "NY 2/3 SEMI WASHED 14/16",
    type: "FINE CUP",
    region: "Semi Washed • Screen 14/16",
    image: "/photos/cafe-cazarini.jpg",
  },
  {
    id: 3,
    category: "fine-cup",
    title: "NATURAL NY 2/3 CERRADO/MOGIANA 17/18",
    type: "FINE CUP",
    region: "Natural • Cerrado/Mogiana • Screen 17/18",
    image: "/photos/cafes-cazarini.jpg",
  },
  {
    id: 4,
    category: "fine-cup",
    title: "NATURAL NY 2/3 CERRADO/MOGIANA 14/16",
    type: "FINE CUP",
    region: "Natural • Cerrado/Mogiana • Screen 14/16",
    image: "/photos/thiago-cafe.jpg",
  },
  {
    id: 5,
    category: "fine-cup",
    title: "NATURAL NY 2/3 17/18",
    type: "FINE CUP",
    region: "Natural • Screen 17/18",
    image: "/photos/experimento-cafe.jpg",
  },
  {
    id: 6,
    category: "fine-cup",
    title: "NATURAL NY 2/3 14/16",
    type: "FINE CUP",
    region: "Natural • Screen 14/16",
    image: "/photos/grade-cafe.jpg",
  },
  {
    id: 7,
    category: "fine-cup",
    title: "NATURAL PEABERRIES (MOKA) 9/10/11",
    type: "FINE CUP",
    region: "Natural Peaberries • Screen 9/10/11",
    image: "/photos/cafe-cazarini.jpg",
  },
  {
    id: 8,
    category: "good-cup",
    title: "NATURAL NY 2/3 17/18",
    type: "GOOD CUP",
    region: "Natural • Screen 17/18",
    image: "/photos/cafes-cazarini.jpg",
  },
  {
    id: 9,
    category: "good-cup",
    title: "NATURAL NY 3/4 14/16",
    type: "GOOD CUP",
    region: "Natural • Screen 14/16",
    image: "/photos/thiago-cafe.jpg",
  },
  {
    id: 10,
    category: "good-cup",
    title: "NATURAL NY 5/6 GRINDERS 13UP",
    type: "GOOD CUP",
    region: "Natural Grinders • Screen 13UP",
    image: "/photos/experimento-cafe.jpg",
  },
  {
    id: 11,
    category: "good-cup",
    title: "NATURAL NY 5/6 GRINDERS 12UP",
    type: "GOOD CUP",
    region: "Natural Grinders • Screen 12UP",
    image: "/photos/grade-cafe.jpg",
  },
  {
    id: 12,
    category: "rio-minas",
    title: "RIO MINAS 17/18",
    type: "RIO MINAS",
    region: "Traditional • Screen 17/18",
    image: "/photos/cafe-cazarini.jpg",
  },
  {
    id: 13,
    category: "rio-minas",
    title: "RIO MINAS 15/16",
    type: "RIO MINAS",
    region: "Traditional • Screen 15/16",
    image: "/photos/cafes-cazarini.jpg",
  },
  {
    id: 14,
    category: "rio-minas",
    title: "RIO MINAS 14/16",
    type: "RIO MINAS",
    region: "Traditional • Screen 14/16",
    image: "/photos/thiago-cafe.jpg",
  },
  {
    id: 15,
    category: "conilon",
    title: "CONILON 13UP",
    type: "CONILON",
    region: "Robusta • Screen 13UP",
    image: "/photos/experimento-cafe.jpg",
  },
  {
    id: 16,
    category: "conilon",
    title: "CONILON 14UP",
    type: "CONILON",
    region: "Robusta • Screen 14UP",
    image: "/photos/grade-cafe.jpg",
  },
  {
    id: 17,
    category: "conilon",
    title: "CONILON 16UP",
    type: "CONILON",
    region: "Robusta • Screen 16UP",
    image: "/photos/cafe-cazarini.jpg",
  },
];

export const AboutUsSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const carouselRef = useRef(null);
  const [showGradients, setShowGradients] = useState({
    left: false,
    right: false,
  });

  const filteredVarieties = useMemo(() => {
    if (activeFilter === "all") return varietyGallery;
    return varietyGallery.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  // Reseta o scroll quando o filtro muda
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      checkScroll();
    }
  }, [activeFilter]);

  // Verifica se precisa mostrar os gradientes
  const checkScroll = () => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const hasOverflow = scrollWidth > clientWidth;

    setShowGradients({
      left: hasOverflow && scrollLeft > 10,
      right: hasOverflow && scrollLeft < scrollWidth - clientWidth - 10,
    });
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", checkScroll);
      checkScroll();

      window.addEventListener("resize", checkScroll);

      return () => {
        carousel.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [filteredVarieties]);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: direction === "next" ? 360 : -360,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="variedades"
      className="py-section-y text-white"
      style={{ backgroundColor: "#020609" }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-4 sm:px-6 lg:px-10">
        {/* Título */}
        <div className="max-w-3xl space-y-5">
          <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl lg:text-[2.5rem]">
            Our Coffee Varieties Portfolio
          </h2>
          <p className="text-white/70 text-lg">
            Explore our selection of premium Brazilian coffees, carefully
            sourced and graded to meet international standards.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-3">
          {filterButtons.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-full border px-6 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "border-accent-green bg-accent-green text-brand-900 scale-105"
                    : "border-white/20 text-white/80 hover:border-white hover:text-white"
                }`}
                aria-pressed={isActive}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Contador de resultados */}
        <div className="text-white/60 text-sm">
          Showing {filteredVarieties.length}{" "}
          {filteredVarieties.length === 1 ? "variety" : "varieties"}
        </div>
      </div>

      {/* Carrossel - Fora do container para permitir scroll até a borda */}
      <div className="relative w-full min-h-[480px]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 pt-2 hide-scrollbar"
            style={{ scrollSnapType: "x mandatory" }}
            aria-label="Coffee varieties available"
          >
            {filteredVarieties.map((variety, index) => (
              <article
                key={variety.id}
                className="w-[320px] shrink-0 rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-fade-in"
                style={{
                  scrollSnapAlign: "start",
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="overflow-hidden rounded-[22px] border border-white/15 bg-white/5">
                  <div className="aspect-square w-full">
                    <img
                      src={variety.image}
                      alt={variety.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="mt-5 space-y-2">
                  <p className="text-xs uppercase tracking-[0.35em] text-accent-green font-semibold">
                    {variety.type}
                  </p>
                  <h3 className="text-lg font-semibold text-white leading-tight">
                    {variety.title}
                  </h3>
                  <p className="text-sm text-white/70">{variety.region}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Gradientes nas bordas - só aparecem quando necessário */}
        {showGradients.left && (
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#020609] to-transparent transition-opacity duration-300" />
        )}
        {showGradients.right && (
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#020609] to-transparent transition-opacity duration-300" />
        )}
      </div>

      {/* Botões de navegação */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 mt-6">
        <div className="flex gap-4 justify-center sm:justify-start">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollCarousel("prev")}
            className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white/80 transition-all hover:text-white hover:border-white hover:scale-105"
          >
            ← Previous
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollCarousel("next")}
            className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white/80 transition-all hover:text-white hover:border-white hover:scale-105"
          >
            Next →
          </button>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
};
