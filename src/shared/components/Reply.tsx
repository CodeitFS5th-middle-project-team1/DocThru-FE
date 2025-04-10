import Image from 'next/image';
import profile from '@images/profile-icon/member.svg';
import modify from '@images/menu-icon/Meatballs.svg';
import { useState } from 'react';
import dayjs from 'dayjs';

interface ReplyProps {
  user: { nickName: string; img?: string };
  id: string;
  create: string;
  content: string;
  userId?: string;
  onClick?: (id: string, content: string) => void;
}

export const Reply: React.FC<ReplyProps> = ({
  user,
  create,
  id,
  content,
  userId,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>(content);

  const createdAt = dayjs(create).format('YY/MM/DD hh:mm');

  const onHandleCancel = () => {
    setFeedback(content);
    setIsOpen(false);
  };
  const onHandleChange = () => {
    if (!id) return;
    if (!feedback) return;
    setFeedback(feedback);
    setIsOpen(false);
    console.log(id, '1', feedback);
    onClick?.(id, feedback);
  };
  return (
    <div className="w-full h-full bg-custom-gray-50 rounded-xl p-4 overflow-hidden">
      <div className="w-full flex flex-row justify-between pb-4">
        <div className=" flex flex-row gap-2">
          <Image src={user.img ? user.img : profile} alt="profile" />
          <div className="flex flex-col gap-1">
            <div className="text-custom-gray-800 M-14-0">{user.nickName}</div>
            <div className="text-custom-gray-400 M-12-0">{createdAt}</div>
          </div>
        </div>
        {!isOpen ? (
          userId !== undefined && (
            <div
              onClick={() => setIsOpen(true)}
              className="R-16-0 cursor-pointer"
            >
              <Image src={modify} alt="modify" />
            </div>
          )
        ) : (
          <div className="flex gap-1 SB-14-0">
            <button
              className="px-5 py-2 text-custom-gray-500 rounded-[10px] cursor-pointer"
              onClick={onHandleCancel}
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
      {!isOpen ? (
        <div className="text-custom-gray-700 break-words whitespace-pre-wrap">
          {feedback}
        </div>
      ) : (
        <textarea
          className="w-full"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      )}
    </div>
  );
};
