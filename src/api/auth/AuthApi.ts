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

export const logoutFn = async (): Promise<void> => {
  //로그아웃 함수 추가 ( 통일성 위해서 axios 사용했습니다.)
  await docThro.post('/auth/logout', null, {
    withCredentials: true, // HttpOnly 쿠키 포함
  });
};
