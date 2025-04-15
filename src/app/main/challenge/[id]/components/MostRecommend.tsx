import Image from 'next/image';
import medal from '@images/medal.svg';
import profile from '@images/profile-icon/member.svg';
import likeActive from '@images/like-icon/big-active.svg';
import likeInactive from '@images/like-icon/big-inactive.svg';
import down from '@images/arrow-icon/circle/down.svg';
import up from '@images/arrow-icon/circle/up.svg';
import { Divider } from '@/shared/components/Divider';
import { Translation } from '@/types';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

interface MostRecommendProps {
  data?: Translation;
  slideIndex: number;
}
export const MostRecommend: React.FC<MostRecommendProps> = ({
  data,
  slideIndex,
}) => {
  const [isViewAll, setIsViewAll] = useState(false);
  const [contentHeight, setContentHeight] = useState('0px');
  const [isOverflow, setIsOverflow] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const fullHeight = contentRef.current.scrollHeight;
      setIsOverflow(fullHeight > 180);
      setContentHeight(isViewAll ? `${fullHeight}px` : '180px');
    }
  }, [isViewAll, data]);
  useEffect(() => {
    setIsViewAll(false);
  }, [slideIndex]);
  return (
    <div className="flex flex-col w-full h-full  mb-6 bg-custom-gray-50 rounded-2xl border-2 border-custrom-gray-100  ">
      <div className="flex gap-1 w-fit px-4 py-2  bg-custom-gray-800 rounded-tl-2xl rounded-br-2xl M-14-0 text-white">
        <Image src={medal} alt="medal" />
        최다 추천번역
      </div>
      <div className="pt-2 px-4">
        <div className="flex justify-between items-center ">
          <div className="flex gap-4">
            <div className="flex items-center">
              <Image src={profile} alt="profile" />
              <div className="pl-2 pr-1.5">{data?.user.nickname}</div>
              <div>전문가</div>
            </div>
            <div className="flex items-center">
              <Image
                src={data?.isLiked ? likeActive : likeInactive}
                alt="like"
              />
              <div>{data?.likeCount.toLocaleString()}</div>
            </div>
          </div>
          <div>{dayjs(data?.createdAt).format('YYYY/MM/DD HH:mm')}</div>
        </div>
        <Divider className="mt-3 mb-4" />
        <div
          ref={contentRef}
          style={{
            maxHeight: contentHeight,
          }}
          className="overflow-hidden transition-all duration-1800 ease-in-out whitespace-pre-wrap break-words"
        >
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: data?.content || '' }}
          />
        </div>
      </div>
      {isOverflow && (
        <div
          onClick={() => {
            setIsViewAll(!isViewAll);
          }}
          className="flex justify-center cursor-pointer pt-[6.5px] gap-1 M-16-0"
        >
          {isViewAll ? '접기' : '더보기'}
          <Image src={isViewAll ? up : down} alt="arrow" />
        </div>
      )}
    </div>
  );
};
