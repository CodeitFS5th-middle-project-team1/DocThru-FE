import { Translation } from '@/types';
import { customFetch } from '../url';
import { getQueryString } from '@/lib/utill';
import { TOAST_ID } from '@/constants';

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
  const query = getQueryString({ page: params?.page, limit: params?.limit });
  const res = await customFetch(`/challenges/${id}/translations${query}`, {
    toastId: TOAST_ID.TRANSLATION,
  });
  return res.json();
};

export const fetchTranslationById = async (
  id: string,
  challengeId: string
): Promise<Translation> => {
  const res = await customFetch(
    `/challenges/${challengeId}/translations/${id}`,
    { toastId: TOAST_ID.TRANSLATION }
  );
  return res.json();
};

export const createTranslation = async (
  data: DraftRequest,
  challengeId: string
): Promise<Translation> => {
  const response = await customFetch(
    `/challenges/${challengeId}/translations`,
    {
      method: 'POST',
      body: JSON.stringify({ title: data.title, content: data.content }),
      headers: { 'Content-Type': 'application/json' },
      toastId: TOAST_ID.TRANSLATION,
      disableToast: true,
    }
  );
  return response.json();
};

export const patchTranslation = async (
  id: string,
  data: DraftRequest,
  challengeId: string
): Promise<Translation> => {
  const res = await customFetch(
    `/challenges/${challengeId}/translations/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ title: data.title, content: data.content }),
      headers: { 'Content-Type': 'application/json' },
      toastId: TOAST_ID.TRANSLATION,
      disableToast: true,
    }
  );
  return res.json();
};

export const deleteTranslation = async (
  id: string,
  challengeId: string
): Promise<Translation> => {
  const res = await customFetch(
    `/challenges/${challengeId}/translations/${id}`,
    { method: 'DELETE' }
  );
  return res.json();
};

export const createDraft = async (
  id: string,
  title: string,
  content: string | null
): Promise<DraftResponse> => {
  const res = await customFetch(`/challenges/${id}/drafts`, {
    method: 'POST',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' },
    toastId: TOAST_ID.TRANSLATION,
  });
  return res.json();
};

export const getDraftTranslation = async (id: string): Promise<Translation> => {
  const response = await customFetch(`/challenges/${id}/drafts`, {
    toastId: TOAST_ID.TRANSLATION,
  });
  const data = await response.json();
  return data.data;
};
