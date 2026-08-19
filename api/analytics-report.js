// Vercel Serverless Function (Node runtime — NOT Edge, because
// @google-analytics/data uses gRPC via @grpc/grpc-js).
//
// Pulls real GA4 data for the /relatorio dashboard. Defaults to the last 60
// days; the client can request any range via ?startDate=&endDate= (see
// isValidGa4Date for the accepted formats).
// Credentials come from env vars only, never from a committed file:
//   GA4_PROPERTY_ID        numeric GA4 property id (Admin > Property Settings)
//   GA4_CLIENT_EMAIL       Service Account client_email
//   GA4_PRIVATE_KEY        Service Account private_key (with literal \n)
//   DASHBOARD_ACCESS_TOKEN shared secret gating this endpoint
//
// See docs/ga4-service-account-setup.md for how to obtain these.

import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { getLanguageForPath } from "../src/utils/localeRoutes.js";

const DEFAULT_DATE_RANGE = { startDate: "60daysAgo", endDate: "today" };

// GA4's accepted date formats for a dateRange field: a relative expression
// ("today", "yesterday", "NdaysAgo") or an absolute "YYYY-MM-DD". Whitelist
// strictly — these values flow straight into the Google Analytics API call.
const RELATIVE_DATE_PATTERN = /^(today|yesterday|\d{1,4}daysAgo)$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const MAX_RANGE_DAYS = 400; // guardrail against pathological custom ranges

export function isValidGa4Date(value) {
  return (
    typeof value === "string" &&
    (RELATIVE_DATE_PATTERN.test(value) || ISO_DATE_PATTERN.test(value))
  );
}

// Resolves "today" / "yesterday" / "NdaysAgo" / "YYYY-MM-DD" to a UTC Date.
// Used only to compute the *previous* comparison period locally — the
// original string is still what's sent to GA4 for the requested range, so
// GA4 remains the source of truth for "today" in the property's timezone.
export function resolveDate(value) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  if (value === "today") return today;
  if (value === "yesterday") {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - 1);
    return d;
  }
  const relative = /^(\d{1,4})daysAgo$/.exec(value);
  if (relative) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - Number(relative[1]));
    return d;
  }
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (iso) return new Date(Date.UTC(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3])));
  return null;
}

function toISODate(date) {
  return date.toISOString().slice(0, 10);
}

// Reads ?startDate=&endDate= off the request, falling back to the last 60
// days when absent, invalid, malformed, or spanning an unreasonable range.
export function resolveDateRange(req) {
  const { startDate, endDate } = req.query || {};
  if (!isValidGa4Date(startDate) || !isValidGa4Date(endDate)) {
    return DEFAULT_DATE_RANGE;
  }

  const start = resolveDate(startDate);
  const end = resolveDate(endDate);
  if (!start || !end || start > end) return DEFAULT_DATE_RANGE;

  const spanDays = Math.round((end - start) / 86400000) + 1;
  if (spanDays > MAX_RANGE_DAYS) return DEFAULT_DATE_RANGE;

  return { startDate, endDate };
}

// The immediately preceding period of equal length, used for the
// period-over-period comparison. Returns null when the range can't be
// resolved to concrete dates (shouldn't happen after resolveDateRange, but
// comparison is best-effort — the dashboard just omits it if this fails).
export function computePreviousRange(dateRange) {
  const start = resolveDate(dateRange.startDate);
  const end = resolveDate(dateRange.endDate);
  if (!start || !end || start > end) return null;

  const msPerDay = 86400000;
  const spanDays = Math.round((end - start) / msPerDay) + 1;
  const prevEnd = new Date(start.getTime() - msPerDay);
  const prevStart = new Date(prevEnd.getTime() - (spanDays - 1) * msPerDay);
  return { startDate: toISODate(prevStart), endDate: toISODate(prevEnd) };
}

