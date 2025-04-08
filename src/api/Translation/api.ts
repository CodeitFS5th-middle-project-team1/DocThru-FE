import { Translation } from '@/types';
import { docThro } from '../url';

export interface FetchTranslationParams {
  page?: number;
  limit?: number;
}

export interface FetchTranslationResponse {
  translations: Translation[];
  totalCount: number;
  message: string;
}

export const fetchTranslation = async (
  id: string,
  params?: FetchTranslationParams
): Promise<FetchTranslationResponse> => {
  const res = await docThro.get(`/challenges/${id}/translations`, {
    params: { page: params?.page, limit: params?.limit },
  });
  return res.data;
};

export const fetchTranslationById = async (
  id: string
): Promise<Translation> => {
  const challengeId = localStorage.getItem('challengeId');
  const res = await docThro.get(
    `/challenges/${challengeId}/translations/${id}`
  );
  return res.data;
};
