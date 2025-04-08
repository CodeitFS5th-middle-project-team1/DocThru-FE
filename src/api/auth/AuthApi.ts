import { docThro } from '../url';
import { SetUser } from './AuthStore';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: SetUser;
  accessToken: string;
  refreshToken: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  nickName: string;
}

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
