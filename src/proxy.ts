import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const NONCE_PAGE_PATTERN =
  /^\/(?:dashboard|login|forgot-password|change-password)(?:\/|$)/;

export function proxy(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const needsNonce = NONCE_PAGE_PATTERN.test(request.nextUrl.pathname);
  const isApiRoute = request.nextUrl.pathname.startsWith('/api/');
  const isVercelPreview =
    request.nextUrl.hostname === 'tamammedia-website.vercel.app' ||
    request.nextUrl.hostname.endsWith('.vercel.app');

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
