'use client';

import { useSignup } from '@/api/auth/AuthHook';
import AuthForm, { AuthFormData } from '@/shared/components/form/AuthForm';
import { NextPage } from 'next';
import { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
type SignUpFormData = Required<
  Pick<AuthFormData, 'email' | 'password' | 'passwordConfirm' | 'nickName'>
>;
const SignUp: NextPage = () => {
  const [formValues, setFormValues] = useState<SignUpFormData>({
    email: '',
    password: '',
    passwordConfirm: '',
    nickName: '',
  });
  const methods = useForm<SignUpFormData>({
    defaultValues: formValues,
  });
  const { mutate, isPending } = useSignup();

  const handleSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    setFormValues(data);
    methods.reset(data);
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
