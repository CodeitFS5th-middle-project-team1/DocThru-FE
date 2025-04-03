import { useRouter } from 'next/navigation';

type Router = ReturnType<typeof useRouter>;

export const saveRedirectPath = () => {
  localStorage.setItem('redirectAfterLogin', window.location.pathname);
};

export const redirectAfterAuth = (router: Router) => {
  const path = localStorage.getItem('redirectAfterLogin') || '/';
  localStorage.removeItem('redirectAfterLogin');
  router.push(path);
};
