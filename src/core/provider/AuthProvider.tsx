'use client';

import { AuthState, useAuthStore, useHydrated } from '@/api/auth/AuthStore';
import { PATH } from '@/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createContext, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

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
  const searchParams = useSearchParams();
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

    const message = searchParams.get('message');
    if (message) {
      if (message === 'needLogin') {
        toast.error('로그인이 필요합니다.');
      } else if (message === 'adminOnly') {
        toast.error('관리자 권한이 필요합니다.');
      }

      const cleanedUrl = `${window.location.pathname}${window.location.hash}`;
      router.replace(cleanedUrl);
    }

    if (!isLoggedIn && !isPublic) {
      router.replace(PATH.login);
    }

    if (isLoggedIn && isPublic && isAuthPage && isHome) {
      router.replace(PATH.challenge);
    }

    if (isLoggedIn && isAdminPage && user?.role !== 'ADMIN') {
      router.replace(PATH.challenge);
    }
  }, [
    hydrated,
    isLoggedIn,
    isPublic,
    pathname,
    router,
    isHome,
    searchParams,
    user?.role,
  ]);

  if (!hydrated) {
    return <div>로딩 중...</div>;
  }

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
