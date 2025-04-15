import ClientLayout from './_components/ClientLayout';

export const metadata = {
  title: '타이틀',
  description: '설명',
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
