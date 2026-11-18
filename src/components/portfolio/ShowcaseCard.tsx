"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Palette, Shot } from "@/content/demos";
import { cn } from "@/lib/cn";

/**
 * A project preview as a tilted 3D browser window with colourful depth.
 * When it scrolls into view (or on hover) it straightens and scrolls through
 * the whole screenshot — visitors see the design without clicking.
 */
export function ShowcaseCard({
  image,
  palette,
  host,
  alt,
  flip = false,
  scroll = true,
  priority = false,
}: {
  image: Shot;
  palette: Palette;
  host?: string;
  alt: string;
  flip?: boolean;
  scroll?: boolean;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.intersectionRatio > 0.6), {
      threshold: [0, 0.6, 1],
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ratio = image.h / image.w;
  const tall = scroll && ratio > 0.7;
  const wide = ratio < 0.6; // wider than the 16:10 frame → show it whole, don't crop the sides

  return (
    <div ref={ref} className="group relative [perspective:1600px]" data-active={active || undefined}>
      {/* coloured glow from the project's own palette */}
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[32px] opacity-70 blur-2xl transition-opacity duration-700 group-hover:opacity-100 group-data-active:opacity-100"
        style={{ background: `radial-gradient(60% 60% at ${flip ? "30%" : "70%"} 40%, ${palette.accent}, transparent 70%), radial-gradient(50% 50% at ${flip ? "75%" : "25%"} 75%, #3355ff99, transparent 70%)` }}
      />
      <div
        className={cn(
          "relative transition-transform duration-[900ms] ease-out [transform-style:preserve-3d] motion-reduce:transition-none",
          flip
            ? "[transform:rotateX(9deg)_rotateY(14deg)_rotateZ(-2deg)]"
            : "[transform:rotateX(9deg)_rotateY(-14deg)_rotateZ(2deg)]",
          "group-hover:[transform:rotateX(0)_rotateY(0)_rotateZ(0)] group-data-active:[transform:rotateX(3deg)_rotateY(0)_rotateZ(0)]",
        )}
      >
        {/* floating colour tiles for depth */}
        <span aria-hidden className={cn("absolute -top-4 z-10 size-10 rounded-sm shadow-lg [transform:translateZ(60px)]", flip ? "-left-4" : "-right-4")} style={{ background: palette.accent }} />
        <span aria-hidden className={cn("absolute -bottom-5 z-10 h-7 w-14 rounded-sm shadow-lg [transform:translateZ(80px)]", flip ? "-right-3" : "-left-3")} style={{ background: "#ffd23f" }} />

        <div className="overflow-hidden rounded-lg bg-white shadow-[0_30px_60px_-20px_rgb(16_22_47/0.45)] ring-1 ring-ink/10">
          <div className="flex items-center gap-2 border-b border-line bg-paper px-3 py-2">
            <span aria-hidden className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </span>
            {host && (
              <span className="ml-2 truncate rounded-full bg-white px-3 py-0.5 text-xs text-slate">{host}</span>
            )}
          </div>
          <div className="relative aspect-[16/10] overflow-hidden" style={{ background: palette.bg }}>
            <Image
              src={image.src}
              alt={alt}
              width={image.w}
              height={image.h}
              priority={priority}
              sizes="(min-width: 1024px) 560px, 92vw"
              className={cn(
                "absolute inset-0 h-full w-full object-top",
                wide ? "object-contain p-2" : "object-cover",
                tall &&
                  "transition-[object-position] duration-[7000ms] ease-in-out group-hover:object-bottom group-data-active:object-bottom motion-reduce:transition-none motion-reduce:group-data-active:object-top",
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
