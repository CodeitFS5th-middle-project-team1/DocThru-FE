import {
  UseFormRegister,
  RegisterOptions,
  FieldValues,
  Path,
} from 'react-hook-form';

interface TextInputProps<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  register: UseFormRegister<T>;
  size?: string;
  rules?: RegisterOptions<T, Path<T>>;
  errorMessage?: string;
}

const Text = <T extends FieldValues>({
  name,
  placeholder,
  register,
  size = 'w-86 md:w-147.5 h-12',
  rules,
  errorMessage,
}: TextInputProps<T>) => {
  return (
    <div>
      <textarea
        {...register(name, rules)}
        placeholder={placeholder}
        className={`leading-none resize-none p-[14px] border rounded-[6px] focus:outline-none focus:ring-2 focus:ring-custom-gray-200 ${size}`}
      />
      {errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Text;
