import { BLOG_PT_PREFIX } from "./localeRoutes";

const SITE_URL = "https://www.cazarini.com";

// schema.org Organization + LocalBusiness for Cazarini Trading Company.
// Used on the Home page JSON-LD @graph. Coordinates are the exact Google
// Maps pin for "Cazarini Trading Company", taken from the embed already
// used in src/pages/Contact.jsx (place id 0x94ca9279d76da9d9...).
export function buildOrganizationJsonLd() {
  return {
    "@type": ["Organization", "LocalBusiness"],
    name: "Cazarini Trading Company",
    url: SITE_URL,
    logo: `${SITE_URL}/photos/Logomarca-Cazarini-12.09.13.svg`,
    email: "trading@cazarini.com",
    telephone: "+55 35 98416-0810",
    foundingDate: "2009",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Alameda do Café, 317 - Industrial Reinaldo Foresti",
      addressLocality: "Varginha",
      addressRegion: "MG",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -21.57376150657078,
      longitude: -45.43728584603923,
    },
    sameAs: [
      "https://www.linkedin.com/in/thiago-marques-cazarini-903a96b/",
      "https://www.facebook.com/CazariniTradingCompany/",
      "https://www.instagram.com/cazarinitrading/",
    ],
  };
}

// schema.org BreadcrumbList for a page's position in the site hierarchy.
// items: [{ name: string, path: string }], in order from Home to current page.
export function buildBreadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

// schema.org BlogPosting for a single blog post, reusing the same
// Organization identity already used for the Home page JSON-LD. No
// "@context" here — the caller nests this inside a "@graph" alongside
// buildBreadcrumbJsonLd(), which carries the context.
export function buildBlogPostingJsonLd(post, isPortuguese) {
  const headline = isPortuguese && post.titlePt ? post.titlePt : post.title;
  const description = isPortuguese && post.previewPt ? post.previewPt : post.preview;
  const articleSection = isPortuguese && post.categoryPt ? post.categoryPt : post.category;
  const path = isPortuguese ? `${BLOG_PT_PREFIX}/${post.slug}` : `/blog/${post.slug}`;
  const datePublished = new Date(post.date).toISOString();

  return {
    "@type": "BlogPosting",
    headline,
    description,
    image: `${SITE_URL}${post.image}`,
    datePublished,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Cazarini Trading Company",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/photos/Logomarca-Cazarini-12.09.13.svg`,
      },
    },
    articleSection,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${path}`,
    },
    inLanguage: isPortuguese ? "pt-BR" : "en",
  };
}
