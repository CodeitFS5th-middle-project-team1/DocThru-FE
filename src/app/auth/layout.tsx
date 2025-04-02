import ReactQueryProvider from '@/core/contexts/ReactQueryProvider';
import ToastProvider from '@/core/contexts/ToastProvider';
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
