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
export interface DraftResponse {
  id: string;
  title: string;
  content: string;
  userId: string;
  challengeId: string;
  createdAt: string;
  updatedAt: string;
  message: string;
}
export interface DraftRequest {
  title: string;
  content: string | null;
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

export const createTranslation = async (
  data: DraftRequest,
  challengeId: string,
): Promise<Translation> => {
  const response = await docThro.post(
    `/challenges/${challengeId}/translations`,
    { title: data.title, content: data.content }
  );
  console.log('API Response:', response.data); // 응답 로그 출력
  return response.data;
};

export const patchTranslation = async (
  id: string,
  data: DraftRequest
): Promise<Translation> => {
  const challengeId = localStorage.getItem('challengeId');

  const res = await docThro.patch(
    `/challenges/${challengeId}/translations/${id}`,
    { data }
  );
  return res.data;
};

export const createDraft = async (
  id: string,
  title: string,
  content: string | null
): Promise<DraftResponse> => {
  const res = await docThro.post(`/challenges/${id}/drafts`, {
    title,
    content,
  });
  return res.data;
};

export const getDraftTranslation = async (id: string): Promise<Translation> => {
  const response = await docThro.get(`/challenges/${id}/drafts`);
  return response.data.data;
};
