import { useToastMutation } from '@/shared/hooks/useToastMutation';
import { useToastQuery } from '@/shared/hooks/useToastQuery';
import { Challenge, ChallengeUser } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ChallengeFormRequest,
  fetchMyChallenge,
  createChallenge,
  editChallenge,
  fetchChallengeById,
  approveChallenge,
  rejectChallenge,
  deleteChallenge,
} from './ChallengeApi';
import { useQueryClient } from '@tanstack/react-query';

export const useGetChallenge = (id: string) => {
  return useToastQuery<Challenge, Challenge>(
    ['challenge', id],
    () => fetchChallengeById(id),
    'challenge-toast'
  );
};

export const useGetMyChallenge = (id: string) => {
  return useToastQuery<ChallengeUser, unknown>(
    ['my-challenge', id],
    () => fetchMyChallenge(id),
    'challenge-toast'
  );
};

export const useCreateChallenge = () => {
  const router = useRouter();

  return useToastMutation<ChallengeFormRequest, unknown>(
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

  return useToastMutation<ChallengeFormRequest, unknown>(
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

export const useChallengeStatusMutation = (id: string) => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['my-challenge', id] });
  };

  const approveMutation = useToastMutation<void, void>(
    () => approveChallenge(id),
    {
      success: '챌린지 승인 성공!',
    },
    {
      onSuccess,
    },
    'approveChallenge-toast'
  );

  const rejectMutation = useToastMutation<string, void>(
    (reason) => rejectChallenge(id, reason),
    {
      success: '챌린지 거절 성공!',
    },
    {
      onSuccess,
    },
    'rejectChallenge-toast'
  );

  return { approveMutation, rejectMutation };
};

export const useDeleteChallenge = (id: string) => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['my-challenge', id] });
  };

  const deleteMutation = useToastMutation<void, void>(
    () => deleteChallenge(id),
    {
      success: '챌린지 삭제 성공!',
    },
    {
      onSuccess,
    },
    'deleteChallenge-toast'
  );

  return { deleteMutation };
};
