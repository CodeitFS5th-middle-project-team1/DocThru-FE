import { useRouter } from 'next/navigation';
import { useToastMutation } from '@/shared/hooks/useToastMutation';
import { useAuthStore } from '@/stores/authStore';
import { loginFn } from '@/lib/api/auth';

export const useLogin = () => {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  return useToastMutation(
    loginFn,
    {
      pending: '로그인 중입니다...',
      success: '로그인 성공!',
      error: '로그인 실패! 이메일 또는 비밀번호를 확인해주세요.',
    },
    {
      onSuccess: ({ user, accessToken, refreshToken }) => {
        setAuth(user, accessToken, refreshToken);

        const path = localStorage.getItem('redirectAfterLogin') || '/';
        localStorage.removeItem('redirectAfterLogin');
        setTimeout(() => {
          router.push(path);
        }, 1500);
      },
    },
    'login-toast'
  );
};
