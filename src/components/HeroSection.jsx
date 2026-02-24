import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";

// Dynamic nav items that change based on language
const getNavItems = (lang) => [
  { label: lang === "pt" ? "Início" : "Home", href: "/", type: "link" },
  { label: lang === "pt" ? "Sobre" : "About", href: lang === "pt" ? "/quem-somos" : "/who-we-are", type: "link" },
  { label: lang === "pt" ? "Variedades" : "Varieties", href: lang === "pt" ? "/variedades" : "/varieties", type: "link" },
  { label: "Blog", href: "/blog", type: "link" },
  { label: lang === "pt" ? "Logística" : "Logistics", href: lang === "pt" ? "/logistica" : "/logistics", type: "link" },
  { label: lang === "pt" ? "Contato" : "Contact", href: lang === "pt" ? "/contato" : "/contact", type: "link" },
];

const trustedLogos = [
  { alt: "Bloomberg", src: "/photos/bloomberg.png", width: 120 },
  { alt: "WSJ", src: "/photos/wsj-logo.png", width: 80 },
  {
    alt: "Globo Rural",
    src: "/photos/globo_rural-removebg-preview.png",
    width: 120,
  },
  { alt: "Valor Econômico", src: "/photos/valorecomnomico.png", width: 120 },
];

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const heroRef = useRef(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { language, setLanguage, isPortuguese } = useLanguage();
  const currentLanguage = language === "pt-br" ? "pt" : "en";
  const lang = isPortuguese ? "pt" : "en";
  const location = useLocation();
  const navItems = getNavItems(lang);

  const { t } = useTranslation();

  // Close on Escape key + lock body scroll
  const handleEscape = useCallback((e) => {
    if (e.key === "Escape") {
      setIsMobileNavOpen(false);
      setIsLanguageOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isMobileNavOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMobileNavOpen, handleEscape]);

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

      // Counter animation
      const counters = heroRef.current.querySelectorAll("[data-counter]");
      counters.forEach((node) => {
        const target = Number(node.getAttribute("data-target"));
        const suffix = node.getAttribute("data-suffix") ?? "";
        if (Number.isNaN(target)) return;

        const state = { value: 0 };
        gsap.to(state, {
          value: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start: "top 80%",
            once: true,
          },
          onUpdate: () => {
            const current = state.value;
            node.textContent =
              target % 1 === 0
                ? `${Math.round(current)}${suffix}`
                : `${current.toFixed(1)}${suffix}`;
          },
        });
      });

      // Chart bars animation
      const chartBars = heroRef.current.querySelectorAll("[data-chart-bar]");
      chartBars.forEach((bar, index) => {
        const targetHeight = bar.getAttribute("data-height");
        gsap.fromTo(
          bar,
          { height: 0 },
          {
            height: targetHeight,
            duration: 0.8,
            delay: 0.15 * index,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 90%",
              once: true,
            },
          }
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const toggleLanguage = (lang) => {
    setLanguage(lang === "pt" ? "pt-br" : "en");
    setIsLanguageOpen(false);
  };

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-gray-50 pb-16 pt-6 text-brand-900"
    >
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-4 pt-4 sm:px-6 lg:px-10">
        <header
          data-hero="nav"
          className="border-brand-50/60 sticky top-3 z-50 flex items-center justify-between gap-4 rounded-pill border bg-white/90 px-4 py-2.5 shadow-sm shadow-brand-900/5 backdrop-blur sm:px-5"
        >
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/photos/Logomarca-Cazarini-12.09.13.svg"
                alt="Cazarini logo"
                className="h-12 w-auto rounded-sm object-contain"
              />
            </Link>

            <nav className="hidden items-center gap-6 text-sm font-semibold text-brand-900 md:flex">
              {navItems.map((item, idx) => (
                item.type === "link" ? (
                  <Link
                    key={`nav-${idx}-${item.label}`}
                    to={item.href}
                    className="transition-colors hover:text-accent-green"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={`nav-${idx}-${item.label}`}
                    href={location.pathname === "/" ? item.href : `/${item.href}`}
                    className="transition-colors hover:text-accent-green"
                  >
                    {item.label}
                  </a>
                )
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <a
              href="/contact"
              className="relative hidden items-center gap-1 overflow-hidden rounded-pill border border-brand-900 bg-brand-900 px-6 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-900/10 transition duration-300 ease-soft-spring hover:border-brand-900 hover:bg-white hover:text-brand-900 md:inline-flex"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>{currentLanguage === "pt" ? "Solicitar Cotação" : "Request a Quote"}</span>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-brand-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M8 5l8 7-8 7" />
                  </svg>
                </span>
              </span>
              <span className="pointer-events-none absolute inset-0 rounded-pill border border-accent-green/70" />
            </a>

            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setIsLanguageOpen((open) => !open)}
                className="flex items-center gap-2 rounded-pill border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-brand-900 shadow-sm transition hover:border-brand-900"
              >
                <span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white">
                  {currentLanguage === "pt" ? (
                    <img
                      src="/photos/brazil-flag.png"
                      alt="Português"
                      className="h-5 w-5 object-cover"
                    />
                  ) : (
                    <img src="/photos/usa.png" alt="English" className="h-4 w-4 rounded-full object-cover" />
                  )}
                </span>
                <span className="uppercase tracking-[0.12em]">
                  {currentLanguage === "pt" ? "PT" : "EN"}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-3 w-3"
                >
                  <path
                    d="M5 7l5 6 5-6"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-2xl border border-gray-100 bg-white py-1 text-xs shadow-lg shadow-brand-900/10">
                  <button
                    type="button"
                    onClick={() => toggleLanguage("pt")}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-gray-50"
                  >
                    <img
                      src="/photos/brazil-flag.png"
                      alt="Português"
                      className="h-4 w-4 rounded-full object-cover"
                    />
                    <span>Português</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleLanguage("en")}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-gray-50"
                  >
                    <img
                      src="/photos/American-flag.png"
                      alt="English"
                      className="h-4 w-4 rounded-full object-cover"
                    />
                    <span>English</span>
                  </button>
                </div>
              )}
            </div>

            {/* Hamburger / X toggle — 44px touch target */}
            <button
              type="button"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-brand-900 md:hidden"
              onClick={() => setIsMobileNavOpen((open) => !open)}
              aria-label={isMobileNavOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMobileNavOpen}
            >
              <div className="flex h-4 w-5 flex-col items-center justify-center">
                <span
                  className={`block h-0.5 w-5 rounded-full bg-brand-900 transition-all duration-300 ease-out ${
                    isMobileNavOpen ? "translate-y-[3px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`mt-1.5 block h-0.5 w-5 rounded-full bg-brand-900 transition-all duration-300 ease-out ${
                    isMobileNavOpen ? "-translate-y-[3px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
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
              <a href="/contact" className="pill-button rounded-pill bg-brand-900 text-white hover:scale-105 hover:drop-shadow-glow">
                {t("hero.ctaSchedule")} <span aria-hidden>&rarr;</span>
              </a>
              <a
                href="#variedades"
                className="group relative flex items-center gap-2 text-brand-900"
              >
                <span className="relative">
                  {t("hero.ctaVarieties")}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent-green transition-all duration-300 ease-out group-hover:w-full" />
                </span>
              </a>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
                {t("hero.trusted")}
              </p>
              <div className="flex flex-wrap items-center gap-6 lg:gap-8">
                {trustedLogos.map((logo) => (
                  <img
                    key={logo.alt}
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    className="h-8 object-contain opacity-70 transition-opacity hover:opacity-100"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            data-hero="media"
            className="relative mt-8 min-h-[850px] lg:mt-0 lg:h-[540px] lg:min-h-0 lg:ml-20"
          >
            {/* Figure 1 - Ship Image (transparent background) */}
            <div className="absolute left-0 top-0 z-10 h-[273px] w-full lg:h-[281px] lg:w-[303px]">
              <img
                src="/photos/trend.png"
                alt="Coffee container ship"
                className="h-full w-full rounded-[32px] object-cover object-top"
                loading="lazy"
              />
            </div>

            {/* Figure 2 - Light Stat Card (150+) */}
            <div
              data-hero="stat-card"
              className="absolute left-0 top-[290px] h-[250px] w-full overflow-hidden rounded-[32px] border border-gray-100 bg-white p-6 text-brand-900 shadow-[0_12px_30px_rgba(1,2,5,0.08)] lg:left-[327px] lg:top-0 lg:h-[281px] lg:w-[261px]"
            >
              <p className="text-4xl font-bold tracking-[0.04em] lg:text-5xl">
                <span data-counter data-target="150" data-suffix="+">
                  0+
                </span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                {t("hero.companiesTrust")}
              </p>
              <div className="mt-5 h-2 rounded-full bg-gray-100">
                <div className="h-full w-3/4 rounded-full bg-brand-900" />
              </div>
            </div>

            {/* Figure 3 - Dark Chart Card (texto e charts lado a lado) */}
            <div className="absolute left-0 top-[555px] h-[270px] w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 p-6 text-white shadow-[0_18px_45px_rgba(1,2,5,0.14)] lg:top-[304px] lg:h-[216px] lg:w-[588px]">
              {/* Shadow overlay image */}
              <img
                src="/photos/image 60.png"
                alt=""
                className="pointer-events-none absolute left-0 top-0 h-full w-auto opacity-60"
                loading="lazy"
              />
              <div className="relative z-10 flex h-full items-center gap-6">
                {/* Text side */}
                <div className="flex-1">
                  <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/60">
                    {t("hero.drivingTrade")}
                  </p>
                  <p className="mt-3 text-lg font-semibold leading-snug lg:text-xl">
                    {t("hero.exportingPremium")} <br /> {t("hero.exportingGrade")}
                  </p>
                </div>
                {/* Chart side */}
                <div className="flex flex-col items-end">
                  <div className="flex items-end gap-2">
                    {[36, 52, 68, 80].map((height, idx) => (
                      <div
                        key={`bar-${idx}`}
                        data-chart-bar
                        data-height={`${height}px`}
                        className="w-10 rounded-t-[10px] bg-accent-green"
                        style={{ height: 0 }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 h-px w-full bg-white/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu — fixed overlay with backdrop (rendered at root level, not clipped by overflow-hidden) */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-[999] md:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileNavOpen(false)}
          />

          {/* Menu panel */}
          <div className="absolute left-3 right-3 top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-3xl border border-gray-100 bg-white px-5 py-6 text-brand-900 shadow-2xl">
            <nav className="flex flex-col gap-1">
              {navItems.map((item, idx) => (
                item.type === "link" ? (
                  <Link
                    key={`mobile-${idx}-${item.label}`}
                    to={item.href}
                    className="rounded-xl px-4 py-3.5 text-base font-medium transition-colors hover:bg-gray-50 hover:text-accent-green"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={`mobile-${idx}-${item.label}`}
                    href={location.pathname === "/" ? item.href : `/${item.href}`}
                    className="rounded-xl px-4 py-3.5 text-base font-medium transition-colors hover:bg-gray-50 hover:text-accent-green"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              ))}
            </nav>

            <div className="mt-5 border-t border-gray-100 pt-5 flex flex-col gap-4">
              <a
                href="/contact"
                className="w-full rounded-2xl border border-brand-900 bg-brand-900 px-4 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-white hover:text-brand-900"
                onClick={() => setIsMobileNavOpen(false)}
              >
                {currentLanguage === "pt" ? "Solicitar Cotação" : "Request a Quote"}
              </a>

              {/* Language toggle — clean inline buttons */}
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => { toggleLanguage("pt"); setIsMobileNavOpen(false); }}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    currentLanguage === "pt"
                      ? "bg-accent-green/10 border border-accent-green/30 text-accent-green"
                      : "text-gray-500 hover:text-brand-900"
                  }`}
                >
                  <img src="/photos/brazil-flag.png" alt="PT" className="h-5 w-5 rounded-full object-cover" />
                  PT
                </button>
                <button
                  type="button"
                  onClick={() => { toggleLanguage("en"); setIsMobileNavOpen(false); }}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    currentLanguage === "en"
                      ? "bg-accent-green/10 border border-accent-green/30 text-accent-green"
                      : "text-gray-500 hover:text-brand-900"
                  }`}
                >
                  <img src="/photos/American-flag.png" alt="EN" className="h-5 w-5 rounded-full object-cover" />
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
