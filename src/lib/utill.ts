import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/ko';

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
