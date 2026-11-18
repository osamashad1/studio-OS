import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { alternates } from "@/lib/seo";
import { ShowcaseCard } from "@/components/portfolio/ShowcaseCard";
import { AdsReportView } from "@/components/portfolio/visuals/AdsReportView";
import { BrandHafenbohne } from "@/components/portfolio/visuals/BrandHafenbohne";
import { SocialMueller } from "@/components/portfolio/visuals/SocialMueller";
import { UiuxJuteApp } from "@/components/portfolio/visuals/UiuxJuteApp";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { contactHref } from "@/config/nav";
import { getItem, portfolio } from "@/content/portfolio";

export function generateStaticParams() {
  return portfolio.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/portfolio/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!getItem(slug)) return {};
  const t = await getTranslations({ locale, namespace: "cases" });
  return { title: t(`${slug}.title`), description: t(`${slug}.summary`), alternates: alternates(locale, `/portfolio/${slug}`) };
}

export default function CaseStudyPage({ params }: PageProps<"/[locale]/portfolio/[slug]">) {
  const { locale, slug } = use(params);
  setRequestLocale(locale);
  const item = getItem(slug);
  if (!item) notFound();
  const t = useTranslations("cases");
  const p = useTranslations("portfolioPage");
  const blocks = ["problem", "solution", "goal"] as const;

  return (
    <>
      <Section>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {item.demo && <Badge>{p("demoLabel")}</Badge>}
            <Badge>{p(`filters.${item.category}`)}</Badge>
          </div>
          <h1 className="text-2xl font-bold sm:text-3xl">{t(`${slug}.title`)}</h1>
          <p className="max-w-[60ch] text-lg text-slate">{t(`${slug}.summary`)}</p>
        </div>
        <div className="mt-14">
          {item.visual === "website" && (
            <div className="max-w-4xl">
              <ShowcaseCard image={item.image} palette={item.palette} host={item.host} alt={p("shotAlt", { name: t(`${slug}.title`) })} priority />
            </div>
          )}
          {item.visual === "brand" && <BrandHafenbohne />}
          {item.visual === "social" && <SocialMueller />}
          {item.visual === "uiux" && <UiuxJuteApp />}
          {item.visual === "adsCafe" && <AdsReportView report="cafe" />}
          {item.visual === "adsElektro" && <AdsReportView report="elektro" />}
        </div>
      </Section>
      <Section tone="white">
        <dl className="grid gap-10 md:grid-cols-3">
          {blocks.map((b) => (
            <div key={b} className="flex flex-col gap-3">
              <dt className="font-display text-lg font-bold">{p(`blocks.${b}`)}</dt>
              <dd className="text-slate">{t(`${slug}.${b}`)}</dd>
            </div>
          ))}
        </dl>
        {item.demo && <p className="mt-10 max-w-[70ch] text-sm text-slate">{p("demoNote")}</p>}
        <div className="mt-10 flex flex-wrap gap-3">
          {item.demoUrl && <ButtonLink href={item.demoUrl}>{p("openDemo")}</ButtonLink>}
          <ButtonLink href={contactHref} variant="secondary">
            {p("cta")}
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
