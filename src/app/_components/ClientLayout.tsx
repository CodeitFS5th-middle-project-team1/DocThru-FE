'use client';

import '@shared/globals.css';

import ToastProvider from '@/core/provider/ToastProvider';
import Layout from '@/shared/components/layout/Layout';
import { usePathname } from 'next/navigation';
import ReactQueryProvider from '@/core/provider/ReactQueryProvider';
import { AuthProvider } from '@/core/provider/AuthProvider';
import { Suspense } from 'react';

export default function ClientLayout({
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
    <>
      <ToastProvider />
      <ReactQueryProvider>
        <Suspense fallback={<div>로딩 중...</div>}>
          <AuthProvider>
            {isAuthPage || isLandingPage ? (
              <>{children}</>
            ) : (
              <Layout>{children}</Layout>
            )}
          </AuthProvider>
        </Suspense>
      </ReactQueryProvider>
    </>
  );
}
