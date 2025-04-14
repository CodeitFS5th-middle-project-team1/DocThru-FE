import toast from 'react-hot-toast';
import { useAuthStore } from '@/api/auth/AuthStore';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

const setAccessToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', token);
  }
};

const removeAccessToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
  }
};

//fetch
export const customFetch = async (
  input: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getAccessToken();

  const headers: Record<string, string> = {
    'X-Requested-With': 'XMLHttpRequest',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${input}`, {
    ...options,
    credentials: 'include',
    headers,
  });

  const authHeader =
    response.headers.get('authorization') ||
    response.headers.get('Authorization');
  if (authHeader) {
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader;
    setAccessToken(token);
  }
  // 함수로 분리해서 중복 제거
  const handleAuthError = (message: string, shouldRedirect = true) => {
    toast.error(message);
    removeAccessToken();
    useAuthStore.getState().clearAuth();

    if (shouldRedirect && typeof window !== 'undefined') {
      window.location.href = '/auth/login'; // 토큰 만료시 로그인 페이지로 리다이렉트
    }
  };
  type ErrorResponse =
    | string
    | { message?: string }
    | Record<string, unknown>
    | null
    | undefined;

  const getSafeMessage = (data: ErrorResponse, fallback: string): string => {
    if (!data) return fallback;
    if (typeof data === 'string') return data;
    if (
      typeof data === 'object' &&
      data !== null &&
      typeof data.message === 'string'
    )
      return data.message;
    return JSON.stringify(data);
  };

  if (!response.ok) {
    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.includes('text/html')) {
      handleAuthError('로그인이 필요합니다.');
      throw new Error('로그인이 필요합니다.');
    }

    const errorData = (await response
      .json()
      .catch(() => ({}))) as ErrorResponse;
    const message = getSafeMessage(errorData, '요청에 실패했습니다.');

    const isAuthRoute = input.includes('/auth'); // 로그인, 회원가입 경로 확인

    if ([401, 419].includes(response.status)) {
      // 로그인 경로가 아닌 경우 리다이렉트
      handleAuthError(message, !isAuthRoute);
    } else if (response.status === 403) {
      toast.error(message);
    } else {
      toast.error(message);
    }

    throw new Error(message);
  }

  return response;
};
