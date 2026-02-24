import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const getNavItems = (lang) => [
  { label: lang === "pt" ? "Início" : "Home", href: "/", type: "link" },
  { label: lang === "pt" ? "Sobre" : "About", href: lang === "pt" ? "/quem-somos" : "/who-we-are", type: "link" },
  { label: lang === "pt" ? "Variedades" : "Varieties", href: lang === "pt" ? "/variedades" : "/varieties", type: "link" },
  { label: "Blog", href: "/blog", type: "link" },
  { label: lang === "pt" ? "Logística" : "Logistics", href: lang === "pt" ? "/logistica" : "/logistics", type: "link" },
  { label: lang === "pt" ? "Contato" : "Contact", href: lang === "pt" ? "/contato" : "/contact", type: "link" },
];

export const Header = ({ variant = "light" }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { language, setLanguage, isPortuguese } = useLanguage();
  const currentLanguage = language === "pt-br" ? "pt" : "en";
  const lang = isPortuguese ? "pt" : "en";
  const location = useLocation();
  const navItems = getNavItems(lang);

  const toggleLanguage = (newLang) => {
    setLanguage(newLang === "pt" ? "pt-br" : "en");
    setIsLanguageOpen(false);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileNavOpen(false);
    setIsLanguageOpen(false);
  }, [location.pathname]);

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

  const isDark = variant === "dark";

  const headerClasses = isDark
    ? "border-white/10 bg-white/5 backdrop-blur-md"
    : "border-brand-50/60 bg-white/90 backdrop-blur shadow-sm shadow-brand-900/5";

  const textClasses = isDark
    ? "text-white"
    : "text-brand-900";

  const hoverClasses = "hover:text-accent-green";

  const buttonClasses = isDark
    ? "border-white/20 bg-white/10 text-white hover:bg-white hover:text-brand-900"
    : "border-brand-900 bg-brand-900 text-white hover:border-brand-900 hover:bg-white hover:text-brand-900";

  const langButtonClasses = isDark
    ? "border-white/20 bg-white/10 text-white hover:border-white"
    : "border-gray-200 bg-white text-brand-900 hover:border-brand-900";

  const mobileMenuClasses = isDark
    ? "border-white/10 bg-brand-950/98 backdrop-blur-xl text-white"
    : "border-gray-100 bg-white text-brand-900";

  const hamburgerColor = isDark ? "bg-white" : "bg-brand-900";

  return (
    <>
      <header
        className={`sticky top-3 z-50 flex items-center justify-between gap-4 rounded-pill border px-4 py-2.5 sm:px-5 ${headerClasses}`}
      >
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/photos/Logomarca-Cazarini-12.09.13.svg"
              alt="Cazarini logo"
              className="h-12 w-auto rounded-sm object-contain"
            />
          </Link>

          <nav className={`hidden items-center gap-6 text-sm font-semibold md:flex ${textClasses}`}>
            {navItems.map((item, idx) => (
              item.type === "link" ? (
                <Link
                  key={`nav-${idx}-${item.label}`}
                  to={item.href}
                  className={`transition-colors ${hoverClasses}`}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={`nav-${idx}-${item.label}`}
                  href={location.pathname === "/" ? item.href : `/${item.href}`}
                  className={`transition-colors ${hoverClasses}`}
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
            className={`relative hidden items-center gap-1 overflow-hidden rounded-pill border px-6 py-2 text-sm font-semibold shadow-sm transition duration-300 ease-soft-spring md:inline-flex ${buttonClasses}`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>{lang === "pt" ? "Solicitar Cotação" : "Request a Quote"}</span>
              <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${isDark ? "bg-white text-brand-900" : "bg-white text-brand-900"}`}>
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
          </a>

          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setIsLanguageOpen((open) => !open)}
              className={`flex items-center gap-2 rounded-pill border px-3 py-2 text-xs font-semibold shadow-sm transition ${langButtonClasses}`}
            >
              <span className={`flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border ${isDark ? "border-white/30 bg-white/10" : "border-gray-200 bg-white"}`}>
                {currentLanguage === "pt" ? (
                  <img
                    src="/photos/brazil-flag.png"
                    alt="Portugues"
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
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-brand-900 hover:bg-gray-50"
                >
                  <img
                    src="/photos/brazil-flag.png"
                    alt="Portugues"
                    className="h-4 w-4 rounded-full object-cover"
                  />
                  <span>Portugues</span>
                </button>
                <button
                  type="button"
                  onClick={() => toggleLanguage("en")}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-brand-900 hover:bg-gray-50"
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
            className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full border md:hidden ${isDark ? "border-white/20 bg-white/10 text-white" : "border-gray-200 bg-white text-brand-900"}`}
            onClick={() => setIsMobileNavOpen((open) => !open)}
            aria-label={isMobileNavOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMobileNavOpen}
          >
            <div className="flex h-4 w-5 flex-col items-center justify-center">
              <span
                className={`block h-0.5 w-5 rounded-full transition-all duration-300 ease-out ${hamburgerColor} ${
                  isMobileNavOpen ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`mt-1.5 block h-0.5 w-5 rounded-full transition-all duration-300 ease-out ${hamburgerColor} ${
                  isMobileNavOpen ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile menu — fixed overlay with backdrop */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-[999] md:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileNavOpen(false)}
          />

          {/* Menu panel */}
          <div
            className={`absolute left-3 right-3 top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-3xl border px-5 py-6 shadow-2xl ${mobileMenuClasses}`}
          >
            <nav className="flex flex-col gap-1">
              {navItems.map((item, idx) => (
                item.type === "link" ? (
                  <Link
                    key={`mobile-${idx}-${item.label}`}
                    to={item.href}
                    className={`rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${isDark ? "hover:bg-white/10" : "hover:bg-gray-50"} ${hoverClasses}`}
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={`mobile-${idx}-${item.label}`}
                    href={location.pathname === "/" ? item.href : `/${item.href}`}
                    className={`rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${isDark ? "hover:bg-white/10" : "hover:bg-gray-50"} ${hoverClasses}`}
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              ))}
            </nav>

            <div className={`mt-5 border-t pt-5 flex flex-col gap-4 ${isDark ? "border-white/10" : "border-gray-100"}`}>
              <a
                href="/contact"
                className={`w-full rounded-2xl border px-4 py-3.5 text-center text-sm font-semibold transition ${buttonClasses}`}
                onClick={() => setIsMobileNavOpen(false)}
              >
                {lang === "pt" ? "Solicitar Cotação" : "Request a Quote"}
              </a>

              {/* Language toggle — clean inline buttons */}
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => { toggleLanguage("pt"); setIsMobileNavOpen(false); }}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    currentLanguage === "pt"
                      ? "bg-accent-green/10 border border-accent-green/30 text-accent-green"
                      : isDark ? "text-white/60 hover:text-white" : "text-gray-500 hover:text-brand-900"
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
                      : isDark ? "text-white/60 hover:text-white" : "text-gray-500 hover:text-brand-900"
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
    </>
  );
};

export default Header;
