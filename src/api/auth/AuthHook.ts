import { useRouter } from 'next/navigation';
import { useToastMutation } from '@/shared/hooks/useToastMutation';
import { loginFn, signupFn, logoutFn } from './AuthApi';
import { useAuthStore } from './AuthStore';
import { PATH, TOAST_ID } from '@/constants';
import { flushSync } from 'react-dom';

export const useLogin = () => {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  return useToastMutation(
    loginFn,
    {
      pending: '로그인 중입니다...',
      success: '로그인 성공!',
    },
    {
      onSuccess: ({ user }) => {
        flushSync(() => {
          setAuth(user);
        });
        if (user.role === 'ADMIN') {
          router.replace(PATH.admin);
        } else {
          router.replace(PATH.challenge);
        }
      },
      onError: () => {
        // 전역에서 또 토스트 띄우지 않도록 방지
        return true;
      },
    },
    TOAST_ID.AUTH
  );
};

export const useLogout = () => {
  const { clearAuth } = useAuthStore();
  const router = useRouter();

  return async () => {
    try {
      await logoutFn({ disableToast: true });
      clearAuth();
      document.cookie =
        'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure;';
      setTimeout(() => {
        router.replace('/auth/login?message=logoutSuccess');
      }, 0);
    } catch (err) {
      console.error('❌ 로그아웃 요청 실패:', err);
    }
  };
};

export const useSignup = () => {
  const router = useRouter();

  return useToastMutation(
    signupFn,
    {
      pending: '회원가입 중입니다...',
      success: '회원가입 성공! \n 로그인 페이지로 이동 중 ~',
    },
    {
      onSuccess: () => {
        router.push('/auth/login');
      },
      onError: () => {
        // 전역 토스트 중복 방지
        return true;
      },
    },
    TOAST_ID.AUTH
  );
};
