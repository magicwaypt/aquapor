import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  // Cookie httpOnly, válido 1 dia
  res.cookies.set('aq_auth', '1', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: true,        // ok em https (Vercel)
    maxAge: 60 * 60 * 24 // 1 dia
  });
  return res;
}
