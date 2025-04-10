'use client';

import { useLogin } from '@/api/auth/AuthHook';
import AuthForm, { AuthFormData } from '@/shared/components/form/AuthForm';
import { NextPage } from 'next';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
type LoginFormData = Required<Pick<AuthFormData, 'email' | 'password'>>;
const Login: NextPage = () => {
  const methods = useForm<LoginFormData>();
  const login = useLogin();

  const handleSubmit: SubmitHandler<LoginFormData> = async (data) => {
    login.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <>
      <FormProvider {...methods}>
        <AuthForm category="login" onSubmit={handleSubmit} />
      </FormProvider>
    </>
  );
};

export default Login;
