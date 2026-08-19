import React, { createContext, useState, useContext, useEffect } from "react";
import enTranslations from "../translations/en.json";
import ptBrTranslations from "../translations/pt-br.json";

const translations = {
  en: enTranslations,
  "pt-br": ptBrTranslations,
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Try to get language from localStorage, default to 'en'
    return localStorage.getItem("language") || "en";
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem("language", language);
    
    // Update HTML lang attribute
    document.documentElement.lang = language === "pt-br" ? "pt-BR" : "en";
  }, [language]);

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation missing for key: ${key} in language: ${language}`);
        return key;
      }
    }

    return value;
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "pt-br" : "en"));
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    isPortuguese: language === "pt-br",
    isEnglish: language === "en",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

