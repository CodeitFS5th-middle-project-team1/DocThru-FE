'use client';

import Header from './Header';
import Footer from './Footer';
import { usePathname } from 'next/navigation';
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const pagesWithGrayBg = ['/main/challenge', '/main/my-challenge'];
  const isGrayBackgroundPage = pagesWithGrayBg.includes(pathname);

  const backgroundClass = isGrayBackgroundPage
    ? 'bg-custom-gray-50'
    : 'bg-white';

  return (
    <div className="w-screen min-h-screen flex flex-col items-center relative">
      <div className={`absolute inset-0 -z-10 ${backgroundClass}`} />
      <Header />
      <main className="flex-1 w-full max-w-[1000px] px-4">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
