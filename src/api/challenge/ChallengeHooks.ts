import { useToastMutation } from '@/shared/hooks/useToastMutation';
import { useToastQuery } from '@/shared/hooks/useToastQuery';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ChallengeFormRequest,
  createChallenge,
  editChallenge,
  fetchChallengeById,
} from './ChallengeApi';

export const useGetChallenge = (id: string) => {
  return useToastQuery<ChallengeFormRequest, unknown, any>(
    ['challenge', id],
    () => fetchChallengeById(id),
    'challenge-toast'
  );
};

export const useCreateChallenge = () => {
  const router = useRouter();

  return useToastMutation<ChallengeFormRequest, unknown, any>(
    createChallenge,
    {
      pending: '챌린지를 생성 중입니다...',
      success: '챌린지 생성 완료!',
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

export const useEditChallenge = (id: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  return useToastMutation<ChallengeFormRequest, unknown, any>(
    (data) => editChallenge(id, data),
    {
      pending: '챌린지를 수정 중입니다...',
      success: '챌린지 수정 완료! 상세 페이지로 이동 중!',
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
