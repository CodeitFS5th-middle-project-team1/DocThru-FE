import { User } from '@/types';
import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SetUser = Omit<User, 'password'>;

export interface AuthState {
  user: SetUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (user: SetUser, accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setAuth: (user, accessToken, refreshToken) =>
        set({ user, accessToken, refreshToken }),
      clearAuth: () => {
        set({ user: null, accessToken: null, refreshToken: null });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        delete axios.defaults.headers.common['Authorization'];
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
