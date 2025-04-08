import { useToastQuery } from '@/shared/hooks/useToastQuery';
import {
  fetchTranslation,
  fetchTranslationById,
  FetchTranslationParams,
  FetchTranslationResponse,
} from './api';
import { Translation } from '@/types';
import { useQueries } from '@tanstack/react-query';

export const useGetTranslationList = (
  id: string,
  params: FetchTranslationParams
) => {
  return useToastQuery<FetchTranslationResponse, unknown, any>(
    ['translationList', id, params?.page, params?.limit],
    () => fetchTranslation(id, params),
    'TranslationList-toast'
  );
};

export const useGetTranslation = (id: string) => {
  return useToastQuery<Translation, unknown, any>(
    ['translation', id],
    () => fetchTranslationById(id),
    'Translation-toast'
  );
};

export const useGetTranslationsByIds = (ids?: string[]) => {
  const queries = useQueries({
    queries:
      ids?.map((id) => ({
        queryKey: ['translation', id],
        queryFn: () => fetchTranslationById(id),
        enabled: !!id,
      })) ?? [],
  });

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);
  const data: (Translation | undefined)[] = queries.map((q) => q.data);

  return { data, isLoading, isError };
};
