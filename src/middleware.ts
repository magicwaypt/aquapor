import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rotas livres
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/assets') ||
    pathname === '/'
  ) {
    return NextResponse.next();
  }

  const isAuthed = req.cookies.get('aq_auth')?.value === '1';
  if (!isAuthed) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Aplica a todas as rotas, excluindo estáticos comuns
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|assets).*)'],
};
