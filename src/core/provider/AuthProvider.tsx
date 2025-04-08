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

  const message = searchParams.get('message');
  const isLoggedIn = !!user;
  const isLoading = !hydrated;
  const isPublic = publicPaths.some((path) => pathname.startsWith(path));
  const isHome = homePaths.includes(pathname);

  useEffect(() => {
    if (!hydrated || !message) return;

    const messages: Record<string, string> = {
      needLogin: '로그인이 필요합니다.',
      adminOnly: '관리자 전용 페이지입니다.',
      forbidden: '접근 권한이 없습니다.',
    };

    const toastMessage = messages[message];
    if (toastMessage) toast.error(toastMessage);
  }, [hydrated, message]);

  useEffect(() => {
    if (!hydrated) return;

    const isAuthPage =
      pathname.startsWith(PATH.login) || pathname.startsWith(PATH.signup);

    const isAdminPage = pathname.startsWith('/admin');

    if (isLoggedIn && isPublic && isAuthPage && isHome) {
      router.replace(PATH.challenge);
    }

    if (isLoggedIn && isAdminPage && user?.role !== 'ADMIN') {
      router.replace(PATH.challenge);
      return;
    }
  }, [hydrated, isLoggedIn, isPublic, pathname, router]);

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
