import Image from "next/image";
import { useTranslations } from "next-intl";
import { demos } from "@/content/demos";

/** Fanned 3D stack of real demo screenshots for the "Websites & web apps" panel. */
export function WebsitesStack() {
  const t = useTranslations("services.visual");
  const picks = [demos[1], demos[3], demos[0]];
  const pose = [
    "[transform:translate(-18%,8%)_rotateY(18deg)_rotateZ(-6deg)]",
    "[transform:translate(18%,10%)_rotateY(-18deg)_rotateZ(6deg)]",
    "[transform:translateZ(40px)]",
  ];
  return (
    <div aria-hidden className="relative mx-auto h-56 w-full max-w-sm [perspective:1200px] sm:h-64">
      {picks.map((d, i) => (
        <div
          key={d.slug}
          className={`absolute inset-x-6 top-2 overflow-hidden rounded-md bg-white shadow-[0_20px_40px_-12px_rgb(0_0_0/0.45)] ring-1 ring-white/30 transition-transform duration-700 group-hover/web:[transform:none] ${pose[i]}`}
        >
          <div className="flex gap-1 bg-paper px-2 py-1.5">
            <span className="size-1.5 rounded-full bg-[#ff5f57]" /><span className="size-1.5 rounded-full bg-[#febc2e]" /><span className="size-1.5 rounded-full bg-[#28c840]" />
          </div>
          <Image src={d.image.src} alt="" width={d.image.w} height={d.image.h} sizes="320px" className="aspect-[16/10] w-full object-cover object-top" />
        </div>
      ))}
      <span className="sr-only">{t("stackLabel")}</span>
    </div>
  );
}

/** Small Google search ad + rising mini bars. */
export function AdsVisual() {
  const t = useTranslations("services.visual");
  return (
    <div aria-hidden className="flex items-end gap-3">
      <div className="flex-1 rounded-sm bg-paper p-3 text-xs">
        <p><span className="font-semibold">{t("sponsored")}</span> · {t("adUrl")}</p>
        <p className="mt-1 text-sm text-[#1a0dab]">{t("adHeadline")}</p>
      </div>
      <div className="flex h-14 items-end gap-1">
        {[30, 45, 60, 85].map((h) => (
          <span key={h} className="w-2.5 rounded-t-[3px] bg-cobalt" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

/** Colour palette + logo mark. */
export function DesignVisual() {
  return (
    <div aria-hidden className="flex items-center gap-2">
      {["#3B2A20", "#AE5129", "#8A9A7B", "#F4EDE4"].map((c) => (
        <span key={c} className="size-9 rounded-sm ring-1 ring-ink/10" style={{ background: c }} />
      ))}
      <span className="ml-2 flex size-9 items-center justify-center rounded-full bg-signal font-display text-sm font-bold text-ink">Aa</span>
    </div>
  );
}

/** Two chat bubbles. */
export function AiVisual() {
  const t = useTranslations("services.visual");
  return (
    <div aria-hidden className="flex flex-col gap-1.5 text-xs">
      <span className="w-fit max-w-[85%] rounded-lg rounded-tr-sm bg-cobalt px-3 py-1.5 text-white self-end">{t("chatQ")}</span>
      <span className="w-fit max-w-[85%] rounded-lg rounded-tl-sm bg-paper px-3 py-1.5">{t("chatA")}</span>
    </div>
  );
}
