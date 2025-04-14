import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { PATH } from '@/constants';

const publicPaths = ['/', PATH.login, PATH.signup, PATH.challenge];

interface JwtPayload {
  id: string;
  role: 'ADMIN' | 'USER';
  exp: number;
}

async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    console.log('verifyToken token', token);
    const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
    const { payload } = await jwtVerify<JwtPayload>(token, secret);
    console.log('verifyToken payload', payload);
    return payload;
  } catch (error) {
    console.error('[JWT Verify Error]', error);
    return null;
  }
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

  const decodedToken = await verifyToken(token);

  if (!decodedToken) {
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
