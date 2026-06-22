import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://www.cazarini.com";

// Bilingual route pairs, used to compute hreflang alternate links per page.
const ROUTE_ALTERNATES = {
  "/who-we-are": { en: "/who-we-are", pt: "/quem-somos" },
  "/quem-somos": { en: "/who-we-are", pt: "/quem-somos" },
  "/varieties": { en: "/varieties", pt: "/variedades" },
  "/variedades": { en: "/varieties", pt: "/variedades" },
  "/gallery": { en: "/gallery", pt: "/galeria" },
  "/galeria": { en: "/gallery", pt: "/galeria" },
  "/contact": { en: "/contact", pt: "/contato" },
  "/contato": { en: "/contact", pt: "/contato" },
  "/privacy-policy": { en: "/privacy-policy", pt: "/politica-de-privacidade" },
  "/politica-de-privacidade": { en: "/privacy-policy", pt: "/politica-de-privacidade" },
  "/email-policy": { en: "/email-policy", pt: "/politica-de-email" },
  "/politica-de-email": { en: "/email-policy", pt: "/politica-de-email" },
};

export const SEO = ({ title, description, keywords, ogImage = '', canonical = '', jsonLd = null }) => {
  const location = useLocation();

  useEffect(() => {
    // Update title
    if (title) {
      document.title = title;
    }

    // Update meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = description;
    }

    // Update keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = keywords;
    }

    // Update Open Graph tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage || '/photos/trend.jpg' },
      { property: 'og:url', content: `${window.location.origin}${location.pathname}` },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: document.documentElement.lang === 'pt-BR' ? 'pt_BR' : 'en_US' },
      { property: 'og:locale:alternate', content: document.documentElement.lang === 'pt-BR' ? 'en_US' : 'pt_BR' },
    ];

    ogTags.forEach(({ property, content }) => {
      if (content) {
        let metaTag = document.querySelector(`meta[property="${property}"]`);
        if (!metaTag) {
          metaTag = document.createElement('meta');
          metaTag.setAttribute('property', property);
          document.head.appendChild(metaTag);
        }
        metaTag.content = content;
      }
    });

    // Update Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage || '/photos/trend.jpg' },
    ];

    twitterTags.forEach(({ name, content }) => {
      if (content) {
        let metaTag = document.querySelector(`meta[name="${name}"]`);
        if (!metaTag) {
          metaTag = document.createElement('meta');
          metaTag.name = name;
          document.head.appendChild(metaTag);
        }
        metaTag.content = content;
      }
    });

    // Update canonical URL (defaults to the current path when not explicitly provided)
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = canonical || `${SITE_URL}${location.pathname}`;

    // Update hreflang alternate links (en / pt-BR / x-default)
    const alternates = ROUTE_ALTERNATES[location.pathname] || { en: location.pathname, pt: location.pathname };
    const hreflangLinks = [
      { hreflang: 'en', href: `${SITE_URL}${alternates.en}` },
      { hreflang: 'pt-BR', href: `${SITE_URL}${alternates.pt}` },
      { hreflang: 'x-default', href: `${SITE_URL}${alternates.en}` },
    ];

    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    hreflangLinks.forEach(({ hreflang, href }) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hreflang;
      link.href = href;
      document.head.appendChild(link);
    });

    // Update JSON-LD structured data
    let jsonLdScript = document.getElementById('seo-jsonld');
    if (jsonLd) {
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.id = 'seo-jsonld';
        jsonLdScript.type = 'application/ld+json';
        document.head.appendChild(jsonLdScript);
      }
      jsonLdScript.textContent = JSON.stringify(jsonLd);
    } else if (jsonLdScript) {
      jsonLdScript.remove();
    }
  }, [title, description, keywords, ogImage, canonical, jsonLd, location.pathname]);

  return null;
};

