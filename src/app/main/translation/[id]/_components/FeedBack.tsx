'use client';
import { Reply } from '@/shared/components/Reply';
import { TextBox } from '@/shared/components/TextBox';
import { Feedback } from '@/types';
import { useEffect, useState } from 'react';

interface FeedBackProps {
  feedBack: Feedback[] | null;
}

export const FeedBack: React.FC<FeedBackProps> = ({ feedBack }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? feedBack || [] : (feedBack || []).slice(0, 3);
  useEffect(() => {
    console.log('visibleItems', feedBack);
  }, [feedBack]);
  return (
    <div className="flex flex-col gap-4 py-6">
      <TextBox />
      {visibleItems?.map((d, idx) => {
        return (
          <Reply
            key={idx}
            userId={d.userId}
            content={d.content}
            create={d.createdAt}
            user={{ nickName: d.userNickname, img: d.userProfileImg }}
          />
        );
      })}
      {!showAll && feedBack && feedBack.length > 3 && (
        <button
          onClick={() => setShowAll(true)}
          className="M-16-0 px-[67px] py-[15px] self-center  bg-gray-100 rounded-xl"
        >
          더보기
        </button>
      )}
    </div>
  );
};
