'use client';

import '@shared/globals.css';

import ToastProvider from '@/core/provider/ToastProvider';
import Layout from '@/shared/components/layout/Layout';
import { usePathname } from 'next/navigation';
import ReactQueryProvider from '@/core/provider/ReactQueryProvider';
import { AuthProvider } from '@/core/provider/AuthProvider';
import { Suspense } from 'react';
import Loading from './loading';

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
          <Suspense fallback={<Loading />}>
            <AuthProvider>
              {isAuthPage || isLandingPage ? (
                <>{children}</>
              ) : (
                <Layout>{children}</Layout>
              )}
            </AuthProvider>
          </Suspense>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
