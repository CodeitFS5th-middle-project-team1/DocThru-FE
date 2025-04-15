import ClientLayout from './_components/ClientLayout';

export const metadata = {
  title: '독스루',
  description: '번역 홈페이지',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
