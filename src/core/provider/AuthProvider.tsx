'use client';

import { AuthState, useAuthStore, useHydrated } from '@/api/auth/AuthStore';
import { PATH } from '@/constants';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect } from 'react';

const publicPaths = ['/', PATH.login, PATH.signup, PATH.challenge];
const homePaths = ['/'];

interface AuthContextType {
  user: AuthState['user'];
  isLoading: boolean;
  isLoggedIn: boolean;
  setAuth: AuthState['setAuth'];
  clearAuth: AuthState['clearAuth'];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, setAuth, clearAuth } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const hydrated = useHydrated();

  const isLoggedIn = !!user;
  const isLoading = !hydrated;
  const isPublic = publicPaths.some((path) => pathname.startsWith(path));
  const isHome = homePaths.includes(pathname);

  useEffect(() => {
    if (!hydrated) return;

    const isAuthPage =
      pathname.startsWith(PATH.login) || pathname.startsWith(PATH.signup);

    const isAdminPage = pathname.startsWith('/admin');

    if (!isLoggedIn && !isPublic) {
      router.replace(PATH.login);
    }

    if (isLoggedIn && isPublic && isAuthPage && isHome) {
      router.replace(PATH.challenge);
    }

    if (isLoggedIn && isAdminPage && user?.role !== 'ADMIN') {
      router.replace(PATH.challenge);
      return;
    }
  }, [hydrated, isLoggedIn, isPublic, pathname, router, isHome, user?.role]);

  return (
    <AuthContext.Provider
      value={{ user, setAuth, clearAuth, isLoggedIn, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw Error('AuthProvider 안에서 사용해야 합니다!');
  return context;
};
