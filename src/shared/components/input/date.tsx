import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface DateInputProps<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  size?: string;
  register: UseFormRegister<T>;
}

const DateInput = <T extends FieldValues>({
  name,
  placeholder,
  size = 'w-86 md:w-147.5 h-12',
  register,
}: DateInputProps<T>) => {
  const now = new Date();
  const koreaTimeOffset = 9 * 60 * 60 * 1000;
  const koreaNow = new Date(now.getTime() + koreaTimeOffset);
  koreaNow.setDate(koreaNow.getDate() + 1);
  const minDate = koreaNow.toISOString().split('T')[0];
  return (
    <div>
      <input
        type="date"
        {...register(name)}
        placeholder={placeholder}
        min={minDate}
        className={`mb-3 h-12 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${size}`}
      />
    </div>
  );
};

export default DateInput;
