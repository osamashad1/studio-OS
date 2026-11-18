/**
 * DEMO Google Ads reports — EXAMPLE VALUES, not real client data.
 * Every page that shows them must display the "example values" notice.
 */
export type AdsReport = {
  period: { from: string; to: string };
  kpis: { key: "impressions" | "clicks" | "ctr" | "cpc" | "conversions" | "cost" | "costPerConv"; value: number; unit?: "pct" | "eur" }[];
  weekly: { label: string; value: number }[]; // single series
  weeklyMetric: "clicks" | "leads";
  terms: { term: string; clicks: number; ctr: number; conversions: number }[];
  devices?: { key: "mobile" | "desktop" | "tablet"; share: number }[];
  campaigns?: { key: string; cost: number; leads: number }[];
  ad: { headline: string; url: string; description: string };
};

export const adsReports: Record<"cafe" | "elektro", AdsReport> = {
  cafe: {
    period: { from: "2026-10-01", to: "2026-10-30" },
    kpis: [
      { key: "impressions", value: 18400 },
      { key: "clicks", value: 1104 },
      { key: "ctr", value: 6.0, unit: "pct" },
      { key: "cpc", value: 0.27, unit: "eur" },
      { key: "conversions", value: 86 },
      { key: "costPerConv", value: 3.47, unit: "eur" },
    ],
    weeklyMetric: "clicks",
    weekly: [
      { label: "W1", value: 238 },
      { label: "W2", value: 262 },
      { label: "W3", value: 289 },
      { label: "W4", value: 315 },
    ],
    terms: [
      { term: "café duisburg innenhafen", clicks: 312, ctr: 9.1, conversions: 31 },
      { term: "frühstück duisburg", clicks: 268, ctr: 6.4, conversions: 21 },
      { term: "brunch duisburg", clicks: 201, ctr: 5.8, conversions: 15 },
      { term: "kaffee in der nähe", clicks: 187, ctr: 4.9, conversions: 11 },
      { term: "kuchen café duisburg", clicks: 136, ctr: 5.2, conversions: 8 },
    ],
    devices: [
      { key: "mobile", share: 72 },
      { key: "desktop", share: 22 },
      { key: "tablet", share: 6 },
    ],
    ad: {
      headline: "Café Hafenbohne – Frühstück am Innenhafen",
      url: "cafe-hafenbohne.demo",
      description: "Frisch gerösteter Kaffee & hausgemachter Kuchen. Jetzt Tisch online reservieren.",
    },
  },
  elektro: {
    period: { from: "2026-10-01", to: "2026-10-30" },
    kpis: [
      { key: "impressions", value: 9850 },
      { key: "clicks", value: 642 },
      { key: "ctr", value: 6.5, unit: "pct" },
      { key: "cpc", value: 0.93, unit: "eur" },
      { key: "conversions", value: 79 },
      { key: "costPerConv", value: 7.56, unit: "eur" },
    ],
    weeklyMetric: "leads",
    weekly: [
      { label: "W1", value: 14 },
      { label: "W2", value: 19 },
      { label: "W3", value: 22 },
      { label: "W4", value: 24 },
    ],
    terms: [
      { term: "elektriker notdienst duisburg", clicks: 168, ctr: 11.2, conversions: 29 },
      { term: "wallbox installation duisburg", clicks: 121, ctr: 7.4, conversions: 17 },
      { term: "elektriker duisburg", clicks: 109, ctr: 5.1, conversions: 14 },
      { term: "e-check duisburg", clicks: 64, ctr: 6.0, conversions: 9 },
      { term: "steckdose installieren lassen", clicks: 47, ctr: 3.8, conversions: 4 },
    ],
    campaigns: [
      { key: "emergency", cost: 286, leads: 41 },
      { key: "wallbox", cost: 171, leads: 22 },
      { key: "general", cost: 140, leads: 16 },
    ],
    ad: {
      headline: "Elektriker-Notdienst Duisburg – 24/7",
      url: "mueller-elektro.demo",
      description: "Stromausfall? Meisterbetrieb, schnell vor Ort. Festes Angebot vorab. Jetzt anrufen.",
    },
  },
};
