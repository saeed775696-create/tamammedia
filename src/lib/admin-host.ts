/**
 * Host isolation for the administration surface.
 *
 * ADMIN_HOST deliberately accepts a hostname only (for example,
 * "m7x4p9ka3qv6.tamammedia.tech"). It is server-only: never prefix it with
 * NEXT_PUBLIC_ and never commit the chosen value.
 */
export function normalizeHost(value: string | null | undefined): string | null {
  const candidate = value?.trim();
  if (!candidate) return null;

  try {
    const url = new URL(
      candidate.includes("://") ? candidate : `https://${candidate}`
    );
    return url.hostname.toLowerCase();
  } catch {
    return null;
  }
}

export function getAdminHost(): string | null {
  return normalizeHost(process.env.ADMIN_HOST);
}

/**
 * Next's local and standalone servers may build `nextUrl` from their bind
 * address. The HTTP Host header remains the canonical hostname Vercel routed
 * to this deployment. Prefer it over forwarded headers so an untrusted
 * client-supplied forwarding header cannot select the administration host.
 */
export function getRequestHost(
  headers: Headers,
  fallbackHostname?: string | null
): string | null {
  return (
    normalizeHost(headers.get("host")) ??
    normalizeHost(headers.get("x-forwarded-host")) ??
    normalizeHost(fallbackHostname)
  );
}

export function isAdminHost(hostname: string | null | undefined): boolean {
  const adminHost = getAdminHost();
  return Boolean(adminHost && normalizeHost(hostname) === adminHost);
}

export function isAdminIsolationEnabled(): boolean {
  // A malformed non-empty value must fail closed in the proxy rather than
  // silently disabling the isolation boundary.
  return Boolean(process.env.ADMIN_HOST?.trim());
}
