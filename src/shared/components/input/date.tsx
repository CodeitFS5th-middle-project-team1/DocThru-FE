import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface DateInputProps {
  name: string;
  placeholder?: string;
}

const Date: FC<DateInputProps> = ({ name, placeholder }) => {
  const { register } = useFormContext();

  return (
    <div className="mb-4">
      <input
        type="date"
        {...register(name)}
        placeholder={placeholder}
        className="w-full px-4 rounded-xl py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
};

export default Date;
