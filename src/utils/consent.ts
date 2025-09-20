export const CONSENT_KEY = "site_analytics_consent";
export function saveConsent(val: boolean) {
  localStorage.setItem(CONSENT_KEY, val ? "1" : "0");
}
export function getConsent() {
  return localStorage.getItem(CONSENT_KEY) === "1";
}
