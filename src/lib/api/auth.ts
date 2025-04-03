import {
  LoginPayload,
  LoginResponse,
  SignupPayload,
} from '@/core/contexts/AuthProvider';
import instance from './axiosInstance';

export const loginFn = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const res = await instance.post<LoginResponse>('/api/auth/login', payload);
  return res.data;
};

export const signupFn = async (
  payload: SignupPayload
): Promise<LoginResponse> => {
  const res = await instance.post<LoginResponse>('/api/auth/signup', payload);
  return res.data;
};
