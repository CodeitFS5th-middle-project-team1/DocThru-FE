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
