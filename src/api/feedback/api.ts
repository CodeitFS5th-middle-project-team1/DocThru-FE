import { Feedback } from '@/types';
import { customFetch } from '../url';

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

export interface DeleteFeedbackParams {
  feedBackId: string;
}

export const fetchFeedBack = async (
  id: string
): Promise<FetchFeedBackResponse> => {
  const res = await customFetch(`/translations/${id}/feedbacks`, {
    method: 'GET',
  });
  return res.json();
};

export const createFeedBack = async (
  id: string,
  content: string
): Promise<FetchFeedBackResponse> => {
  const res = await customFetch(`/translations/${id}/feedbacks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
  return res.json();
};

export const patchFeedBack = async (
  translationId: string,
  feedBackId: string,
  content: string
): Promise<FetchFeedBackResponse> => {
  const res = await customFetch(
    `/translations/${translationId}/feedbacks/${feedBackId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    }
  );
  return res.json();
};

export const deleteFeedBack = async (
  translationId: string,
  feedBackId: string
): Promise<FetchFeedBackResponse> => {  
  const res = await customFetch(
    `/translations/${translationId}/feedbacks/${feedBackId}`,
    {
      method: 'DELETE',
    }
  );
  return res.json();
};
