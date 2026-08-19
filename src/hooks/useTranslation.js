import { useLanguage } from "../context/LanguageContext";

export const useTranslation = () => {
  const { t, language, toggleLanguage, isPortuguese, isEnglish } = useLanguage();
  
  return {
    t,
    language,
    toggleLanguage,
    isPortuguese,
    isEnglish,
  };
};

