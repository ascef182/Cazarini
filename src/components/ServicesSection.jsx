import React from "react";
import { Link } from "react-router-dom";
import { useGsapFadeIn } from "../hooks/useGsapFadeIn";
import { useTranslation } from "../hooks/useTranslation";
import { useLanguage } from "../context/LanguageContext";
import { blogPosts } from "../data/blogPosts";
import { ArrowRight } from "lucide-react";

const trustedLogos = [
  { src: "/photos/bloomberg.png", alt: "Bloomberg" },
  { src: "/photos/wsj-logo.png", alt: "WSJ" },
  { src: "/photos/globo_rural-removebg-preview.png", alt: "Globo Rural" },
  { src: "/photos/valorecomnomico.png", alt: "Valor Econômico" },
  { src: "/photos/reuters.png", alt: "Reuters" },
];

export const ServicesSection = () => {
  const { t } = useTranslation();
  const { isPortuguese } = useLanguage();
  const lang = isPortuguese ? "pt" : "en";
  useGsapFadeIn("[data-service-card]", { stagger: 0.1 });

  // Show the 3 most recent blog posts
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section id="servicos" className="bg-white py-20 lg:py-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.4fr)] lg:items-end">
          <div className="space-y-4">
            <h2 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-brand-900 sm:text-4xl lg:text-[2.25rem]">
              {t("services.title")}
            </h2>
            <p className="max-w-xl text-base text-gray-500">
              {t("services.description")}
            </p>
          </div>
          <div className="flex justify-start lg:justify-end">
            <Link
              to="/blog"
              className="pill-button rounded-pill border border-brand-900 bg-white text-brand-900 hover:bg-brand-900 hover:text-white"
            >
              {t("services.seeMore")}
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <Link
              to={`/blog/${post.slug}`}
              key={post.id}
              data-service-card
              className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-[0_12px_30px_rgba(1,2,5,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(1,2,5,0.14)]"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-900 shadow-sm">
                  {post.category}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>{post.author}</span>
                </div>
                <h3 className="text-xl font-semibold leading-snug text-brand-900 group-hover:text-accent-green transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500 line-clamp-3">
                  {post.preview}
                </p>
                <span className="mt-auto text-brand-900 font-bold text-xs uppercase tracking-widest border-b border-brand-900/20 pb-1 self-start group-hover:border-accent-green transition-all inline-flex items-center gap-2">
                  {lang === "en" ? "Read Article" : "Ler Artigo"}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-center">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-gray-500">
              {t("services.trustedBy")}
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
