import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { Header } from "../components/Header";
import { SEO } from "../components/SEO";
import { Footer } from "../components/Footer";
import {
  ArrowRight,
  Clock,
  Calendar,
  TrendingUp,
  Newspaper,
  BarChart3,
  Lightbulb,
  Mail,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    id: 1,
    slug: "how-coffee-broker-boosts-business",
    category: { en: "Business", pt: "Negócios" },
    categoryIcon: TrendingUp,
    title: {
      en: "How a Coffee Broker Can Boost Your Business",
      pt: "Como um Corretor de Café Pode Impulsionar Seu Negócio",
    },
    excerpt: {
      en: "We connect your coffee directly with trusted buyers and exporters, ensuring fast pricing, approvals, and execution. Learn how strategic brokerage partnerships can transform your operations.",
      pt: "Conectamos seu café diretamente com compradores e exportadores confiáveis, garantindo precificação, aprovações e execução rápidas. Descubra como parcerias estratégicas de corretagem podem transformar suas operações.",
    },
    date: "2025-01-15",
    readTime: "5 min",
    image: "/photos/experimento-cafe.jpg",
    author: "Thiago Cazarini",
    featured: true,
  },
  {
    id: 2,
    slug: "latest-market-trends-global-coffee",
    category: { en: "Market Insights", pt: "Insights de Mercado" },
    categoryIcon: BarChart3,
    title: {
      en: "The Latest Market Trends in Global Coffee Trading",
      pt: "As Últimas Tendências de Mercado no Comércio Global de Café",
    },
    excerpt: {
      en: "From specialty coffee demand to climate impacts on harvest, we analyze the key drivers shaping today's global coffee trade and what they mean for your business.",
      pt: "Da demanda por café especial aos impactos climáticos na colheita, analisamos os principais impulsionadores que moldam o comércio global de café e o que significam para o seu negócio.",
    },
    date: "2025-01-10",
    readTime: "7 min",
    image: "/photos/seca-do-cafe.jpg",
    author: "Thiago Cazarini",
    featured: false,
  },
  {
    id: 3,
    slug: "maximizing-profitability-coffee-brokerage",
    category: { en: "Strategy", pt: "Estratégia" },
    categoryIcon: Lightbulb,
    title: {
      en: "Maximizing Profitability with the Right Coffee Brokerage Partner",
      pt: "Maximizando a Lucratividade com o Parceiro de Corretagem de Café Certo",
    },
    excerpt: {
      en: "Discover how strategic brokerage partnerships provide leverage, market intelligence, and negotiation power to drive better margins and sustainable growth.",
      pt: "Descubra como parcerias estratégicas de corretagem fornecem alavancagem, inteligência de mercado e poder de negociação para impulsionar melhores margens e crescimento sustentável.",
    },
    date: "2025-01-05",
    readTime: "6 min",
    image: "/photos/ciclo-cafe.jpg",
    author: "Thiago Cazarini",
    featured: false,
  },
];

const popularTags = [
  { en: "Coffee Trading", pt: "Trading de Café" },
  { en: "Market Analysis", pt: "Análise de Mercado" },
  { en: "Brazilian Coffee", pt: "Café Brasileiro" },
  { en: "Sustainability", pt: "Sustentabilidade" },
  { en: "Export", pt: "Exportação" },
  { en: "Quality Control", pt: "Controle de Qualidade" },
  { en: "Specialty Coffee", pt: "Café Especial" },
  { en: "Supply Chain", pt: "Cadeia de Suprimentos" },
];

const featuredInLogos = [
  { name: "Bloomberg", src: "/photos/bloomberg.png" },
  { name: "Wall Street Journal", src: "/photos/wsj-logo.png" },
  { name: "Reuters", src: "/photos/reuters.png" },
  { name: "Valor Econômico", src: "/photos/valorecomnomico.png" },
  { name: "Globo Rural", src: "/photos/globo_rural-removebg-preview.png" },
];

