import { Feedback } from '@/types';
import { docThro } from '../url';

export interface FetchFeedBackResponse {
  feedbacks: Feedback[];
}
export interface FetchFeedBackRequest {
  id: string;
  content: string;
}
export interface PatchFeedbackParams {
  feedBackId: string;
  content: string;
}

export const fetchFeedBack = async (
  id: string
): Promise<FetchFeedBackResponse> => {
  const res = await docThro.get(`/translations/${id}/feedbacks`);
  return res.data;
};

export const createFeedBack = async (
  id: string,
  content: string
): Promise<FetchFeedBackResponse> => {
  const res = await docThro.post(`/translations/${id}/feedbacks`, { content });
  return res.data;
};

export const patchFeedBack = async (
  translationId: string,
  feedBackId: string,
  content: string
): Promise<FetchFeedBackResponse> => {
  const res = await docThro.patch(
    `/translations/${translationId}/feedbacks/${feedBackId}`,
    { content }
  );
  return res.data;
};
