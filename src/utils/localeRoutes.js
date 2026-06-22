// Single source of truth for bilingual route pairs (en <-> pt-BR).
// Consumed by SEO.jsx (hreflang), Header.jsx/HeroSection.jsx (toggle navigation),
// and LanguageRouteSync.jsx (deriving language from the current URL).

export const BLOG_PT_PREFIX = "/blog/pt-br";

// Static pairs: every entry is keyed by BOTH its own path and its sibling's path,
// pointing at the same { en, pt } pair object.
const PAIRS = [
  ["/who-we-are", "/quem-somos"],
  ["/varieties", "/variedades"],
  ["/gallery", "/galeria"],
  ["/contact", "/contato"],
  ["/privacy-policy", "/politica-de-privacidade"],
  ["/email-policy", "/politica-de-email"],
];

const STATIC_ALTERNATES = PAIRS.reduce((map, [en, pt]) => {
  map[en] = { en, pt };
  map[pt] = { en, pt };
  return map;
}, {});

// Returns { isBlog: true, isPt, slug } for any /blog* path, otherwise null.
function parseBlogPath(pathname) {
  if (pathname === "/blog") return { isBlog: true, isPt: false, slug: null };
  if (pathname === BLOG_PT_PREFIX) return { isBlog: true, isPt: true, slug: null };
  if (pathname.startsWith(`${BLOG_PT_PREFIX}/`)) {
    return { isBlog: true, isPt: true, slug: pathname.slice(`${BLOG_PT_PREFIX}/`.length) };
  }
  if (pathname.startsWith("/blog/")) {
    return { isBlog: true, isPt: false, slug: pathname.slice("/blog/".length) };
  }
  return null;
}

// getAlternates(pathname) => { en: string, pt: string } | null
// null means the route has no bilingual sibling (e.g. "/", "/insights", "/copyright").
export function getAlternates(pathname) {
  const blog = parseBlogPath(pathname);
  if (blog) {
    const { slug } = blog;
    return slug
      ? { en: `/blog/${slug}`, pt: `${BLOG_PT_PREFIX}/${slug}` }
      : { en: "/blog", pt: BLOG_PT_PREFIX };
  }
  return STATIC_ALTERNATES[pathname] || null;
}

// getLanguageForPath(pathname) => 'en' | 'pt-br' | null
// null means "this route carries no language signal" — callers should leave
// the current language preference untouched.
export function getLanguageForPath(pathname) {
  const blog = parseBlogPath(pathname);
  if (blog) return blog.isPt ? "pt-br" : "en";

  const alt = STATIC_ALTERNATES[pathname];
  if (!alt) return null;
  return pathname === alt.pt ? "pt-br" : "en";
}

// getAlternatePath(pathname, targetLang) => string
// Where the toggle should navigate FROM the current path TO show targetLang
// ('en' | 'pt-br'). Falls back to the same pathname when there's no sibling.
export function getAlternatePath(pathname, targetLang) {
  const alternates = getAlternates(pathname);
  if (!alternates) return pathname;
  return targetLang === "pt-br" ? alternates.pt : alternates.en;
}
