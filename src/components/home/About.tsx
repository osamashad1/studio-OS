import Image from "next/image";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";

export function About() {
  const t = useTranslations("about");
  const paragraphs = t.raw("text") as string[];

  return (
    <Section id="ueber-mich" tone="white" aria-labelledby="about-title">
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-16">
        {/* Portrait — file path in src/config/site.ts (ownerPhoto) */}
        <div className="relative mx-auto w-full max-w-sm">
          <span aria-hidden className="absolute -right-3 -bottom-3 h-full w-full rounded-lg bg-cobalt" />
          <span aria-hidden className="absolute -top-3 -left-3 z-10 h-8 w-16 -rotate-6 rounded-sm bg-signal" />
          <Image
            src={site.ownerPhoto}
            alt={t("photoAlt", { name: site.ownerName })}
            width={1200}
            height={1500}
            sizes="(min-width: 768px) 384px, 90vw"
            className="relative aspect-[4/5] w-full rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col gap-5">
          <h2 id="about-title" className="text-xl font-bold sm:text-2xl">
            {t("title", { name: site.ownerName })}
          </h2>
          {paragraphs.map((p) => (
            <p key={p} className="max-w-[62ch] text-lg text-slate">
              {p}
            </p>
          ))}
          <ul className="flex flex-wrap gap-2 pt-2">
            {(t.raw("skills") as string[]).map((s) => (
              <li key={s} className="rounded-full border-2 border-line px-3 py-1 text-sm font-semibold">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
