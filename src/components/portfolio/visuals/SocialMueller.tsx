import { Archivo, Inter } from "next/font/google";
import { useTranslations } from "next-intl";

const display = Archivo({ subsets: ["latin"], variable: "--font-so-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-so-body", display: "swap" });

function Bolt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="currentColor" />
    </svg>
  );
}

type Post = { kicker: string; title: string; cta: string };

/** Demo social-media ad set (Instagram/Facebook) for the invented "Müller Elektro". */
export function SocialMueller() {
  const t = useTranslations("visuals.social");
  const posts = t.raw("posts") as Post[];
  const styles = [
    "bg-[#FF7A00] text-[#0F2A44]",
    "bg-[#0F2A44] text-white",
    "bg-white text-[#0F2A44] ring-1 ring-[#0F2A44]/10",
  ];
  return (
    <div id="visual" className={`${display.variable} ${body.variable} grid gap-4 rounded-lg bg-[#E8EDF3] p-4 font-[family-name:var(--font-so-body)] sm:grid-cols-[1fr_1fr_1fr_0.7fr] sm:p-6`}>
      {posts.map((p, i) => (
        <article key={p.title} className={`relative flex aspect-square flex-col justify-between overflow-hidden rounded-lg p-5 shadow-md ${styles[i]}`}>
          <Bolt className={`absolute -right-6 -bottom-6 size-36 opacity-15`} />
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className={`flex size-7 items-center justify-center rounded-md ${i === 0 ? "bg-[#0F2A44] text-[#FF7A00]" : "bg-[#FF7A00] text-[#0F2A44]"}`}><Bolt className="size-4" /></span>
            Müller Elektro · {t("sponsored")}
          </div>
          <div>
            <p className="text-xs font-semibold opacity-80">{p.kicker}</p>
            <p className="mt-1 font-[family-name:var(--font-so-display)] text-[22px] leading-tight font-extrabold">{p.title}</p>
          </div>
          <span className={`w-fit rounded-md px-3 py-1.5 text-xs font-bold ${i === 0 ? "bg-[#0F2A44] text-white" : "bg-[#FF7A00] text-[#0F2A44]"}`}>{p.cta}</span>
        </article>
      ))}
      {/* story format 9:16 */}
      <article className="relative flex aspect-[9/16] flex-col justify-end gap-3 overflow-hidden rounded-lg bg-gradient-to-b from-[#16385A] to-[#0F2A44] p-4 text-white shadow-md">
        <div className="absolute inset-x-3 top-3 flex gap-1">
          {[0, 1, 2].map((i) => <span key={i} className={`h-0.5 flex-1 rounded-full ${i === 0 ? "bg-white" : "bg-white/30"}`} />)}
        </div>
        <Bolt className="absolute top-10 left-1/2 size-20 -translate-x-1/2 text-[#FF7A00]" />
        <p className="font-[family-name:var(--font-so-display)] text-lg leading-tight font-extrabold">{t("story.title")}</p>
        <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-bold text-[#0F2A44]">{t("story.cta")}</span>
      </article>
    </div>
  );
}
