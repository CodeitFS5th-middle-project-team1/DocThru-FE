'use client';

import '@shared/globals.css';

import ToastProvider from '@/core/contexts/ToastProvider';
import Layout from '@/shared/components/layout/Layout';
import { usePathname } from 'next/navigation';
import ReactQueryProvider from '@/core/contexts/ReactQueryProvider';
import { AuthProvider } from '@/core/contexts/AuthProvider';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/'; //랜딩페이지는 AuthProvider 제외
  const isAuthPage =
    pathname.startsWith('/auth') || pathname.startsWith('/admin');

  return (
    <html lang="kor">
      <body>
        <ToastProvider />
        <ReactQueryProvider>
          <AuthProvider>
            {isAuthPage || isLandingPage ? (
              <>{children}</>
            ) : (
              <Layout>{children}</Layout>
            )}
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
