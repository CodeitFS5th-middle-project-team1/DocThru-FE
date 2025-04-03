import { useToastMutation } from '@/shared/hooks/useToastMutation';
import { ChallengeFormRequest, createChallenge } from '@/lib/api/challenge';
import { useRouter } from 'next/navigation';

export const useCreateChallenge = () => {
  const router = useRouter();

  return useToastMutation<ChallengeFormRequest, unknown, any>(
    createChallenge,
    {
      pending: '챌린지를 생성 중입니다...',
      success: '챌린지 생성 완료! 챌린지 페이지로 이동 중!',
      error: '챌린지 생성 실패!',
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          router.push('/main/challenge');
        }, 1500);
      },
    },
    'challenge-toast'
  );
};
