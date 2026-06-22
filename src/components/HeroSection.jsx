import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";
import Globe from "../components/ui/Globe";
import { Globe2, Ship } from "lucide-react";

// Dynamic nav items that change based on language
const getNavItems = (lang) => [
  { label: lang === "pt" ? "Início" : "Home", href: "/", type: "link" },
  { label: lang === "pt" ? "Sobre" : "About", href: lang === "pt" ? "/quem-somos" : "/who-we-are", type: "link" },
  { label: lang === "pt" ? "Variedades" : "Varieties", href: lang === "pt" ? "/variedades" : "/varieties", type: "link" },
  { label: "Blog", href: "/blog", type: "link" },
  { label: lang === "pt" ? "Contato" : "Contact", href: lang === "pt" ? "/contato" : "/contact", type: "link" },
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
            <Link
              to="/contact"
              className="relative hidden items-center gap-1 overflow-hidden rounded-pill border border-brand-900 bg-brand-900 px-6 py-2 text-sm font-semibold text-white shadow-sm shadow-brand-900/10 transition duration-300 ease-soft-spring hover:border-brand-900 hover:bg-white hover:text-brand-900 md:inline-flex"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>{t("hero.ctaSchedule")}</span>
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
            </Link>

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
              aria-label={isMobileNavOpen ? t("nav.closeMenu") : t("nav.openMenu")}
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
                to={lang === "pt" ? "/variedades" : "/varieties"}
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
            {/* Close button */}
            <div className="flex justify-end mb-3">
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(false)}
                aria-label={t("nav.closeMenu")}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-brand-900 hover:bg-gray-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

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
              <Link
                to="/contact"
                className="w-full rounded-2xl border border-brand-900 bg-brand-900 px-4 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-white hover:text-brand-900"
                onClick={() => setIsMobileNavOpen(false)}
              >
                {t("hero.ctaSchedule")}
              </Link>

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
