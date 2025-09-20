import { getConsent } from "./consent";

export function loadScript(src: string, id?: string) {
  if (id && document.getElementById(id)) return;
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  if (id) s.id = id;
  document.head.appendChild(s);
}

export function loadAnalyticsIfAllowed() {
  if (!getConsent()) return;
  // Example: Google Analytics (placeholder)
  loadScript(
    "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID",
    "ga"
  );
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag() {
    (window as any).dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID", { anonymize_ip: true });
  // Add other analytics (Hotjar/Clarity) similarly.
}
