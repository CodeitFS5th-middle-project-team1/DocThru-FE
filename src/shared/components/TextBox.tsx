import Image from 'next/image';
import send from '@images/send_icon.svg';

interface TextBoxProps {
  placeholder?: string;
}
export const TextBox: React.FC<TextBoxProps> = ({
  placeholder = '피드백을 남겨주세요',
}) => {
  return (
    <div className="w-full flex gap-4 align-top">
      <textarea
        placeholder={placeholder}
        className="w-full h-[89px] M-16-0 p-4 border-[1px] border-custom-gray-200 rounded-xl"
      ></textarea>
      <Image src={send} alt="send" className="self-start" />
    </div>
  );
};
