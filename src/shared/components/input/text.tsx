import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface TextInputProps {
  name: string;
  placeholder?: string;
  register: UseFormRegister<{ [key: string]: string }>;
  size?: string;
}

const Text: FC<TextInputProps> = ({
  name,
  placeholder,
  register,
  size = 'w-86 md:w-147.5 h-12',
}) => {
  return (
    <div>
      <textarea
        {...register(name)}
        placeholder={placeholder}
        className={`leading-none resize-none p-[14px] border rounded-[6px] focus:outline-none focus:ring-2 focus:ring-custom-gray-200 ${size}`}
      />
    </div>
  );
};

export default Text;
