import { useToastMutation } from '@/shared/hooks/useToastMutation';
import { createLike, deleteLike, LikeRequest } from './api';
import { useQueryClient } from '@tanstack/react-query';

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

    'createLike-toast'
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

    'deleteLike-toast'
  );
};
