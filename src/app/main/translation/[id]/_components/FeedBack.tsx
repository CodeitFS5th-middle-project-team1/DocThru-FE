'use client';
import { Reply } from '@/shared/components/Reply';
import { TextBox } from '@/shared/components/TextBox';
import { useState } from 'react';

interface FeedBackProps {
  feedBack: any[];
}

export const FeedBack: React.FC<FeedBackProps> = ({ feedBack }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? feedBack : feedBack.slice(0, 3);

  return (
    <div className="flex flex-col gap-4 py-6">
      <TextBox />
      {visibleItems.map((d, idx) => {
        return (
          <Reply
            key={idx}
            content={d.content}
            create={d.create}
            user={d.user}
          />
        );
      })}
      {!showAll && feedBack.length > 3 && (
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
