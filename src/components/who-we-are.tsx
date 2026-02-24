import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { MapPin, Award, TrendingUp, Globe2, ShieldCheck } from "lucide-react";
import { Header } from "./Header";
import { SEO } from "./SEO";
import { Footer } from "./Footer";

gsap.registerPlugin(ScrollTrigger);

export const WhoWeAre = () => {
  const { isPortuguese } = useLanguage();
  const lang = isPortuguese ? "pt" : "en";
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from("[data-animate='hero-eyebrow']", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
      });
      gsap.from("[data-animate='hero-title']", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
      });
      gsap.from("[data-animate='hero-subtitle']", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.35,
      });
      gsap.from("[data-animate='hero-image']", {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        delay: 0.4,
      });
      gsap.from("[data-animate='hero-card']", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: 0.6,
      });

      // Stats counter animation
      const counters = document.querySelectorAll("[data-counter]");
      counters.forEach((node) => {
        const target = Number(node.getAttribute("data-target"));
        const suffix = node.getAttribute("data-suffix") ?? "";
        if (Number.isNaN(target)) return;

        const state = { value: 0 };
        gsap.to(state, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: node, start: "top 85%", once: true },
          onUpdate: () => {
            node.textContent = `${Math.round(state.value)}${suffix}`;
          },
        });
      });

      // Scroll-triggered animations
      gsap.utils.toArray("[data-animate='fade-up']").forEach((el: any) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      // Staggered cards
      gsap.utils
        .toArray("[data-animate='stagger']")
        .forEach((container: any) => {
          const items = container.querySelectorAll("[data-stagger-item]");
          gsap.from(items, {
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: container, start: "top 85%" },
          });
        });

      // Timeline items - alternate from left/right
      gsap.utils
        .toArray("[data-timeline-item]")
        .forEach((item: any, index: number) => {
          gsap.from(item, {
            opacity: 0,
            x: index % 2 === 0 ? -60 : 60,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 88%" },
          });
        });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const content = {
    hero: {
      en: {
        eyebrow: "Established in Varginha, MG • Since 2009",
        title: "The bridge between",
        titleHighlight: "Brazilian excellence",
        titleEnd: "and the world",
        subtitle:
          "From the heart of the world's largest coffee trading hub, we've built a network spanning 5 continents, 140+ partners, and 500,000 bags annually.",
      },
      pt: {
        eyebrow: "Estabelecido em Varginha, MG • Desde 2009",
        title: "A ponte entre a",
        titleHighlight: "excelência brasileira",
        titleEnd: "e o mundo",
        subtitle:
          "Do coração do maior polo de comércio de café do mundo, construímos uma rede que abrange 5 continentes, 140+ parceiros e 500.000 sacas anuais.",
      },
    },
    stats: {
      en: [
        {
          number: 21,
          suffix: "+",
          label: "Years in the Industry",
          sublabel: "Since 2009",
        },
        {
          number: 500,
          suffix: "K",
          label: "Bags Traded Annually",
          sublabel: "Growing 15% YoY",
        },
        {
          number: 140,
          suffix: "+",
          label: "Global Partners",
          sublabel: "Across 5 Continents",
        },
      ],
      pt: [
        {
          number: 21,
          suffix: "+",
          label: "Anos na Indústria",
          sublabel: "Desde 2009",
        },
        {
          number: 500,
          suffix: "K",
          label: "Sacas Negociadas/Ano",
          sublabel: "Crescimento 15% a.a.",
        },
        {
          number: 140,
          suffix: "+",
          label: "Parceiros Globais",
          sublabel: "Em 5 Continentes",
        },
      ],
    },
    story: {
      en: {
        label: "OUR STORY",
        title: "Built from the ground up in the coffee capital of the world",
        blocks: [
          {
            title: "The Beginning",
            text: "Cazarini Trading Company was born in Varginha, Minas Gerais—home to the world's largest dry port for coffee exports and the epicenter of Brazilian coffee commerce. What started as a vision has become a global operation recognized across all continents.",
          },
          {
            title: "Our Approach",
            text: "We combine deep market knowledge with meticulous attention to every detail. From contract negotiation to final delivery, we minimize risk and proactively address challenges. Our weekly market reports have become essential reading for industry professionals worldwide.",
          },
          {
            title: "The Difference",
            text: "We don't just trade coffee—we build lasting relationships. Every bag tells the story of quality Brazilian craftsmanship, and every partnership is built on trust, transparency, and mutual growth.",
          },
        ],
      },
      pt: {
        label: "NOSSA HISTÓRIA",
        title: "Construído do zero na capital mundial do café",
        blocks: [
          {
            title: "O Início",
            text: "A Cazarini Trading Company nasceu em Varginha, Minas Gerais—lar do maior porto seco do mundo para exportação de café e epicentro do comércio brasileiro de café. O que começou como uma visão tornou-se uma operação global reconhecida em todos os continentes.",
          },
          {
            title: "Nossa Abordagem",
            text: "Combinamos profundo conhecimento de mercado com atenção meticulosa a cada detalhe. Da negociação de contrato à entrega final, minimizamos riscos e abordamos desafios proativamente. Nossos relatórios semanais de mercado tornaram-se leitura essencial para profissionais da indústria mundialmente.",
          },
          {
            title: "O Diferencial",
            text: "Não apenas comercializamos café—construímos relacionamentos duradouros. Cada saca conta a história da qualidade artesanal brasileira, e cada parceria é construída sobre confiança, transparência e crescimento mútuo.",
          },
        ],
      },
    },
    values: {
      en: {
        label: "WHAT DRIVES US",
        title: "The Principles Behind Every Partnership",
        items: [
          {
            icon: ShieldCheck,
            title: "Risk Management",
            text: "Meticulous focus on every detail until contract fulfillment",
          },
          {
            icon: Globe2,
            title: "Global Reach",
            text: "Operations spanning 5 continents with local expertise",
          },
          {
            icon: TrendingUp,
            title: "Market Intelligence",
            text: "Weekly reports trusted by Bloomberg, WSJ, Reuters",
          },
          {
            icon: Award,
            title: "Quality First",
            text: "Only premium-grade Brazilian and Colombian coffees",
          },
        ],
        motivation:
          "Driven by a passion for excellence and a commitment to sustainable growth, we strive to build bridges between Brazilian coffee producers and the global market, ensuring quality, transparency, and mutual success in every partnership.",
      },
      pt: {
        label: "O QUE NOS MOVE",
        title: "Os Princípios Por Trás de Cada Parceria",
        motivation:
          "Impulsionados pela paixão pela excelência e pelo compromisso com o crescimento sustentável, nos esforçamos para construir pontes entre os produtores de café brasileiros e o mercado global, garantindo qualidade, transparência e sucesso mútuo em cada parceria.",
        items: [
          {
            icon: ShieldCheck,
            title: "Gestão de Riscos",
            text: "Foco meticuloso em cada detalhe até o cumprimento do contrato",
          },
          {
            icon: Globe2,
            title: "Alcance Global",
            text: "Operações em 5 continentes com expertise local",
          },
          {
            icon: TrendingUp,
            title: "Inteligência de Mercado",
            text: "Relatórios semanais confiados por Bloomberg, WSJ, Reuters",
          },
          {
            icon: Award,
            title: "Qualidade Primeiro",
            text: "Apenas cafés premium brasileiros e colombianos",
          },
        ],
      },
    },
    leader: {
      en: {
        label: "LEADERSHIP",
        name: "Thiago Marques Cazarini",
        role: "Founder & Head Coffee Trader",
        bio: "With over 21 years of experience, I lead Cazarini Trading Company, an organization I built from the ground up in 2009, which is now recognized across all continents for its excellence in coffee trading. Cazarini Trading Company masters risk management, export sales, and domestic market acquisitions, always with a detailed eye until the fulfillment of every contract, minimizing risks with proactivity when resolving any eventualities.",
        quote:
          "Every relationship in coffee is built on trust. We're not just moving bags—we're connecting dreams, livelihoods, and cultures across the globe.",
        credentials: [
          "Featured in Bloomberg, Wall Street Journal, Reuters",
          "Fluent in English, Spanish, and Italian",
          "Head Coffee Trader at Montesa Exportadora since 2014",
        ],
      },
      pt: {
        label: "LIDERANÇA",
        name: "Thiago Marques Cazarini",
        role: "Fundador & Head Coffee Trader",
        bio: "Com mais de 21 anos de experiência, lidero a Cazarini Trading Company, uma organização que construí desde o início, em 2009, que hoje é reconhecida em todos os continentes pela excelência em comércio de café. A Cazarini Trading Company domina a gestão de riscos, vendas externas e aquisições no mercado interno, sempre com um olhar atento aos detalhes até o cumprimento de cada contrato, minimizando riscos, com pró atividade quando na solução de eventualidades.",
        quote:
          "Cada relacionamento no café é construído sobre confiança. Não estamos apenas movendo sacas—estamos conectando sonhos, meios de vida e culturas ao redor do globo.",
        credentials: [
          "Destaque em Bloomberg, Wall Street Journal, Reuters",
          "Fluente em Inglês, Espanhol e Italiano",
          "Head Coffee Trader na Montesa Exportadora desde 2014",
        ],
      },
    },
    timeline: {
      en: {
        label: "OUR JOURNEY",
        title: "Milestones That Define Us",
        items: [
          {
            year: "2003",
            title: "Industry Beginnings",
            text: "Thiago Cazarini enters the coffee industry, learning the craft from Brazil's finest trading floors in Varginha, MG.",
          },
          {
            year: "2009",
            title: "Cazarini Trading Founded",
            text: "The company is established in the heart of the world's largest coffee trading hub, with a vision to connect Brazilian excellence to global markets.",
          },
          {
            year: "2014",
            title: "Head Trader at Montesa",
            text: "Thiago takes on the role of Head Coffee Trader at Montesa Exportadora, expanding operations and global partnerships.",
          },
          {
            year: "2018",
            title: "Global Recognition",
            text: "Market insights featured in Bloomberg, Wall Street Journal, and Reuters. The Cazarini name becomes trusted across 5 continents.",
          },
          {
            year: "2024",
            title: "500K Bags Milestone",
            text: "Annual trading volume reaches 500,000 bags with 140+ active partners worldwide and 15% average year-over-year growth.",
          },
        ],
      },
      pt: {
        label: "NOSSA JORNADA",
        title: "Marcos Que Nos Definem",
        items: [
          {
            year: "2003",
            title: "Início na Indústria",
            text: "Thiago Cazarini entra na indústria do café, aprendendo o ofício nos melhores pregões de Varginha, MG.",
          },
          {
            year: "2009",
            title: "Fundação da Cazarini Trading",
            text: "A empresa é estabelecida no coração do maior polo de comércio de café do mundo, com a visão de conectar a excelência brasileira aos mercados globais.",
          },
          {
            year: "2014",
            title: "Head Trader na Montesa",
            text: "Thiago assume o papel de Head Coffee Trader na Montesa Exportadora, expandindo operações e parcerias globais.",
          },
          {
            year: "2018",
            title: "Reconhecimento Global",
            text: "Insights de mercado publicados na Bloomberg, Wall Street Journal e Reuters. O nome Cazarini torna-se confiável em 5 continentes.",
          },
          {
            year: "2024",
            title: "Marco de 500K Sacas",
            text: "Volume anual de negociação atinge 500.000 sacas com 140+ parceiros ativos em todo o mundo e crescimento médio de 15% ao ano.",
          },
        ],
      },
    },
    cta: {
      en: {
        title: "Ready to partner with us?",
        subtitle:
          "Join 140+ partners who trust Cazarini for premium Brazilian coffee.",
        button: "Get in Touch",
      },
      pt: {
        title: "Pronto para ser nosso parceiro?",
        subtitle:
          "Junte-se a mais de 140 parceiros que confiam na Cazarini para café brasileiro premium.",
        button: "Entre em Contato",
      },
    },
  };

  return (
    <>
      <SEO
        title={
          lang === "en"
            ? "About Us - Cazarini Coffee Trading"
            : "Sobre Nós - Cazarini Trading de Café"
        }
        description={
          lang === "en"
            ? "Discover Cazarini Trading Company - 21+ years connecting Brazilian coffee excellence to global markets. 500K bags annually, 140+ partners across 5 continents."
            : "Conheça a Cazarini Trading Company - 21+ anos conectando a excelência do café brasileiro aos mercados globais. 500K sacas anuais, 140+ parceiros em 5 continentes."
        }
        keywords={
          lang === "en"
            ? "coffee broker, coffee trading company, brazilian coffee, Thiago Cazarini, Varginha, coffee brokerage"
            : "corretor café, empresa trading café, café brasileiro, Thiago Cazarini, Varginha, corretagem café"
        }
      />

      <div
        ref={pageRef}
        className="flex flex-col min-h-screen bg-white text-brand-900 font-sans selection:bg-accent-green/30"
      >
        {/* ═══════════════════════════════════════════════════════════════════
            HERO SECTION - Split editorial
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative flex flex-col overflow-hidden bg-brand-950 min-h-[60vh] lg:min-h-[70vh]">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col flex-1 px-4 pt-10 sm:px-6 lg:px-10">
            <Header variant="dark" />
          </div>

          {/* Split layout */}
          <div className="flex flex-col lg:flex-row flex-1">
            {/* Left — Content */}
            <div className="relative z-10 flex flex-col justify-center px-8 py-12 lg:py-16 lg:px-20 xl:px-28 lg:w-[52%] shrink-0">
              {/* Accent rule */}
              <div
                data-animate="hero-eyebrow"
                className="flex items-center gap-4 mb-10"
              >
                <div className="h-px w-10 bg-accent-green" />
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent-green">
                  {content.hero[lang].eyebrow}
                </p>
              </div>

              <h1
                data-animate="hero-title"
                className="text-white text-4xl sm:text-5xl lg:text-[3.5rem] font-editorial italic leading-[1.08] tracking-[-0.02em] mb-6"
              >
                {content.hero[lang].title}
                <br />
                <span className="text-accent-green not-italic">
                  {content.hero[lang].titleHighlight}
                </span>
                <br />
                {content.hero[lang].titleEnd}
              </h1>

              <p
                data-animate="hero-subtitle"
                className="text-white/50 text-lg leading-relaxed max-w-lg mb-12"
              >
                {content.hero[lang].subtitle}
              </p>

              {/* Bottom detail */}
              <div data-animate="hero-card" className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-white/30">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Varginha, MG — Brazil
                  </span>
                </div>
                <div className="h-4 w-px bg-white/10" />
                <span className="text-sm font-medium text-white/30">
                  Est. 2009
                </span>
              </div>
            </div>

            {/* Right — Image panel */}
            <div
              data-animate="hero-image"
              className="relative lg:flex-1 min-h-[50vh] lg:min-h-full"
            >
              <img
                src="/photos/bandeira-cazarini.jpg"
                alt="Cazarini Trading"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Subtle left-edge blend only */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/20 to-transparent lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 to-transparent lg:hidden" />

              {/* Year badge */}
              <div className="absolute bottom-8 right-8 bg-brand-950/80 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4">
                <p className="text-4xl font-bold text-white leading-none">
                  21<span className="text-accent-green">+</span>
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mt-1">
                  {lang === "en" ? "Years of Excellence" : "Anos de Excelência"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            STATS BAR - Compact white row
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div
              data-animate="stagger"
              className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12"
            >
              {[
                ...content.stats[lang],
                {
                  number: 98,
                  suffix: "%",
                  label:
                    lang === "en" ? "Client Retention" : "Retenção de Clientes",
                  sublabel: lang === "en" ? "Year over year" : "Ano após ano",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  data-stagger-item
                  className={`text-center ${index < 3 ? "md:border-r md:border-gray-100" : ""}`}
                >
                  <p className="text-4xl lg:text-5xl font-extrabold text-brand-900 mb-1 tracking-tight">
                    <span
                      data-counter
                      data-target={stat.number}
                      data-suffix={stat.suffix}
                    >
                      0
                    </span>
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            STORY SECTION - Timeline Style
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-32 bg-white">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            {/* Section Header */}
            <div data-animate="fade-up" className="max-w-3xl mb-16 lg:mb-24">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-green mb-4">
                {content.story[lang].label}
              </p>
              <h2 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-brand-900 sm:text-4xl lg:text-[2.75rem]">
                {content.story[lang].title}
              </h2>
            </div>

            {/* Story Grid */}
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left - Image */}
              <div data-animate="fade-up" className="lg:col-span-5">
                <div className="relative sticky top-24">
                  <div className="aspect-[4/5] rounded-[28px] overflow-hidden bg-gray-100 relative">
                    <img
                      src="/photos/brasilemsemenetes.jfif"
                      alt="Coffee beans"
                      className="w-full h-full object-cover transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-950/40 to-transparent" />
                  </div>

                  {/* Floating quote box */}
                  <div className="absolute -bottom-10 -left-6 lg:-left-10 bg-accent-green p-8 lg:p-10 max-w-xs hidden xl:block shadow-xl">
                    <p className="font-editorial italic text-2xl lg:text-3xl leading-tight text-brand-900">
                      {content.leader[lang].quote.split(".")[0]}.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right - Story Blocks */}
              <div className="lg:col-span-7 space-y-12">
                {content.story[lang].blocks.map((block, index) => (
                  <div
                    key={index}
                    data-animate="fade-up"
                    className="relative pl-8 border-l-2 border-gray-100"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-accent-green" />
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-green mb-3">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-2xl font-semibold text-brand-900 mb-4">
                      {block.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-600">
                      {block.text}
                    </p>
                  </div>
                ))}

                {/* Growth highlight */}
                <div
                  data-animate="fade-up"
                  className="bg-brand-950 rounded-[24px] p-8 text-white"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-accent-green flex items-center justify-center shrink-0">
                      <TrendingUp className="w-8 h-8 text-brand-900" />
                    </div>
                    <div>
                      <p className="text-4xl font-bold text-accent-green mb-2">
                        15%
                      </p>
                      <p className="text-lg font-semibold mb-1">
                        {lang === "en"
                          ? "Average Annual Growth"
                          : "Crescimento Médio Anual"}
                      </p>
                      <p className="text-white/60 text-sm">
                        {lang === "en"
                          ? "Consistent growth that speaks to the trust our partners place in us."
                          : "Crescimento consistente que reflete a confiança que nossos parceiros depositam em nós."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            VALUES SECTION - What Drives Us
        ═══════════════════════════════════════════════════════════════════ */}

        {/* ═══════════════════════════════════════════════════════════════════
            LEADERSHIP SECTION
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-12 lg:py-16 bg-white overflow-hidden">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image Side */}
              <div
                data-animate="fade-up"
                className="relative order-2 lg:order-1"
              >
                <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden shadow-2xl">
                  <img
                    src="/photos/thiago-conteiner.jfif"
                    alt="Thiago Cazarini"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/30 to-transparent" />

                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-accent-green font-semibold text-sm uppercase tracking-wider mb-1">
                      {content.leader[lang].role}
                    </p>
                    <h3 className="text-3xl lg:text-4xl font-semibold text-white">
                      {content.leader[lang].name}
                    </h3>
                  </div>
                </div>

                {/* Experience badge */}
                <div className="absolute -top-4 -right-4 lg:-right-8 bg-accent-green rounded-2xl px-6 py-4 shadow-lg">
                  <p className="text-3xl font-bold text-brand-900">21+</p>
                  <p className="text-sm font-medium text-brand-900/70">
                    {lang === "en" ? "Years" : "Anos"}
                  </p>
                </div>
              </div>

              {/* Content Side */}
              <div className="space-y-8 order-1 lg:order-2">
                <div data-animate="fade-up">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-green mb-4">
                    {content.leader[lang].label}
                  </p>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {content.leader[lang].bio}
                  </p>
                </div>

                {/* Quote */}
                <blockquote
                  data-animate="fade-up"
                  className="relative bg-gray-50 rounded-[24px] p-8"
                >
                  <div className="absolute top-6 left-6 text-6xl text-accent-green/20 font-serif leading-none">
                    "
                  </div>
                  <p className="relative text-xl lg:text-2xl font-medium text-brand-900 leading-relaxed italic pl-8">
                    {content.leader[lang].quote}
                  </p>
                </blockquote>

                {/* Credentials */}
                <div data-animate="fade-up" className="space-y-4">
                  {content.leader[lang].credentials.map((credential, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent-green" />
                      <p className="text-gray-600">{credential}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            TIMELINE SECTION - Company Journey (Dark)
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 lg:py-40 bg-brand-950 overflow-hidden">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            {/* Section Header */}
            <div data-animate="fade-up" className="text-center mb-20 lg:mb-32">
              <p className="text-xs font-bold uppercase tracking-[0.4em] text-accent-green mb-6">
                {content.timeline[lang].label}
              </p>
              <h2 className="text-white text-4xl lg:text-5xl font-bold mb-4">
                {content.timeline[lang].title}
              </h2>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Central gradient line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block timeline-line" />
              <div className="absolute left-6 top-0 bottom-0 w-px lg:hidden timeline-line" />

              <div className="space-y-24 lg:space-y-32">
                {content.timeline[lang].items.map((item, index) => (
                  <div
                    key={index}
                    data-timeline-item
                    className={`relative flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Content Card */}
                    <div
                      className={`lg:w-[calc(50%-3rem)] ${
                        index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                      } ml-14 lg:ml-0`}
                    >
                      <span className="text-accent-green text-5xl lg:text-6xl font-light font-editorial mb-4 block">
                        {item.year}
                      </span>
                      <h3 className="text-white text-2xl font-bold mb-4">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {item.text}
                      </p>
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-6 lg:left-1/2 top-2 lg:top-1/2 -translate-x-1/2 lg:-translate-y-1/2 z-10">
                      <div
                        className={`w-3 h-3 rounded-full ${index === 0 ? "bg-accent-green" : "bg-white"} ring-8 ring-white/5`}
                      />
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="hidden lg:block lg:w-[calc(50%-3rem)]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            CTA SECTION - Green inner with dark outer
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28 bg-brand-950">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div
              data-animate="fade-up"
              className="relative rounded-[32px] bg-accent-green px-8 py-20 lg:px-16 lg:py-24 text-center overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute right-0 top-0 w-1/3 h-full bg-black/5 -skew-x-12 translate-x-1/4 rounded-[32px]" />

              <div className="relative z-10">
                <h2 className="text-balance text-4xl font-editorial italic leading-tight text-brand-900 sm:text-5xl lg:text-6xl mb-8 tracking-tight">
                  {content.cta[lang].title}
                </h2>
                <p className="text-xl text-brand-900/60 max-w-2xl mx-auto mb-12">
                  {content.cta[lang].subtitle}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a
                    href="/contact"
                    className="rounded-2xl bg-brand-900 text-white px-12 py-5 font-bold uppercase tracking-widest text-sm hover:bg-brand-700 transition-colors"
                  >
                    {content.cta[lang].button}
                  </a>
                  <a
                    href="/varieties"
                    className="rounded-2xl border border-brand-900/20 bg-white/10 backdrop-blur-md text-brand-900 px-12 py-5 font-bold uppercase tracking-widest text-sm hover:bg-white/20 hover:scale-105 transition-all shadow-lg"
                  >
                    {lang === "en" ? "View Varieties" : "Ver Variedades"}
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
