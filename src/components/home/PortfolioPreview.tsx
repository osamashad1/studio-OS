import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { demos } from "@/content/demos";
import { Link } from "@/i18n/navigation";
import { ShowcaseCard } from "@/components/portfolio/ShowcaseCard";
import { SectionHeading } from "./SectionHeading";

export function PortfolioPreview() {
  const t = useTranslations("portfolioPreview");
  const d = useTranslations("demos");

  return (
    <Section id="portfolio" tone="white" aria-labelledby="portfolio-title">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="portfolio-title" title={t("title")} intro={t("intro")} />
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/portfolio" variant="secondary">
            {t("all")}
          </ButtonLink>
        </div>
      </div>

      <ul className="mt-16 grid gap-x-12 gap-y-20 sm:grid-cols-2">
        {demos.map((demo, i) => (
          <li key={demo.slug} className={i % 2 === 1 ? "sm:mt-16" : undefined}>
            <Link href={`/demos/${demo.slug}`} className="group/link flex flex-col gap-6 rounded-lg">
              <ShowcaseCard
                image={demo.image}
                palette={demo.palette}
                host={demo.host}
                alt={t("shotAlt", { name: d(`${demo.slug}.name`) })}
                flip={i % 2 === 1}
              />
              <div className="flex flex-col gap-2">
                <Badge className="w-fit">{t("demoLabel")}</Badge>
                <h3 className="font-display text-lg font-bold group-hover/link:text-cobalt">
                  {d(`${demo.slug}.name`)}
                </h3>
                <p className="text-slate">{d(`${demo.slug}.summary`)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
