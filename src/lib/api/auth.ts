import {
  LoginPayload,
  LoginResponse,
  SignupPayload,
} from '@/core/contexts/AuthProvider';

import { docThro } from '@/api/url';

export const loginFn = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const res = await docThro.post<LoginResponse>('/auth/login', payload);
  return res.data;
};

export const signupFn = async (
  payload: SignupPayload
): Promise<LoginResponse> => {
  const res = await docThro.post<LoginResponse>('/auth/signup', payload);
  return res.data;
};
