'use client';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" h-screen flex flex-col ">
      <div className="max-w-[1200px] w-full h-full">{children}</div>
    </div>
  );
}
