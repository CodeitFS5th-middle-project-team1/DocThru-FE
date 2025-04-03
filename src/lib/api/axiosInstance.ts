import axios, { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'react-hot-toast';
import { saveRedirectPath } from '../authRedirect';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

interface CustomRequest extends AxiosRequestConfig {
  _retry?: boolean;
}

instance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config as CustomRequest;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { refreshToken, user, setAuth, clearAuth } =
        useAuthStore.getState();

      if (!refreshToken || !user) {
        clearAuth();
        toast.error('로그인이 필요합니다.');
        saveRedirectPath();
        window.location.href = '/auth/login';
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${baseURL}/auth/refresh`, {
          refreshToken,
        });
        const { accessToken } = res.data;

        setAuth(user, accessToken, refreshToken);
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        clearAuth();
        toast.error('재로그인이 필요합니다. 다시 로그인해주세요.');
        saveRedirectPath();
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
