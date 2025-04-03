import { FC, useState } from 'react';
import { UseFormRegister, FieldErrors, RegisterOptions } from 'react-hook-form';
import Image from 'next/image';
import visibilityOn from '@images/visibility-icon/visibilityOn.svg';
import visibilityOff from '@images/visibility-icon/visibilityOff.svg';

interface PasswordInputProps {
  name: string;
  placeholder?: string;
  size?: string;
  register: UseFormRegister<{ [key: string]: string }>;
  errors?: FieldErrors<{ [key: string]: string }>;
  isConfirm?: boolean;
  compareValue?: string; // 상위 컴퍼넌트에서 원래 비밀번호 값을 전달받음
}

const Password: FC<PasswordInputProps> = ({
  name,
  placeholder,
  register,
  errors,
  isConfirm = false,
  compareValue,
  size = 'w-86 md:w-147.5 h-12',
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // RegisterOptions 타입을 사용하여 validation 옵션을 정의
  const validationMessages: RegisterOptions = {
    required: isConfirm
      ? '비밀번호 확인은 필수입니다.'
      : '비밀번호는 필수입니다.',
    minLength: {
      value: 8,
      message: isConfirm
        ? '비밀번호 확인은 최소 8자 이상이어야 합니다.'
        : '비밀번호는 최소 8자 이상이어야 합니다.',
    },
    maxLength: {
      value: 12,
      message: isConfirm
        ? '비밀번호 확인은 최대 12자 이하여야 합니다.'
        : '비밀번호는 최대 12자 이하여야 합니다.',
    },
  };

  // 비밀번호 확인일 경우, compareValue와 일치하는지 추가 검증
  if (isConfirm && compareValue !== undefined) {
    validationMessages.validate = (value: string) =>
      value === compareValue || '비밀번호가 일치하지 않습니다.';
  }

  return (
    <div className="inline-block relative">
      <input
        type={showPassword ? 'text' : 'password'}
        {...register(name, validationMessages)}
        placeholder={placeholder}
        className={`
          p-3.5 pr-9 border rounded-xl focus:outline-none focus:ring-1 ${size}
          ${errors && errors[name] ? 'border-red-500 focus:ring-red-500' : 'border-custom-gray-200 focus:ring-custom-gray-200'}
        `}
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute inset-y-0 right-0 pr-3 h-12"
      >
        <Image
          src={showPassword ? visibilityOn : visibilityOff}
          alt="Toggle password visibility"
          width={24}
          height={24}
        />
      </button>
      {errors && errors[name] && (
        <p className="mt-1 text-sm text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default Password;
