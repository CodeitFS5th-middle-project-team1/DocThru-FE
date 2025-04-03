'use client';

import { useSignup } from '@/core/hooks/auth/useSignup';
import AuthForm from '@/shared/components/form/AuthForm';
import { NextPage } from 'next';
import { useForm, FormProvider } from 'react-hook-form';

const SignUp: NextPage = () => {
  const methods = useForm();
  const sign = useSignup();

  const handleSubmit = async (data: any) => {
    console.log('data', data);
    sign.mutate({
      email: data.email,
      nickName: data.nickName,
      password: data.password,
    });
  };

  return (
    <>
      <FormProvider {...methods}>
        <AuthForm
          category="signup"
          onSubmit={methods.handleSubmit(handleSubmit)}
          isPending={sign.isPending}
        />
      </FormProvider>
    </>
  );
};

export default SignUp;