// Domains known to be used by generative-AI clients/crawlers when they do
// pass a referrer. Many AI apps don't send one at all (they show up as
// "(direct)/(none)" instead), so this bucket is always a floor, never the
// true total — the dashboard UI must say so explicitly.
const AI_REFERRAL_DOMAINS = [
  "chatgpt.com",
  "chat.openai.com",
  "perplexity.ai",
  "gemini.google.com",
  "copilot.microsoft.com",
  "claude.ai",
];

function isAuthorized(req) {
  const token = process.env.DASHBOARD_ACCESS_TOKEN;
  if (!token) return false;

  const header = req.headers["authorization"] || "";
  const bearerMatch = header.match(/^Bearer\s+(.+)$/i);
  const provided = bearerMatch ? bearerMatch[1] : req.query?.token;

  return typeof provided === "string" && provided === token;
}

function getClient() {
  const clientEmail = process.env.GA4_CLIENT_EMAIL;
  const privateKey = process.env.GA4_PRIVATE_KEY;
  if (!clientEmail || !privateKey) {
    throw new Error("Missing GA4 service account env vars");
  }

  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: clientEmail,
      // Vercel env vars store the key with literal "\n" sequences —
      // turn them back into real newlines for the PEM to parse.
      private_key: privateKey.replace(/\\n/g, "\n"),
    },
  });
}

function rowsToObjects(report) {
  if (!report) return [];
  const dimensionNames = (report.dimensionHeaders || []).map((h) => h.name);
  const metricNames = (report.metricHeaders || []).map((h) => h.name);

  return (report.rows || []).map((row) => {
    const entry = {};
    row.dimensionValues.forEach((v, i) => {
      entry[dimensionNames[i]] = v.value;
    });
    row.metricValues.forEach((v, i) => {
      entry[metricNames[i]] = Number(v.value);
    });
    return entry;
  });
}

