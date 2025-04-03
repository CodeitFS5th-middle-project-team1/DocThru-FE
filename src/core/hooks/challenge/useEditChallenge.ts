import { useToastMutation } from '@/shared/hooks/useToastMutation';
import { ChallengeFormRequest, editChallenge } from '@/lib/api/challenge';
import { useRouter, useSearchParams } from 'next/navigation';

export const useEditChallenge = (id: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  return useToastMutation<ChallengeFormRequest, unknown, any>(
    (data) => editChallenge(id, data),
    {
      pending: '챌린지를 수정 중입니다...',
      success: '챌린지 수정 완료! 상세 페이지로 이동 중!',
      error: '챌린지 수정 실패!',
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          router.push(from ?? `/main/challenge/${id}`);
        }, 1500);
      },
    },
    'challenge-toast'
  );
};
