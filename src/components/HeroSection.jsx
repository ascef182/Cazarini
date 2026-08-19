import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";
import Globe from "../components/ui/Globe";
import { Globe2, Ship } from "lucide-react";
import { Header } from "./Header";

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const heroRef = useRef(null);
  const { isPortuguese } = useLanguage();
  const lang = isPortuguese ? "pt" : "en";

  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { duration: 0.9, ease: "power3.out" },
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 90%",
        },
      });

      timeline
        .from("[data-hero='nav']", { y: -24, opacity: 0 })
        .from("[data-hero='eyebrow']", { y: 20, opacity: 0 }, "-=0.4")
        .from("[data-hero='title']", { y: 40, opacity: 0 }, "-=0.5")
        .from("[data-hero='subtitle']", { y: 30, opacity: 0 }, "-=0.5")
        .from("[data-hero='cta']", { y: 20, opacity: 0 }, "-=0.4")
        .from("[data-hero='media']", { scale: 0.95, opacity: 0 }, "-=0.45");

      gsap.utils.toArray("[data-hero='stat-card']").forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 25,
          delay: 0.1 * index,
          duration: 0.6,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        });
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-gray-50 pb-16 pt-6 text-brand-900"
    >
      {/* Grain texture — profundidade sutil no fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-4 pt-4 sm:px-6 lg:px-10">
        <Header variant="light" navMarker="nav" />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <p
                data-hero="eyebrow"
                className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500"
              >
                {t("hero.tagline")}
              </p>
              <h1
                data-hero="title"
                className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-brand-900 sm:text-5xl lg:text-[3.25rem]"
              >
                {t("hero.title")}
                <br />
                <span className="text-accent-green">{t("hero.titleHighlight")}</span>
              </h1>
              <p
                data-hero="subtitle"
                className="max-w-xl text-lg text-gray-500"
              >
                {t("hero.subtitle")} <br /> {t("hero.subtitleSecond")}
              </p>
            </div>

            <div
              data-hero="cta"
              className="flex flex-wrap items-center gap-6 text-sm font-semibold"
            >
              <Link to="/contact" className="pill-button rounded-pill bg-brand-900 text-white hover:scale-105 hover:drop-shadow-glow">
                {t("hero.ctaSchedule")} <span aria-hidden>&rarr;</span>
              </Link>
              <Link
                to={lang === "pt" ? "/qualidades" : "/qualities"}
                className="group relative flex items-center gap-2 text-brand-900"
              >
                <span className="relative">
                  {t("hero.ctaVarieties")}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent-green transition-all duration-300 ease-out group-hover:w-full" />
                </span>
              </Link>
            </div>
          </div>

          <div
            data-hero="media"
            className="relative mt-10 h-[400px] sm:h-[460px] lg:mt-0 lg:ml-12 lg:h-[520px]"
          >
            {/* Ship image */}
            <div className="absolute inset-x-5 top-2 bottom-10 overflow-hidden rounded-[28px] shadow-[0_12px_30px_rgba(1,2,5,0.08)] sm:bottom-12 lg:inset-x-6 lg:rounded-[32px]">
              <img
                src="/photos/trend.jpg"
                alt="Coffee container ship"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-accent-green/30 bg-accent-green/10 px-3 py-1 text-xs font-medium text-accent-green backdrop-blur-md lg:left-6 lg:top-6">
                <Ship size={13} /> {t("hero.presentOnAllContinents")}
              </span>
            </div>

            {/* Globe disc — bottom-left overlap */}
            <div className="absolute bottom-0 left-0 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-gray-200 bg-white shadow-[0_12px_30px_rgba(1,2,5,0.08)] sm:h-40 sm:w-40 lg:h-44 lg:w-44">
              <Globe size={180} />
            </div>

            {/* Merged stat + caption card — top-right overlap */}
            <div
              data-hero="stat-card"
              className="absolute right-0 top-6 w-36 rounded-[28px] border border-gray-200 bg-white p-3 shadow-[0_12px_30px_rgba(1,2,5,0.08)] sm:w-40 sm:p-4 lg:top-8 lg:w-44 lg:rounded-[32px]"
            >
              <div className="flex items-center gap-2">
                <Globe2 size={16} className="text-accent-green" />
                <p className="text-xs font-semibold uppercase tracking-wider text-accent-green">
                  {t("hero.globalReach")}
                </p>
              </div>
              <p className="mt-1 text-xl font-bold text-brand-900 lg:text-2xl">
                8M<span className="text-accent-green">+</span>
              </p>
              <p className="mt-1 text-xs text-gray-500">{t("hero.subtitleSecond")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
