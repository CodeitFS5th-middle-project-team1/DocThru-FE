import { useToastMutation } from '@/shared/hooks/useToastMutation';
import { useRouter } from 'next/navigation';
import { signupFn } from '@/lib/api/auth';

export const useSignup = () => {
  const router = useRouter();

  return useToastMutation(
    signupFn,
    {
      pending: '회원가입 중입니다...',
      success: '회원가입 성공! 로그인 페이지로 이동 중 ~',
      error: '회원가입 실패!',
    },
    {
      onSuccess: () => {
        router.push('/auth/login');
      },
    },
    'signup-toast'
  );
};
