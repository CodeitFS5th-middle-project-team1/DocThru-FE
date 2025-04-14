import ReactQueryProvider from '@/core/provider/ReactQueryProvider';
import ToastProvider from '@/core/provider/ToastProvider';
import '@shared/globals.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <ToastProvider />
      <section className="flex flex-col h-screen  items-center px-4 md:px-28  bg-[#f5f5f5] ">
        {children}
      </section>
    </ReactQueryProvider>
  );
}
