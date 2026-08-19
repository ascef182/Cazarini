// Thin wrapper around window.gtag. Safe to call even before the GA4 script
// has loaded or while the placeholder Measurement ID in index.html hasn't
// been replaced with a real one — it just no-ops.
export function trackEvent(name, params = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}
