import { useToastMutation } from '@/shared/hooks/useToastMutation';
import { createLike, deleteLike, LikeRequest } from './api';
import { useQueryClient } from '@tanstack/react-query';
import { TOAST_ID } from '@/constants';

export const useCreateLike = (id: string) => {
  const queryClient = useQueryClient();
  return useToastMutation<void, LikeRequest>(
    () => createLike(id),
    {},
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['translation'],
        });
      },
    },

    TOAST_ID.TRANSLATION
  );
};
export const useDeleteLike = (id: string) => {
  const queryClient = useQueryClient();
  return useToastMutation<void, LikeRequest>(
    () => deleteLike(id),
    {},
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['translation'],
        });
      },
    },

    TOAST_ID.TRANSLATION
  );
};
