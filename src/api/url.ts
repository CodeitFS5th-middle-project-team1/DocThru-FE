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
  const handleAuthError = (message: string) => {
    toast.error(message);
    removeAccessToken(); //localStorage에서 토큰 제거
    useAuthStore.getState().clearAuth(); // Zustand 유저 상태 초기화

    // if (typeof window !== 'undefined') {
    //   window.location.href = '/auth/login';
    // }
  };
  // 오류 없는 타입 정의
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

    if ([401, 419].includes(response.status)) {
      handleAuthError(message);
    } else if (response.status === 403) {
      toast.error(message);
    } else {
      toast.error(message);
    }

    throw new Error(message); // 항상 string만 throw
  }

  return response;
};
