import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { PATH } from '@/constants';

const publicPaths = ['/', PATH.login, PATH.signup, PATH.challenge];

interface JwtPayload {
  id: string;
  role: 'ADMIN' | 'USER';
  exp: number;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('accessToken')?.value;
  const isAdminPage = pathname.startsWith('/admin');
  const isPublic = publicPaths.includes(pathname);
  console.log('🔥 middleware 실행: ', pathname, 'token: ', token);
  if (isPublic) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL(PATH.login, request.url);
    loginUrl.searchParams.set('message', 'needLogin');
    return NextResponse.redirect(loginUrl);
  }

  let decodedToken: JwtPayload | null = null;

  try {
    decodedToken = jwtDecode<JwtPayload>(token);
  } catch (error) {
    const loginUrl = new URL(PATH.login, request.url);
    loginUrl.searchParams.set('message', 'needLogin');
    return NextResponse.redirect(loginUrl);
  }

  const userRole = decodedToken.role;

  if (isAdminPage && userRole !== 'ADMIN') {
    const challengeUrl = new URL(PATH.challenge, request.url);
    challengeUrl.searchParams.set('message', 'adminOnly');
    return NextResponse.redirect(challengeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|icons|.*\\.svg).*)'],
};
