import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface ToastMessages {
  pending?: string;
  success?: string;
  error?: string;
}

export function useToastMutation<
  TVariables = void,
  TData = unknown,
  TError = unknown,
  TContext = unknown,
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  toastMessages?: ToastMessages,
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> {
  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    ...options,
    onMutate: async (variables) => {
      toast.dismiss();
      if (toastMessages?.pending) toast.loading(toastMessages.pending);
      return options?.onMutate?.(variables);
    },
    onSuccess: (data, variables, context) => {
      toast.dismiss();
      if (toastMessages?.success) toast.success(toastMessages.success);
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      toast.dismiss();
      if (toastMessages?.error) toast.error(toastMessages.error);
      options?.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      toast.dismiss();
      options?.onSettled?.(data, error, variables, context);
    },
  });
}
