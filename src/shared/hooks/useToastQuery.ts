import { ToastId } from '@/constants';
import { showToast } from '@/lib/utill';
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
  QueryKey,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface ToastMessages {
  pending?: string;
  success?: string;
  error?: string;
}

type ToastQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends QueryKey,
> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  'queryKey' | 'queryFn'
> & {
  keepPreviousData?: boolean;
  onSuccess?: (data: TData) => void;
  onError?: (error: TError, variables: TQueryKey, context: unknown) => void;
  onSettled?: (
    data: TData | undefined,
    error: TError | null,
    variables: TQueryKey,
    context: unknown
  ) => void;
};

export function useToastQuery<
  TQueryFnData,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: () => Promise<TQueryFnData>,
  toastId?: ToastId,
  toastMessages?: ToastMessages,
  disableToast: boolean = false,
  options: ToastQueryOptions<TQueryFnData, TError, TData, TQueryKey> = {}
): UseQueryResult<TData, TError> {
  const {
    onSuccess: userOnSuccess,
    onError: userOnError,
    onSettled: userOnSettled,
    ...restOptions
  } = options;

  const queryOptions: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> =
    {
      queryKey,
      queryFn,
      keepPreviousData: options.keepPreviousData ?? true,
      ...restOptions,
      onSuccess: (data: TData) => {
        if (toastId) toast.dismiss(toastId);
        if (toastMessages?.success) {
          showToast({
            type: 'success',
            message: toastMessages.success,
            id: toastId,
            disableToast,
          });
        }
        userOnSuccess?.(data);
      },
      onError: (error: TError, variables: TQueryKey, context: unknown) => {
        if (toastId) toast.dismiss(toastId);
        let serverErrorMessage = '데이터를 불러오는 중 오류 발생';

        if (error instanceof Error) {
          serverErrorMessage = error.message;
        }

        showToast({
          type: 'error',
          message: serverErrorMessage,
          id: toastId,
          disableToast,
        });
        userOnError?.(error, variables, context);
      },
      onSettled: (
        data: TData | undefined,
        error: TError | null,
        variables: TQueryKey,
        context: unknown
      ) => {
        if (toastId) toast.dismiss(toastId);
        userOnSettled?.(data, error, variables, context);
      },
    } as UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>;

  return useQuery<TQueryFnData, TError, TData, TQueryKey>(queryOptions);
}
