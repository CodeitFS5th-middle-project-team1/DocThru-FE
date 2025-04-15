'use client';

import '@shared/globals.css';

import ToastProvider from '@/core/provider/ToastProvider';
import ReactQueryProvider from '@/core/provider/ReactQueryProvider';
import { AuthProvider } from '@/core/provider/AuthProvider';
import { Suspense, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Layout from '@/shared/components/layout/Layout';
import Loading from '../loading';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';
  const isAuthPage =
    pathname.startsWith('/auth') ||
    pathname.startsWith('/main/translation-work');

  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 6000); // 최소 6초 보장
    return () => clearTimeout(timer);
  }, []);

  if (showLoading) return <Loading />;

  return (
    <>
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
    </>
  );
}
