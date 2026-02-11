import React, { useState } from "react";
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
    ? "border-white/10 bg-brand-900/95 backdrop-blur-md text-white"
    : "border-gray-100 bg-white text-brand-900";

  return (
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
          href="/#contato"
          className={`relative hidden items-center gap-1 overflow-hidden rounded-pill border px-6 py-2 text-sm font-semibold shadow-sm transition duration-300 ease-soft-spring md:inline-flex ${buttonClasses}`}
        >
          <span className="relative z-10 flex items-center gap-2">
            <span>{lang === "pt" ? "Agendar Chamada" : "Schedule Call"}</span>
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

        <button
          type="button"
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full border md:hidden ${isDark ? "border-white/20 bg-white/10 text-white" : "border-gray-200 bg-white text-brand-900"}`}
          onClick={() => setIsMobileNavOpen((open) => !open)}
          aria-label="Open navigation"
        >
          <div className="flex flex-col gap-1">
            <span className={`block h-0.5 w-4 rounded-full ${isDark ? "bg-white" : "bg-brand-900"}`} />
            <span className={`block h-0.5 w-4 rounded-full ${isDark ? "bg-white" : "bg-brand-900"}`} />
          </div>
        </button>
      </div>

      {isMobileNavOpen && (
        <div className={`absolute inset-x-0 top-full mt-3 rounded-3xl border px-4 py-4 text-sm shadow-lg md:hidden ${mobileMenuClasses}`}>
          <nav className="flex flex-col gap-3">
            {navItems.map((item, idx) => (
              item.type === "link" ? (
                <Link
                  key={`mobile-${idx}-${item.label}`}
                  to={item.href}
                  className={`py-1 transition-colors ${hoverClasses}`}
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={`mobile-${idx}-${item.label}`}
                  href={location.pathname === "/" ? item.href : `/${item.href}`}
                  className={`py-1 transition-colors ${hoverClasses}`}
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  {item.label}
                </a>
              )
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href="/#contato"
              className={`w-full rounded-pill border px-4 py-2 text-center text-sm font-semibold ${buttonClasses}`}
              onClick={() => setIsMobileNavOpen(false)}
            >
              {lang === "pt" ? "Agendar Chamada" : "Schedule Call"}
            </a>
            <button
              type="button"
              onClick={() => setIsLanguageOpen((open) => !open)}
              className={`flex items-center justify-between rounded-pill border px-4 py-2 text-xs font-semibold ${langButtonClasses}`}
            >
              <span className="flex items-center gap-2">
                <span className={`flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border ${isDark ? "border-white/30 bg-white/10" : "border-gray-200 bg-white"}`}>
                  {currentLanguage === "pt" ? (
                    <img
                      src="/photos/brazil-flag.png"
                      alt="Portugues"
                      className="h-5 w-5 object-cover"
                    />
                  ) : (
                      <img src="/photos/us-flag.png" alt="English" className="h-4 w-4 rounded-full object-cover" />
                  )}
                </span>
                <span className="uppercase tracking-[0.12em]">
                  {currentLanguage === "pt" ? "PT" : "EN"}
                </span>
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
              <div className="rounded-2xl border border-gray-100 bg-white py-1 text-xs shadow-lg">
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
        </div>
      )}
    </header>
  );
};

export default Header;
