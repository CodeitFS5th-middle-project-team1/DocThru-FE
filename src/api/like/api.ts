import { customFetch } from '../url';

export interface LikeRequest {
  id: string;
}

interface CreateLikeResponse {
  id: string;
  translation: string;
  userId: string;
}

export const createLike = async (id: string): Promise<CreateLikeResponse> => {
  const res = await customFetch(`/translations/${id}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};

export const deleteLike = async (id: string): Promise<CreateLikeResponse> => {
  const res = await customFetch(`/translations/${id}/like`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};
