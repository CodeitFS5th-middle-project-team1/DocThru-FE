'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from './core';
import Header from './Header';
import { PATH } from '@/constants';
import Footer from './Footer';
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { isLogin, role, handleLogout } = useAuth();

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <Header
        isLogin={isLogin}
        onLogin={() => router.push(PATH.login)}
        onLogout={handleLogout}
        role={role}
      />
      <main className="flex-1 w-full max-w-[1000px] px-4">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
