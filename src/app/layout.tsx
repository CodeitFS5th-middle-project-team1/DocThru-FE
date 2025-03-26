import ReactQueryProvider from '@/core/contexts/ReactQueryProvider';
import Link from 'next/link';
import Image from 'next/image';
import '@shared/globals.css';
import ToastProvider from '@/core/contexts/ToastProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kor">
      <body>
        <ToastProvider />
        {/* <ReactQueryProvider> */}

        {children}
        {/* </ReactQueryProvider> */}
      </body>
    </html>
  );
}
