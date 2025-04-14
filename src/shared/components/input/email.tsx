import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form';

interface EmailInputProps<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  size?: string;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
}

const Email = <T extends FieldValues>({
  name,
  placeholder,
  size = 'w-86 md:w-147.5 h-12',
  register,
  errors,
}: EmailInputProps<T>) => {
  return (
    <div>
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
        className={`p-3.5 pr-9 border bg-white rounded-xl focus:outline-none focus:ring-1 ${size} ${
          errors && errors[name]
            ? 'border-red-500 focus:ring-red-500'
            : 'border-custom-gray-200 focus:ring-custom-gray-200'
        }`}
      />
      {errors && errors[name] && (
        <p className="mt-1 text-sm text-red-500">
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
};

export default Email;
