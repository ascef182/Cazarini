import React from "react";
import { useGsapFadeIn } from "../hooks/useGsapFadeIn";

const articles = [
  {
    id: 1,
    accent: "bg-accent-blue",
    meta: "5 min read",
    title: "How a Coffee Broker Can Boost Your Business",
    description:
      "We connect your coffee directly with trusted buyers and exporters, ensuring fast pricing, approvals, and execution.",
    image: "/photos/experimento-cafe.jpg",
  },
  {
    id: 2,
    accent: "bg-accent-orange",
    meta: "5 min read",
    title: "The Latest Market Trends in Global Coffee Trading",
    description:
      "From specialty coffee demand to climate impacts on harvest, we analyze the key drivers shaping today's global coffee trade.",
    image: "/photos/seca-do-cafe.jpg",
  },
  {
    id: 3,
    accent: "bg-accent-purple",
    meta: "5 min read",
    title: "Maximizing Profitability with the Right Coffee Brokerage Partner",
    description:
      "Discover how strategic brokerage partnerships provide leverage, market intelligence, and negotiation power to drive better margins.",
    image: "/photos/ciclo-cafe.jpg",
  },
];

const trustedLogos = [
  { src: "/photos/bloomberg.png", alt: "Bloomberg" },
  { src: "/photos/wsj-logo.png", alt: "WSJ" },
  { src: "/photos/globo_rural-removebg-preview.png", alt: "Globo Rural" },
  { src: "/photos/valorecomnomico.png", alt: "Valor Econômico" },
  { src: "/photos/image62.png", alt: "Reuters" },
];

export const ServicesSection = () => {
  useGsapFadeIn("[data-service-card]", { stagger: 0.1 });

  return (
    <section id="servicos" className="bg-white py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.4fr)] lg:items-end">
          <div className="space-y-4">
            <h2 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-brand-900 sm:text-4xl lg:text-[2.25rem]">
              Coffee Brokerage & Market Insights That Drive Growth &
              Profitability
            </h2>
            <p className="max-w-xl text-base text-gray-500">
              We are a leading coffee brokerage firm connecting producers,
              exporters, and buyers worldwide. Our mission is to help clients
              navigate global markets, optimize pricing, and strengthen their
              coffee trade strategy.
            </p>
          </div>
          <div className="flex justify-start lg:justify-end">
            <button className="pill-button rounded-pill border border-brand-900 bg-white text-brand-900 hover:bg-brand-900 hover:text-white">
              See more
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              data-service-card
              className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-[0_12px_30px_rgba(1,2,5,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(1,2,5,0.14)]"
            >
              <div className="relative overflow-hidden">
                <div
                  className={`absolute left-4 top-4 z-10 h-2 w-2 rounded-full ${article.accent}`}
                />
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
                  {article.meta}
                </p>
                <h3 className="text-xl font-semibold leading-snug text-brand-900">
                  {article.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {article.description}
                </p>
                <button
                  type="button"
                  className="mt-auto flex h-10 w-10 items-center justify-center self-start rounded-full bg-brand-900 text-white transition hover:bg-brand-950"
                  aria-label={`Read more about ${article.title}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-center">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-gray-500">
              Trusted by
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {trustedLogos.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className="h-10 object-contain opacity-60 transition hover:opacity-100"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
