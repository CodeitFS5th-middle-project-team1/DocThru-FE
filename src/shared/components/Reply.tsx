import Image from 'next/image';
import profile from '@images/profile-icon/member.svg';
import modify from '@images/menu-icon/Meatballs.svg';
import { useState } from 'react';

interface ReplyProps {
  user: { nickName: string; img?: string };
  create: Date;
  content: string;
}

export const Reply: React.FC<ReplyProps> = ({ user, create, content }) => {
  const [isOpne, setIsOpen] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>(content);
  const onHandleCancle = () => {
    setFeedback(content);
    setIsOpen(false);
  };
  const onHandleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFeedback(feedback);
    setIsOpen(false);
  };
  return (
    <div className="w-full h-full bg-custom-gray-50 rounded-xl p-4 overflow-hidden">
      <div className="w-full flex flex-row justify-between pb-4">
        <div className=" flex flex-row gap-2">
          <Image src={user.img ? user.img : profile} alt="profile" />
          <div className="flex flex-col gap-1">
            <div className="text-custom-gray-800 M-14-0">{user.nickName}</div>
            <div className="text-custom-gray-400 M-12-0">
              {create.toLocaleDateString()}
            </div>
          </div>
        </div>
        {!isOpne ? (
          <Image
            src={modify}
            onClick={() => setIsOpen(true)}
            alt="modify"
            className="R-16-0 cursor-pointer"
          />
        ) : (
          <div className="flex gap-1 SB-14-0">
            <button
              className="px-5 py-2 text-custom-gray-500 rounded-[10px] cursor-pointer"
              onClick={onHandleCancle}
            >
              취소
            </button>
            <button
              className="px-[13.5px] py-2 bg-custom-gray-800 text-white rounded-[10px] cursor-pointer"
              onClick={onHandleChange}
            >
              수정 완료
            </button>
          </div>
        )}
      </div>
      {!isOpne ? (
        <div className="text-custom-gray-700 break-words whitespace-pre-wrap">
          {feedback}
        </div>
      ) : (
        <textarea
          className="w-full"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>
      )}
    </div>
  );
};
