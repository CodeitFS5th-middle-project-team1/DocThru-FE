'use client';

import Header from './Header';
import Footer from './Footer';
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <Header />
      <main className="flex-1 w-full max-w-[1000px] px-4">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
