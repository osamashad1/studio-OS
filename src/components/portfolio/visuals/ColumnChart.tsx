"use client";

import { useId, useState } from "react";

/**
 * Single-series column chart (SVG): bars ≤ 24 px, 4 px rounded caps, value on the cap,
 * hairline grid, hover/focus tooltip. One series → no legend box (the title names it).
 */
export function ColumnChart({
  data,
  title,
  valueLabel,
  format = (v: number) => v.toLocaleString(),
}: {
  data: { label: string; value: number }[];
  title: string;
  valueLabel: string;
  format?: (v: number) => string;
}) {
  const id = useId();
  const [hover, setHover] = useState<number | null>(null);
  const W = 360, H = 200, pad = { t: 24, r: 8, b: 28, l: 36 };
  const max = Math.max(...data.map((d) => d.value));
  const step = Math.pow(10, Math.floor(Math.log10(max))) / (max / Math.pow(10, Math.floor(Math.log10(max))) > 5 ? 1 : 2);
  const top = Math.ceil(max / step) * step;
  const ticks = Array.from({ length: Math.round(top / step) + 1 }, (_, i) => i * step);
  const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  const band = iw / data.length, bw = Math.min(24, band * 0.5);
  const y = (v: number) => pad.t + ih - (v / top) * ih;

  return (
    <figure className="relative">
      <figcaption id={`${id}-t`} className="text-sm font-semibold text-ink">{title}</figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full" role="img" aria-labelledby={`${id}-t`}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="#e3e6ee" strokeWidth={1} />
            <text x={pad.l - 6} y={y(t) + 4} textAnchor="end" fontSize="10" fill="#4a5372">{format(t)}</text>
          </g>
        ))}
        {data.map((d, i) => {
          const x = pad.l + band * i + (band - bw) / 2, yy = y(d.value), r = 4;
          return (
            <g
              key={d.label}
              tabIndex={0}
              role="img"
              aria-label={`${d.label}: ${format(d.value)} ${valueLabel}`}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className="cursor-default outline-none"
            >
              {/* hit target bigger than the mark */}
              <rect x={pad.l + band * i} y={pad.t} width={band} height={ih} fill="transparent" />
              <path
                d={`M${x},${pad.t + ih} V${yy + r} Q${x},${yy} ${x + r},${yy} H${x + bw - r} Q${x + bw},${yy} ${x + bw},${yy + r} V${pad.t + ih} Z`}
                fill="#3355ff"
                opacity={hover === null || hover === i ? 1 : 0.45}
              />
              <text x={x + bw / 2} y={yy - 6} textAnchor="middle" fontSize="11" fontWeight="600" fill="#10162f">{format(d.value)}</text>
              <text x={x + bw / 2} y={H - 8} textAnchor="middle" fontSize="10" fill="#4a5372">{d.label}</text>
            </g>
          );
        })}
      </svg>
      {hover !== null && (
        <div
          role="status"
          className="pointer-events-none absolute rounded-sm bg-ink px-2.5 py-1.5 text-xs text-paper shadow-lg"
          style={{ left: `${((pad.l + band * hover + band / 2) / W) * 100}%`, top: 24, transform: "translateX(-50%)" }}
        >
          <span className="font-semibold">{data[hover].label}</span> · {format(data[hover].value)} {valueLabel}
        </div>
      )}
    </figure>
  );
}
