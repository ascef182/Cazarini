import React, { useCallback, useEffect, useState } from "react";
import {
  Lock,
  RefreshCw,
  Users,
  Eye,
  Clock,
  Target,
  Globe2,
  Bot,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Smartphone,
  Monitor,
  Tablet,
  Repeat2,
  UserPlus,
  Percent,
  Download,
  FileDown,
  Newspaper,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { reportHighlights } from "../data/reportHighlights";

const TOKEN_STORAGE_KEY = "cazarini_relatorio_token";

// HTTP headers only accept ISO-8859-1 (Latin-1, 0x20-0xFF minus a few
// controls). Pasting a token from an app with typographic autocorrect
// (curly quotes, em dash, a stray zero-width space) produces a value
// fetch() rejects outright with an opaque browser TypeError. Catch that
// client-side with a clear message instead of letting it surface as a
// generic network error.
const TOKEN_SAFE_PATTERN = /^[\x21-\x7E]+$/;

// Lock the dashboard again after this much inactivity (mouse/scroll/key/click)
// — the shared magic link (see the mount effect below) makes re-opening it
// cheap, so a short window here is a fair trade for content behind a
// shared-secret token.
const INACTIVITY_LOCK_MS = 2.5 * 60 * 1000; // 2m30s

const DATE_PRESETS = [
  { days: 7, label: "7 dias" },
  { days: 30, label: "30 dias" },
  { days: 60, label: "60 dias" },
  { days: 90, label: "90 dias" },
];
const DEFAULT_PRESET_DAYS = 60;

function presetRange(days) {
  return { startDate: `${days}daysAgo`, endDate: "today" };
}

const CATEGORY_LABELS = {
  seo: "SEO",
  "geo-local": "GEO Local",
  "geo-ia": "GEO / IA",
  insight: "Insight de Dados",
};

const CATEGORY_COLORS = {
  seo: "bg-accent-blue/10 text-accent-blue",
  "geo-local": "bg-accent-green/10 text-brand-900",
  "geo-ia": "bg-accent-purple/10 text-accent-purple",
  insight: "bg-accent-orange/10 text-accent-orange",
};

// GA4 returns dates as "YYYYMMDD" strings — format as "dd/mm" for charts.
function formatGaDate(value) {
  if (!value || value.length !== 8) return value;
  return `${value.slice(6, 8)}/${value.slice(4, 6)}`;
}

function formatNumber(value) {
  return new Intl.NumberFormat("pt-BR").format(Math.round(value || 0));
}

function formatPercent(value) {
  return `${((value || 0) * 100).toFixed(1)}%`;
}

function formatDuration(seconds) {
  const total = Math.round(seconds || 0);
  const min = Math.floor(total / 60);
  const sec = total % 60;
  return `${min}m ${sec}s`;
}

// "YYYY-MM-DD" -> "DD/MM/YYYY", parsed as a local calendar date (not UTC)
// so it never shifts a day in timezones behind UTC (e.g. Brazil).
function formatHighlightDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("pt-BR");
}

