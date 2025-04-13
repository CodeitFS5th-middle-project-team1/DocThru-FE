'use client';
import { FetchFeedBackResponse } from '@/api/feedback/api';
import { usePatchFeedBack } from '@/api/feedback/hook';
import { Reply } from '@/shared/components/Reply';
import { TextBox } from '@/shared/components/TextBox';
import { Feedback } from '@/types';
import { UseMutateFunction } from '@tanstack/react-query';
import { useState } from 'react';

interface FeedBackProps {
  feedBack: Feedback[] | undefined;
  createFeedBack: UseMutateFunction<
    FetchFeedBackResponse,
    unknown,
    string,
    unknown
  >;
  id: string;
}

export const FeedBack: React.FC<FeedBackProps> = ({
  feedBack,
  createFeedBack,
  id,
}) => {
  const { mutateAsync: patchFeedBack } = usePatchFeedBack(id);
  const [showAll, setShowAll] = useState(false);
  const [content, setContent] = useState<string>('');
  const visibleItems = showAll ? feedBack || [] : (feedBack || []).slice(0, 3);
  const hendleClick = async () => {
    if (content === '') return;
    createFeedBack(content);
    setContent('');
  };
  const hendlePatch = async (id: string, content: string) => {
    await patchFeedBack({ feedBackId: id, content });
  };
  const hendleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4 py-6">
      <TextBox onClick={hendleClick} onChange={hendleChange} value={content} />
      {visibleItems?.map((d) => {
        return (
          <Reply
            key={d.id}
            id={d.id}
            userId={d.userId}
            content={d.content}
            create={d.createdAt}
            user={{ nickName: d.userNickname, img: d.userProfileImg }}
            onClick={hendlePatch}
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
