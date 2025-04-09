'use client';

import { useSignup } from '@/api/auth/AuthHook';
import AuthForm, { AuthFormData } from '@/shared/components/form/AuthForm';

import { NextPage } from 'next';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';

const SignUp: NextPage = () => {
  const methods = useForm<AuthFormData>();
  const sign = useSignup();

  const handleSubmit: SubmitHandler<AuthFormData> = async (data) => {
    console.log('data', data);
    sign.mutate({
      email: data.email,
      nickName: data.nickName as string,
      password: data.password,
    });
  };

  return (
    <>
      <FormProvider {...methods}>
        <AuthForm
          category="signup"
          onSubmit={handleSubmit}
          isPending={sign.isPending}
        />
      </FormProvider>
    </>
  );
};

export default SignUp;
