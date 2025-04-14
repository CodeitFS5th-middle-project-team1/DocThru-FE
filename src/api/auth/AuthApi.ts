import { TOAST_ID } from '@/constants';
import { customFetch } from '../url';
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
  const res = await customFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
    toastId: TOAST_ID.AUTH,
  });
  return res.json();
};

export const signupFn = async (
  payload: SignupPayload
): Promise<LoginResponse> => {
  const res = await customFetch('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
    toastId: TOAST_ID.AUTH,
  });
  return res.json();
};

export const logoutFn = async (options?: {
  disableToast?: boolean;
}): Promise<void> => {
  await customFetch('/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
    ...options,
  });
};
