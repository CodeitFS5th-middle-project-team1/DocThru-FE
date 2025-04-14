import { useToastQuery } from '@/shared/hooks/useToastQuery';
import {
  createDraft,
  DraftRequest,
  DraftResponse,
  fetchTranslation,
  fetchTranslationById,
  FetchTranslationParams,
  FetchTranslationResponse,
  getDraftTranslation,
  // patchTranslation,
} from './api';
import { Translation } from '@/types';
import { useQueries } from '@tanstack/react-query';
import { useToastMutation } from '@/shared/hooks/useToastMutation';

export const useGetTranslationList = (
  id: string,
  params: FetchTranslationParams
) => {
  return useToastQuery<FetchTranslationResponse, unknown>(
    ['translationList', id, params?.page, params?.limit],
    () => fetchTranslation(id, params),
    'TranslationList-toast',
    {},
    { enabled: !!id }
  );
};

export const useGetTranslation = (id: string, challengeId: string) => {
  return useToastQuery<Translation, unknown>(
    ['translation', id, challengeId],
    () => fetchTranslationById(id, challengeId),
    'Translation-toast',
    {},
    { enabled: !!id && !!challengeId }
  );
};
export const useGetDraftTranslation = (id: string) => {
  return useToastQuery<Translation, unknown>(
    ['getDraftTranslation', id],
    () => getDraftTranslation(id),
    'getDraftTranslation-toast',
    {},
    { enabled: !!id }
  );
};

export const useGetTranslationsByIds = (
  challengeId: string,
  ids?: string[]
) => {
  const queries = useQueries({
    queries:
      ids?.map((id) => ({
        queryKey: ['translation', id],
        queryFn: () => fetchTranslationById(id, challengeId),
        enabled: !!id,
      })) ?? [],
  });

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);
  const data: (Translation | undefined)[] = queries.map((q) => q.data);

  return { data, isLoading, isError };
};

// export const useCreateTranslation = () => {
//   return useToastMutation<
//     DraftRequest,
//     Translation
//   >(
//     (data) => createTranslation(data),
//     {
//       pending: '작성 중입니다...',
//       success: '작성 성공!',
//       error: '작성 실패 😢',
//     },
//     {
//       onSuccess: (data) => {
//         console.log('성공', data);
//         // 추가 작업 예시: setTranslationId(data.id); setModal('success');
//       },
//     },
//     'create-translation'
//   );
// };
// export const usePatchTranslation = (id: string) => {
//   return useToastMutation<DraftRequest, unknown>(
//     (data) => patchTranslation(id, data),
//     {
//       pending: '수정 중입니다...',
//       success: '수정 성공!',
//       error: '수정 실패 😢',
//     },
//     {
//       onSuccess: () => {
//         console.log('성공');
//       },
//       onError: () => {},
//     },
//     'patch-translation'
//   );
// };

export const useCreateDraft = (id: string) => {
  return useToastMutation<DraftRequest, DraftResponse>(
    ({ title, content }) => createDraft(id, title, content),
    {
      pending: '임시저장 중입니다...',
      success: '임시저장 성공!',
      error: '임시저장 실패 😢',
    },
    {
      onSuccess: () => {},
    },
    'save-translation' // <- toastId (중복 방지용 고유 id)
  );
};
