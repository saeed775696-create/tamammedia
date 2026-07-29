import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  getRequestHost,
  isAdminHost,
  isAdminIsolationEnabled,
} from '@/lib/admin-host';

const NONCE_PAGE_PATTERN =
  /^\/(?:dashboard|login|forgot-password|change-password)(?:\/|$)/;
const DASHBOARD_API_PATTERN =
  /^\/api\/(?:account|analytics|auth|contacts|partners|portfolio|services|site-settings|team|upload|users)(?:\/|$)/;
const CONTENT_API_PATTERN =
  /^\/api\/(?:partners|portfolio|services|team)(?:\/|$)/;
const CONTACTS_API_PATTERN = /^\/api\/contacts(?:\/|$)/;

function isAdminOnlyApiRequest(request: NextRequest): boolean {
  const pathname = request.nextUrl.pathname;

  if (!DASHBOARD_API_PATTERN.test(pathname)) return false;

  // The public site submits contact forms and may read public collections.
  // Mutations and all remaining administrative API families stay on ADMIN_HOST.
  if (CONTACTS_API_PATTERN.test(pathname)) return request.method !== 'POST';
  if (CONTENT_API_PATTERN.test(pathname)) return request.method !== 'GET';
  return true;
}

function hiddenNotFound(requestId: string) {
  return new NextResponse(null, {
    status: 404,
    headers: {
      'Cache-Control': 'private, no-store, max-age=0',
      'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet, noimageindex',
      'x-request-id': requestId,
    },
  });
}

function privateRedirect(url: URL, requestId: string) {
  const response = NextResponse.redirect(url, 307);
  response.headers.set('Cache-Control', 'private, no-store, max-age=0');
  response.headers.set(
    'X-Robots-Tag',
    'noindex, nofollow, noarchive, nosnippet, noimageindex'
  );
  response.headers.set('x-request-id', requestId);
  return response;
}

export function proxy(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const { pathname } = request.nextUrl;
  const needsNonce = NONCE_PAGE_PATTERN.test(pathname);
  const isApiRoute = pathname.startsWith('/api/');
  const isDashboardApiRoute = DASHBOARD_API_PATTERN.test(pathname);
  const adminIsolationEnabled = isAdminIsolationEnabled();
  const requestHost = getRequestHost(request.headers, request.nextUrl.hostname);
  const requestIsAdminHost = isAdminHost(requestHost);
  const isVercelPreview =
    request.nextUrl.hostname === 'tamammedia-website.vercel.app' ||
    request.nextUrl.hostname.endsWith('.vercel.app');

  // Once ADMIN_HOST is configured, the public hostname never reveals where
  // administration lives. A 404 is deliberate: redirects disclose the host.
  if (adminIsolationEnabled && !requestIsAdminHost) {
    if (needsNonce || isAdminOnlyApiRequest(request)) {
      return hiddenNotFound(requestId);
    }
  }

  // The administration hostname serves no public pages. It keeps every
  // authenticated request on the same origin while avoiding public content,
  // analytics, and accidental SEO exposure on this hostname.
  if (adminIsolationEnabled && requestIsAdminHost) {
    if (pathname === '/') {
      return privateRedirect(new URL('/dashboard', request.url), requestId);
    }

    if (!needsNonce && !isDashboardApiRoute) {
      return hiddenNotFound(requestId);
    }
  }

  // Public pages intentionally avoid request headers and nonces. They use the
  // static CSP from next.config.ts and remain eligible for ISR/CDN caching.
  if (!needsNonce && !isApiRoute) {
    const response = NextResponse.next();
    response.headers.set('x-request-id', requestId);
    if (isVercelPreview) {
      response.headers.set(
        'X-Robots-Tag',
        'noindex, nofollow, noarchive, nosnippet, noimageindex'
      );
    }
    return response;
  }

  if (isApiRoute) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-request-id', requestId);
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    response.headers.set('x-request-id', requestId);
    return response;
  }

  const nonce = crypto.randomUUID().replaceAll('-', '');
  const isDevelopment = process.env.NODE_ENV === 'development';
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDevelopment ? " 'unsafe-eval'" : ''}`,
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co",
    "frame-src 'self'",
    "worker-src 'self' blob:",
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isDevelopment ? [] : ['upgrade-insecure-requests']),
  ].join('; ');
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-request-id', requestId);
  // Next.js reads this nonce and applies it to its own inline bootstrap scripts.
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set('x-request-id', requestId);
  response.headers.set('Content-Security-Policy', csp);
  if (isVercelPreview) {
    response.headers.set(
      'X-Robots-Tag',
      'noindex, nofollow, noarchive, nosnippet, noimageindex'
    );
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