function formatDateTime(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

// Wraps a CSV field in quotes and escapes embedded quotes only when needed
// (commas, quotes, or newlines in the value) — keeps plain numbers/dates
// unquoted for a smaller, more readable file.
function csvField(value) {
  const str = String(value ?? "");
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

function csvRow(values) {
  return values.map(csvField).join(",");
}

function buildReportCsv(data) {
  const lines = [
    "Relatório Cazarini — Resumo",
    csvRow(["Período", `${data.range.startDate} a ${data.range.endDate}`]),
    csvRow(["Gerado em", data.generatedAt]),
    "",
    "Métrica,Valor",
    csvRow(["Sessões", data.totals.sessions]),
    csvRow(["Usuários", data.totals.totalUsers]),
    csvRow(["Pageviews", data.totals.screenPageViews]),
    csvRow(["Engajamento", formatPercent(data.totals.avgEngagementRate)]),
    csvRow(["Duração média", formatDuration(data.totals.avgSessionDurationSeconds)]),
    csvRow(["Leads (generate_lead)", data.totals.generateLeadEvents]),
    csvRow(["Taxa de conversão", formatPercent(data.totals.conversionRate)]),
    "",
    "Sessões por dia",
    csvRow(["Data", "Sessões", "Usuários", "Pageviews"]),
    ...(data.trend || []).map((d) =>
      csvRow([d.date, d.sessions || 0, d.totalUsers || 0, d.screenPageViews || 0])
    ),
    "",
    "Páginas mais visitadas",
    csvRow(["Página", "Pageviews", "Sessões"]),
    ...(data.topPages || []).map((p) => csvRow([p.pagePath, p.screenPageViews || 0, p.sessions || 0])),
    "",
    "Posts do blog",
    csvRow(["Página", "Pageviews", "Sessões"]),
    ...(data.blogPosts || []).map((p) => csvRow([p.pagePath, p.screenPageViews || 0, p.sessions || 0])),
    "",
    "De onde vêm os visitantes",
    csvRow(["Cidade", "País", "Usuários ativos"]),
    ...(data.geography || []).map((g) => csvRow([g.city || "", g.country, g.activeUsers || 0])),
  ];
  return lines.join("\n");
}

// Client-side CSV download of the already-loaded report — no server
// round-trip, so it works offline from what's on screen. Prefixed with a
// UTF-8 BOM so Excel on Windows (Thiago's likely reader) renders the
// accented Portuguese labels correctly instead of mangling them.
function downloadReportCsv(data) {
  const csv = buildReportCsv(data);
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `relatorio-cazarini_${data.range.startDate}_a_${data.range.endDate}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// changePct: fraction (0.25 = +25%) vs. the previous period, or
// null/undefined when there's no baseline to compare against.
const ChangeBadge = ({ changePct }) => {
  if (changePct === null || changePct === undefined) return null;
  const isUp = changePct >= 0;
  const Icon = isUp ? TrendingUp : TrendingDown;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold ${
        isUp ? "text-accent-green" : "text-accent-orange"
      }`}
    >
      <Icon className="h-3 w-3" />
      {isUp ? "+" : ""}
      {(changePct * 100).toFixed(1)}%
    </span>
  );
};

const StatCard = ({ icon, label, value, hint, changePct }) => {
  const Icon = icon;
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-green/10 text-brand-900">
          <Icon className="h-5 w-5" />
        </div>
        <ChangeBadge changePct={changePct} />
      </div>
      <p className="text-2xl font-bold text-brand-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  );
};

