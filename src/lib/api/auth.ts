import {
  LoginPayload,
  LoginResponse,
  SignupPayload,
} from '@/core/contexts/AuthProvider';

import { docThro } from '@/api/url';
import jwt from 'jsonwebtoken';
export const loginFn = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const res = await docThro.post<LoginResponse>('/auth/login', payload, {
    withCredentials: true, // accessToken 쿠키를 받아오도록 설정
  });
  return res.data;
};

export const signupFn = async (
  payload: SignupPayload
): Promise<LoginResponse> => {
  const res = await docThro.post<LoginResponse>('/auth/signup', payload);
  return res.data;
};

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
    };
  } catch (err) {
    return null;
  }
}
