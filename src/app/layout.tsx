'use client';

import '@shared/globals.css';

import ToastProvider from '@/core/provider/ToastProvider';
import Layout from '@/shared/components/layout/Layout';
import { usePathname } from 'next/navigation';
import ReactQueryProvider from '@/core/provider/ReactQueryProvider';
import { AuthProvider } from '@/core/provider/AuthProvider';
import { Suspense } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';
  const isAuthPage =
    pathname.startsWith('/auth') ||
    pathname.startsWith('/main/translation-work');

  return (
    <html lang="kor">
      <body>
        <ToastProvider />
        <ReactQueryProvider>
          <AuthProvider>
            <Suspense fallback={<div>로딩 중...</div>}>
              {isAuthPage || isLandingPage ? (
                <>{children}</>
              ) : (
                <Layout>{children}</Layout>
              )}
            </Suspense>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