export const Blog = () => {
  const { isPortuguese } = useLanguage();
  const lang = isPortuguese ? "pt" : "en";
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from("[data-animate='hero-title']", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.1,
      });
      gsap.from("[data-animate='hero-subtitle']", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.25,
      });
      gsap.from("[data-animate='hero-stats']", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        delay: 0.4,
      });

      // Featured card
      gsap.from("[data-animate='featured']", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        delay: 0.3,
      });

      // Grid cards stagger
      gsap.utils.toArray("[data-animate='card']").forEach((card, index) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          delay: 0.1 * index,
          scrollTrigger: { trigger: card, start: "top 90%" },
        });
      });

      // Newsletter section
      gsap.from("[data-animate='newsletter']", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: "[data-animate='newsletter']",
          start: "top 85%",
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const content = {
    hero: {
      en: {
        eyebrow: "INSIGHTS & ANALYSIS",
        title: "Coffee Market Intelligence",
        subtitle:
          "Expert analysis, market trends, and industry insights from 21+ years of experience in global coffee trading.",
        stats: [
          { value: "Weekly", label: "Market Reports" },
          { value: "21+", label: "Years of Expertise" },
          { value: "Global", label: "Market Coverage" },
        ],
      },
      pt: {
        eyebrow: "INSIGHTS E ANÁLISES",
        title: "Inteligência do Mercado de Café",
        subtitle:
          "Análises especializadas, tendências de mercado e insights da indústria com base em 21+ anos de experiência no comércio global de café.",
        stats: [
          { value: "Semanal", label: "Relatórios de Mercado" },
          { value: "21+", label: "Anos de Expertise" },
          { value: "Global", label: "Cobertura de Mercado" },
        ],
      },
    },
    newsletter: {
      en: {
        title: "Get Weekly Market Reports",
        subtitle:
          "Join 140+ partners who receive our market intelligence directly in their inbox.",
        placeholder: "Your email address",
        button: "Subscribe",
        trust: "Trusted by professionals from Bloomberg, WSJ, and Reuters",
      },
      pt: {
        title: "Receba Relatórios Semanais",
        subtitle:
          "Junte-se a mais de 140 parceiros que recebem nossa inteligência de mercado diretamente em seu email.",
        placeholder: "Seu endereço de email",
        button: "Inscrever-se",
        trust: "Confiado por profissionais da Bloomberg, WSJ e Reuters",
      },
    },
    readMore: { en: "Read Article", pt: "Ler Artigo" },
    featured: { en: "Featured", pt: "Destaque" },
    featuredIn: { en: "Featured In", pt: "Destaque Em" },
    sidebar: {
      en: {
        newsletterTitle: "Stay in the Loop",
        newsletterSubtitle:
          "Get weekly market reports and insights directly in your inbox.",
        tagsTitle: "Popular Topics",
        trendingTitle: "Trending Articles",
      },
      pt: {
        newsletterTitle: "Fique por Dentro",
        newsletterSubtitle:
          "Receba relatórios e insights semanais diretamente no seu email.",
        tagsTitle: "Tópicos Populares",
        trendingTitle: "Artigos em Alta",
      },
    },
    cta: {
      en: {
        title: "Stay Updated with Market Intelligence",
        subtitle:
          "Join 140+ partners who trust our weekly market reports and trading insights.",
        button: "Subscribe Now",
      },
      pt: {
        title: "Mantenha-se Atualizado com Inteligência de Mercado",
        subtitle:
          "Junte-se a mais de 140 parceiros que confiam em nossos relatórios e insights semanais.",
        button: "Inscrever-se Agora",
      },
    },
  };

  const featuredPost = blogPosts.find((p) => p.featured);
  const regularPosts = blogPosts.filter((p) => !p.featured);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString(
      lang === "pt" ? "pt-BR" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );
  };

  return (
    <>
      <SEO
        title={
          lang === "en"
            ? "Blog - Cazarini Coffee Trading"
            : "Blog - Cazarini Trading de Café"
        }
        description={
          lang === "en"
            ? "Expert coffee market insights, analysis, and trading news from Cazarini Trading Company. Weekly reports trusted by industry professionals."
            : "Insights especializados do mercado de café, análises e notícias de trading da Cazarini Trading Company. Relatórios semanais confiados por profissionais da indústria."
        }
        keywords={
          lang === "en"
            ? "coffee trading blog, coffee market insights, coffee news, brazilian coffee, market analysis"
            : "blog trading café, insights mercado café, notícias café, café brasileiro, análise de mercado"
        }
      />

      <div ref={pageRef} className="bg-white min-h-screen">
        {/* ═══════════════════════════════════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 pt-6 pb-20 lg:pb-28 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-green rounded-full blur-[128px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-lime rounded-full blur-[128px]" />
          </div>

          <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            {/* Header */}
            <div className="mb-12 pt-4">
              <Header variant="dark" />
            </div>

            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-green mb-4">
                {content.hero[lang].eyebrow}
              </p>

              <h1
                data-animate="hero-title"
                className="text-balance text-4xl font-editorial leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.5rem] mb-6"
              >
                {content.hero[lang].title}
              </h1>

              <p
                data-animate="hero-subtitle"
                className="text-xl text-white/70 max-w-2xl mb-10"
              >
                {content.hero[lang].subtitle}
              </p>

              {/* Stats */}
              <div
                data-animate="hero-stats"
                className="flex flex-wrap gap-8 lg:gap-12"
              >
                {content.hero[lang].stats.map((stat, index) => (
                  <div key={index} className="text-center sm:text-left">
                    <p className="text-2xl lg:text-3xl font-bold text-accent-green">
                      {stat.value}
                    </p>
                    <p className="text-sm text-white/50">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            FEATURED POST - Full-width hero overlay
        ═══════════════════════════════════════════════════════════════════ */}
        {featuredPost && (
          <section className="py-12 lg:py-16 bg-gray-50">
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
              <article
                data-animate="featured"
                className="group relative rounded-3xl overflow-hidden h-[400px] sm:h-[460px] lg:h-[500px] cursor-pointer"
              >
                {/* Background image */}
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title[lang]}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/50 to-transparent" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                  {/* Badges */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 bg-accent-green px-3 py-1.5 rounded-full text-sm font-semibold text-brand-900">
                      <Newspaper className="w-3.5 h-3.5" />
                      {content.featured[lang]}
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-white/90">
                      <featuredPost.categoryIcon className="w-3.5 h-3.5" />
                      {featuredPost.category[lang]}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial leading-tight text-white mb-3 max-w-3xl">
                    {featuredPost.title[lang]}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-base text-white/70 mb-6 max-w-2xl line-clamp-2">
                    {featuredPost.excerpt[lang]}
                  </p>

                  {/* Author + CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src="/photos/thiago-cafe.jpg"
                        alt={featuredPost.author}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                      />
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {featuredPost.author}
                        </p>
                        <p className="text-xs text-white/50 flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(featuredPost.date)}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {featuredPost.readTime}{" "}
                            {lang === "pt" ? "de leitura" : "read"}
                          </span>
                        </p>
                      </div>
                    </div>
                    <button className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-brand-900">
                      {content.readMore[lang]}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            BLOG GRID + SIDEBAR - 2-column layout
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-[1fr_380px] gap-10">
              {/* Main Column - Article Cards */}
              <div className="space-y-8">
                {regularPosts.map((post) => (
                  <article
                    key={post.id}
                    data-animate="card"
                    className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
                  >
                    {/* Image */}
                    <div className="relative sm:w-72 shrink-0 overflow-hidden">
                      <div className="aspect-video sm:aspect-auto sm:h-full">
                        <img
                          src={post.image}
                          alt={post.title[lang]}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <post.categoryIcon className="w-3.5 h-3.5 text-accent-green" />
                        <span className="text-xs font-semibold text-brand-900">
                          {post.category[lang]}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(post.date)}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-brand-900 mb-2 group-hover:text-accent-green transition-colors">
                        {post.title[lang]}
                      </h3>

                      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2 flex-1">
                        {post.excerpt[lang]}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <img
                            src="/photos/thiago-cafe.jpg"
                            alt={post.author}
                            className="w-7 h-7 rounded-full object-cover border border-gray-100"
                          />
                          <span className="text-xs font-medium text-gray-500">
                            {post.author}
                          </span>
                        </div>
                        <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-900 group-hover:text-accent-green transition-colors">
                          {content.readMore[lang]}
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Sidebar */}
              <aside className="space-y-8 lg:sticky lg:top-8 lg:self-start">
                {/* Newsletter Widget */}
                <div className="rounded-2xl bg-accent-green p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="w-5 h-5 text-brand-900" />
                    <h3 className="text-lg font-semibold text-brand-900">
                      {content.sidebar[lang].newsletterTitle}
                    </h3>
                  </div>
                  <p className="text-sm text-brand-900/70 mb-4">
                    {content.sidebar[lang].newsletterSubtitle}
                  </p>
                  <input
                    type="email"
                    placeholder={content.newsletter[lang].placeholder}
                    className="w-full rounded-xl border border-brand-900/20 bg-white px-4 py-3 text-sm text-brand-900 placeholder:text-gray-400 focus:border-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-900/10 transition-all mb-3"
                  />
                  <button className="w-full rounded-xl bg-brand-900 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-700">
                    {content.newsletter[lang].button}
                  </button>
                </div>

                {/* Popular Tags */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6">
                  <h3 className="text-base font-semibold text-brand-900 mb-4">
                    {content.sidebar[lang].tagsTitle}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-all hover:border-accent-green hover:text-accent-green cursor-pointer"
                      >
                        {tag[lang]}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Trending Articles */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6">
                  <h3 className="text-base font-semibold text-brand-900 mb-4">
                    {content.sidebar[lang].trendingTitle}
                  </h3>
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <div
                        key={post.id}
                        className="group flex items-start gap-3 cursor-pointer"
                      >
                        <img
                          src={post.image}
                          alt={post.title[lang]}
                          className="w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-brand-900 line-clamp-2 group-hover:text-accent-green transition-colors">
                            {post.title[lang]}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime} • {formatDate(post.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            FEATURED IN LOGOS
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-gray-50 py-12 border-t border-gray-100">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.35em] text-gray-400 mb-8">
              {content.featuredIn[lang]}
            </p>
            <div className="flex items-center justify-center gap-10 lg:gap-16 flex-wrap">
              {featuredInLogos.map((logo) => (
                <img
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  title={logo.name}
                  className="h-6 lg:h-8 w-auto object-contain opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            GREEN CTA SECTION
        ═══════════════════════════════════════════════════════════════════ */}
        <section
          data-animate="newsletter"
          className="bg-accent-green py-20 lg:py-24"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10 text-center">
            <div className="inline-flex items-center gap-2 bg-brand-900/10 rounded-full px-4 py-2 mb-6">
              <Newspaper className="w-4 h-4 text-brand-900" />
              <span className="text-sm font-medium text-brand-900/80">
                {lang === "en" ? "Weekly Newsletter" : "Newsletter Semanal"}
              </span>
            </div>

            <h2 className="text-balance text-3xl font-editorial leading-tight text-brand-900 sm:text-4xl mb-4">
              {content.cta[lang].title}
            </h2>

            <p className="text-lg text-brand-900/60 mb-8 max-w-xl mx-auto">
              {content.cta[lang].subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
              <input
                type="email"
                placeholder={content.newsletter[lang].placeholder}
                className="flex-1 rounded-xl border border-brand-900/20 bg-white px-5 py-3.5 text-brand-900 placeholder:text-gray-400 focus:border-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-900/10 transition-all"
              />
              <button className="rounded-xl bg-brand-900 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand-700 shadow-lg shadow-brand-900/20">
                {content.cta[lang].button}
              </button>
            </div>

            <p className="text-sm text-brand-900/40">
              {content.newsletter[lang].trust}
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
