import ReactQueryProvider from '@/core/contexts/ReactQueryProvider';
import Link from 'next/link';
import Image from 'next/image';
import '@shared/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kor">
      {/* <ReactQueryProvider> */}

      <body className="bg-custom-gray-50">{children}</body>

      {/* </ReactQueryProvider> */}
    </html>
  );
}
