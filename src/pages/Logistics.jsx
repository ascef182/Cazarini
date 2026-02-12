import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { Header } from "../components/Header";
import { SEO } from "../components/SEO";
import { Footer } from "../components/Footer";
import {
  Ship,
  Warehouse,
  FileCheck,
  Globe2,
  ArrowRight,
  ShieldCheck,
  Clock,
  BarChart3,
  Container,
  Truck,
  Anchor,
  CheckCircle2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const content = {
  hero: {
    en: {
      eyebrow: "END-TO-END LOGISTICS",
      title: "From Farm to",
      titleHighlight: "Port",
      subtitle:
        "We manage the entire supply chain so you can focus on what matters — quality coffee and profitable partnerships.",
    },
    pt: {
      eyebrow: "LOGÍSTICA COMPLETA",
      title: "Da Fazenda ao",
      titleHighlight: "Porto",
      subtitle:
        "Gerenciamos toda a cadeia de suprimentos para que você possa focar no que importa — café de qualidade e parcerias lucrativas.",
    },
  },
  stats: [
    {
      value: "500K+",
      label: { en: "Bags Shipped/Year", pt: "Sacas Embarcadas/Ano" },
    },
    {
      value: "30+",
      label: { en: "Destination Countries", pt: "Países de Destino" },
    },
    {
      value: "98%",
      label: { en: "On-Time Delivery", pt: "Entrega no Prazo" },
    },
    {
      value: "24/7",
      label: { en: "Real-Time Tracking", pt: "Rastreamento em Tempo Real" },
    },
  ],
  services: {
    en: {
      eyebrow: "OUR CAPABILITIES",
      title: "Comprehensive Logistics Solutions",
      subtitle:
        "Every step of the journey, handled with precision and care by our experienced operations team.",
    },
    pt: {
      eyebrow: "NOSSAS CAPACIDADES",
      title: "Soluções Logísticas Completas",
      subtitle:
        "Cada etapa da jornada, conduzida com precisão e cuidado pela nossa equipe de operações experiente.",
    },
  },
  serviceItems: [
    {
      icon: Warehouse,
      title: { en: "Warehousing & Storage", pt: "Armazenamento" },
      description: {
        en: "Climate-controlled bonded warehouses in key Brazilian coffee regions. Certified storage ensuring quality preservation from harvest to shipment.",
        pt: "Armazéns climatizados e alfandegados nas principais regiões cafeeiras do Brasil. Armazenamento certificado garantindo preservação da qualidade da colheita ao embarque.",
      },
    },
    {
      icon: Truck,
      title: { en: "Inland Freight", pt: "Frete Terrestre" },
      description: {
        en: "Optimized trucking routes from producing farms and cooperatives to port terminals. GPS-tracked fleet with dedicated coffee containers.",
        pt: "Rotas de transporte otimizadas das fazendas e cooperativas aos terminais portuários. Frota rastreada por GPS com contêineres dedicados para café.",
      },
    },
    {
      icon: Ship,
      title: { en: "Ocean Freight", pt: "Frete Marítimo" },
      description: {
        en: "Preferred rates with major shipping lines. FCL and LCL options through Santos, Rio de Janeiro, and Vitória ports.",
        pt: "Tarifas preferenciais com as principais linhas de navegação. Opções FCL e LCL pelos portos de Santos, Rio de Janeiro e Vitória.",
      },
    },
    {
      icon: FileCheck,
      title: { en: "Documentation & Customs", pt: "Documentação & Alfândega" },
      description: {
        en: "Full export documentation handling — phytosanitary certificates, certificates of origin, bills of lading, and customs clearance.",
        pt: "Gestão completa de documentação de exportação — certificados fitossanitários, certificados de origem, conhecimentos de embarque e desembaraço aduaneiro.",
      },
    },
    {
      icon: ShieldCheck,
      title: { en: "Quality Control", pt: "Controle de Qualidade" },
      description: {
        en: "Pre-shipment inspections, cupping sessions, and sample verification at every transfer point. SCA-certified Q-Graders on staff.",
        pt: "Inspeções pré-embarque, sessões de cupping e verificação de amostras em cada ponto de transferência. Q-Graders certificados SCA na equipe.",
      },
    },
    {
      icon: Globe2,
      title: { en: "Trade Finance", pt: "Financiamento Comercial" },
      description: {
        en: "Letters of credit management, trade insurance, and flexible payment terms. Risk mitigation strategies for international transactions.",
        pt: "Gestão de cartas de crédito, seguro de comércio e condições flexíveis de pagamento. Estratégias de mitigação de riscos para transações internacionais.",
      },
    },
  ],
  process: {
    en: {
      eyebrow: "THE JOURNEY",
      title: "How Your Coffee Moves",
      subtitle: "A transparent, traceable journey from origin to destination.",
    },
    pt: {
      eyebrow: "A JORNADA",
      title: "Como Seu Café se Move",
      subtitle: "Uma jornada transparente e rastreável da origem ao destino.",
    },
  },
  processSteps: [
    {
      number: "01",
      title: { en: "Sourcing & Purchase", pt: "Sourcing & Compra" },
      description: {
        en: "Beans sourced from vetted farms across Brazil's top regions. Contracts negotiated, samples approved.",
        pt: "Grãos adquiridos de fazendas verificadas nas melhores regiões do Brasil. Contratos negociados, amostras aprovadas.",
      },
      icon: CheckCircle2,
    },
    {
      number: "02",
      title: { en: "Quality Assessment", pt: "Avaliação de Qualidade" },
      description: {
        en: "SCA cupping scores, defect count analysis, moisture testing. Only lots meeting spec move forward.",
        pt: "Avaliação SCA de cupping, análise de defeitos, teste de umidade. Somente lotes dentro da especificação avançam.",
      },
      icon: BarChart3,
    },
    {
      number: "03",
      title: { en: "Warehousing", pt: "Armazenamento" },
      description: {
        en: "Stored in climate-controlled, bonded warehouses. Lot tracking and inventory management in real time.",
        pt: "Armazenado em armazéns climatizados e alfandegados. Rastreamento de lotes e gestão de estoque em tempo real.",
      },
      icon: Container,
    },
    {
      number: "04",
      title: { en: "Inland Transport", pt: "Transporte Terrestre" },
      description: {
        en: "Dedicated trucks move coffee to port. GPS tracking ensures visibility from warehouse to terminal.",
        pt: "Caminhões dedicados transportam o café ao porto. Rastreamento GPS garante visibilidade do armazém ao terminal.",
      },
      icon: Truck,
    },
    {
      number: "05",
      title: { en: "Port & Customs", pt: "Porto & Alfândega" },
      description: {
        en: "Container stuffing, phytosanitary inspections, and export customs clearance at Brazil's main ports.",
        pt: "Estufagem de contêiner, inspeções fitossanitárias e desembaraço aduaneiro nos principais portos do Brasil.",
      },
      icon: Anchor,
    },
    {
      number: "06",
      title: { en: "Ocean Freight & Delivery", pt: "Frete Marítimo & Entrega" },
      description: {
        en: "Vessel booking, bill of lading, and real-time sailing tracking until delivery at destination port.",
        pt: "Reserva de navio, conhecimento de embarque e rastreamento em tempo real até a entrega no porto de destino.",
      },
      icon: Ship,
    },
  ],
  ports: {
    en: {
      eyebrow: "COVERAGE",
      title: "Port Network & Routes",
      subtitle:
        "Direct access to Brazil's major coffee export ports with established shipping routes to every continent.",
    },
    pt: {
      eyebrow: "COBERTURA",
      title: "Rede Portuária & Rotas",
      subtitle:
        "Acesso direto aos principais portos de exportação de café do Brasil com rotas estabelecidas para todos os continentes.",
    },
  },
  portsList: [
    { name: "Santos, SP", highlight: true, desc: { en: "Primary hub — 60% of Brazil's coffee exports", pt: "Hub principal — 60% das exportações de café do Brasil" } },
    { name: "Rio de Janeiro, RJ", highlight: false, desc: { en: "Secondary port for specialty lots", pt: "Porto secundário para lotes especiais" } },
    { name: "Vitória, ES", highlight: false, desc: { en: "Key port for Conilon/Robusta", pt: "Porto chave para Conilon/Robusta" } },
    { name: "Paranaguá, PR", highlight: false, desc: { en: "Southern Brazil access point", pt: "Ponto de acesso do Sul do Brasil" } },
  ],
  cta: {
    en: {
      title: "Ready to Ship?",
      subtitle:
        "Let our logistics team handle the complexity. Get a custom quote for your next shipment.",
      button: "Get a Quote",
      secondary: "View Services",
    },
    pt: {
      title: "Pronto para Embarcar?",
      subtitle:
        "Deixe nossa equipe logística cuidar da complexidade. Solicite uma cotação personalizada para seu próximo embarque.",
      button: "Solicitar Cotação",
      secondary: "Ver Serviços",
    },
  },
};

export const Logistics = () => {
  const { isPortuguese } = useLanguage();
  const lang = isPortuguese ? "pt" : "en";
  const sectionRef = useRef(null);

  useEffect(() => {
    // Force a refresh to ensure positions are correct after render
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('[data-animate="hero-eyebrow"]', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
      );
      gsap.fromTo('[data-animate="hero-title"]', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.4 }
      );
      gsap.fromTo('[data-animate="hero-subtitle"]', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.6 }
      );

      // Stats counter animation
      gsap.fromTo('[data-animate="stat"]', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.8 }
      );

      // Scroll-triggered sections
      gsap.utils.toArray('[data-animate="fade-up"]').forEach((el) => {
        gsap.fromTo(el, 
          { y: 60, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            }
          }
        );
      });

      // Service cards stagger
      gsap.fromTo('[data-animate="service-card"]', 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      );

      // Process steps stagger
      gsap.fromTo('[data-animate="process-step"]', 
        { x: -40, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".process-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <SEO
        title={
          lang === "en"
            ? "Logistics - Cazarini Coffee Trading"
            : "Logística - Cazarini Trading de Café"
        }
        description={
          lang === "en"
            ? "End-to-end coffee logistics: warehousing, inland freight, ocean shipping, customs, and documentation. From Brazilian farms to global ports."
            : "Logística completa de café: armazenamento, frete terrestre, transporte marítimo, alfândega e documentação. Das fazendas brasileiras aos portos globais."
        }
        keywords={
          lang === "en"
            ? "coffee logistics, coffee shipping, coffee export brazil, coffee warehouse, coffee freight"
            : "logística café, embarque café, exportação café brasil, armazém café, frete café"
        }
      />

      <div ref={sectionRef} className="bg-brand-950 min-h-screen">
        {/* ═══════════════════════════════════════════════════════════════════
            HERO - Dark cinematic
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[90vh] flex flex-col overflow-hidden">
          <img
            src="/photos/container-de-cafe.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/70 via-brand-950/50 to-brand-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/60 to-transparent" />

          <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col flex-1 px-4 pt-10 sm:px-6 lg:px-10">
            <Header variant="dark" />

            <div className="flex flex-1 items-center justify-center text-center py-20">
              <div className="max-w-4xl space-y-8">
                <p
                  data-animate="hero-eyebrow"
                  className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent-green"
                >
                  <Ship className="w-4 h-4" />
                  {content.hero[lang].eyebrow}
                </p>

                <h1
                  data-animate="hero-title"
                  className="text-5xl font-editorial italic leading-[1.1] tracking-[-0.02em] text-white sm:text-6xl lg:text-8xl"
                >
                  {content.hero[lang].title}{" "}
                  <span className="text-accent-green">
                    {content.hero[lang].titleHighlight}
                  </span>
                </h1>

                <p
                  data-animate="hero-subtitle"
                  className="mx-auto max-w-2xl text-lg leading-relaxed text-white/50"
                >
                  {content.hero[lang].subtitle}
                </p>

                <div data-animate="hero-subtitle" className="flex flex-wrap gap-4 justify-center pt-4">
                  <a
                    href="/contact"
                    className="rounded-2xl bg-accent-green text-brand-900 px-10 py-4 font-bold text-sm uppercase tracking-widest hover:scale-[1.03] transition-transform"
                  >
                    {content.cta[lang].button}
                  </a>
                  <a
                    href="#services"
                    className="rounded-2xl border border-white/20 text-white px-10 py-4 font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
                  >
                    {content.cta[lang].secondary}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom stats bar */}
          <div className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-md">
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
                {content.stats.map((stat, i) => (
                  <div
                    key={i}
                    data-animate="stat"
                    className="py-8 px-6 text-center"
                  >
                    <p className="text-3xl lg:text-4xl font-bold text-accent-green mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                      {stat.label[lang]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SERVICES GRID
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="services" className="py-24 lg:py-32 bg-white">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div data-animate="fade-up" className="text-center mb-16 lg:mb-20">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-green mb-4">
                {content.services[lang].eyebrow}
              </p>
              <h2 className="text-4xl font-editorial italic leading-tight text-brand-900 sm:text-5xl mb-6">
                {content.services[lang].title}
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                {content.services[lang].subtitle}
              </p>
            </div>

            <div className="services-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content.serviceItems.map((service, i) => (
                <div
                  key={i}
                  data-animate="service-card"
                  className="group relative rounded-3xl border border-gray-100 bg-white p-8 lg:p-10 hover:shadow-xl hover:shadow-brand-900/5 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="mb-6 w-14 h-14 rounded-2xl bg-brand-950 flex items-center justify-center group-hover:bg-accent-green transition-colors duration-300">
                    <service.icon className="w-6 h-6 text-white group-hover:text-brand-900 transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-900 mb-3">
                    {service.title[lang]}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    {service.description[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PROCESS TIMELINE
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 lg:py-32 bg-brand-950 relative overflow-hidden">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03] pattern-grid" />

          <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div data-animate="fade-up" className="text-center mb-16 lg:mb-20">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-green mb-4">
                {content.process[lang].eyebrow}
              </p>
              <h2 className="text-4xl font-editorial italic leading-tight text-white sm:text-5xl mb-6">
                {content.process[lang].title}
              </h2>
              <p className="text-lg text-white/40 max-w-2xl mx-auto">
                {content.process[lang].subtitle}
              </p>
            </div>

            <div className="process-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content.processSteps.map((step, i) => (
                <div
                  key={i}
                  data-animate="process-step"
                  className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-accent-green/30 hover:bg-white/10 transition-all duration-500"
                >
                  <div className="flex items-start gap-5">
                    <span className="shrink-0 text-5xl font-editorial italic text-accent-green/20 group-hover:text-accent-green/50 transition-colors">
                      {step.number}
                    </span>
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-accent-green/10 flex items-center justify-center mb-4">
                        <step.icon className="w-5 h-5 text-accent-green" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {step.title[lang]}
                      </h3>
                      <p className="text-sm text-white/40 leading-relaxed">
                        {step.description[lang]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PORT NETWORK
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 lg:py-32 bg-gray-50">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div data-animate="fade-up">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-green mb-4">
                  {content.ports[lang].eyebrow}
                </p>
                <h2 className="text-4xl font-editorial italic leading-tight text-brand-900 sm:text-5xl mb-6">
                  {content.ports[lang].title}
                </h2>
                <p className="text-lg text-gray-500 mb-12">
                  {content.ports[lang].subtitle}
                </p>

                <div className="space-y-4">
                  {content.portsList.map((port, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-4 rounded-2xl p-5 transition-all ${
                        port.highlight
                          ? "bg-brand-950 text-white"
                          : "bg-white border border-gray-100"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          port.highlight
                            ? "bg-accent-green text-brand-900"
                            : "bg-gray-100 text-brand-900"
                        }`}
                      >
                        <Anchor className="w-5 h-5" />
                      </div>
                      <div>
                        <h4
                          className={`font-bold ${
                            port.highlight ? "text-white" : "text-brand-900"
                          }`}
                        >
                          {port.name}
                        </h4>
                        <p
                          className={`text-sm ${
                            port.highlight ? "text-white/60" : "text-gray-500"
                          }`}
                        >
                          {port.desc[lang]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map / Image side */}
              <div data-animate="fade-up" className="relative">
                <div className="aspect-square rounded-[32px] overflow-hidden bg-brand-950 relative">
                  <img
                    src="/photos/What is a Q Grader_.jfif"
                    className="w-full h-full object-cover opacity-60"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/30 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full bg-accent-green animate-pulse" />
                      <span className="text-accent-green text-sm font-semibold uppercase tracking-wider">
                        {lang === "en" ? "Live Operations" : "Operações ao Vivo"}
                      </span>
                    </div>
                    <p className="text-white text-2xl font-bold mb-1">
                      Santos, SP
                    </p>
                    <p className="text-white/50 text-sm">
                      {lang === "en"
                        ? "Brazil's largest coffee export terminal"
                        : "Maior terminal de exportação de café do Brasil"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            CTA - Green inner, dark outer (matching About CTA pattern)
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28 bg-brand-950">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div
              data-animate="fade-up"
              className="relative rounded-[32px] bg-accent-green px-8 py-20 lg:px-16 lg:py-24 text-center overflow-hidden"
            >
              <div className="absolute right-0 top-0 w-1/3 h-full bg-black/5 -skew-x-12 translate-x-1/4 rounded-[32px]" />

              <div className="relative z-10">
                <Clock className="w-10 h-10 text-brand-900/30 mx-auto mb-6" />
                <h2 className="text-4xl font-editorial italic leading-tight text-brand-900 sm:text-5xl lg:text-6xl mb-6">
                  {content.cta[lang].title}
                </h2>
                <p className="text-xl text-brand-900/60 max-w-2xl mx-auto mb-10">
                  {content.cta[lang].subtitle}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a
                    href="/contact"
                    className="rounded-2xl bg-brand-900 text-white px-12 py-5 font-bold uppercase tracking-widest text-sm hover:bg-brand-700 transition-colors flex items-center gap-3"
                  >
                    {content.cta[lang].button}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="/varieties"
                    className="rounded-2xl border-2 border-brand-900 text-brand-900 px-12 py-5 font-bold uppercase tracking-widest text-sm hover:bg-brand-900 hover:text-white transition-all"
                  >
                    {content.cta[lang].secondary}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Logistics;
