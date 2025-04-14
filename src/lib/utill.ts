import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/ko';
import toast from 'react-hot-toast';
import { ToastId } from '@/constants';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localeData);
dayjs.locale('ko');

export default dayjs;

export const debounce = (func: (...args: unknown[]) => void, delay: number) => {
  let timeout: NodeJS.Timeout;

  return (...args: unknown[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const getQueryString = (
  params: Record<string, string | number | boolean | null | undefined>
): string => {
  const stringParams: Record<string, string> = {};

  for (const key in params) {
    const value = params[key];
    if (value !== undefined && value !== null) {
      stringParams[key] = String(value);
    }
  }

  const query = new URLSearchParams(stringParams).toString();
  return query ? `?${query}` : '';
};

type ToastType = 'loading' | 'success' | 'error';

interface ShowToastOptions {
  type: ToastType;
  message: string;
  id?: ToastId;
  disableToast?: boolean;
}

export const showToast = ({
  type,
  message,
  id,
  disableToast = false,
}: ShowToastOptions) => {
  if (disableToast) return;

  if (id) {
    toast.dismiss(id); // 기존 같은 ID 토스트 닫기 (중복 방지)
  }

  const options = id ? { id, duration: 1000 } : { duration: 1000 };

  switch (type) {
    case 'loading':
      toast.loading(message, options);
      break;
    case 'success':
      toast.success(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
  }
};
