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
      <section className="flex flex-col justify-center items-center px-4 md:px-28  gap-10 ">
        {children}
      </section>
    </ReactQueryProvider>
  );
}
