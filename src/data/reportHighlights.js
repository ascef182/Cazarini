// "O que já foi feito" timeline shown on /relatorio, alongside the real
// GA4 numbers, so Thiago can correlate a traffic change with a specific
// action. Add one entry per change, in chronological order (oldest first
// or newest first — the UI sorts by date).
//
// category: "seo" | "geo-local" | "geo-ia" | "insight"
//
// "insight" is for data findings pulled from GA4 itself (traffic milestones,
// discoveries in the numbers) rather than a change we shipped — keep these
// factual and tied to a specific number so they age well.
//
// NOTE: entries before 2026-08-18 are not in this file yet — this is when
// the dashboard itself was built. Backfill the first ~2 months of work
// here with real dates so the "before" period of the contract is fully
// represented, not just what shipped alongside the dashboard.
export const reportHighlights = [
  {
    date: "2026-08-19",
    category: "insight",
    title: "Primeiro corte de dados reais: 298 sessões no período",
    description:
      "298 sessões, 282 usuários e 432 pageviews nos últimos 60 dias, com 41,9% de engajamento — baseline medido pelo GA4 para comparar o impacto das próximas ações de SEO/GEO.",
  },
  {
    date: "2026-08-19",
    category: "insight",
    title: "Alcance internacional confirmado: visitantes em 9+ países",
    description:
      "Geolocalização do GA4 mostra tráfego orgânico vindo de Estados Unidos, França, Brasil, Singapura, Irlanda, Países Baixos e outros — sinal de que o conteúdo em inglês e o SEO técnico já estão sendo indexados fora do Brasil.",
  },
  {
    date: "2026-08-19",
    category: "insight",
    title: "Achado: URLs legadas (.php) ainda recebendo tráfego",
    description:
      "/empresa.php, /local.php, /br/ e /careers seguem entre as páginas mais visitadas — tráfego herdado de backlinks e resultados antigos do Google. Redirecionamentos 301 configurados para essas rotas, preservando o SEO acumulado.",
  },
  {
    date: "2026-08-18",
    category: "seo",
    title: "Schema LocalBusiness + BreadcrumbList",
    description:
      "Organization/LocalBusiness JSON-LD ampliado (telefone, geo, redes sociais) e BreadcrumbList adicionado às páginas de conteúdo (Qualidades, Blog, Galeria, Quem Somos).",
  },
  {
    date: "2026-08-18",
    category: "geo-ia",
    title: "FAQ ampliado para busca por IA",
    description:
      "Novas perguntas no FAQPage (localização, anos de experiência, variedades/certificações) — alimenta tanto o Google quanto respostas de ChatGPT/Perplexity/Gemini.",
  },
  {
    date: "2026-08-18",
    category: "geo-ia",
    title: "llms.txt enriquecido com fatos citáveis",
    description:
      "Números e fatos concretos da empresa (fundação, experiência, parceiros, certificações) adicionados ao llms.txt para facilitar a citação por IAs generativas.",
  },
  {
    date: "2026-08-18",
    category: "geo-ia",
    title: "robots.txt liberado para mais bots de IA",
    description:
      "Adicionados OAI-SearchBot (busca do ChatGPT), Amazonbot e Meta-ExternalAgent à lista de crawlers de IA já permitidos (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot).",
  },
  {
    date: "2026-08-18",
    category: "seo",
    title: "Dashboard de acompanhamento no ar",
    description:
      "Página privada /relatorio publicada, puxando dados reais do Google Analytics (GA4) via API para acompanhar o progresso mês a mês.",
  },
];