const PasswordGate = ({ onSubmit, loading, error }) => {
  const [value, setValue] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(value);
        }}
        className="w-full max-w-sm rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/50"
      >
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-900 text-white">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="mb-2 text-xl font-bold text-brand-900">
          Relatório Cazarini
        </h1>
        <p className="mb-6 text-sm text-gray-500">
          Acesso restrito. Informe o token de acesso para ver o dashboard.
        </p>
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Token de acesso"
          className="w-full rounded-xl border-none bg-gray-50 px-5 py-4 text-sm outline-none transition-all focus:ring-2 focus:ring-accent-green"
          autoFocus
        />
        {error && (
          <p className="mt-3 text-xs text-red-500">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading || !value}
          className="mt-6 w-full rounded-xl bg-accent-green py-4 text-sm font-bold text-brand-900 transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Verificando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export const Relatorio = () => {
  const [token, setToken] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  // The date range currently shown — either a preset (activePresetDays set)
  // or a custom start/end (activePresetDays null). Drives the header label,
  // the "Atualizar" refetch, and CSV/PDF export filenames.
  const [range, setRange] = useState(presetRange(DEFAULT_PRESET_DAYS));
  const [activePresetDays, setActivePresetDays] = useState(DEFAULT_PRESET_DAYS);
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [customRangeError, setCustomRangeError] = useState(null);

  // Keep this page out of the index and off the public SPA head tags —
  // cleaned up on unmount so it never "leaks" into the next page visited.
  useEffect(() => {
    document.title = "Relatório | Cazarini Trading Company";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const fetchReport = useCallback(async (candidateToken, candidateRange) => {
    const token = candidateToken.trim();
    const requestRange = candidateRange || presetRange(DEFAULT_PRESET_DAYS);

    setLoading(true);
    setAuthError(null);
    setLoadError(null);

    if (!TOKEN_SAFE_PATTERN.test(token)) {
      setLoading(false);
      setAuthorized(false);
      setAuthError(
        "Token contém caracteres inválidos — copie novamente, direto do painel da Vercel, sem colar por um app com autocorreção de texto."
      );
      return;
    }

    try {
      const params = new URLSearchParams({
        startDate: requestRange.startDate,
        endDate: requestRange.endDate,
      });
      const res = await fetch(`/api/analytics-report?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        sessionStorage.removeItem(TOKEN_STORAGE_KEY);
        setAuthorized(false);
        setAuthError("Token incorreto. Tente novamente.");
        return;
      }
      if (!res.ok) throw new Error(`request_failed_${res.status}`);

      const json = await res.json();
      setData(json);
      setAuthorized(true);
      sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
    } catch (err) {
      console.error("Failed to load /relatorio data", err);
      setLoadError(
        "Não foi possível carregar os dados agora. Verifique sua conexão e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Mount: authenticate from a magic link (?token=...) if present, otherwise
  // from the token saved in this tab's sessionStorage. A URL token is
  // stripped from the address bar right after being read, so it doesn't
  // linger in browser history or leak via the Referer header on an outbound
  // link click — sessionStorage (set inside fetchReport, on success) is
  // what makes the link double as "stay logged in for this tab".
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    if (urlToken) {
      params.delete("token");
      const rest = params.toString();
      window.history.replaceState(
        {},
        "",
        window.location.pathname + (rest ? `?${rest}` : "")
      );
    }

    const candidate = urlToken || sessionStorage.getItem(TOKEN_STORAGE_KEY);
    if (candidate) {
      setToken(candidate);
      fetchReport(candidate, presetRange(DEFAULT_PRESET_DAYS));
    }
  }, [fetchReport]);

  // Auto-lock after INACTIVITY_LOCK_MS of no mouse/scroll/key/click activity.
  // Re-opening the saved magic link (or re-typing the token) re-authenticates
  // in one step, so a short window here is a reasonable trade for content
  // sitting behind a single shared-secret token.
  useEffect(() => {
    if (!authorized) return undefined;

    let timer;
    const lock = () => {
      sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      setAuthorized(false);
      setToken(null);
      setData(null);
    };
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(lock, INACTIVITY_LOCK_MS);
    };

    const activityEvents = ["mousemove", "scroll", "keydown", "click"];
    activityEvents.forEach((evt) => window.addEventListener(evt, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timer);
      activityEvents.forEach((evt) => window.removeEventListener(evt, resetTimer));
    };
  }, [authorized]);

  const handleTokenSubmit = (value) => {
    setToken(value);
    fetchReport(value, range);
  };

  const handlePresetClick = (days) => {
    const next = presetRange(days);
    setActivePresetDays(days);
    setCustomRangeError(null);
    setRange(next);
    if (token) fetchReport(token, next);
  };

  const handleCustomRangeApply = () => {
    if (!customStart || !customEnd) return;
    if (customStart > customEnd) {
      setCustomRangeError("A data inicial precisa ser antes da data final.");
      return;
    }
    setCustomRangeError(null);
    const next = { startDate: customStart, endDate: customEnd };
    setActivePresetDays(null);
    setRange(next);
    if (token) fetchReport(token, next);
  };

  if (!authorized) {
    return (
      <PasswordGate
        onSubmit={handleTokenSubmit}
        loading={loading}
        error={authError}
      />
    );
  }

  const topChannel = data?.channels?.[0];
  const rangeLabel = activePresetDays
    ? `últimos ${activePresetDays} dias`
    : `${formatHighlightDate(range.startDate)} a ${formatHighlightDate(range.endDate)}`;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-4 py-8 sm:px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <img
              src="/photos/Logomarca-Cazarini-12.09.13.svg"
              alt="Cazarini logo"
              className="h-8 w-auto object-contain"
            />
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Relatório de Performance
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-bold text-brand-900 sm:text-3xl">
              SEO, GEO &amp; IA Recognition — {rangeLabel}
            </h1>
            <div className="flex flex-wrap items-center gap-2 print:hidden">
              <button
                onClick={() => data && downloadReportCsv(data)}
                disabled={!data}
                className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-500 transition hover:border-brand-900 hover:text-brand-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download className="h-3.5 w-3.5" />
                CSV
              </button>
              <button
                onClick={() => window.print()}
                disabled={!data}
                className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-500 transition hover:border-brand-900 hover:text-brand-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FileDown className="h-3.5 w-3.5" />
                PDF
              </button>
              <button
                onClick={() => token && fetchReport(token, range)}
                className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-500 transition hover:border-brand-900 hover:text-brand-900"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                Atualizar
              </button>
            </div>
          </div>

          {/* Date range: presets + custom start/end */}
          <div className="flex flex-wrap items-center gap-2 pt-2 print:hidden">
            {DATE_PRESETS.map((preset) => (
              <button
                key={preset.days}
                onClick={() => handlePresetClick(preset.days)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  activePresetDays === preset.days
                    ? "bg-brand-900 text-white"
                    : "border border-gray-200 text-gray-500 hover:border-brand-900 hover:text-brand-900"
                }`}
              >
                {preset.label}
              </button>
            ))}
            <span className="mx-1 h-4 w-px bg-gray-200" aria-hidden="true" />
            <input
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-brand-900"
              aria-label="Data inicial"
            />
            <span className="text-xs text-gray-400">até</span>
            <input
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-brand-900"
              aria-label="Data final"
            />
            <button
              onClick={handleCustomRangeApply}
              disabled={!customStart || !customEnd}
              className="rounded-full bg-accent-green px-4 py-1.5 text-xs font-bold text-brand-900 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Aplicar
            </button>
          </div>
          {customRangeError && (
            <p className="text-xs text-red-500">{customRangeError}</p>
          )}

          {data?.generatedAt && (
            <p className="text-xs text-gray-400">
              Dados reais do Google Analytics — atualizado em {formatDateTime(data.generatedAt)}
            </p>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] space-y-10 px-4 py-10 sm:px-6 lg:px-10">
        {loadError && (
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{loadError}</p>
          </div>
        )}

        {loading && !data && (
          <p className="text-sm text-gray-400">Carregando dados do Analytics...</p>
        )}

        {data && (
          <>
            {/* Stat cards */}
            <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
              <StatCard
                icon={Users}
                label="Sessões"
                value={formatNumber(data.totals.sessions)}
                changePct={data.periodComparison?.changePct?.sessions}
              />
              <StatCard
                icon={Users}
                label="Usuários"
                value={formatNumber(data.totals.totalUsers)}
                changePct={data.periodComparison?.changePct?.totalUsers}
              />
              <StatCard
                icon={Eye}
                label="Pageviews"
                value={formatNumber(data.totals.screenPageViews)}
                changePct={data.periodComparison?.changePct?.screenPageViews}
              />
              <StatCard
                icon={TrendingUp}
                label="Engajamento"
                value={formatPercent(data.totals.avgEngagementRate)}
              />
              <StatCard
                icon={Clock}
                label="Duração média"
                value={formatDuration(data.totals.avgSessionDurationSeconds)}
              />
              <StatCard
                icon={Target}
                label="Leads (generate_lead)"
                value={formatNumber(data.totals.generateLeadEvents)}
                changePct={data.periodComparison?.changePct?.generateLeadEvents}
              />
              <StatCard
                icon={Percent}
                label="Taxa de conversão"
                value={formatPercent(data.totals.conversionRate)}
                hint="Leads ÷ sessões"
              />
            </section>
            {data.periodComparison && (
              <p className="-mt-6 text-xs text-gray-400">
                Variação vs. período anterior equivalente ({formatHighlightDate(data.periodComparison.previousRange.startDate)}{" "}
                a {formatHighlightDate(data.periodComparison.previousRange.endDate)}).
              </p>
            )}

            {/* Trend chart */}
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-1 text-lg font-bold text-brand-900">Sessões e usuários por dia</h2>
              <p className="mb-6 text-sm text-gray-500">
                Período selecionado ({rangeLabel}), direto da API do Google Analytics.
              </p>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={data.trend}>
                  <defs>
                    <linearGradient id="sessionsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#99CF62" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#99CF62" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#45A6DD" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#45A6DD" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F3F3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatGaDate}
                    tick={{ fontSize: 11, fill: "#878C91" }}
                    axisLine={false}
                    tickLine={false}
                    minTickGap={24}
                  />
                  <YAxis tick={{ fontSize: 11, fill: "#878C91" }} axisLine={false} tickLine={false} />
                  <Tooltip labelFormatter={formatGaDate} />
                  <Area
                    type="monotone"
                    dataKey="sessions"
                    name="Sessões"
                    stroke="#99CF62"
                    fill="url(#sessionsGradient)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="totalUsers"
                    name="Usuários"
                    stroke="#45A6DD"
                    fill="url(#usersGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </section>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Channels */}
              <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-1 text-lg font-bold text-brand-900">Canais de aquisição</h2>
                <p className="mb-6 text-sm text-gray-500">
                  {topChannel
                    ? `Organic Search é ${topChannel.sessionDefaultChannelGroup === "Organic Search" ? "o principal canal" : "acompanhado de perto"}.`
                    : "Distribuição de sessões por canal."}
                </p>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={data.channels} layout="vertical" margin={{ left: 24 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F3F3" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "#878C91" }} axisLine={false} tickLine={false} />
                    <YAxis
                      type="category"
                      dataKey="sessionDefaultChannelGroup"
                      tick={{ fontSize: 11, fill: "#3E4248" }}
                      axisLine={false}
                      tickLine={false}
                      width={110}
                    />
                    <Tooltip />
                    <Bar dataKey="sessions" name="Sessões" radius={[0, 6, 6, 0]}>
                      {data.channels.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={entry.sessionDefaultChannelGroup === "Organic Search" ? "#99CF62" : "#D8DADE"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </section>

              {/* Language split */}
              <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-1 text-lg font-bold text-brand-900">Idioma do site (EN vs PT-BR)</h2>
                <p className="mb-6 text-sm text-gray-500">
                  Sessões por idioma, calculado a partir das rotas visitadas.
                </p>
                {(() => {
                  const en = data.languageSplit?.en || 0;
                  const pt = data.languageSplit?.["pt-br"] || 0;
                  const total = en + pt || 1;
                  return (
                    <div className="space-y-5">
                      <div>
                        <div className="mb-1 flex justify-between text-sm">
                          <span className="font-semibold text-brand-900">English</span>
                          <span className="text-gray-500">{formatNumber(en)} sessões</span>
                        </div>
                        <div className="h-3 rounded-full bg-gray-100">
                          <div
                            className="h-3 rounded-full bg-accent-blue"
                            style={{ width: `${(en / total) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between text-sm">
                          <span className="font-semibold text-brand-900">Português (PT-BR)</span>
                          <span className="text-gray-500">{formatNumber(pt)} sessões</span>
                        </div>
                        <div className="h-3 rounded-full bg-gray-100">
                          <div
                            className="h-3 rounded-full bg-accent-green"
                            style={{ width: `${(pt / total) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </section>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Device breakdown */}
              <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-1 text-lg font-bold text-brand-900">Dispositivo</h2>
                <p className="mb-6 text-sm text-gray-500">Sessões por tipo de dispositivo.</p>
                {(() => {
                  const DEVICE_ICONS = { desktop: Monitor, mobile: Smartphone, tablet: Tablet };
                  const DEVICE_LABELS = { desktop: "Desktop", mobile: "Mobile", tablet: "Tablet" };
                  const devices = data.deviceBreakdown || [];
                  const total = devices.reduce((sum, d) => sum + (d.sessions || 0), 0) || 1;
                  return (
                    <div className="space-y-5">
                      {devices.map((d, i) => {
                        const Icon = DEVICE_ICONS[d.deviceCategory] || Monitor;
                        return (
                          <div key={i}>
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span className="flex items-center gap-2 font-semibold text-brand-900">
                                <Icon className="h-4 w-4 text-gray-400" />
                                {DEVICE_LABELS[d.deviceCategory] || d.deviceCategory}
                              </span>
                              <span className="text-gray-500">{formatNumber(d.sessions)} sessões</span>
                            </div>
                            <div className="h-3 rounded-full bg-gray-100">
                              <div
                                className="h-3 rounded-full bg-accent-purple"
                                style={{ width: `${((d.sessions || 0) / total) * 100}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </section>

              {/* New vs returning */}
              <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-1 text-lg font-bold text-brand-900">Novos vs. recorrentes</h2>
                <p className="mb-6 text-sm text-gray-500">
                  Sessões de visitantes novos vs. quem já havia visitado antes.
                </p>
                {(() => {
                  const NVR_ICONS = { new: UserPlus, returning: Repeat2 };
                  const NVR_LABELS = { new: "Novos", returning: "Recorrentes" };
                  const rows = data.newVsReturning || [];
                  const total = rows.reduce((sum, r) => sum + (r.sessions || 0), 0) || 1;
                  return (
                    <div className="space-y-5">
                      {rows.map((r, i) => {
                        const Icon = NVR_ICONS[r.newVsReturning] || UserPlus;
                        return (
                          <div key={i}>
                            <div className="mb-1 flex items-center justify-between text-sm">
                              <span className="flex items-center gap-2 font-semibold text-brand-900">
                                <Icon className="h-4 w-4 text-gray-400" />
                                {NVR_LABELS[r.newVsReturning] || r.newVsReturning}
                              </span>
                              <span className="text-gray-500">{formatNumber(r.sessions)} sessões</span>
                            </div>
                            <div className="h-3 rounded-full bg-gray-100">
                              <div
                                className="h-3 rounded-full bg-accent-blue"
                                style={{ width: `${((r.sessions || 0) / total) * 100}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </section>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Top pages */}
              <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-brand-900">Páginas mais visitadas</h2>
                <ul className="space-y-3">
                  {(data.topPages || []).slice(0, 10).map((page, i) => (
                    <li key={i} className="flex items-center justify-between gap-4 text-sm">
                      <span className="truncate text-gray-600">{page.pagePath}</span>
                      <span className="shrink-0 font-semibold text-brand-900">
                        {formatNumber(page.screenPageViews)}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Geography */}
              <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <Globe2 className="h-4 w-4 text-accent-green" />
                  <h2 className="text-lg font-bold text-brand-900">De onde vêm os visitantes</h2>
                </div>
                <ul className="space-y-3">
                  {(data.geography || []).slice(0, 10).map((row, i) => (
                    <li key={i} className="flex items-center justify-between gap-4 text-sm">
                      <span className="truncate text-gray-600">
                        {row.city ? `${row.city}, ` : ""}
                        {row.country}
                      </span>
                      <span className="shrink-0 font-semibold text-brand-900">
                        {formatNumber(row.activeUsers)}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Blog performance */}
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Newspaper className="h-4 w-4 text-accent-green" />
                <h2 className="text-lg font-bold text-brand-900">Performance do blog</h2>
              </div>
              {data.blogPosts?.length ? (
                <ul className="space-y-3">
                  {data.blogPosts.slice(0, 10).map((post, i) => (
                    <li key={i} className="flex items-center justify-between gap-4 text-sm">
                      <span className="truncate text-gray-600">{post.pagePath}</span>
                      <span className="shrink-0 font-semibold text-brand-900">
                        {formatNumber(post.screenPageViews)} views · {formatNumber(post.sessions)} sessões
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">Nenhum post do blog com tráfego no período.</p>
              )}
            </section>

            {/* AI referral traffic */}
            <section className="rounded-2xl border border-gray-100 bg-brand-950 p-6 text-white shadow-sm">
              <div className="mb-2 flex items-center gap-2">
                <Bot className="h-5 w-5 text-accent-green" />
                <h2 className="text-lg font-bold">Tráfego vindo de assistentes de IA</h2>
              </div>
              <p className="mb-4 text-3xl font-bold text-accent-green">
                {formatNumber(data.aiReferrals?.sessions)} <span className="text-base text-white/60">sessões (piso)</span>
              </p>
              <p className="mb-4 text-sm text-white/60">{data.aiReferrals?.note}</p>
              {data.aiReferrals?.breakdown?.length > 0 && (
                <ul className="grid gap-2 sm:grid-cols-2">
                  {data.aiReferrals.breakdown.map((row, i) => (
                    <li key={i} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-2 text-sm">
                      <span className="text-white/70">{row.sessionSourceMedium}</span>
                      <span className="font-semibold">{formatNumber(row.sessions)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* What we've already done */}
            <section>
              <h2 className="mb-6 text-lg font-bold text-brand-900">O que já foi feito</h2>
              <ul className="space-y-4">
                {[...reportHighlights]
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((item, i) => (
                    <li
                      key={i}
                      className="flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:items-start sm:gap-6"
                    >
                      <div className="flex shrink-0 items-center gap-3 sm:w-40">
                        <span className="text-xs font-semibold text-gray-400">
                          {formatHighlightDate(item.date)}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${CATEGORY_COLORS[item.category] || "bg-gray-100 text-gray-600"}`}
                        >
                          {CATEGORY_LABELS[item.category] || item.category}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-brand-900">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Relatorio;
