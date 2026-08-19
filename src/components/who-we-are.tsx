import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { MapPin, Award, TrendingUp, Globe2, ShieldCheck } from "lucide-react";
import { Header } from "./Header";
import { SEO } from "./SEO";
import { Footer } from "./Footer";
import TeamSectionC from "./TeamSectionC";
import { buildBreadcrumbJsonLd } from "../utils/seoSchemas";

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
        eyebrow: "Established in Brazil",
        title: "17 years trading",
        titleHighlight: "Brazilian coffee",
        titleEnd: "to global markets",
        subtitle:
          "From the heart of the world's largest coffee trading hub, we've built a network spanning all continents.",
      },
      pt: {
        eyebrow: "Estabelecido no Brasil",
        title: "17 anos negociando",
        titleHighlight: "café brasileiro",
        titleEnd: "para o mundo",
        subtitle:
          "Do coração do maior polo de comércio de café do mundo, construímos uma rede que abrange todos os continentes",
      },
    },
    story: {
      en: {
        label: "OUR STORY",
        title: "Built from scratch in the coffee capital of the world",
        blocks: [
          {
            title: "The Beginning",
            text: "Cazarini Trading Company was born in Varginha, Minas Gerais—home to the world's largest coffee hub and epicenter of Brazilian coffee commerce. What started as a vision has become a global operation recognized across all continents.",
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
            text: "Only high-grade Brazilian coffees",
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
            text: "Apenas cafés de alta qualidade brasileiros e colombianos",
          },
        ],
      },
    },
    leader: {
      en: {
        label: "LEADERSHIP",
        name: "Thiago Marques Cazarini",
        role: "Founder & Head Coffee Trader",
        bio: "With over 21 years of experience, I lead Cazarini Trading Company, an organization I built from scratch in 2009, which is now recognized across all continents for its excellence in coffee trading. Cazarini Trading Company masters risk management, export sales, and domestic market acquisitions, always with a detailed eye until the fulfillment of every contract, minimizing risks with proactivity when resolving any eventualities.",
        quote:
          "Every relationship in coffee is built on trust, transparency. We're not just moving bags—we're connecting visions, strategies, solutions.",
        credentials: [],
      },
      pt: {
        label: "LIDERANÇA",
        name: "Thiago Marques Cazarini",
        role: "Fundador & Head Coffee Trader",
        bio: "Com mais de 21 anos de experiência, lidero a Cazarini Trading Company, uma organização que construí desde o início, em 2009, que hoje é reconhecida em todos os continentes pela excelência em comércio de café. A Cazarini Trading Company domina a gestão de riscos, vendas externas e aquisições no mercado interno, sempre com um olhar atento aos detalhes até o cumprimento de cada contrato, minimizando riscos, com pró atividade quando na solução de eventualidades.",
        quote:
          "Cada relacionamento no café é construído sobre confiança, transparência. Não estamos apenas movendo sacas—estamos conectando visões, estratégias, soluções.",
        credentials: [],
      },
    },
    team: {
      en: {
        label: "OUR TEAM",
        title: "The logistics behind every shipment",
        subtitle:
          "Two specialists keeping every bag in motion — across origins, deadlines and partners around the world.",
        duoPhoto: "/photos/team/PamelaELucimara.jpg",
        duoPhotoAlt: "/photos/team/pamelaElucimara2.jpg",
        departmentTag: "Logistics Department",
        members: [
          {
            name: "Pâmela Benetório",
            role: "Logistics Coordinator",
            photo: "/photos/team/pamela1.jpg",
            photoAlt: "/photos/team/pamela2.jpg",
            quote: "Logistics is taking care of the details the clients might miss",
            bio: "Tracks each shipment from warehouse to port departure — making sure the right coffee reaches the right container on the agreed day.",
          },
          {
            name: "Lucimara Montovani",
            role: "Logistics Coordinator",
            photo: "/photos/team/lucimara1.jpg",
            photoAlt: "/photos/team/lucimara2.jpg",
            quote: "Trust is built one delivered deadline at a time.",
            bio: "Owns customs documentation and deadline compliance for every operation. Every form in place is one less border between the coffee and its destination.",
          },
        ],
      },
      pt: {
        label: "NOSSA EQUIPE",
        title: "A logística por trás de cada embarque",
        subtitle:
          "Duas profissionais que mantêm cada saca em movimento — entre origens, prazos e parceiros ao redor do mundo.",
        duoPhoto: "/photos/team/PamelaELucimara.jpg",
        duoPhotoAlt: "/photos/team/pamelaElucimara2.jpg",
        departmentTag: "Departamento de Logística",
        members: [
          {
            name: "Pâmela Benetório",
            role: "Coordenadora de Logística",
            photo: "/photos/team/pamela1.jpg",
            photoAlt: "/photos/team/pamela2.jpg",
            quote: "Logística é cuidar dos detalhes que os clientes podem deixar passar",
            bio: "Acompanha cada embarque do armazém até a saída do porto — garantindo que o café certo chega no contêiner certo, no dia combinado.",
          },
          {
            name: "Lucimara Montovani",
            role: "Coordenadora de Logística",
            photo: "/photos/team/lucimara1.jpg",
            photoAlt: "/photos/team/lucimara2.jpg",
            quote: "Confiança se constrói no prazo cumprido.",
            bio: "Conduz a documentação aduaneira e o cumprimento de prazos de cada operação. Cada papel no lugar certo é uma fronteira a menos no caminho do café.",
          },
        ],
      },
    },
    cta: {
      en: {
        title: "Ready to partner with us?",

        button: "Get in Touch",
      },
      pt: {
        title: "Pronto para ser nosso parceiro?",
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
            ? "Discover Cazarini Trading Company - 98% client retention, connecting Brazilian coffee excellence to global markets."
            : "Conheça a Cazarini Trading Company - 98% de retenção de clientes, conectando a excelência do café brasileiro aos mercados globais."
        }
        keywords={
          lang === "en"
            ? "coffee broker, coffee trading company, brazilian coffee, Thiago Cazarini, Varginha, coffee brokerage"
            : "corretor café, empresa trading café, café brasileiro, Thiago Cazarini, Varginha, corretagem café"
        }
        jsonLd={buildBreadcrumbJsonLd([
          { name: lang === "en" ? "Home" : "Início", path: "/" },
          { name: lang === "en" ? "Who We Are" : "Quem Somos", path: lang === "en" ? "/who-we-are" : "/quem-somos" },
        ])}
      />

      <div
        ref={pageRef}
        className="flex flex-col min-h-screen bg-white text-brand-900 font-sans selection:bg-accent-green/30"
      >
        {/* ═══════════════════════════════════════════════════════════════════
            HERO SECTION - Split editorial
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative flex flex-col bg-brand-950 min-h-[60vh] lg:min-h-[70vh]">
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
                    Varginha, MG  
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
                  98<span className="text-accent-green">%</span>
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mt-1">
                  {lang === "en" ? "Client Retention" : "Retenção de Clientes"}
                </p>
              </div>
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
                    src="/photos/team/thiagocazarini.jpeg"
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
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            TEAM SECTION — Circular Portraits
        ═══════════════════════════════════════════════════════════════════ */}
        <TeamSectionC content={content} lang={lang} />

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
                  <Link
                    to="/contact"
                    className="rounded-2xl bg-brand-900 text-white px-12 py-5 font-bold uppercase tracking-widest text-sm hover:bg-brand-700 transition-colors"
                  >
                    {content.cta[lang].button}
                  </Link>
                  <Link
                    to={lang === "en" ? "/qualities" : "/qualidades"}
                    className="rounded-2xl border border-brand-900/20 bg-white/10 backdrop-blur-md text-brand-900 px-12 py-5 font-bold uppercase tracking-widest text-sm hover:bg-white/20 hover:scale-105 transition-all shadow-lg"
                  >
                    {lang === "en" ? "View Qualities" : "Ver Qualidades"}
                  </Link>
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
