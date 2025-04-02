'use client';

import AuthForm from '@/shared/components/form/AuthForm';
import { NextPage } from 'next';
import { useForm, FormProvider } from 'react-hook-form';
import { useLogin } from '@/core/hooks/auth/useLogine';

const Login: NextPage = () => {
  const methods = useForm();
  const login = useLogin();

  const handleSubmit = async (data: any) => {
    login.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <>
      <FormProvider {...methods}>
        <AuthForm
          category="login"
          onSubmit={methods.handleSubmit(handleSubmit)}
          isPending={login.isPending}
        />
      </FormProvider>
    </>
  );
};

export default Login;
