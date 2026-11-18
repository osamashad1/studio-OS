/** The demo websites. Texts live in messages → "demos". Screenshots: public/portfolio/demos/. */
export const demos = [
  {
    slug: "cafe",
    host: "cafe-hafenbohne.demo",
    palette: { bg: "#F4EDE4", ink: "#3B2A20", accent: "#AE5129" },
    image: { src: "/portfolio/demos/cafe.webp", w: 960, h: 1861 },
  },
  {
    slug: "handwerk",
    host: "mueller-elektro.demo",
    palette: { bg: "#FFFFFF", ink: "#0F2A44", accent: "#FF7A00" },
    image: { src: "/portfolio/demos/handwerk.webp", w: 960, h: 1664 },
  },
  {
    slug: "export",
    host: "gaibandha-jute.demo",
    palette: { bg: "#F6F1E7", ink: "#1F3D2B", accent: "#C9A66B" },
    image: { src: "/portfolio/demos/export.webp", w: 960, h: 1825 },
  },
  {
    slug: "luxury",
    host: "maison-noir.demo",
    palette: { bg: "#0B0B0C", ink: "#F2EDE4", accent: "#C9A45C" },
    image: { src: "/portfolio/demos/luxury.webp", w: 960, h: 2000 },
  },
] as const;

export type DemoSlug = (typeof demos)[number]["slug"];
export type Palette = { bg: string; ink: string; accent: string };
export type Shot = { src: string; w: number; h: number };
