# Cazarini Coffee Trading

Marketing website for Cazarini Trading Company, a Brazilian coffee brokerage based in Varginha, Minas
Gerais, connecting coffee producers, exporters, and buyers worldwide. The site is a fully bilingual
(English / Portuguese) single-page application built with React and Vite.

## Tech stack

- **React 19** + **Vite 7** — UI and build tooling
- **React Router 7** — client-side routing, with parallel English/Portuguese URLs (e.g. `/varieties` ↔
  `/variedades`)
- **Tailwind CSS 3** — styling, with project-specific design tokens in `tailwind.config.js`
- **GSAP** (+ `ScrollTrigger`) — scroll-triggered entrance animations
- **react-hook-form** + **zod** — contact form state and validation
- **lucide-react** — icon set

## Getting started

```bash
npm install        # install dependencies
npm run dev         # start the dev server (Vite, with HMR)
npm run build        # production build to dist/
npm run preview      # preview the production build locally
npm run lint        # run ESLint
```

## Project structure

```
src/
  components/        # shared/reusable sections (Hero, Header, Footer, Stats, FAQ, ...)
  pages/             # route-level pages (Home, Varieties, Blog, Contact, legal pages, ...)
  translations/      # en.json / pt-br.json — all user-facing copy
  context/           # LanguageContext (current language + the t() translation function)
  hooks/             # useTranslation, useGsapFadeIn, etc.
  data/              # static content data (blog posts, etc.)
public/
  photos/            # images served as-is
  sitemap.xml, robots.txt
```

## Internationalization (i18n)

All user-facing copy lives in `src/translations/en.json` and `src/translations/pt-br.json`, with matching
nested keys in both files. Components read strings via the `useTranslation()` hook:

```jsx
import { useTranslation } from "../hooks/useTranslation";

const { t } = useTranslation();
t("hero.title"); // resolves to the current language's value at that key path
```

`LanguageContext` tracks the active language (persisted to `localStorage`, defaulting to English) and
exposes `t()`. If a key is missing in the current language, `t()` logs a warning and returns the key itself
rather than throwing, so a missing translation never breaks the page. Some pages with self-contained
bilingual content (e.g. `Varieties.jsx`, `Contact.jsx`) keep their copy in a local `{ en: {...}, pt: {...} }`
object instead of the global JSON files — this is intentional for content that's tightly coupled to that
page's own data.

When adding new user-facing text, add the key to **both** `en.json` and `pt-br.json` rather than hardcoding
a string or a `lang === "x" ? ... : ...` ternary.

## SEO

`src/components/SEO.jsx` is mounted per-page and manages `<title>`, meta description/keywords, Open Graph
and Twitter Card tags, canonical URL, hreflang alternate links (`en` / `pt-BR` / `x-default`), and an
optional JSON-LD structured-data payload (see its usage in `src/pages/Home.jsx` for `Organization` and
`FAQPage` schema). `public/sitemap.xml` and `public/robots.txt` are served as static files.

## Deployment

Deployed on Vercel (see `vercel.json`) as a static SPA build: `npm run build` outputs to `dist/`, and all
routes rewrite to `index.html` so client-side routing works on direct/refresh navigation.
