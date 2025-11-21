import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { BackButton } from "../components/BackButton";
import { SEO } from "../components/SEO";
import { Footer } from "../components/Footer";

const blogPosts = [
  {
    id: 1,
    slug: "how-coffee-broker-boosts-business",
    category: { en: "Business", pt: "Negócios" },
    title: {
      en: "How a Coffee Broker Can Boost Your Business",
      pt: "Como um Corretor de Café Pode Impulsionar Seu Negócio",
    },
    excerpt: {
      en: "We connect your coffee directly with trusted buyers and exporters, ensuring fast pricing, approvals, and execution.",
      pt: "Conectamos seu café diretamente com compradores e exportadores confiáveis, garantindo precificação, aprovações e execução rápidas.",
    },
    date: "2025-01-15",
    readTime: "5 min",
    image: "/photos/experimento-cafe.jpg",
    author: "Thiago Cazarini",
  },
  {
    id: 2,
    slug: "latest-market-trends-global-coffee",
    category: { en: "Market Insights", pt: "Insights de Mercado" },
    title: {
      en: "The Latest Market Trends in Global Coffee Trading",
      pt: "As Últimas Tendências de Mercado no Comércio Global de Café",
    },
    excerpt: {
      en: "From specialty coffee demand to climate impacts on harvest, we analyze the key drivers shaping today's global coffee trade.",
      pt: "Da demanda por café especial aos impactos climáticos na colheita, analisamos os principais impulsionadores que moldam o comércio global de café hoje.",
    },
    date: "2025-01-10",
    readTime: "7 min",
    image: "/photos/seca-do-cafe.jpg",
    author: "Thiago Cazarini",
  },
  {
    id: 3,
    slug: "maximizing-profitability-coffee-brokerage",
    category: { en: "Strategy", pt: "Estratégia" },
    title: {
      en: "Maximizing Profitability with the Right Coffee Brokerage Partner",
      pt: "Maximizando a Lucratividade com o Parceiro de Corretagem de Café Certo",
    },
    excerpt: {
      en: "Discover how strategic brokerage partnerships provide leverage, market intelligence, and negotiation power to drive better margins.",
      pt: "Descubra como parcerias estratégicas de corretagem fornecem alavancagem, inteligência de mercado e poder de negociação para impulsionar melhores margens.",
    },
    date: "2025-01-05",
    readTime: "6 min",
    image: "/photos/ciclo-cafe.jpg",
    author: "Thiago Cazarini",
  },
];

export const Blog = () => {
  const { isPortuguese } = useLanguage();
  const lang = isPortuguese ? "pt" : "en";
  const [selectedCategory, setSelectedCategory] = useState("all");

  const content = {
    hero: {
      en: {
        title: "Coffee Market Insights & News",
        subtitle: "Expert analysis, market trends, and industry updates from Cazarini Trading",
      },
      pt: {
        title: "Insights e Notícias do Mercado de Café",
        subtitle: "Análises especializadas, tendências de mercado e atualizações da indústria pela Cazarini Trading",
      },
    },
    filters: {
      en: {
        all: "All Posts",
        business: "Business",
        market: "Market Insights",
        strategy: "Strategy",
      },
      pt: {
        all: "Todos os Posts",
        business: "Negócios",
        market: "Insights de Mercado",
        strategy: "Estratégia",
      },
    },
    readMore: {
      en: "Read Article",
      pt: "Ler Artigo",
    },
  };

  const categories = [
    { id: "all", label: content.filters[lang].all },
    { id: "business", label: content.filters[lang].business },
    { id: "market", label: content.filters[lang].market },
    { id: "strategy", label: content.filters[lang].strategy },
  ];

  return (
    <>
      <SEO
        title={lang === "en" ? "Blog - Cazarini Coffee Trading" : "Blog - Cazarini Trading de Café"}
        description={lang === "en"
          ? "Expert insights, market analysis, and coffee trading news from Cazarini Trading Company."
          : "Insights especializados, análises de mercado e notícias de trading de café da Cazarini Trading Company."}
        keywords={lang === "en"
          ? "coffee trading blog, coffee market insights, coffee news, brazilian coffee"
          : "blog trading café, insights mercado café, notícias café, café brasileiro"}
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 py-16 lg:py-24">
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
        <section className="border-b border-gray-100 bg-white py-6">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 rounded-full border px-6 py-2 text-sm font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? "border-accent-green bg-accent-green text-brand-900"
                      : "border-gray-200 text-gray-700 hover:border-brand-900"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title[lang]}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-accent-green px-3 py-1 text-xs font-semibold text-brand-900">
                      {post.category[lang]}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <span>•</span>
                      <span>{post.readTime} {lang === "pt" ? "de leitura" : "read"}</span>
                    </div>
                    <h2 className="mb-3 text-xl font-semibold text-brand-900 line-clamp-2">
                      {post.title[lang]}
                    </h2>
                    <p className="mb-4 text-sm leading-relaxed text-gray-600 line-clamp-3">
                      {post.excerpt[lang]}
                    </p>
                    <button className="inline-flex items-center gap-2 text-sm font-semibold text-brand-900 transition hover:text-accent-green">
                      {content.readMore[lang]}
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-gray-50 py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-10">
            <h2 className="text-3xl font-semibold text-brand-900">
              {lang === "en" ? "Stay Updated" : "Mantenha-se Atualizado"}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {lang === "en"
                ? "Subscribe to our weekly newsletter for market insights and coffee trading tips."
                : "Inscreva-se em nossa newsletter semanal para insights de mercado e dicas de trading de café."}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder={lang === "en" ? "Your email address" : "Seu endereço de email"}
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-900/20 sm:w-80"
              />
              <button className="rounded-xl bg-brand-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-950">
                {lang === "en" ? "Subscribe" : "Inscrever-se"}
              </button>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
};

export default Blog;

