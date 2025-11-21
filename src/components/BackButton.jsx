import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export const BackButton = () => {
  const { isPortuguese } = useLanguage();
  
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-2 text-sm font-medium text-brand-900 transition hover:text-accent-green"
    >
      <svg
        className="h-5 w-5 transition-transform group-hover:-translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      {isPortuguese ? "Voltar para Home" : "Back to Home"}
    </Link>
  );
};

