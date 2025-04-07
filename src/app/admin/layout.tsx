'use client';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <div className="max-w-[1200px] w-full h-full">{children}</div>
    </div>
  );
}
