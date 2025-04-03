import { useAuthStore } from '@/stores/authStore';
import toast from 'react-hot-toast';

export const useLogout = () => {
  const { clearAuth } = useAuthStore();

  return () => {
    clearAuth();
    toast.success('로그아웃 되었습니다!');
    window.location.href = '/';
  };
};
