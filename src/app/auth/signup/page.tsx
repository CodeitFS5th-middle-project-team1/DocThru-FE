'use client';

import { useSignup } from '@/api/auth/AuthHook';
import AuthForm, { AuthFormData } from '@/shared/components/form/AuthForm';
import { NextPage } from 'next';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
type SignUpFormData = Required<
  Pick<AuthFormData, 'email' | 'password' | 'nickName'>
>;
const SignUp: NextPage = () => {
  const methods = useForm<SignUpFormData>();
  const { mutate, isPending } = useSignup();

  const handleSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    mutate({
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
          onSubmit={handleSubmit}
          isPending={isPending}
        />
      </FormProvider>
    </>
  );
};

export default SignUp;
