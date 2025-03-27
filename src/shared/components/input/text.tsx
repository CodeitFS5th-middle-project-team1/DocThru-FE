import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface TextInputProps {
  name: string;
  placeholder?: string;
}

const Text: FC<TextInputProps> = ({ name, placeholder }) => {
  const { register } = useFormContext();

  return (
    <div className="w-206.5">
      <textarea
        {...register(name)}
        placeholder={placeholder}
        className="w-full px-4 py-2 bg-[#FFFFFF] h-22 max-h-[88px] border border-[#E5E5E5] rounded-[1px] text-[16px] text-[#171717] placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-blue-500 align-top text-left leading-normal"
      />
    </div>
  );
};

export default Text;
