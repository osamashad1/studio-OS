import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type Window = `${number} ${"s" | "m" | "h"}`;

/** Removes quotes/spaces people often paste with keys; adds https:// if missing. */
const clean = (v?: string) => v?.trim().replace(/^["']|["']$/g, "").trim() || undefined;

let redis: Redis | null | undefined; // undefined = not tried yet, null = not available

/**
 * Upstash Redis client, created lazily on first use (never at build time) and
 * never throwing: an invalid URL/token logs a warning and falls back to memory.
 */
function getRedis(): Redis | null {
  if (redis !== undefined) return redis;
  const rawUrl = clean(process.env.UPSTASH_REDIS_REST_URL);
  const token = clean(process.env.UPSTASH_REDIS_REST_TOKEN);
  if (!rawUrl || !token) return (redis = null);
  try {
    const url = new URL(/^https?:\/\//.test(rawUrl) ? rawUrl : `https://${rawUrl}`).origin;
    redis = new Redis({ url, token });
  } catch (err) {
    console.warn("[ratelimit] UPSTASH_REDIS_REST_URL/TOKEN invalid — using in-memory limit.", err);
    redis = null;
  }
  return redis;
}

// Local fallback: counts in memory (per server instance), resets on restart.
const memory = new Map<string, { count: number; reset: number }>();
const toMs = (w: Window) => {
  const [n, unit] = w.split(" ");
  return Number(n) * { s: 1000, m: 60_000, h: 3_600_000 }[unit as "s" | "m" | "h"];
};

/**
 * Limits how often one visitor (IP) may call an API, e.g. 5 form sends per 10 minutes.
 * Uses Upstash Redis when configured — serverless servers don't share memory.
 */
export function createLimiter(prefix: string, limit: number, window: Window) {
  let upstash: Ratelimit | null | undefined;

  return async function check(id: string): Promise<boolean> {
    if (upstash === undefined) {
      const r = getRedis();
      upstash = r ? new Ratelimit({ redis: r, limiter: Ratelimit.slidingWindow(limit, window), prefix }) : null;
    }
    if (upstash) {
      try {
        return (await upstash.limit(id)).success;
      } catch (err) {
        console.warn("[ratelimit] Upstash request failed — allowing request.", err);
        return true; // never block real visitors because the limiter is down
      }
    }
    const now = Date.now();
    const key = `${prefix}:${id}`;
    const entry = memory.get(key);
    if (!entry || entry.reset < now) {
      memory.set(key, { count: 1, reset: now + toMs(window) });
      return true;
    }
    entry.count += 1;
    return entry.count <= limit;
  };
}

/** Best guess of the visitor's IP from the hosting provider's headers. */
export function clientIp(headers: Headers) {
  return (
    headers.get("x-nf-client-connection-ip") ?? // Netlify
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}
