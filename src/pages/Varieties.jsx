import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { Header } from "../components/Header";
import { SEO } from "../components/SEO";
import { Footer } from "../components/Footer";
import { ArrowRight, X, Coffee, Leaf, Shield, Globe2, Award, CheckCircle2, Handshake, Search, FileCheck, Link2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const filterButtons = [
  { id: "all", label: { en: "All Varieties", pt: "Todas Variedades" } },
  { id: "fine-cup", label: { en: "Fine Cup", pt: "Fine Cup" } },
  { id: "good-cup", label: { en: "Good Cup", pt: "Good Cup" } },
  { id: "rio-minas", label: { en: "Rio Minas", pt: "Rio Minas" } },
  { id: "conilon", label: { en: "Conilon", pt: "Conilon" } },
];

const varietyGallery = [
  { id: 1, category: "fine-cup", title: "NY 2/3 SEMI WASHED 17/18", type: "FINE CUP", region: { en: "Semi Washed • Screen 17/18", pt: "Semi Lavado • Peneira 17/18" }, image: "/photos/grade-cafe.jpg" },
  { id: 2, category: "fine-cup", title: "NY 2/3 SEMI WASHED 14/16", type: "FINE CUP", region: { en: "Semi Washed • Screen 14/16", pt: "Semi Lavado • Peneira 14/16" }, image: "/photos/cafe-cazarini.jpg" },
  { id: 3, category: "fine-cup", title: "NATURAL NY 2/3 CERRADO/MOGIANA 17/18", type: "FINE CUP", region: { en: "Natural • Cerrado/Mogiana • Screen 17/18", pt: "Natural • Cerrado/Mogiana • Peneira 17/18" }, image: "/photos/cafes-cazarini.jpg" },
  { id: 4, category: "fine-cup", title: "NATURAL NY 2/3 CERRADO/MOGIANA 14/16", type: "FINE CUP", region: { en: "Natural • Cerrado/Mogiana • Screen 14/16", pt: "Natural • Cerrado/Mogiana • Peneira 14/16" }, image: "/photos/thiago-cafe.jpg" },
  { id: 5, category: "fine-cup", title: "NATURAL NY 2/3 17/18", type: "FINE CUP", region: { en: "Natural • Screen 17/18", pt: "Natural • Peneira 17/18" }, image: "/photos/experimento-cafe.jpg" },
  { id: 6, category: "fine-cup", title: "NATURAL NY 2/3 14/16", type: "FINE CUP", region: { en: "Natural • Screen 14/16", pt: "Natural • Peneira 14/16" }, image: "/photos/grade-cafe.jpg" },
  { id: 7, category: "fine-cup", title: "NATURAL PEABERRIES (MOKA) 9/10/11", type: "FINE CUP", region: { en: "Natural Peaberries • Screen 9/10/11", pt: "Peaberries Natural • Peneira 9/10/11" }, image: "/photos/cafe-cazarini.jpg" },
  { id: 8, category: "good-cup", title: "NATURAL NY 2/3 17/18", type: "GOOD CUP", region: { en: "Natural • Screen 17/18", pt: "Natural • Peneira 17/18" }, image: "/photos/cafes-cazarini.jpg" },
  { id: 9, category: "good-cup", title: "NATURAL NY 3/4 14/16", type: "GOOD CUP", region: { en: "Natural • Screen 14/16", pt: "Natural • Peneira 14/16" }, image: "/photos/thiago-cafe.jpg" },
  { id: 10, category: "good-cup", title: "NATURAL NY 5/6 GRINDERS 13UP", type: "GOOD CUP", region: { en: "Natural Grinders • Screen 13UP", pt: "Natural Grinders • Peneira 13UP" }, image: "/photos/experimento-cafe.jpg" },
  { id: 11, category: "good-cup", title: "NATURAL NY 5/6 GRINDERS 12UP", type: "GOOD CUP", region: { en: "Natural Grinders • Screen 12UP", pt: "Natural Grinders • Peneira 12UP" }, image: "/photos/grade-cafe.jpg" },
  { id: 12, category: "rio-minas", title: "RIO MINAS 17/18", type: "RIO MINAS", region: { en: "Traditional • Screen 17/18", pt: "Tradicional • Peneira 17/18" }, image: "/photos/cafe-cazarini.jpg" },
  { id: 13, category: "rio-minas", title: "RIO MINAS 15/16", type: "RIO MINAS", region: { en: "Traditional • Screen 15/16", pt: "Tradicional • Peneira 15/16" }, image: "/photos/cafes-cazarini.jpg" },
  { id: 14, category: "rio-minas", title: "RIO MINAS 14/16", type: "RIO MINAS", region: { en: "Traditional • Screen 14/16", pt: "Tradicional • Peneira 14/16" }, image: "/photos/thiago-cafe.jpg" },
  { id: 15, category: "conilon", title: "CONILON 13UP", type: "CONILON", region: { en: "Robusta • Screen 13UP", pt: "Robusta • Peneira 13UP" }, image: "/photos/experimento-cafe.jpg" },
  { id: 16, category: "conilon", title: "CONILON 14UP", type: "CONILON", region: { en: "Robusta • Screen 14UP", pt: "Robusta • Peneira 14UP" }, image: "/photos/grade-cafe.jpg" },
  { id: 17, category: "conilon", title: "CONILON 16UP", type: "CONILON", region: { en: "Robusta • Screen 16UP", pt: "Robusta • Peneira 16UP" }, image: "/photos/cafe-cazarini.jpg" },
];

const categoryDescriptions = {
  "fine-cup": {
    en: "Premium grade with exceptional cup quality. Sourced from select farms in Minas Gerais.",
    pt: "Grau premium com qualidade excepcional de xícara. Proveniente de fazendas selecionadas em Minas Gerais.",
  },
  "good-cup": {
    en: "Reliable quality ideal for commercial blends. Consistent profile from trusted producers.",
    pt: "Qualidade confiável ideal para blends comerciais. Perfil consistente de produtores confiáveis.",
  },
  "rio-minas": {
    en: "Traditional Brazilian profile. Well-suited for markets valuing classic flavors.",
    pt: "Perfil tradicional brasileiro. Ideal para mercados que valorizam sabores clássicos.",
  },
  conilon: {
    en: "Brazilian Robusta with strong body. Excellent for espresso blends and soluble coffee.",
    pt: "Robusta brasileiro com corpo forte. Excelente para blends de espresso e café solúvel.",
  },
};

const getVarietyTags = (variety) => {
  const tags = [];
  if (variety.title.includes("WASHED")) tags.push({ en: "Semi Washed", pt: "Semi Lavado" });
  else if (variety.title.includes("NATURAL")) tags.push({ en: "Natural", pt: "Natural" });
  if (variety.title.includes("PEABERRIES")) tags.push({ en: "Peaberry", pt: "Peaberry" });
  const screenMatch = variety.region.en.match(/Screen\s+([\w/]+)/);
  if (screenMatch) tags.push({ en: `Screen ${screenMatch[1]}`, pt: `Peneira ${screenMatch[1]}` });
  tags.push({ en: "Brazil", pt: "Brasil" });
  return tags;
};

const sourcingFeatures = [
  {
    icon: Handshake,
    title: { en: "Direct Farm Relationships", pt: "Relacionamento Direto com Fazendas" },
    description: { en: "We work directly with over 250 farms across Minas Gerais, ensuring quality from origin.", pt: "Trabalhamos diretamente com mais de 250 fazendas em Minas Gerais, garantindo qualidade desde a origem." },
  },
  {
    icon: Search,
    title: { en: "Full Traceability", pt: "Rastreabilidade Total" },
    description: { en: "Every lot is fully traceable from farm to port, meeting the highest compliance standards.", pt: "Cada lote é totalmente rastreável da fazenda ao porto, atendendo aos mais altos padrões de conformidade." },
  },
  {
    icon: FileCheck,
    title: { en: "International Quality Standards", pt: "Padrões Internacionais de Qualidade" },
    description: { en: "Rigorous cupping and grading processes aligned with SCA and ICO standards.", pt: "Processos rigorosos de degustação e classificação alinhados aos padrões SCA e ICO." },
  },
  {
    icon: Link2,
    title: { en: "Certified Supply Chain", pt: "Cadeia de Fornecimento Certificada" },
    description: { en: "RFA, 4C, Fair Trade, EUDR compliant — certifications our clients trust.", pt: "RFA, 4C, Fair Trade, conformidade EUDR — certificações que nossos clientes confiam." },
  },
];

const certifications = [
  { id: "rfa", name: "RFA", fullName: { en: "Rainforest Alliance", pt: "Rainforest Alliance" }, description: { en: "Environmental, social and economic sustainability certification.", pt: "Certificação de sustentabilidade ambiental, social e econômica." }, icon: Leaf, color: "bg-green-500" },
  { id: "4c", name: "4C", fullName: { en: "Common Code for Coffee Community", pt: "Código Comum para a Comunidade do Café" }, description: { en: "Baseline sustainability standard for coffee production.", pt: "Padrão básico de sustentabilidade para produção de café." }, icon: Globe2, color: "bg-blue-500" },
  { id: "rs", name: "RS", fullName: { en: "Responsible Sourcing", pt: "Fornecimento Responsável" }, description: { en: "Responsible and sustainable sourcing compliance.", pt: "Conformidade de fornecimento responsável e sustentável." }, icon: Shield, color: "bg-purple-500" },
  { id: "eudr", name: "EUDR", fullName: { en: "EUDR Compliance", pt: "Conformidade EUDR" }, description: { en: "Full compliance with EU Deforestation Regulation.", pt: "Conformidade total com o Regulamento de Desmatamento da UE." }, icon: CheckCircle2, color: "bg-amber-500" },
  { id: "fairtrade", name: "Fair Trade", fullName: { en: "Fair Trade Certified", pt: "Comércio Justo Certificado" }, description: { en: "Certification for equitable trading relationships.", pt: "Certificação para relações comerciais equitativas." }, icon: Award, color: "bg-teal-500" },
  { id: "organic", name: "Organic", fullName: { en: "Certified Organic", pt: "Orgânico Certificado" }, description: { en: "Organic production under international standards.", pt: "Produção orgânica sob padrões internacionais." }, icon: Leaf, color: "bg-emerald-500" },
];

export const Varieties = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedVariety, setSelectedVariety] = useState(null);
  const { isPortuguese } = useLanguage();
  const lang = isPortuguese ? "pt" : "en";
  const pageRef = useRef(null);
  const modalRef = useRef(null);

  const openModal = useCallback((variety) => {
    setSelectedVariety(variety);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setSelectedVariety(null);
          document.body.style.overflow = "";
        },
      });
    } else {
      setSelectedVariety(null);
      document.body.style.overflow = "";
    }
  }, []);

  useEffect(() => {
    if (selectedVariety && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [selectedVariety]);

  const filteredVarieties = useMemo(() => {
    if (activeFilter === "all") return varietyGallery;
    return varietyGallery.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from("[data-animate='hero-title']", { y: 40, opacity: 0, duration: 0.9, delay: 0.1 })
      gsap.from("[data-animate='hero-subtitle']", { y: 30, opacity: 0, duration: 0.8, delay: 0.25 })
      gsap.from("[data-animate='hero-stats']", { y: 20, opacity: 0, duration: 0.7, delay: 0.4 })

      // Cards animation
      gsap.utils.toArray("[data-animate='card']").forEach((card, index) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.5,
          delay: 0.05 * (index % 8),
          scrollTrigger: { trigger: card, start: "top 92%" },
        })
      })

      // Certifications
      gsap.utils.toArray("[data-animate='cert']").forEach((cert, index) => {
        gsap.from(cert, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: 0.1 * index,
          scrollTrigger: { trigger: cert, start: "top 88%" },
        })
      })

      // Counter animation
      const counters = pageRef.current.querySelectorAll("[data-counter]");
      counters.forEach((node) => {
        const target = Number(node.getAttribute("data-target"));
        const suffix = node.getAttribute("data-suffix") ?? "";
        if (Number.isNaN(target)) return;
        const state = { value: 0 };
        gsap.to(state, {
          value: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: node, start: "top 80%", once: true },
          onUpdate: () => {
            node.textContent = `${Math.round(state.value)}${suffix}`;
          },
        });
      });

      // Chart bars
      const chartBars = pageRef.current.querySelectorAll("[data-chart-bar]");
      chartBars.forEach((bar, index) => {
        const targetHeight = bar.getAttribute("data-height");
        gsap.fromTo(bar, { height: 0 }, {
          height: targetHeight,
          duration: 0.8,
          delay: 0.15 * index,
          ease: "power2.out",
          scrollTrigger: { trigger: bar, start: "top 90%", once: true },
        });
      });

      // CTA
      gsap.from("[data-animate='cta']", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: "[data-animate='cta']", start: "top 85%" },
      })
    }, pageRef)

    return () => ctx.revert()
  }, [filteredVarieties])

  const content = {
    hero: {
      en: {
        eyebrow: "PREMIUM BRAZILIAN COFFEE",
        title: "17+ Varieties of Excellence",
        subtitle: "From Fine Cup to Conilon, discover our carefully sourced and graded coffees that meet the highest international standards.",
        stats: [
          { value: "17+", label: "Varieties" },
          { value: "4", label: "Categories" },
          { value: "6", label: "Certifications" },
        ],
      },
      pt: {
        eyebrow: "CAFÉ BRASILEIRO PREMIUM",
        title: "17+ Variedades de Excelência",
        subtitle: "De Fine Cup a Conilon, descubra nossos cafés cuidadosamente selecionados e classificados que atendem aos mais altos padrões internacionais.",
        stats: [
          { value: "17+", label: "Variedades" },
          { value: "4", label: "Categorias" },
          { value: "6", label: "Certificações" },
        ],
      },
    },
    certifications: {
      en: {
        eyebrow: "QUALITY ASSURANCE",
        title: "Certified Excellence",
        subtitle: "All our coffees can be sourced with internationally recognized certifications",
      },
      pt: {
        eyebrow: "GARANTIA DE QUALIDADE",
        title: "Excelência Certificada",
        subtitle: "Todos os nossos cafés podem ser fornecidos com certificações reconhecidas internacionalmente",
      },
    },
    cta: {
      en: {
        title: "Find Your Perfect Coffee",
        subtitle: "Contact us to discuss your specific requirements and receive a personalized quote.",
        button: "Request a Quote",
      },
      pt: {
        title: "Encontre Seu Café Perfeito",
        subtitle: "Entre em contato para discutir suas necessidades específicas e receber uma cotação personalizada.",
        button: "Solicitar Cotação",
      },
    },
    sourcing: {
      en: {
        eyebrow: "OUR COMMITMENT",
        title: "Sourcing Standards & Quality",
        subtitle: "Every step of our supply chain is designed to deliver consistent quality and full transparency to our partners worldwide.",
      },
      pt: {
        eyebrow: "NOSSO COMPROMISSO",
        title: "Padrões de Fornecimento e Qualidade",
        subtitle: "Cada etapa da nossa cadeia de fornecimento é projetada para entregar qualidade consistente e total transparência aos nossos parceiros mundiais.",
      },
    },
    showing: { en: "Showing", pt: "Mostrando" },
    varieties: { en: "varieties", pt: "variedades" },
  };

  return (
    <>
      <SEO
        title={lang === "en" ? "Coffee Varieties - Cazarini Coffee Trading" : "Variedades de Café - Cazarini Trading"}
        description={lang === "en"
          ? "Browse 17+ premium Brazilian coffee varieties. Fine Cup, Good Cup, Rio Minas, and Conilon. RFA, 4C, EUDR, and Fair Trade certified options available."
          : "Navegue por mais de 17 variedades premium de café brasileiro. Fine Cup, Good Cup, Rio Minas e Conilon. Opções certificadas RFA, 4C, EUDR e Fair Trade disponíveis."}
        keywords={lang === "en"
          ? "coffee varieties, brazilian coffee, arabica, robusta, fine cup, good cup, rio minas, conilon, coffee certifications"
          : "variedades café, café brasileiro, arábica, robusta, fine cup, good cup, rio minas, conilon, certificações café"}
      />

      <div ref={pageRef} className="bg-white min-h-screen">
        {/* ═══════════════════════════════════════════════════════════════════
            HERO SECTION - Full-width image background
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[60vh] lg:min-h-[70vh] flex flex-col overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/photos/cafes-cazarini.jpg"
              alt="Premium Brazilian Coffee"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/85 to-brand-950/60" />
          </div>

          {/* Glow decorations */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-green rounded-full blur-[128px]" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-lime rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 w-full pt-6">
            {/* Header */}
            <Header variant="dark" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 w-full flex-1 flex items-center pb-20 pt-12">
            <div className="grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-12 items-center w-full">
              {/* Content */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-green mb-4">
                  {content.hero[lang].eyebrow}
                </p>

                <h1 data-animate="hero-title" className="text-balance text-4xl font-editorial leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.5rem] mb-6">
                  {content.hero[lang].title}
                </h1>

                <p data-animate="hero-subtitle" className="text-xl text-white/70 mb-10 max-w-xl">
                  {content.hero[lang].subtitle}
                </p>

                {/* Stats */}
                <div data-animate="hero-stats" className="flex flex-wrap gap-8 lg:gap-12">
                  {content.hero[lang].stats.map((stat, index) => (
                    <div key={index} className="text-center sm:text-left">
                      <p className="text-3xl lg:text-4xl font-bold text-accent-green">{stat.value}</p>
                      <p className="text-sm text-white/50">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating glassmorphism stat card */}
              <div data-animate="hero-stats" className="hidden lg:block">
                <div className="glass-panel bg-white/5 backdrop-blur-md border border-white/10 rounded-[28px] p-8 shadow-2xl">
                  <div className="text-center">
                    <p className="text-7xl font-bold text-white mb-2" data-counter data-target="17" data-suffix="+">0+</p>
                    <p className="text-lg font-semibold text-white/80 mb-1">
                      {lang === "en" ? "Premium Varieties" : "Variedades Premium"}
                    </p>
                    <p className="text-sm text-white/50">
                      {lang === "en" ? "Fine Cup • Good Cup • Rio Minas • Conilon" : "Fine Cup • Good Cup • Rio Minas • Conilon"}
                    </p>
                  </div>
                  <div className="mt-6 grid grid-cols-4 gap-3">
                    {[7, 4, 3, 3].map((count, i) => (
                      <div key={i} className="text-center">
                        <div
                          className="mx-auto w-full rounded-t-lg bg-accent-green"
                          data-chart-bar
                          data-height={`${20 + count * 10}px`}
                          style={{ height: 0 }}
                        />
                        <p className="text-xs text-white/40 mt-2">{count}</p>
                      </div>
                    ))}
                  </div>
                </div>
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
                {content.showing[lang]} <span className="text-brand-900 font-semibold">{filteredVarieties.length}</span> {content.varieties[lang]}
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            VARIETIES GRID
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-gray-50 py-12 lg:py-20">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredVarieties.map((variety) => {
                const tags = getVarietyTags(variety);
                const desc = categoryDescriptions[variety.category];
                return (
                  <article
                    key={variety.id}
                    data-animate="card"
                    className="group flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                    onClick={() => openModal(variety)}
                  >
                    {/* Image */}
                    <div className="h-64 overflow-hidden relative">
                      <img
                        src={variety.image}
                        alt={variety.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6">
                      {/* Category badge */}
                      <span className="inline-flex self-start px-3 py-1 rounded-full bg-accent-green/10 text-accent-green text-xs font-semibold uppercase tracking-wider">
                        {variety.type}
                      </span>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-brand-900 mt-3 mb-1 leading-tight group-hover:text-accent-green transition-colors duration-300">
                        {variety.title}
                      </h3>

                      {/* Origin */}
                      <p className="text-sm text-gray-500 mb-3">{variety.region[lang]}</p>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
                        {desc?.[lang]}
                      </p>

                      {/* Flavor/spec tags */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-full bg-earth-50 text-earth-600 text-xs font-medium"
                          >
                            {tag[lang]}
                          </span>
                        ))}
                      </div>

                      {/* Full-width CTA button */}
                      <button
                        type="button"
                        className="w-full rounded-xl bg-brand-900 text-white py-3 text-sm font-semibold transition-all duration-300 hover:bg-accent-green hover:text-brand-900 flex items-center justify-center gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(variety);
                        }}
                      >
                        {lang === "en" ? "Request Sample" : "Solicitar Amostra"}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SOURCING STANDARDS & QUALITY
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-green mb-4">
                {content.sourcing[lang].eyebrow}
              </p>
              <h2 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-brand-900 sm:text-4xl lg:text-[2.75rem] mb-4">
                {content.sourcing[lang].title}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {content.sourcing[lang].subtitle}
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {sourcingFeatures.map((feature, index) => (
                <div
                  key={index}
                  data-animate="cert"
                  className="group text-center"
                >
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-green/10 text-accent-green transition-all duration-300 group-hover:bg-accent-green group-hover:text-brand-900 group-hover:shadow-lg group-hover:shadow-accent-green/20">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-semibold text-brand-900 mb-2">
                    {feature.title[lang]}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            CERTIFICATIONS SECTION
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            {/* Header */}
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-green mb-4">
                {content.certifications[lang].eyebrow}
              </p>
              <h2 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-brand-900 sm:text-4xl lg:text-[2.75rem] mb-4">
                {content.certifications[lang].title}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {content.certifications[lang].subtitle}
              </p>
            </div>

            {/* Certifications Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  data-animate="cert"
                  className="group relative overflow-hidden rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-accent-green/20"
                >
                  {/* Hover gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-green/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Icon with animated ring */}
                    <div className="relative inline-flex mb-6">
                      <div className={`h-14 w-14 rounded-2xl ${cert.color} flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:scale-110`}>
                        <cert.icon className="w-7 h-7" />
                      </div>
                      {/* Animated ring */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-accent-green/40 scale-100 opacity-0 group-hover:scale-[1.35] group-hover:opacity-100 transition-all duration-600 pointer-events-none" />
                    </div>

                    <h3 className="text-xl font-semibold text-brand-900 mb-2 group-hover:text-accent-green transition-colors duration-300">
                      {cert.fullName[lang]}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {cert.description[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            CTA SECTION
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 py-24 lg:py-32 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-green rounded-full blur-[200px]" />
          </div>

          {/* Floating coffee beans */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <img
                key={i}
                src="/photos/grão.png"
                alt=""
                className="absolute w-8 h-10 opacity-[0.07] animate-float"
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${5 + i * 0.6}s`,
                }}
              />
            ))}
          </div>

          <div data-animate="cta" className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
              <Coffee className="w-4 h-4 text-accent-green" />
              <span className="text-sm font-medium text-white/80">{lang === "en" ? "Get Started" : "Comece Agora"}</span>
            </div>

            <h2 className="text-balance text-3xl font-editorial leading-tight text-white sm:text-4xl lg:text-[2.75rem] mb-6">
              {content.cta[lang].title}
            </h2>

            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
              {content.cta[lang].subtitle}
            </p>

            <a
              href="/#contato"
              className="inline-flex items-center gap-3 rounded-pill bg-accent-green px-8 py-4 text-base font-semibold text-brand-900 transition-all hover:bg-white hover:scale-105 shadow-lg shadow-accent-green/20"
            >
              {content.cta[lang].button}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>

        <Footer />

        {/* ═══════════════════════════════════════════════════════════════════
            VARIETY DETAIL MODAL
        ═══════════════════════════════════════════════════════════════════ */}
        {selectedVariety && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-brand-950/80 backdrop-blur-sm" />

            {/* Modal Content */}
            <div
              ref={modalRef}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-brand-950 rounded-[32px] border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid lg:grid-cols-2">
                {/* Image Side */}
                <div className="relative h-64 lg:h-auto lg:min-h-[500px]">
                  <img
                    src={selectedVariety.image}
                    alt={selectedVariety.title}
                    className="w-full h-full object-cover rounded-t-[32px] lg:rounded-l-[32px] lg:rounded-tr-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-brand-950/40" />
                </div>

                {/* Content Side */}
                <div className="p-8 lg:p-10 space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-accent-green/20 border border-accent-green/30 text-xs font-bold text-accent-green uppercase tracking-wider mb-4">
                      {selectedVariety.type}
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                      {selectedVariety.title}
                    </h2>
                    <p className="text-white/60">
                      {selectedVariety.region[lang]}
                    </p>
                  </div>

                  {/* Specifications */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">
                        {lang === "en" ? "Category" : "Categoria"}
                      </p>
                      <p className="text-sm font-semibold text-white">{selectedVariety.type}</p>
                    </div>
                    <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">
                        {lang === "en" ? "Origin" : "Origem"}
                      </p>
                      <p className="text-sm font-semibold text-white">Brazil</p>
                    </div>
                    <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">
                        {lang === "en" ? "Process" : "Processo"}
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {selectedVariety.title.includes("WASHED")
                          ? lang === "en" ? "Semi Washed" : "Semi Lavado"
                          : lang === "en" ? "Natural" : "Natural"}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">
                        {lang === "en" ? "Certifications" : "Certificações"}
                      </p>
                      <p className="text-sm font-semibold text-white">RFA, 4C, EUDR</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/60 leading-relaxed">
                    {lang === "en"
                      ? "Premium Brazilian coffee carefully sourced from select farms in Minas Gerais. Available with full traceability and international quality certifications. Contact us for current pricing, availability, and sample requests."
                      : "Café brasileiro premium cuidadosamente selecionado de fazendas selecionadas em Minas Gerais. Disponível com rastreabilidade total e certificações internacionais de qualidade. Entre em contato para preços atuais, disponibilidade e solicitações de amostras."}
                  </p>

                  {/* CTA */}
                  <a
                    href="/#contato"
                    className="inline-flex items-center gap-3 w-full justify-center rounded-pill bg-accent-green px-8 py-4 text-base font-semibold text-brand-900 transition-all hover:bg-white hover:scale-[1.02] shadow-lg shadow-accent-green/20"
                  >
                    {lang === "en" ? "Request Quote" : "Solicitar Cotação"}
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Varieties;
