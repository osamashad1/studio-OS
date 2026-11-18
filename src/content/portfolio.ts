import { demos, type Palette, type Shot } from "./demos";

export type Category = "websites" | "design" | "ads";
export const categories: Category[] = ["websites", "design", "ads"];

/** Which visual a case-study page shows (design/ads items render their own artwork). */
export type Visual = "website" | "brand" | "social" | "uiux" | "adsCafe" | "adsElektro";

export type PortfolioItem = {
  slug: string;
  category: Category;
  demo: true; // all current items are invented demo projects — label them!
  palette: Palette;
  image: Shot; // preview image (screenshot)
  host?: string;
  visual: Visual;
  demoUrl?: string; // live demo website, if any
};

const thumb = (slug: string, h = 1200): Shot => ({ src: `/portfolio/thumbs/${slug}.webp`, w: 1200, h });

/**
 * Portfolio items. Texts live in messages → "cases.<slug>".
 * Add your real work here (images in public/portfolio/). Never invent results:
 * demo items show goals; example numbers are marked as examples.
 */
export const portfolio: PortfolioItem[] = [
  ...demos.map((d) => ({
    slug: d.slug,
    category: "websites" as const,
    demo: true as const,
    palette: d.palette,
    image: d.image,
    host: d.host,
    visual: "website" as const,
    demoUrl: `/demos/${d.slug}`,
  })),
  { slug: "brand-hafenbohne", category: "design", demo: true, visual: "brand", palette: { bg: "#EADFD2", ink: "#3B2A20", accent: "#AE5129" }, image: thumb("brand-hafenbohne", 524) },
  { slug: "social-mueller", category: "design", demo: true, visual: "social", palette: { bg: "#E8EDF3", ink: "#0F2A44", accent: "#FF7A00" }, image: thumb("social-mueller", 421) },
  { slug: "uiux-jute-app", category: "design", demo: true, visual: "uiux", palette: { bg: "#EDE4D3", ink: "#1F3D2B", accent: "#C9A66B" }, image: thumb("uiux-jute-app", 583) },
  { slug: "ads-cafe", category: "ads", demo: true, visual: "adsCafe", palette: { bg: "#FFFFFF", ink: "#10162F", accent: "#3355FF" }, image: thumb("ads-cafe", 1295) },
  { slug: "ads-elektro", category: "ads", demo: true, visual: "adsElektro", palette: { bg: "#FFFFFF", ink: "#10162F", accent: "#FF7A00" }, image: thumb("ads-elektro", 1295) },
];

export const getItem = (slug: string) => portfolio.find((p) => p.slug === slug);
