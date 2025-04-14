'use client';

import { NextPage } from 'next';
import { Title } from './components/Title';
import { Participation } from './components/Participation';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useGetChallenge } from '@/api/challenge/ChallengeHooks';
import {
  useGetTranslationList,
  useGetTranslationsByIds,
} from '@/api/Translation/hook';
import { useAuthStore } from '@/api/auth/AuthStore';
import { MostRecommend } from './components/MostRecommend';
import { Translation } from '@/types';
import next from '@images/arrow-icon/next-arrow/small-arrow.svg';
import Image from 'next/image';

const ChallengeDetail: NextPage = () => {
  const { id } = useParams() as { id: string };
  const [page, setPage] = useState(1);
  const [slideIndex, setSlideIndex] = useState(0);
  const { user } = useAuthStore();
  const { data: challenge } = useGetChallenge(id);
  const { data: translationList } = useGetTranslationList(id, {
    page: page,
    limit: 5,
  });
  const slideRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);

  const totalPage = translationList?.totalCount;
  const maxPage = totalPage ? Math.ceil(totalPage / 5) : 0;
  const handleNextPage = () => {
    if (page <= maxPage) {
      setPage(page + 1);
    }
  };
  const handlePrevPage = () => {
    if (page >= 1) {
      setPage(page - 1);
    }
  };

  const isSameUser = user?.id === challenge?.userId;

  const mostLikeCount = translationList?.translations[0]?.likeCount;

  const mostRecommendedIds = translationList?.translations
    ?.filter((t: Translation) => t.likeCount === mostLikeCount)
    .map((t: Translation) => t.id);

  const { data: mostData } = useGetTranslationsByIds(id, mostRecommendedIds);

  const isSingleSlide = mostData?.length === 1;

  const handleNextSlide = () => {
    if (mostData && slideIndex < mostData.length - 1) {
      setSlideIndex(slideIndex + 1);
    }
  };
  const handlePrevSlide = () => {
    if (mostData && slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  useEffect(() => {
    if (!mostData || mostData.length === 0) return;

    const raf = requestAnimationFrame(() => {
      if (slideRef.current) {
        const width = slideRef.current.offsetWidth + 24;
        setSlideWidth(width);
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [mostData]);

  return (
    <div className="flex flex-col gap-6 w-full ">
      <Title data={challenge} isSameUser={isSameUser} challengeId={id} />

      <div className="relative overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500 gap-6"
          style={{
            transform: `translateX(-${slideIndex * slideWidth}px)`,
          }}
        >
          {challenge?.isDeadlineFull &&
            mostData.map((d, index) => (
              <div
                key={index}
                ref={index === 0 ? slideRef : null}
                className={`relative min-w-[95%] min-h-[340px] shrink-0 
                ${isSingleSlide ? 'min-w-full max-w-full' : 'min-w-[95%] max-w-[95%]'}`}
              >
                <MostRecommend data={d} />
              </div>
            ))}
        </div>

        {mostData.length > 1 && slideIndex < mostData.length - 1 && (
          <button
            onClick={handleNextSlide}
            className="absolute right-[3%] bottom-[50%] cursor-pointer opacity-30 hover:opacity-100 transition-transform duration-300 ease-in-out hover:-translate-y-1"
          >
            <Image width={40} height={40} src={next} alt="next" />
          </button>
        )}
        {slideIndex >= 1 && (
          <button
            onClick={handlePrevSlide}
            className="absolute left-0 bottom-[50%] cursor-pointer rotate-180 opacity-30 hover:opacity-100 transition-transform duration-300 ease-in-out hover:-translate-y-1"
          >
            <Image width={40} height={40} src={next} alt="next" />
          </button>
        )}
      </div>

      <Participation
        maxPage={maxPage}
        List={translationList?.translations}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        page={page}
      />
    </div>
  );
};

export default ChallengeDetail;
