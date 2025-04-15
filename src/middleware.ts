import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeJwt } from 'jose';
import { PATH } from '@/constants';

const publicPaths = ['/', PATH.login, PATH.signup, PATH.challenge];

interface JwtPayload {
  id: string;
  role: 'ADMIN' | 'USER';
  exp: number;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('accessToken')?.value;
  console.log('middleware token', token);
  const isAdminPage = pathname.startsWith('/admin');
  const isPublic = publicPaths.includes(pathname);

  if (isPublic) {
    return NextResponse.next();
  }

  if (!token) {
    return redirectWithMessage(request, PATH.login, 'needLogin');
  }

  let decodedToken: JwtPayload | null = null;

  try {
    decodedToken = decodeJwt(token) as JwtPayload;
  } catch (error) {
    console.warn('JWT decode 실패:', error);
    return redirectWithMessage(request, PATH.login, 'needLogin');
  }

  const userRole = decodedToken.role;

  if (isAdminPage && userRole !== 'ADMIN') {
    return redirectWithMessage(request, PATH.challenge, 'adminOnly');
  }

  return NextResponse.next();
}

function redirectWithMessage(
  request: NextRequest,
  destination: string,
  message: string
) {
  const url = new URL(destination, request.url);
  url.searchParams.set('message', message);
  url.searchParams.set('redirect', request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|icons|.*\\.svg|api).*)'],
};
