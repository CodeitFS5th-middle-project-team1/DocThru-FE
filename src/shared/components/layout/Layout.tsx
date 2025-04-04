'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from './core';
import Header from './Header';
import { PATH } from '@/constants';
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
      <div className="max-w-[1000px] w-full h-full">{children}</div>
    </div>
  );
};
export default Layout;
