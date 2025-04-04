import axios from 'axios';

const url =
  process.env.NEXT_PUBLIC_API_URL || //배포 환경
  'http://localhost:5000/api'; // 개발 환경

export const docThro = axios.create({
  baseURL: url,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

docThro.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

docThro.interceptors.response.use(
  (response) => {
    const authHeader =
      response.headers['authorization'] || response.headers['Authorization'];
    if (authHeader) {
      const token = authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : authHeader;

      localStorage.setItem('accessToken', token);
    }
    return response;
  },

  async (error) => {
    console.error(error);

    if (error.response?.status === 401) {
      console.error('Access Token 만료! 로그인 페이지로 이동합니다.');

      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  }
);
