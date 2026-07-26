import { createHash } from "node:crypto";
import { prisma } from "@/lib/prisma";

/**
 * Database-backed fixed-window rate limiting. It is shared by every running
 * application instance, unlike an in-memory Map, and stores only hashed keys.
 */

interface RateLimitOptions {
  /** Max requests allowed within the window */
  limit: number;
  /** Time window in seconds */
  windowSeconds: number;
}

let lastCleanupAt = 0;

function hashKey(key: string) {
  return createHash("sha256").update(key).digest("hex");
}

function readHeader(headers: Headers | Record<string, string | string[] | undefined>, name: string) {
  if (headers instanceof Headers) return headers.get(name) || undefined;
  const value = headers[name] ?? headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
}

function isValidIp(value: string) {
  return value.length <= 45 && /^[0-9a-fA-F:.]+$/.test(value);
}

/**
 * Only a header configured by the deployment is trusted. Set
 * TRUSTED_CLIENT_IP_HEADER to a header overwritten by your reverse proxy, e.g.
 * `cf-connecting-ip` or `x-vercel-forwarded-for`. Never set it to
 * `x-forwarded-for` unless the proxy strips client-supplied values first.
 */
export function getClientIpFromHeaders(headers: Headers | Record<string, string | string[] | undefined>): string {
  const trustedHeader = process.env.TRUSTED_CLIENT_IP_HEADER?.trim().toLowerCase();
  if (!trustedHeader) return "untrusted-network";

  const raw = readHeader(headers, trustedHeader);
  const candidate = raw?.split(",")[0]?.trim();
  return candidate && isValidIp(candidate) ? candidate : "untrusted-network";
}

export function getClientIp(request: Request): string {
  return getClientIpFromHeaders(request.headers);
}

function scheduleCleanup() {
  const now = Date.now();
  if (now - lastCleanupAt < 6 * 60 * 60 * 1000) return;
  lastCleanupAt = now;
  void prisma.rateLimitBucket
    .deleteMany({ where: { resetAt: { lt: new Date(now - 24 * 60 * 60 * 1000) } } })
    .catch(() => undefined);
}

export async function rateLimit(key: string, options: RateLimitOptions): Promise<boolean> {
  const now = new Date();
  const resetAt = new Date(now.getTime() + options.windowSeconds * 1000);

  try {
    const rows = await prisma.$queryRaw<Array<{ count: number }>>`
      INSERT INTO "RateLimitBucket" ("key", "count", "resetAt", "updatedAt")
      VALUES (${hashKey(key)}, 1, ${resetAt}, ${now})
      ON CONFLICT ("key") DO UPDATE
      SET
        "count" = CASE
          WHEN "RateLimitBucket"."resetAt" <= CURRENT_TIMESTAMP THEN 1
          ELSE "RateLimitBucket"."count" + 1
        END,
        "resetAt" = CASE
          WHEN "RateLimitBucket"."resetAt" <= CURRENT_TIMESTAMP THEN EXCLUDED."resetAt"
          ELSE "RateLimitBucket"."resetAt"
        END,
        "updatedAt" = CURRENT_TIMESTAMP
      RETURNING "count"
    `;
    scheduleCleanup();
    return (rows[0]?.count ?? options.limit + 1) <= options.limit;
  } catch {
    // Failing closed prevents an outage from silently removing brute-force
    // protection. The caller exposes this as a generic rate-limit response.
    return false;
  }
}
