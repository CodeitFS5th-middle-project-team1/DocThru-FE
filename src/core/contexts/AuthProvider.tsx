'use client';
import { redirectAfterAuth } from '@/lib/authRedirect';
import { AuthState, SetUser, useAuthStore } from '@/stores/authStore';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: SetUser;
  accessToken: string;
  refreshToken: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  nickName: string;
}

interface AuthContextType {
  user: AuthState['user'];
  isLoading: boolean;
  isLoggedIn: boolean;
  setAuth: AuthState['setAuth'];
  clearAuth: AuthState['clearAuth'];
}

//로그인 정보 없이는 막고 싶은 경로
// const protectedRoutes = ['/main/challenge/new', '/main/challenge/[id]/edit'];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, accessToken, setAuth, clearAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();
  // const pathname = usePathname();
  const isLoggedIn = !!accessToken;

  // const isProtected = protectedRoutes.some((route) =>
  //   pathname?.startsWith(route.replace('[id]', ''))
  // );

  // useEffect(() => {
  //   if (isLoading) return;

  //   if (isProtected && !isLoggedIn) {
  //     toast.error('로그인이 필요합니다.');
  //     setTimeout(() => {
  //       redirectAfterAuth(router);
  //     }, 1500);
  //   }
  // }, [isLoading, isProtected, isLoggedIn, router]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

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
