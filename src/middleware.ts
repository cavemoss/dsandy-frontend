import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdminPanel = request.headers.get('host')?.startsWith('admin.');

  if (isAdminPanel) {
    const { nextUrl } = request;
    nextUrl.pathname = '/admin' + nextUrl.pathname;

    return NextResponse.rewrite(nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
