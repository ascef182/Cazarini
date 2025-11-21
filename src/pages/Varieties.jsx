import React, { useState, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import { BackButton } from "../components/BackButton";
import { SEO } from "../components/SEO";
import { Footer } from "../components/Footer";

const filterButtons = [
  { id: "all", label: { en: "All", pt: "Todos" } },
  { id: "fine-cup", label: { en: "Fine Cup", pt: "Fine Cup" } },
  { id: "good-cup", label: { en: "Good Cup", pt: "Good Cup" } },
  { id: "rio-minas", label: { en: "Rio Minas", pt: "Rio Minas" } },
  { id: "conilon", label: { en: "Conilon", pt: "Conilon" } },
];

const varietyGallery = [
  {
    id: 1,
    category: "fine-cup",
    title: "NY 2/3 SEMI WASHED 17/18",
    type: "FINE CUP",
    region: { en: "Semi Washed • Screen 17/18", pt: "Semi Lavado • Peneira 17/18" },
    image: "/photos/grade-cafe.jpg",
  },
  {
    id: 2,
    category: "fine-cup",
    title: "NY 2/3 SEMI WASHED 14/16",
    type: "FINE CUP",
    region: { en: "Semi Washed • Screen 14/16", pt: "Semi Lavado • Peneira 14/16" },
    image: "/photos/cafe-cazarini.jpg",
  },
  {
    id: 3,
    category: "fine-cup",
    title: "NATURAL NY 2/3 CERRADO/MOGIANA 17/18",
    type: "FINE CUP",
    region: { en: "Natural • Cerrado/Mogiana • Screen 17/18", pt: "Natural • Cerrado/Mogiana • Peneira 17/18" },
    image: "/photos/cafes-cazarini.jpg",
  },
  {
    id: 4,
    category: "fine-cup",
    title: "NATURAL NY 2/3 CERRADO/MOGIANA 14/16",
    type: "FINE CUP",
    region: { en: "Natural • Cerrado/Mogiana • Screen 14/16", pt: "Natural • Cerrado/Mogiana • Peneira 14/16" },
    image: "/photos/thiago-cafe.jpg",
  },
  {
    id: 5,
    category: "fine-cup",
    title: "NATURAL NY 2/3 17/18",
    type: "FINE CUP",
    region: { en: "Natural • Screen 17/18", pt: "Natural • Peneira 17/18" },
    image: "/photos/experimento-cafe.jpg",
  },
  {
    id: 6,
    category: "fine-cup",
    title: "NATURAL NY 2/3 14/16",
    type: "FINE CUP",
    region: { en: "Natural • Screen 14/16", pt: "Natural • Peneira 14/16" },
    image: "/photos/grade-cafe.jpg",
  },
  {
    id: 7,
    category: "fine-cup",
    title: "NATURAL PEABERRIES (MOKA) 9/10/11",
    type: "FINE CUP",
    region: { en: "Natural Peaberries • Screen 9/10/11", pt: "Peaberries Natural • Peneira 9/10/11" },
    image: "/photos/cafe-cazarini.jpg",
  },
  {
    id: 8,
    category: "good-cup",
    title: "NATURAL NY 2/3 17/18",
    type: "GOOD CUP",
    region: { en: "Natural • Screen 17/18", pt: "Natural • Peneira 17/18" },
    image: "/photos/cafes-cazarini.jpg",
  },
  {
    id: 9,
    category: "good-cup",
    title: "NATURAL NY 3/4 14/16",
    type: "GOOD CUP",
    region: { en: "Natural • Screen 14/16", pt: "Natural • Peneira 14/16" },
    image: "/photos/thiago-cafe.jpg",
  },
  {
    id: 10,
    category: "good-cup",
    title: "NATURAL NY 5/6 GRINDERS 13UP",
    type: "GOOD CUP",
    region: { en: "Natural Grinders • Screen 13UP", pt: "Natural Grinders • Peneira 13UP" },
    image: "/photos/experimento-cafe.jpg",
  },
  {
    id: 11,
    category: "good-cup",
    title: "NATURAL NY 5/6 GRINDERS 12UP",
    type: "GOOD CUP",
    region: { en: "Natural Grinders • Screen 12UP", pt: "Natural Grinders • Peneira 12UP" },
    image: "/photos/grade-cafe.jpg",
  },
  {
    id: 12,
    category: "rio-minas",
    title: "RIO MINAS 17/18",
    type: "RIO MINAS",
    region: { en: "Traditional • Screen 17/18", pt: "Tradicional • Peneira 17/18" },
    image: "/photos/cafe-cazarini.jpg",
  },
  {
    id: 13,
    category: "rio-minas",
    title: "RIO MINAS 15/16",
    type: "RIO MINAS",
    region: { en: "Traditional • Screen 15/16", pt: "Tradicional • Peneira 15/16" },
    image: "/photos/cafes-cazarini.jpg",
  },
  {
    id: 14,
    category: "rio-minas",
    title: "RIO MINAS 14/16",
    type: "RIO MINAS",
    region: { en: "Traditional • Screen 14/16", pt: "Tradicional • Peneira 14/16" },
    image: "/photos/thiago-cafe.jpg",
  },
  {
    id: 15,
    category: "conilon",
    title: "CONILON 13UP",
    type: "CONILON",
    region: { en: "Robusta • Screen 13UP", pt: "Robusta • Peneira 13UP" },
    image: "/photos/experimento-cafe.jpg",
  },
  {
    id: 16,
    category: "conilon",
    title: "CONILON 14UP",
    type: "CONILON",
    region: { en: "Robusta • Screen 14UP", pt: "Robusta • Peneira 14UP" },
    image: "/photos/grade-cafe.jpg",
  },
  {
    id: 17,
    category: "conilon",
    title: "CONILON 16UP",
    type: "CONILON",
    region: { en: "Robusta • Screen 16UP", pt: "Robusta • Peneira 16UP" },
    image: "/photos/cafe-cazarini.jpg",
  },
];

const certifications = [
  {
    id: "rfa",
    name: "RFA",
    fullName: { en: "Rainforest Alliance", pt: "Rainforest Alliance" },
    description: {
      en: "Environmental, social and economic sustainability certification.",
      pt: "Certificação de sustentabilidade ambiental, social e econômica.",
    },
    color: "bg-green-600",
  },
  {
    id: "4c",
    name: "4C",
    fullName: { en: "Common Code for Coffee Community", pt: "Código Comum para a Comunidade do Café" },
    description: {
      en: "Baseline sustainability standard for coffee production.",
      pt: "Padrão básico de sustentabilidade para produção de café.",
    },
    color: "bg-blue-600",
  },
  {
    id: "rs",
    name: "RS",
    fullName: { en: "Responsible Sourcing", pt: "Fornecimento Responsável" },
    description: {
      en: "Responsible and sustainable sourcing compliance.",
      pt: "Conformidade de fornecimento responsável e sustentável.",
    },
    color: "bg-purple-600",
  },
  {
    id: "eudr",
    name: "EUDR",
    fullName: { en: "EUDR Compliance", pt: "Conformidade EUDR" },
    description: {
      en: "Compliance with EU Deforestation Regulation.",
      pt: "Conformidade com o Regulamento de Desmatamento da UE.",
    },
    color: "bg-amber-600",
  },
  {
    id: "fairtrade",
    name: "Fair Trade",
    fullName: { en: "Fair Trade", pt: "Comércio Justo" },
    description: {
      en: "Certification for equitable trading relationships.",
      pt: "Certificação para relações comerciais equitativas.",
    },
    color: "bg-teal-600",
  },
  {
    id: "fairtrade-organic",
    name: "Fair Trade Organic",
    fullName: { en: "Fair Trade Organic", pt: "Comércio Justo Orgânico" },
    description: {
      en: "Organic production under Fair Trade certified standards.",
      pt: "Produção orgânica sob padrões certificados de Comércio Justo.",
    },
    color: "bg-emerald-600",
  },
];

export const Varieties = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const { isPortuguese } = useLanguage();
  const lang = isPortuguese ? "pt" : "en";

  const filteredVarieties = useMemo(() => {
    if (activeFilter === "all") return varietyGallery;
    return varietyGallery.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const content = {
    hero: {
      en: {
        title: "Our Coffee Varieties",
        subtitle: "Premium Brazilian coffee, carefully sourced and graded to meet international standards",
      },
      pt: {
        title: "Nossas Variedades de Café",
        subtitle: "Café brasileiro premium, cuidadosamente selecionado e classificado para atender padrões internacionais",
      },
    },
    certifications: {
      en: {
        title: "Our Certifications & Compliance",
        subtitle: "We adhere to the highest international standards for quality, sustainability, and ethical sourcing",
      },
      pt: {
        title: "Nossas Certificações e Conformidade",
        subtitle: "Aderimos aos mais altos padrões internacionais de qualidade, sustentabilidade e fornecimento ético",
      },
    },
  };

  return (
    <>
      <SEO
        title={lang === "en" ? "Coffee Varieties - Cazarini Coffee Trading" : "Variedades de Café - Cazarini Trading"}
        description={lang === "en"
          ? "Browse our selection of 17+ premium Brazilian coffee varieties. Fine Cup, Good Cup, Rio Minas, and Conilon. RFA, 4C, EUDR, and Fair Trade certified."
          : "Navegue por nossa seleção de mais de 17 variedades premium de café brasileiro. Fine Cup, Good Cup, Rio Minas e Conilon. Certificações RFA, 4C, EUDR e Fair Trade."}
        keywords={lang === "en"
          ? "coffee varieties, brazilian coffee, arabica, robusta, fine cup, good cup, coffee certifications"
          : "variedades café, café brasileiro, arábica, robusta, fine cup, good cup, certificações café"}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 py-16 lg:py-24">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="mb-8">
              <BackButton />
            </div>
            <div className="text-center text-white">
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-[-0.02em] sm:text-5xl lg:text-[3.5rem]">
              {content.hero[lang].title}
            </h1>
            <p className="mt-6 text-xl text-white/80">
              {content.hero[lang].subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-[#020609] py-12">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {filterButtons.map((filter) => {
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`shrink-0 rounded-full border px-6 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
                      isActive
                        ? "border-accent-green bg-accent-green text-brand-900 scale-105"
                        : "border-white/20 text-white/80 hover:border-white hover:text-white"
                    }`}
                    aria-pressed={isActive}
                  >
                    {filter.label[lang]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Varieties Grid */}
      <section className="bg-[#020609] py-12 lg:py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredVarieties.map((variety) => (
              <article
                key={variety.id}
                className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
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
                  <p className="text-sm text-white/70">{variety.region[lang]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="mb-16 text-center">
            <h2 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-brand-900 sm:text-4xl lg:text-[2.5rem]">
              {content.certifications[lang].title}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {content.certifications[lang].subtitle}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="group overflow-hidden rounded-[28px] border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${cert.color} text-white shadow-lg`}>
                  <span className="text-2xl font-bold">{cert.name}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-brand-900">
                  {cert.fullName[lang]}
                </h3>
                <p className="mt-3 leading-relaxed text-gray-600">
                  {cert.description[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-4 text-center sm:px-6 lg:px-10">
          <h2 className="text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.5rem]">
            {lang === "en" ? "Interested in Our Coffee?" : "Interessado em Nosso Café?"}
          </h2>
          <p className="mt-4 text-lg text-white/80">
            {lang === "en"
              ? "Contact us to discuss your coffee sourcing needs"
              : "Entre em contato para discutir suas necessidades de café"}
          </p>
          <div className="mt-8">
            <a
              href="/#contato"
              className="inline-flex items-center gap-3 rounded-pill bg-white px-8 py-3 text-sm font-semibold text-brand-900 transition hover:bg-gray-50"
            >
              {lang === "en" ? "Request a Quote" : "Solicitar Cotação"}
            </a>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </>
  );
};

export default Varieties;

