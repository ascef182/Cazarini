import { BLOG_PT_PREFIX } from "./localeRoutes";

const SITE_URL = "https://www.cazarini.com";

// schema.org BlogPosting for a single blog post, reusing the same
// Organization identity already used for the Home page JSON-LD.
export function buildBlogPostingJsonLd(post, isPortuguese) {
  const headline = isPortuguese && post.titlePt ? post.titlePt : post.title;
  const description = isPortuguese && post.previewPt ? post.previewPt : post.preview;
  const articleSection = isPortuguese && post.categoryPt ? post.categoryPt : post.category;
  const path = isPortuguese ? `${BLOG_PT_PREFIX}/${post.slug}` : `/blog/${post.slug}`;
  const datePublished = new Date(post.date).toISOString();

  return {
    "@context": "https://schema.org",
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
