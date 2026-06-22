import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getLanguageForPath } from "../utils/localeRoutes";

// Makes the URL authoritative for language on bilingual routes: visiting a
// /pt-br or /quem-somos-style URL cold (no localStorage, e.g. any crawler)
// must render in Portuguese, not whatever was last saved. Runs in
// useLayoutEffect (not useEffect) so the correction happens before paint.
export const LanguageRouteSync = () => {
  const location = useLocation();
  const { language, setLanguage } = useLanguage();

  useLayoutEffect(() => {
    const lang = getLanguageForPath(location.pathname);
    if (lang && lang !== language) {
      setLanguage(lang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return null;
};

export default LanguageRouteSync;
