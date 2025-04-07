'use client';

import '@shared/globals.css';

import ToastProvider from '@/core/provider/ToastProvider';
import Layout from '@/shared/components/layout/Layout';
import { usePathname } from 'next/navigation';
import ReactQueryProvider from '@/core/provider/ReactQueryProvider';
import { AuthProvider } from '@/core/provider/AuthProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/'; //랜딩페이지는 AuthProvider 제외
  const isAuthPage =
    pathname.startsWith('/auth') || pathname.startsWith('/admin') || pathname.startsWith('/main/translation-work');

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
