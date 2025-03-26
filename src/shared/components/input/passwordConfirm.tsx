import { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import visibilityOn from '@images/visibility-icon/visibilityOn.svg';
import visibilityOff from '@images/visibility-icon/visibilityOff.svg';

interface PasswordConfirmInputProps {
  name: string;
  passwordField: string; // 비교할 비밀번호 필드명
  placeholder?: string;
}

const PasswordConfirm: FC<PasswordConfirmInputProps> = ({
  name,
  passwordField,
  placeholder,
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="mb-4 relative">
      <input
        type="password"
        {...register(name, {
          required: '비밀번호 확인은 필수입니다.',
          validate: (value) =>
            value === watch(passwordField) || '비밀번호가 일치하지 않습니다.',
        })}
        placeholder={placeholder}
        className={`
            w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2
            ${errors[name] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}
          `}
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute inset-y-0 right-0 pr-3 h-10.5"
      >
        <Image
          src={showPassword ? visibilityOn : visibilityOff}
          alt="Toggle Img"
          width={24}
          height={24}
        />
      </button>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default PasswordConfirm;
