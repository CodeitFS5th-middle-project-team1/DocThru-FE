// 'use client';
// 기본적으로 모든 컴포넌트가 서버 컴포넌트로 처리됩니다 (use client가 없는 경우).
import { useForm, FormProvider } from 'react-hook-form';
import InputList from '@/shared/components/input/index';

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const FormExample: React.FC = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const handleEmailUpdate = (value: string, isValid: boolean) => {
    console.log('Current Email:', value);
    console.log('Is Valid?:', isValid);
  };

  const onSubmit = (data: FormValues) => {
    console.log('Form Data:', data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-4 space-y-6"
      >
        <InputList.Email
          name="email"
          placeholder="이메일 입력해주세요"
          onEmailChange={handleEmailUpdate}
        />
        <InputList.Password
          name="password"
          placeholder="비밀번호 입력해주세요"
        />
        <InputList.PasswordConfirm
          name="passwordConfirm"
          passwordField="password"
          placeholder="Enter your password"
        />
        <InputList.Date name="Date" />
        <InputList.Search
          name="Search"
          placeholder="검색어를 입력하세요"
          onSearch={(value) => console.log('Search:', value)}
        />
        <InputList.Text name="Text" placeholder="아무 글이나 입력해보자" />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

export default FormExample;
