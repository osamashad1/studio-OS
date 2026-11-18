import { useFormatter, useTranslations } from "next-intl";
import { adsReports } from "@/content/ads-reports";
import { ColumnChart } from "./ColumnChart";

const DEVICE_COLORS = { mobile: "#2a78d6", desktop: "#eb6834", tablet: "#1baf7a" } as const; // validated (dataviz)

/** Demo Google Ads report — all numbers are EXAMPLE VALUES. */
export function AdsReportView({ report }: { report: "cafe" | "elektro" }) {
  const t = useTranslations("visuals.ads");
  const f = useFormatter();
  const r = adsReports[report];
  const fmt = (v: number, unit?: "pct" | "eur") =>
    unit === "pct" ? `${f.number(v, { maximumFractionDigits: 1 })} %`
      : unit === "eur" ? f.number(v, { style: "currency", currency: "EUR" })
      : f.number(v);
  const period = `${f.dateTime(new Date(r.period.from), { day: "numeric", month: "short" })} – ${f.dateTime(new Date(r.period.to), { day: "numeric", month: "short", year: "numeric" })}`;

  return (
    <div id="visual" className="flex flex-col gap-6 rounded-lg border-2 border-line bg-white p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-display text-lg font-bold">{t(`${report}.title`)}</p>
          <p className="text-sm text-slate">{t("period", { period })}</p>
        </div>
        <span className="rounded-full bg-signal px-3 py-1 text-sm font-semibold text-ink">{t("exampleBadge")}</span>
      </div>

      {/* Ad preview */}
      <div className="rounded-lg bg-paper p-4">
        <p className="text-xs text-slate">{t("adPreview")}</p>
        <div className="mt-2 rounded-sm bg-white p-4 shadow-sm">
          <p className="text-xs text-ink"><span className="font-semibold">{t("sponsored")}</span> · {r.ad.url}</p>
          <p className="mt-1 text-lg text-[#1a0dab]">{r.ad.headline}</p>
          <p className="mt-1 text-sm text-slate">{r.ad.description}</p>
        </div>
      </div>

      {/* KPI tiles */}
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {r.kpis.map((k) => (
          <div key={k.key} className="rounded-lg bg-paper p-4">
            <dt className="text-sm text-slate">{t(`kpi.${k.key}`)}</dt>
            <dd className="mt-1 font-display text-xl font-bold">{fmt(k.value, k.unit)}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-paper p-4">
          <ColumnChart
            data={r.weekly.map((w, i) => ({ label: t("week", { n: i + 1 }), value: w.value }))}
            title={t(`chart.${r.weeklyMetric}`)}
            valueLabel={t(`unit.${r.weeklyMetric}`)}
          />
        </div>

        {r.devices && (
          <div className="flex flex-col gap-4 rounded-lg bg-paper p-4">
            <p className="text-sm font-semibold">{t("devices")}</p>
            <div className="flex h-6 gap-0.5 overflow-hidden rounded-sm" role="img" aria-label={r.devices.map((d) => `${t(`device.${d.key}`)} ${d.share} %`).join(", ")}>
              {r.devices.map((d) => (
                <span key={d.key} style={{ width: `${d.share}%`, background: DEVICE_COLORS[d.key] }} />
              ))}
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {r.devices.map((d) => (
                <li key={d.key} className="flex items-center gap-2">
                  <span aria-hidden className="size-3 rounded-sm" style={{ background: DEVICE_COLORS[d.key] }} />
                  {t(`device.${d.key}`)} <span className="font-semibold">{d.share} %</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {r.campaigns && (
          <div className="rounded-lg bg-paper p-4">
            <p className="text-sm font-semibold">{t("campaigns")}</p>
            <table className="mt-3 w-full text-sm">
              <thead className="text-left text-slate">
                <tr><th className="pb-2 font-normal">{t("col.campaign")}</th><th className="pb-2 text-right font-normal">{t("col.cost")}</th><th className="pb-2 text-right font-normal">{t("col.leads")}</th><th className="pb-2 text-right font-normal">{t("col.cpl")}</th></tr>
              </thead>
              <tbody>
                {r.campaigns.map((c) => (
                  <tr key={c.key} className="border-t border-line">
                    <td className="py-2">{t(`campaign.${c.key}`)}</td>
                    <td className="py-2 text-right">{fmt(c.cost, "eur")}</td>
                    <td className="py-2 text-right">{c.leads}</td>
                    <td className="py-2 text-right">{fmt(c.cost / c.leads, "eur")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="overflow-x-auto rounded-lg bg-paper p-4">
        <p className="text-sm font-semibold">{t("terms")}</p>
        <table className="mt-3 w-full min-w-[420px] text-sm">
          <thead className="text-left text-slate">
            <tr><th className="pb-2 font-normal">{t("col.term")}</th><th className="pb-2 text-right font-normal">{t("col.clicks")}</th><th className="pb-2 text-right font-normal">{t("col.ctr")}</th><th className="pb-2 text-right font-normal">{t("col.conversions")}</th></tr>
          </thead>
          <tbody>
            {r.terms.map((s) => (
              <tr key={s.term} className="border-t border-line">
                <td className="py-2">{s.term}</td>
                <td className="py-2 text-right">{f.number(s.clicks)}</td>
                <td className="py-2 text-right">{fmt(s.ctr, "pct")}</td>
                <td className="py-2 text-right">{s.conversions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <details className="text-sm">
        <summary className="cursor-pointer font-semibold">{t("tableView")}</summary>
        <table className="mt-2 text-sm">
          <tbody>
            {r.weekly.map((w, i) => (
              <tr key={w.label}><td className="pr-6">{t("week", { n: i + 1 })}</td><td>{f.number(w.value)} {t(`unit.${r.weeklyMetric}`)}</td></tr>
            ))}
          </tbody>
        </table>
      </details>

      <p className="text-sm text-slate">{t("disclaimer")}</p>
    </div>
  );
}
