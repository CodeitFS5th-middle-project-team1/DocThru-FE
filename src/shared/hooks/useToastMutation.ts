import { ToastId } from '@/constants';
import { showToast } from '@/lib/utill';
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
  options?: UseMutationOptions<TData, TError, TVariables, TContext>,
  toastId?: ToastId,
  handledMessage?: string,
  disableToast: boolean = false
): UseMutationResult<TData, TError, TVariables, TContext> {
  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    ...options,
    onMutate: async (variables) => {
      if (toastId) toast.dismiss(toastId);
      if (toastMessages?.pending) {
        showToast({
          type: 'loading',
          message: toastMessages.pending,
          id: toastId,
          disableToast,
        });
      }
      return options?.onMutate?.(variables);
    },
    onSuccess: (data, variables, context) => {
      if (toastId) toast.dismiss(toastId);
      if (toastMessages?.success) {
        showToast({
          type: 'success',
          message: toastMessages.success,
          id: toastId,
          disableToast,
        });
      }
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      if (toastId) toast.dismiss(toastId);

      // 사용하는 곳에서 true를 리턴하면 전역 토스트는 건너뜀
      const isHandled = options?.onError?.(error, variables, context);
      if (isHandled === true) return;

      let serverErrorMessage = '문제가 발생했습니다. 다시 시도해주세요.';

      if (typeof handledMessage === 'string') {
        serverErrorMessage = handledMessage;
      } else if (error instanceof Error) {
        serverErrorMessage = error.message;
      }

      showToast({
        type: 'error',
        message: serverErrorMessage,
        id: toastId,
        disableToast,
      });
      options?.onError?.(error, variables, context);
    },

    onSettled: (data, error, variables, context) => {
      options?.onSettled?.(data, error, variables, context);
    },
  });
}