// Percentage change from `previous` to `current`, as a fraction (0.25 = +25%).
// null when there's no previous-period baseline to compare against.
export function percentChange(current, previous) {
  if (!previous) return current > 0 ? null : 0;
  return (current - previous) / previous;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!isAuthorized(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) {
    console.error("analytics-report: GA4_PROPERTY_ID is not set");
    return res.status(500).json({ error: "Failed to load report" });
  }

  const dateRange = resolveDateRange(req);
  const previousRange = computePreviousRange(dateRange);

  try {
    const client = getClient();
    const property = `properties/${propertyId}`;

    // batchRunReports caps out at 5 requests per call — spread across three
    // batches (5 + 5 + up to 2), run in parallel.
    const batchAPromise = client.batchRunReports({
      property,
      requests: [
        // 0: daily trend — sessions, users, pageviews, engagement
        {
          dateRanges: [dateRange],
          dimensions: [{ name: "date" }],
          metrics: [
            { name: "sessions" },
            { name: "totalUsers" },
            { name: "screenPageViews" },
            { name: "engagementRate" },
            { name: "averageSessionDuration" },
          ],
          orderBys: [{ dimension: { dimensionName: "date" } }],
        },
        // 1: top landing pages
        {
          dateRanges: [dateRange],
          dimensions: [{ name: "pagePath" }],
          metrics: [{ name: "screenPageViews" }, { name: "sessions" }],
          orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
          limit: 15,
        },
        // 2: acquisition channels
        {
          dateRanges: [dateRange],
          dimensions: [{ name: "sessionDefaultChannelGroup" }],
          metrics: [{ name: "sessions" }],
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        },
        // 3: geography
        {
          dateRanges: [dateRange],
          dimensions: [{ name: "country" }, { name: "city" }],
          metrics: [{ name: "activeUsers" }, { name: "sessions" }],
          orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
          limit: 20,
        },
        // 4: referral sources (used to derive the AI-referral bucket + full list)
        {
          dateRanges: [dateRange],
          dimensions: [{ name: "sessionSourceMedium" }],
          metrics: [{ name: "sessions" }],
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
          limit: 50,
        },
      ],
    });

    const batchBPromise = client.batchRunReports({
      property,
      requests: [
        // 5: generate_lead conversions, daily trend
        {
          dateRanges: [dateRange],
          dimensions: [{ name: "date" }],
          metrics: [{ name: "eventCount" }],
          dimensionFilter: {
            filter: {
              fieldName: "eventName",
              stringFilter: { value: "generate_lead" },
            },
          },
          orderBys: [{ dimension: { dimensionName: "date" } }],
        },
        // 6: pagePath x sessions, used only to derive the EN/PT-BR split
        {
          dateRanges: [dateRange],
          dimensions: [{ name: "pagePath" }],
          metrics: [{ name: "sessions" }],
          limit: 100000,
        },
        // 7: device category breakdown
        {
          dateRanges: [dateRange],
          dimensions: [{ name: "deviceCategory" }],
          metrics: [{ name: "sessions" }],
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        },
        // 8: new vs returning visitors
        {
          dateRanges: [dateRange],
          dimensions: [{ name: "newVsReturning" }],
          metrics: [{ name: "sessions" }],
        },
        // 9: blog post performance
        {
          dateRanges: [dateRange],
          dimensions: [{ name: "pagePath" }],
          metrics: [{ name: "screenPageViews" }, { name: "sessions" }],
          dimensionFilter: {
            filter: {
              fieldName: "pagePath",
              stringFilter: { matchType: "BEGINS_WITH", value: "/blog" },
            },
          },
          orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
          limit: 20,
        },
      ],
    });

    // Batch C: period-over-period comparison. Only run when a previous
    // period could be resolved — skipped entirely otherwise (batchRunReports
    // rejects an empty `requests` array).
    const batchCPromise = previousRange
      ? client.batchRunReports({
          property,
          requests: [
            // 10: totals comparison (current vs previous period)
            {
              dateRanges: [dateRange, previousRange],
              dimensions: [{ name: "dateRange" }],
              metrics: [
                { name: "sessions" },
                { name: "totalUsers" },
                { name: "screenPageViews" },
                { name: "engagementRate" },
                { name: "averageSessionDuration" },
              ],
            },
            // 11: generate_lead comparison (current vs previous period)
            {
              dateRanges: [dateRange, previousRange],
              dimensions: [{ name: "dateRange" }],
              metrics: [{ name: "eventCount" }],
              dimensionFilter: {
                filter: {
                  fieldName: "eventName",
                  stringFilter: { value: "generate_lead" },
                },
              },
            },
          ],
        })
      : null;

    const [[batchOne], [batchTwo], batchCResult] = await Promise.all([
      batchAPromise,
      batchBPromise,
      batchCPromise,
    ]);
    const batchThree = batchCResult ? batchCResult[0] : null;

    const [trendReport, topPagesReport, channelsReport, geoReport, referralsReport] =
      batchOne.reports;
    const [
      leadsReport,
      pathSessionsReport,
      deviceReport,
      newVsReturningReport,
      blogPostsReport,
    ] = batchTwo.reports;
    const [totalsCompareReport, leadsCompareReport] = batchThree ? batchThree.reports : [null, null];

    const trend = rowsToObjects(trendReport);
    const topPages = rowsToObjects(topPagesReport);
    const channels = rowsToObjects(channelsReport);
    const geography = rowsToObjects(geoReport);
    const referrals = rowsToObjects(referralsReport);
    const leadsTrend = rowsToObjects(leadsReport);
    const pathSessions = rowsToObjects(pathSessionsReport);
    const deviceBreakdown = rowsToObjects(deviceReport);
    const newVsReturning = rowsToObjects(newVsReturningReport);
    const blogPosts = rowsToObjects(blogPostsReport);

    const totals = trend.reduce(
      (acc, day) => {
        acc.sessions += day.sessions || 0;
        acc.totalUsers += day.totalUsers || 0;
        acc.screenPageViews += day.screenPageViews || 0;
        return acc;
      },
      { sessions: 0, totalUsers: 0, screenPageViews: 0 }
    );
    const avgEngagementRate = trend.length
      ? trend.reduce((sum, d) => sum + (d.engagementRate || 0), 0) / trend.length
      : 0;
    const avgSessionDuration = trend.length
      ? trend.reduce((sum, d) => sum + (d.averageSessionDuration || 0), 0) / trend.length
      : 0;

    const totalLeadEvents = leadsTrend.reduce((sum, d) => sum + (d.eventCount || 0), 0);
    const conversionRate = totals.sessions ? totalLeadEvents / totals.sessions : 0;

    // AI-referral bucket: sum sessions from rows whose source matches a
    // known AI-client domain. This is a floor, not the true total — see
    // AI_REFERRAL_DOMAINS comment above.
    const aiReferrals = referrals.filter((row) =>
      AI_REFERRAL_DOMAINS.some((domain) => row.sessionSourceMedium?.toLowerCase().includes(domain))
    );
    const aiReferralSessions = aiReferrals.reduce((sum, row) => sum + (row.sessions || 0), 0);

    // EN vs PT-BR split, derived from pagePath via the same routing table
    // the app itself uses (src/utils/localeRoutes.js) — not a GA4-native
    // dimension.
    const languageSplit = pathSessions.reduce(
      (acc, row) => {
        const lang = getLanguageForPath(row.pagePath) || "en"; // default: unmapped paths (e.g. "/") count as EN
        acc[lang] = (acc[lang] || 0) + (row.sessions || 0);
        return acc;
      },
      { en: 0, "pt-br": 0 }
    );

    // Period-over-period comparison. GA4 tags each row with a synthetic
    // "dateRange" dimension ("date_range_0" = first entry in the request's
    // dateRanges array, i.e. the current period; "date_range_1" = previous).
    let periodComparison = null;
    if (totalsCompareReport) {
      const compareRows = rowsToObjects(totalsCompareReport);
      const leadsRows = rowsToObjects(leadsCompareReport);
      const current = compareRows.find((r) => r.dateRange === "date_range_0") || {};
      const previous = compareRows.find((r) => r.dateRange === "date_range_1") || {};
      const currentLeads = leadsRows.find((r) => r.dateRange === "date_range_0")?.eventCount || 0;
      const previousLeads = leadsRows.find((r) => r.dateRange === "date_range_1")?.eventCount || 0;

      periodComparison = {
        previousRange,
        changePct: {
          sessions: percentChange(current.sessions || 0, previous.sessions || 0),
          totalUsers: percentChange(current.totalUsers || 0, previous.totalUsers || 0),
          screenPageViews: percentChange(current.screenPageViews || 0, previous.screenPageViews || 0),
          generateLeadEvents: percentChange(currentLeads, previousLeads),
        },
      };
    }

    res.setHeader("Cache-Control", "private, max-age=300");
    return res.status(200).json({
      generatedAt: new Date().toISOString(),
      range: dateRange,
      totals: {
        sessions: totals.sessions,
        totalUsers: totals.totalUsers,
        screenPageViews: totals.screenPageViews,
        avgEngagementRate,
        avgSessionDurationSeconds: avgSessionDuration,
        generateLeadEvents: totalLeadEvents,
        conversionRate,
      },
      trend,
      leadsTrend,
      topPages,
      channels,
      geography,
      referrals,
      aiReferrals: {
        sessions: aiReferralSessions,
        breakdown: aiReferrals,
        note:
          "Floor estimate only — many AI assistants and apps don't pass a referrer, so real AI-driven traffic is likely higher than this number.",
      },
      languageSplit,
      deviceBreakdown,
      newVsReturning,
      blogPosts,
      periodComparison,
    });
  } catch (error) {
    console.error("analytics-report: failed to fetch GA4 data", error);
    return res.status(500).json({ error: "Failed to load report" });
  }
}
