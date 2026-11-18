import { DM_Sans, Fraunces } from "next/font/google";
import { useTranslations } from "next-intl";

const display = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-br-display", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-br-body", display: "swap" });

const C = { cream: "#F4EDE4", espresso: "#3B2A20", terracotta: "#AE5129", sage: "#8A9A7B", foam: "#FBF8F3" };

function CupMark({ color, size = 64 }: { color: string; size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden>
      <path d="M14 22h30l-3 24a8 8 0 0 1-8 7h-8a8 8 0 0 1-8-7z" fill={color} />
      <path d="M44 27h4a6 6 0 0 1 0 12h-5" fill="none" stroke={color} strokeWidth="4" />
      <path d="M24 8c-4 5 4 7 0 12M33 8c-4 5 4 7 0 12" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Logo({ fg, bg, label }: { fg: string; bg: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg p-8" style={{ background: bg, color: fg }}>
      <CupMark color={fg} />
      <p className="font-[family-name:var(--font-br-display)] text-[28px] italic leading-none font-semibold">Hafenbohne</p>
      <p className="text-xs tracking-[0.3em]">{label}</p>
    </div>
  );
}

/** Demo brand identity board for the invented "Café Hafenbohne". */
export function BrandHafenbohne() {
  const t = useTranslations("visuals.brand");
  const swatches = [
    { name: "Espresso", hex: C.espresso, fg: "#fff" },
    { name: "Terracotta", hex: C.terracotta, fg: "#fff" },
    { name: "Sage", hex: C.sage, fg: "#1d1d1d" },
    { name: "Cream", hex: C.cream, fg: C.espresso },
  ];
  return (
    <div id="visual" className={`${display.variable} ${body.variable} grid gap-4 rounded-lg bg-[#EADFD2] p-4 font-[family-name:var(--font-br-body)] text-[#3B2A20] sm:grid-cols-6 sm:p-6`}>
      <div className="sm:col-span-3"><Logo fg={C.espresso} bg={C.cream} label={t("tagline")} /></div>
      <div className="sm:col-span-3"><Logo fg={C.cream} bg={C.espresso} label={t("tagline")} /></div>

      <div className="rounded-lg bg-white p-5 sm:col-span-2">
        <p className="text-sm font-semibold">{t("colors")}</p>
        <ul className="mt-3 grid grid-cols-2 gap-2">
          {swatches.map((s) => (
            <li key={s.name} className="flex h-16 flex-col justify-end rounded-md p-2 text-xs" style={{ background: s.hex, color: s.fg, boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 0.08)" }}>
              <span className="font-semibold">{s.name}</span>
              <span>{s.hex}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg bg-white p-5 sm:col-span-2">
        <p className="text-sm font-semibold">{t("type")}</p>
        <p className="mt-3 font-[family-name:var(--font-br-display)] text-[40px] leading-none font-semibold">Aa</p>
        <p className="mt-1 text-sm">Fraunces — {t("typeHeadline")}</p>
        <p className="mt-4 text-[28px] leading-none">Aa</p>
        <p className="mt-1 text-sm">DM Sans — {t("typeBody")}</p>
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2">
        {/* business card */}
        <div className="flex flex-1 flex-col justify-between rounded-lg p-5 shadow-md" style={{ background: C.terracotta, color: C.foam }}>
          <CupMark color={C.foam} size={36} />
          <div className="text-xs">
            <p className="font-[family-name:var(--font-br-display)] text-lg italic">Hafenbohne</p>
            <p>{t("cardLine")}</p>
          </div>
        </div>
        {/* cup sleeve */}
        <div className="flex items-center gap-3 rounded-lg p-4" style={{ background: C.sage, color: C.espresso }}>
          <span className="flex size-12 items-center justify-center rounded-full bg-[#F4EDE4]"><CupMark color={C.espresso} size={30} /></span>
          <p className="text-sm font-semibold">{t("sleeve")}</p>
        </div>
      </div>
    </div>
  );
}
