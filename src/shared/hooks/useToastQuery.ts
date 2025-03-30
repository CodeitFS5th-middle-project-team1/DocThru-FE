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
  toastMessages?: ToastMessages,
  options: ToastQueryOptions<TQueryFnData, TError, TData, TQueryKey> = {}
): UseQueryResult<TData, TError> {
  const {
    onSuccess: userOnSuccess,
    onError: userOnError,
    onSettled: userOnSettled,
    ...restOptions
  } = options;

  const queryOptions = {
    queryKey,
    queryFn,
    ...restOptions,
    onSuccess: (data: TData) => {
      toast.dismiss();
      if (toastMessages?.success) toast.success(toastMessages.success);
      userOnSuccess?.(data);
    },
    onError: (error: TError, variables: TQueryKey, context: unknown) => {
      toast.dismiss();
      if (toastMessages?.error) toast.error(toastMessages.error);
      userOnError?.(error, variables, context);
    },
    onSettled: (
      data: TData | undefined,
      error: TError | null,
      variables: TQueryKey,
      context: unknown
    ) => {
      toast.dismiss();
      userOnSettled?.(data, error, variables, context);
    },
  } as UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>;

  return useQuery<TQueryFnData, TError, TData, TQueryKey>(queryOptions);
}
