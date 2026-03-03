import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { Header } from "../components/Header";
import { SEO } from "../components/SEO";
import { Footer } from "../components/Footer";
import { X, Camera, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const filterButtons = [
  { id: "all", label: { en: "All Photos", pt: "Todas as Fotos" } },
  { id: "partners", label: { en: "Partners", pt: "Parceiros" } },
  { id: "travel", label: { en: "Travel", pt: "Viagens" } },
  { id: "production", label: { en: "Production", pt: "Produção" } },
  { id: "logistics", label: { en: "Logistics", pt: "Logística" } },
];

const galleryPhotos = [
  // PARTNERS
  {
    id: 1,
    category: "partners",
    src: "/photos/doisclientesethiago.jpg",
    title: { en: "Meeting with International Buyers", pt: "Reunião com Compradores Internacionais" },
    description: { en: "Building lasting partnerships at origin", pt: "Construindo parcerias duradouras na origem" },
    aspect: "landscape",
  },
  {
    id: 2,
    category: "partners",
    src: "/photos/carlos.jfif",
    title: { en: "Carlos — Head of Operations", pt: "Carlos — Chefe de Operações" },
    description: { en: "Leading our supply chain team", pt: "Liderando nossa equipe de supply chain" },
    aspect: "portrait",
  },
  {
    id: 3,
    category: "partners",
    src: "/photos/dave.jfif",
    title: { en: "Dave — International Partner", pt: "Dave — Parceiro Internacional" },
    description: { en: "Our trusted partner in global markets", pt: "Nosso parceiro de confiança nos mercados globais" },
    aspect: "portrait",
  },
  {
    id: 4,
    category: "partners",
    src: "/photos/felipe.jfif",
    title: { en: "Felipe — Quality Director", pt: "Felipe — Diretor de Qualidade" },
    description: { en: "Ensuring excellence in every lot", pt: "Garantindo excelência em cada lote" },
    aspect: "portrait",
  },
  {
    id: 5,
    category: "partners",
    src: "/photos/redbankeua.jpg",
    title: { en: "Red Bank US Office", pt: "Escritório Red Bank EUA" },
    description: { en: "Our US operations center", pt: "Nosso centro de operações nos EUA" },
    aspect: "landscape",
  },
  // TRAVEL
  {
    id: 6,
    category: "travel",
    src: "/photos/thiago-conteiner.jfif",
    title: { en: "Visiting Port Operations", pt: "Visitando Operações Portuárias" },
    description: { en: "Thiago at Santos port inspecting shipments", pt: "Thiago no porto de Santos inspecionando embarques" },
    aspect: "landscape",
  },
  {
    id: 7,
    category: "travel",
    src: "/photos/thiago-cafe.jpg",
    title: { en: "Field Visit — Cerrado Region", pt: "Visita de Campo — Região do Cerrado" },
    description: { en: "Evaluating new crop at origin farms", pt: "Avaliando nova safra nas fazendas de origem" },
    aspect: "landscape",
  },
  {
    id: 8,
    category: "travel",
    src: "/photos/bandeira-cazarini.jpg",
    title: { en: "Cazarini Flag — Our Identity", pt: "Bandeira Cazarini — Nossa Identidade" },
    description: { en: "Representing our brand across the globe", pt: "Representando nossa marca ao redor do mundo" },
    aspect: "landscape",
  },
  {
    id: 9,
    category: "travel",
    src: "/photos/cazarini.jpg",
    title: { en: "Cazarini Headquarters", pt: "Sede da Cazarini" },
    description: { en: "Our base of operations in Brazil", pt: "Nossa base de operações no Brasil" },
    aspect: "landscape",
  },
  // PRODUCTION
  {
    id: 10,
    category: "production",
    src: "/photos/grade-cafe.jpg",
    title: { en: "Quality Grading Process", pt: "Processo de Classificação de Qualidade" },
    description: { en: "Meticulous grading ensures only the best lots move forward", pt: "Classificação meticulosa garante que apenas os melhores lotes avancem" },
    aspect: "landscape",
  },
  {
    id: 11,
    category: "production",
    src: "/photos/experimento-cafe.jpg",
    title: { en: "Lab Analysis & Cupping", pt: "Análise Laboratorial e Cupping" },
    description: { en: "SCA-certified quality control", pt: "Controle de qualidade certificado SCA" },
    aspect: "landscape",
  },
  {
    id: 12,
    category: "production",
    src: "/photos/cafe-cazarini.jpg",
    title: { en: "Premium Green Coffee Beans", pt: "Grãos de Café Verde Premium" },
    description: { en: "Specialty-grade beans ready for export", pt: "Grãos de grau especial prontos para exportação" },
    aspect: "landscape",
  },
  {
    id: 13,
    category: "production",
    src: "/photos/seca-do-cafe.jpg",
    title: { en: "Natural Drying Process", pt: "Processo de Secagem Natural" },
    description: { en: "Sun-dried coffee on traditional patios", pt: "Café secado ao sol em terreiros tradicionais" },
    aspect: "landscape",
  },
  {
    id: 14,
    category: "production",
    src: "/photos/Different Ways to Process Coffee and Why It Matters.jfif",
    title: { en: "Processing Methods", pt: "Métodos de Processamento" },
    description: { en: "Natural, washed, and honey processing", pt: "Processamento natural, lavado e honey" },
    aspect: "landscape",
  },
  {
    id: 15,
    category: "production",
    src: "/photos/Fotografia de Magno peneirando o café para separar o café maduro dos verdes e dos bóias_.jfif",
    title: { en: "Cherry Sorting by Hand", pt: "Separação Manual dos Grãos" },
    description: { en: "Separating ripe cherries from green and floaters", pt: "Separando café maduro dos verdes e bóias" },
    aspect: "landscape",
  },
  {
    id: 16,
    category: "production",
    src: "/photos/cafevistoporcima.jpg",
    title: { en: "Coffee From Above", pt: "Café Visto de Cima" },
    description: { en: "Roasted beans ready for cupping", pt: "Grãos torrados prontos para cupping" },
    aspect: "square",
  },
  {
    id: 17,
    category: "production",
    src: "/photos/semnentesvermelhas.jfif",
    title: { en: "Ripe Coffee Cherries", pt: "Cerejas de Café Maduras" },
    description: { en: "Perfect ripeness for maximum sweetness", pt: "Maturação perfeita para máxima doçura" },
    aspect: "landscape",
  },
  {
    id: 18,
    category: "production",
    src: "/photos/caffe-in-field.jpg",
    title: { en: "Coffee Plantation", pt: "Plantação de Café" },
    description: { en: "Arabica farms in the Brazilian highlands", pt: "Fazendas de arábica nas terras altas brasileiras" },
    aspect: "landscape",
  },
  {
    id: 19,
    category: "production",
    src: "/photos/What is a Q Grader_.jfif",
    title: { en: "Q-Grader Certification", pt: "Certificação Q-Grader" },
    description: { en: "Professional coffee quality assessment", pt: "Avaliação profissional de qualidade do café" },
    aspect: "landscape",
  },
  {
    id: 20,
    category: "production",
    src: "/photos/materialdetrabalho.jpg",
    title: { en: "Tools of the Trade", pt: "Ferramentas do Ofício" },
    description: { en: "Essential equipment for quality evaluation", pt: "Equipamento essencial para avaliação de qualidade" },
    aspect: "landscape",
  },
  {
    id: 21,
    category: "production",
    src: "/photos/cafeverdedentrodosaco.jfif",
    title: { en: "Green Coffee in Bags", pt: "Café Verde nos Sacos" },
    description: { en: "Ready for weighing and shipment preparation", pt: "Pronto para pesagem e preparação de embarque" },
    aspect: "landscape",
  },
  {
    id: 22,
    category: "production",
    src: "/photos/ciclo-cafe.jpg",
    title: { en: "The Coffee Cycle", pt: "O Ciclo do Café" },
    description: { en: "From seed to cup — the complete journey", pt: "Da semente à xícara — a jornada completa" },
    aspect: "landscape",
  },
  // LOGISTICS
  {
    id: 23,
    category: "logistics",
    src: "/photos/container-de-cafe.jpg",
    title: { en: "Container Loading at Port", pt: "Carregamento de Container no Porto" },
    description: { en: "FCL shipments ready for global destinations", pt: "Embarques FCL prontos para destinos globais" },
    aspect: "landscape",
  },
  {
    id: 24,
    category: "logistics",
    src: "/photos/cafes-cazarini.jpg",
    title: { en: "Warehouse Operations", pt: "Operações de Armazém" },
    description: { en: "Bonded warehouse storage and management", pt: "Armazenamento e gestão em armazém alfandegado" },
    aspect: "landscape",
  },
  {
    id: 25,
    category: "logistics",
    src: "/photos/cafeetrabalhador.jfif",
    title: { en: "Quality Check Before Export", pt: "Verificação de Qualidade Antes da Exportação" },
    description: { en: "Final inspection before container stuffing", pt: "Inspeção final antes da estufagem do contêiner" },
    aspect: "landscape",
  },
  {
    id: 26,
    category: "logistics",
    src: "/photos/brasilemsemenetes.jfif",
    title: { en: "Brazilian Origin — Ready to Ship", pt: "Origem Brasil — Pronto para Embarcar" },
    description: { en: "Premium lots prepared for international shipping", pt: "Lotes premium preparados para embarque internacional" },
    aspect: "landscape",
  },
];

const content = {
  hero: {
    en: {
      eyebrow: "BEHIND THE SCENES",
      title: "Our",
      titleHighlight: "Gallery",
      subtitle: "A visual journey through our operations — from the farms we visit to the ports where we ship, and the partners who make it all possible.",
    },
    pt: {
      eyebrow: "NOS BASTIDORES",
      title: "Nossa",
      titleHighlight: "Galeria",
      subtitle: "Uma jornada visual por nossas operações — das fazendas que visitamos aos portos onde embarcamos, e os parceiros que tornam tudo possível.",
    },
  },
  cta: {
    en: {
      title: "Want to Visit?",
      subtitle: "Schedule a visit to our farms and offices. Experience the quality firsthand.",
      button: "Contact Us",
    },
    pt: {
      title: "Quer Visitar?",
      subtitle: "Agende uma visita às nossas fazendas e escritórios. Experimente a qualidade pessoalmente.",
      button: "Fale Conosco",
    },
  },
};

export const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightbox, setLightbox] = useState(null);
  const { isPortuguese } = useLanguage();
  const lang = isPortuguese ? "pt" : "en";
  const pageRef = useRef(null);
  const lightboxRef = useRef(null);

  const filteredPhotos = useMemo(() => {
    if (activeFilter === "all") return galleryPhotos;
    return galleryPhotos.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const openLightbox = useCallback((photo) => {
    setLightbox(photo);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    if (lightboxRef.current) {
      gsap.to(lightboxRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setLightbox(null);
          document.body.style.overflow = "";
        },
      });
    } else {
      setLightbox(null);
      document.body.style.overflow = "";
    }
  }, []);

  const navigateLightbox = useCallback((direction) => {
    if (!lightbox) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === lightbox.id);
    let newIndex;
    if (direction === "next") {
      newIndex = currentIndex < filteredPhotos.length - 1 ? currentIndex + 1 : 0;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredPhotos.length - 1;
    }
    setLightbox(filteredPhotos[newIndex]);
  }, [lightbox, filteredPhotos]);

  useEffect(() => {
    if (lightbox && lightboxRef.current) {
      gsap.fromTo(
        lightboxRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [lightbox]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKey = (e) => {
      if (!lightbox) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox("next");
      if (e.key === "ArrowLeft") navigateLightbox("prev");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, closeLightbox, navigateLightbox]);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);

    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo('[data-animate="hero-eyebrow"]', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2 });
      gsap.fromTo('[data-animate="hero-title"]', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.4 });
      gsap.fromTo('[data-animate="hero-subtitle"]', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.6 });

      // Cards stagger
      gsap.utils.toArray("[data-animate='gallery-card']").forEach((card, index) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.5, delay: 0.05 * (index % 9),
            scrollTrigger: { trigger: card, start: "top 92%" },
          }
        );
      });

      // CTA
      gsap.fromTo('[data-animate="cta"]',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: '[data-animate="cta"]', start: "top 85%" } }
      );
    }, pageRef);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [filteredPhotos]);

  return (
    <>
      <SEO
        title={lang === "en" ? "Gallery - Cazarini Coffee Trading" : "Galeria - Cazarini Trading de Café"}
        description={lang === "en"
          ? "Behind the scenes of Cazarini Coffee Trading. Photos from our farms, partners, logistics operations, and travels across the coffee world."
          : "Nos bastidores da Cazarini Trading de Café. Fotos das nossas fazendas, parceiros, operações logísticas e viagens pelo mundo do café."}
      />

      <div ref={pageRef} className="bg-white min-h-screen">
        {/* ═══════════════════════════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[60vh] lg:min-h-[70vh] flex flex-col overflow-hidden">
          <img
            src="/photos/Serene Coffee Harvest_ Nature-Inspired AI Art Featuring Coffee Plants.jfif"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/70 via-brand-950/50 to-brand-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/60 to-transparent" />

          {/* Glow */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-green rounded-full blur-[128px]" />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col flex-1 px-4 pt-10 sm:px-6 lg:px-10">
            <Header variant="dark" />

            <div className="flex flex-1 items-center justify-center text-center py-20">
              <div className="max-w-4xl space-y-8">
                <p
                  data-animate="hero-eyebrow"
                  className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent-green"
                >
                  <Camera className="w-4 h-4" />
                  {content.hero[lang].eyebrow}
                </p>

                <h1
                  data-animate="hero-title"
                  className="text-5xl font-editorial italic leading-[1.1] tracking-[-0.02em] text-white sm:text-6xl lg:text-8xl"
                >
                  {content.hero[lang].title}{" "}
                  <span className="text-accent-green">{content.hero[lang].titleHighlight}</span>
                </h1>

                <p
                  data-animate="hero-subtitle"
                  className="mx-auto max-w-2xl text-lg leading-relaxed text-white/50"
                >
                  {content.hero[lang].subtitle}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            FILTERS
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="border-b border-gray-100 bg-white py-6 sticky top-0 z-20 shadow-sm">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
                {filterButtons.map((filter) => {
                  const isActive = activeFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setActiveFilter(filter.id)}
                      className={`shrink-0 rounded-full border px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? "border-accent-green bg-accent-green text-brand-900 shadow-sm"
                          : "border-gray-200 text-gray-600 hover:border-brand-900 hover:text-brand-900"
                      }`}
                    >
                      {filter.label[lang]}
                    </button>
                  );
                })}
              </div>
              <p className="text-sm text-gray-500">
                {lang === "en" ? "Showing" : "Mostrando"}{" "}
                <span className="text-brand-900 font-semibold">{filteredPhotos.length}</span>{" "}
                {lang === "en" ? "photos" : "fotos"}
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PHOTO GRID — Masonry-style
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-gray-50 py-12 lg:py-20">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  data-animate="gallery-card"
                  className="break-inside-avoid group relative rounded-[24px] overflow-hidden cursor-pointer border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
                  onClick={() => openLightbox(photo)}
                >
                  <div className={`overflow-hidden ${
                    photo.aspect === "portrait" ? "aspect-[3/4]" : photo.aspect === "square" ? "aspect-square" : "aspect-[4/3]"
                  }`}>
                    <img
                      src={photo.src}
                      alt={photo.title[lang]}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <span className="inline-flex self-start px-3 py-1 rounded-full bg-accent-green/20 border border-accent-green/30 text-xs font-bold text-accent-green uppercase tracking-wider mb-3">
                      {filterButtons.find(f => f.id === photo.category)?.label[lang]}
                    </span>
                    <h3 className="text-lg font-bold text-white leading-tight mb-1">
                      {photo.title[lang]}
                    </h3>
                    <p className="text-sm text-white/60">
                      {photo.description[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            CTA
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28 bg-brand-950">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div
              data-animate="cta"
              className="relative rounded-[32px] bg-accent-green px-8 py-20 lg:px-16 lg:py-24 text-center overflow-hidden"
            >
              <div className="absolute right-0 top-0 w-1/3 h-full bg-black/5 -skew-x-12 translate-x-1/4 rounded-[32px]" />
              <div className="relative z-10">
                <Camera className="w-10 h-10 text-brand-900/30 mx-auto mb-6" />
                <h2 className="text-4xl font-editorial italic leading-tight text-brand-900 sm:text-5xl lg:text-6xl mb-6">
                  {content.cta[lang].title}
                </h2>
                <p className="text-xl text-brand-900/60 max-w-2xl mx-auto mb-10">
                  {content.cta[lang].subtitle}
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-2xl bg-brand-900 text-white px-12 py-5 font-bold uppercase tracking-widest text-sm hover:bg-brand-700 transition-colors"
                >
                  {content.cta[lang].button}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />

        {/* ═══════════════════════════════════════════════════════════════════
            LIGHTBOX MODAL
        ═══════════════════════════════════════════════════════════════════ */}
        {lightbox && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-brand-950/95 backdrop-blur-md" />

            {/* Modal */}
            <div
              ref={lightboxRef}
              className="relative w-full max-w-5xl max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Controls */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button
                  onClick={closeLightbox}
                  className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="rounded-[24px] overflow-hidden shadow-2xl">
                <img
                  src={lightbox.src}
                  alt={lightbox.title[lang]}
                  className="w-full max-h-[70vh] object-contain bg-black/50"
                />
              </div>

              {/* Caption */}
              <div className="mt-6 text-center">
                <span className="inline-flex px-3 py-1 rounded-full bg-accent-green/20 border border-accent-green/30 text-xs font-bold text-accent-green uppercase tracking-wider mb-3">
                  {filterButtons.find(f => f.id === lightbox.category)?.label[lang]}
                </span>
                <h3 className="text-xl font-bold text-white mb-1">
                  {lightbox.title[lang]}
                </h3>
                <p className="text-sm text-white/50">
                  {lightbox.description[lang]}
                </p>
                <p className="text-xs text-white/30 mt-3">
                  {filteredPhotos.findIndex(p => p.id === lightbox.id) + 1} / {filteredPhotos.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;
