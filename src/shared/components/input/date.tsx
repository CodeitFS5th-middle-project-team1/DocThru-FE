import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface DateInputProps<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  size?: string;
  register: UseFormRegister<T>;
}

const Date = <T extends FieldValues>({
  name,
  placeholder,
  size = 'w-86 md:w-147.5 h-12',
  register,
}: DateInputProps<T>) => {
  return (
    <div>
      <input
        type="date"
        {...register(name)}
        placeholder={placeholder}
        className={`mb-3 h-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${size}`}
      />
    </div>
  );
};

export default Date;
