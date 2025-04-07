'use client';

import mainLogo from '@images/img_logo .svg';
import Image from 'next/image';
import Button, { ButtonCategory } from '@/shared/components/button/Button';
import Email from '../input/email';
import Password from '../input/password';
import Text from '../input/text';
import Link from 'next/link';
import { useFormContext, SubmitHandler } from 'react-hook-form';

interface AuthFormData {
  email: string;
  password: string;
  passwordConfirm?: string;
  nickName?: string;
}

interface AuthFormProps {
  category: 'login' | 'signup';
  onSubmit: SubmitHandler<AuthFormData>;
  isPending?: boolean;
}

const AuthForm = ({ category, onSubmit, isPending }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useFormContext<AuthFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section>
        <Link
          href={'/'}
          className="flex justify-center items-center pt-32 gap-3.5"
        >
          <Image src={mainLogo} alt="main logo" />
        </Link>
      </section>

      <div className="flex flex-col justify-center w-full md:w-lg gap-6">
        <section className="flex flex-col gap-2">
          <p className="M-14-0 text-custom-gray-900 font-(family-name:--pretendard)">
            이메일
          </p>
          <Email
            name="email"
            placeholder="이메일을 입력해주세요"
            register={register}
            errors={errors}
            size="w-full h-12"
          />
        </section>

        {category === 'signup' ? (
          <>
            <section className="flex flex-col gap-2">
              <p className="M-14-0 text-custom-gray-900">닉네임</p>
              <Text
                name="nickName"
                placeholder="닉네임을 입력해주세요"
                register={register}
                size="w-full h-12"
              />
            </section>
          </>
        ) : (
          ''
        )}

        <section className="flex flex-col gap-2">
          <p className="M-14-0 text-custom-gray-900">비밀번호</p>
          <Password
            name="password"
            placeholder="비밀번호를 입력해주세요"
            register={register}
            errors={errors}
            size="w-full h-12"
          />
        </section>

        {category === 'signup' && (
          <section className="flex flex-col gap-2">
            <p className="M-14-0 text-custom-gray-900">비밀번호</p>
            <Password
              name="passwordConfirm"
              placeholder="비밀번호를 한번 더 입력해주세요"
              register={register}
              errors={errors}
              isConfirm
              compareValue={watch('password')}
              size="w-full h-12"
            />
          </section>
        )}

        <section>
          <Button type="submit" category={ButtonCategory.Auth}>
            {category === 'login' ? '로그인' : '회원가입'}
          </Button>
        </section>

        <section className="flex gap-2 justify-center  ">
          <p className="R-16-0 text-custom-gray-600">
            {category === 'login' ? '회원이 아니신가요?' : '이미 회원이신가요?'}
          </p>
          <Link
            href={category === 'login' ? '/auth/signup' : '/auth/login'}
            className="R-16-0 text-custom-gray-800  underline"
          >
            {category === 'login' ? '회원가입하기' : '로그인하기'}
          </Link>
        </section>
      </div>
    </form>
  );
};

export default AuthForm;
