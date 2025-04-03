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
  const isAuthPage = pathname.startsWith('/auth');

  return (
    <html lang="kor">
      <body>
        <ToastProvider />
        <ReactQueryProvider>
          <AuthProvider>
            {isAuthPage ? <>{children}</> : <Layout>{children}</Layout>}
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
