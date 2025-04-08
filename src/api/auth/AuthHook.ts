import { useRouter } from 'next/navigation';
import { useToastMutation } from '@/shared/hooks/useToastMutation';
import toast from 'react-hot-toast';
import { loginFn, signupFn } from './AuthApi';
import { useAuthStore } from './AuthStore';
import { PATH } from '@/constants';

export const useLogin = () => {
  const { setAuth } = useAuthStore();

  return useToastMutation(
    loginFn,
    {
      pending: '로그인 중입니다...',
      success: '로그인 성공!',
    },
    {
      onSuccess: ({ user }) => {
        setAuth(user);
        if (user.role === 'ADMIN') {
          window.location.href = PATH.admin;
        } else {
          window.location.href = PATH.challenge;
        }
      },
    },
    'login-toast'
  );
};

export const useLogout = () => {
  const { clearAuth } = useAuthStore();

  return () => {
    clearAuth();
    document.cookie =
      'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    toast.success('로그아웃 되었습니다!');
    setTimeout(() => {
      window.location.href = '/auth/login';
    }, 300);
  };
};

export const useSignup = () => {
  const router = useRouter();

  return useToastMutation(
    signupFn,
    {
      pending: '회원가입 중입니다...',
      success: '회원가입 성공! 로그인 페이지로 이동 중 ~',
    },
    {
      onSuccess: () => {
        router.push('/auth/login');
      },
    },
    'signup-toast'
  );
};
