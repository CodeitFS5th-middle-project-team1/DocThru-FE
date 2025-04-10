import Image from 'next/image';
import sendDisable from '@images/send_icon.svg';
import sendInable from '@images/send_icon2.svg';

interface TextBoxProps {
  placeholder?: string;
  value: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export const TextBox: React.FC<TextBoxProps> = ({
  value,
  onClick,
  onChange,
  placeholder = '피드백을 남겨주세요',
}) => {
  return (
    <div className="w-full flex gap-4 align-top">
      <textarea
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        className="w-full h-[89px] M-16-0 p-4 border-[1px] border-custom-gray-200 rounded-xl"
      />
      <button
        className="self-start cursor-pointer "
        disabled={value === ''}
        onClick={onClick}
      >
        {value === '' ? (
          <Image src={sendDisable} alt="send" className="self-start" />
        ) : (
          <Image src={sendInable} alt="send" className="self-start" />
        )}
      </button>
    </div>
  );
};
