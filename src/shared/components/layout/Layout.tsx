'use client';
import { useAuth } from './core';
import Header from './Header';
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { devLogin, isLogin, role, handleLogout } = useAuth();
  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <Header
        isLogin={isLogin}
        onLogin={devLogin}
        onLogout={handleLogout}
        role={role}
      />
      <div className="max-w-[1000px] w-full h-full">{children}</div>
    </div>
  );
};
export default Layout;
