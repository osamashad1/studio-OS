import { IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import { useTranslations } from "next-intl";

const display = IBM_Plex_Serif({ subsets: ["latin"], weight: ["600"], variable: "--font-ux-display", display: "swap" });
const body = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-ux-body", display: "swap" });

function Phone({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <figure className="flex flex-col items-center gap-3">
      <div className="w-full max-w-[220px] rounded-[30px] bg-[#1F3D2B] p-2 shadow-xl">
        <div className="flex aspect-[9/19] flex-col overflow-hidden rounded-[24px] bg-[#F6F1E7] text-[#1F3D2B]">
          <div className="mx-auto mt-2 h-4 w-16 rounded-full bg-[#1F3D2B]" />
          {children}
        </div>
      </div>
      <figcaption className="text-sm font-semibold text-[#1F3D2B]">{label}</figcaption>
    </figure>
  );
}

const jute = { backgroundImage: "repeating-linear-gradient(45deg, rgb(0 0 0 / 0.1) 0 4px, transparent 4px 8px)" };

/** Demo UI/UX case: wireframe → final screens of an order app for the invented "Gaibandha Jute Co.". */
export function UiuxJuteApp() {
  const t = useTranslations("visuals.uiux");
  const products = t.raw("products") as string[];
  return (
    <div id="visual" className={`${display.variable} ${body.variable} grid items-start gap-6 rounded-lg bg-[#EDE4D3] p-4 font-[family-name:var(--font-ux-body)] sm:grid-cols-4 sm:p-6`}>
      {/* wireframe */}
      <Phone label={t("wireframe")}>
        <div className="flex flex-1 flex-col gap-2 p-3">
          <span className="h-3 w-2/3 rounded bg-[#1F3D2B]/25" />
          <span className="h-16 rounded bg-[#1F3D2B]/15" />
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex gap-2"><span className="size-10 rounded bg-[#1F3D2B]/15" /><span className="flex flex-1 flex-col gap-1.5 pt-1"><span className="h-2 w-3/4 rounded bg-[#1F3D2B]/25" /><span className="h-2 w-1/2 rounded bg-[#1F3D2B]/15" /></span></span>
          ))}
          <span className="mt-auto h-8 rounded bg-[#1F3D2B]/25" />
        </div>
      </Phone>
      {/* catalogue */}
      <Phone label={t("screens.catalogue")}>
        <div className="flex flex-1 flex-col gap-2 p-3 text-[11px]">
          <p className="font-[family-name:var(--font-ux-display)] text-sm font-semibold">{t("catalogueTitle")}</p>
          {products.map((p, i) => (
            <div key={p} className="flex items-center gap-2 rounded-lg bg-white p-2 shadow-sm">
              <span className="size-9 shrink-0 rounded-md" style={{ ...jute, background: ["#C9A66B", "#B88D52", "#3A3A34"][i] }} />
              <span className="flex-1 font-semibold">{p}</span>
              <span className="text-[#8C6B3F]">›</span>
            </div>
          ))}
          <span className="mt-auto rounded-lg bg-[#1F3D2B] py-2 text-center font-semibold text-[#F6F1E7]">{t("catalogueCta")}</span>
        </div>
      </Phone>
      {/* product detail */}
      <Phone label={t("screens.detail")}>
        <div className="flex flex-1 flex-col text-[11px]">
          <span className="h-24" style={{ ...jute, background: "#C9A66B" }} />
          <div className="flex flex-1 flex-col gap-2 p-3">
            <p className="font-[family-name:var(--font-ux-display)] text-sm font-semibold">{products[0]}</p>
            <p className="text-[#1F3D2B]/70">{t("detailSpec")}</p>
            <div className="flex items-center justify-between rounded-lg bg-white p-2">
              <span>{t("quantity")}</span>
              <span className="flex items-center gap-2 font-semibold"><span className="rounded bg-[#EDE4D3] px-2">−</span>5.000<span className="rounded bg-[#EDE4D3] px-2">+</span></span>
            </div>
            <p className="text-[10px] text-[#8C6B3F]">{t("moqHint")}</p>
            <span className="mt-auto rounded-lg bg-[#1F3D2B] py-2 text-center font-semibold text-[#F6F1E7]">{t("detailCta")}</span>
          </div>
        </div>
      </Phone>
      {/* confirmation */}
      <Phone label={t("screens.done")}>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-4 text-center text-[11px]">
          <span className="flex size-14 items-center justify-center rounded-full bg-[#3DDC97] text-2xl text-[#1F3D2B]">✓</span>
          <p className="font-[family-name:var(--font-ux-display)] text-sm font-semibold">{t("doneTitle")}</p>
          <p className="text-[#1F3D2B]/70">{t("doneText")}</p>
        </div>
      </Phone>
    </div>
  );
}
