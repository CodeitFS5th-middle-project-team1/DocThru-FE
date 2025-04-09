'use client';

import { useLogin } from '@/api/auth/AuthHook';
import AuthForm from '@/shared/components/form/AuthForm';
import { AuthFormData } from '@/types';
import { NextPage } from 'next';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';

const Login: NextPage = () => {
  const methods = useForm<AuthFormData>();
  const login = useLogin();

  const handleSubmit: SubmitHandler<AuthFormData> = async (data) => {
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
          onSubmit={handleSubmit}
          isPending={login.isPending}
        />
      </FormProvider>
    </>
  );
};

export default Login;
