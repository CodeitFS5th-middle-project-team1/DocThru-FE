'use client';
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

  const onSubmit = (data: FormValues) => {
    console.log('Form Data:', data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-4 space-y-6"
      >
        <InputList.Email name="email" placeholder="이메일 입력해주세요" />
        <InputList.Password
          name="password"
          placeholder="비밀번호 입력해주세요"
        />
        <InputList.PasswordConfirm
          name="passwordConfirm"
          passwordField="password"
          placeholder="Enter your password"
        />
        <InputList.Date name="Date" placeholder="이건 써도 어짜피 안나오네" />
        <InputList.Search
          name="Search"
          placeholder="검색하세요"
          onSearch={(value) => console.log('Search value:', value)}
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
