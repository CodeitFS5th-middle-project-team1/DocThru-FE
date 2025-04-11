import toast from 'react-hot-toast';

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

  if (!response.ok) {
    if (response.status === 401) {
      toast.error('로그인 제한 시간이 만료되었습니다.');
      removeAccessToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
    // throw to allow calling code to handle other errors
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || '요청에 실패했습니다.');
  }

  return response;
};
