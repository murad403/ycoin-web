import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = [
  '/new-chat',
  '/chat',
  '/alerts',
  '/discover',
  '/terms-of-conditions',
  '/privacy-policy',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('access')?.value;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isAuthRoute = pathname.startsWith('/auth');

  // If trying to access protected route without access token
  if (isProtectedRoute && !accessToken) {
    const signInUrl = new URL('/auth/sign-in', request.url);
    return NextResponse.redirect(signInUrl);
  }

  // If authenticated user tries to access auth pages
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/new-chat', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/new-chat/:path*',
    '/chat/:path*',
    '/alerts/:path*',
    '/discover/:path*',
    '/terms-of-conditions/:path*',
    '/privacy-policy/:path*',
    '/auth/:path*',
  ],
};
