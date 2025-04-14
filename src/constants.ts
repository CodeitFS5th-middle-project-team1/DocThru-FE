export const PATH = {
  main: '/main/challenge',
  login: '/auth/login',
  signup: '/auth/signup',
  challenge: '/main/challenge',
  myChallenge: '/main/my-challenge',
  translation: '/main/translation',
  admin: '/admin/challenges',
};

export const TOAST_ID = {
  AUTH: 'auth-toast',
  MAIN_CHALLENGE: 'main-challenge-toast',
  MY_CHALLENGE: 'my-challenge-toast',
  TRANSLATION: 'translation-toast',
  TRANSLATION_WORK: 'translation-work-toast',
  NOTIFICATION: 'notification',
  ADMIN: 'admin-toast',
  LIKE: 'like',
  MODAL: 'modal-toast',
  SERVER: 'server',
} as const;

export type ToastId = (typeof TOAST_ID)[keyof typeof TOAST_ID];
