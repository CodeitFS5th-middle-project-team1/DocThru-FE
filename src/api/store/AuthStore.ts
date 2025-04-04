import { create } from 'zustand';
import { User } from '@/types';
import { login } from '../AuthApi';

interface LoginState {
  user: User | null;
  loading: boolean;
  error: string | null;
  Login: (email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<LoginState>((set) => ({
  user: null,
  loading: false,
  error: null,

  Login: async (email: string, password: string) => {
    set({ loading: true, error: null });

    try {
      const response = await login(email, password);
      set({ user: response, loading: false });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || '데이터를 불러오는 중 오류 발생',
        loading: false,
      });
    }
  },
}));
