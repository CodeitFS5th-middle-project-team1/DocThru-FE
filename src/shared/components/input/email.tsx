import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface EmailInputProps {
  name: string;
  placeholder?: string;
}

const Email: FC<EmailInputProps> = ({ name, placeholder }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <input
        type="email"
        {...register(name, {
          required: '이메일은 필수입니다',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: '유효한 이메일을 입력해주세요.',
          },
        })}
        placeholder={placeholder}
        className={`
          w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2
          ${errors[name] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}
        `}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default Email;
