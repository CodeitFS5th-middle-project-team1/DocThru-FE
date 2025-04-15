import { useToastQuery } from '@/shared/hooks/useToastQuery';
import {
  createFeedBack,
  deleteFeedBack,
  DeleteFeedbackParams,
  fetchFeedBack,
  FetchFeedBackResponse,
  patchFeedBack,
  PatchFeedbackParams,
} from './api';
import { useToastMutation } from '@/shared/hooks/useToastMutation';
import { useQueryClient } from '@tanstack/react-query';
import { TOAST_ID } from '@/constants';

export const useGetFeedBackList = (id: string) => {
  return useToastQuery<FetchFeedBackResponse, unknown>(
    ['FeedBackList', id],
    () => fetchFeedBack(id),
    TOAST_ID.TRANSLATION,
    {},
    false,
    {
      enabled: !!id,
      staleTime: 1000 * 60 * 5, // 5분 동안 캐시된 데이터 사용
      refetchOnWindowFocus: false, // 페이지 포커스 시 재요청 방지
      refetchOnReconnect: false, // 네트워크 재연결 시 재요청 방지
    }
  );
};

export const useCreateFeedBack = (id: string) => {
  const queryClient = useQueryClient();
  return useToastMutation<string, FetchFeedBackResponse>(
    (content) => createFeedBack(id, content),
    {
      success: '피드백 생성 성공',
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['FeedBackList', id] });
      },
    },
    TOAST_ID.TRANSLATION
  );
};

export const usePatchFeedBack = (translationId: string) => {
  const queryClient = useQueryClient();
  return useToastMutation<PatchFeedbackParams, FetchFeedBackResponse>(
    ({ feedBackId, content }) =>
      patchFeedBack(translationId, feedBackId, content),
    {
      success: '피드백 수정 성공',
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['FeedBackList', translationId],
        });
      },
    },
    TOAST_ID.TRANSLATION
  );
};

export const useDeleteFeedBack = (translationId: string) => {
  const queryClient = useQueryClient();
  return useToastMutation<DeleteFeedbackParams, FetchFeedBackResponse>(
    ({ feedBackId }) => deleteFeedBack(translationId, feedBackId),
    {
      success: '피드백 삭제 성공',
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['FeedBackList', translationId],
        });
      },
    },
    TOAST_ID.TRANSLATION
  );
};
