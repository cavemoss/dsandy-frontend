import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  const { hostname, pathname } = url;

  const isAdminPanel =
    hostname.startsWith('admin.') || (hostname === 'localhost' && !!request.cookies.get('isAdminPanel'));

  if (isAdminPanel) {
    url.pathname = '/admin' + pathname;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
