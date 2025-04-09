'use client';

import { NextPage } from 'next';
import PatchCard from '../_components/PatchCard';
import { OriginView } from '@/shared/components/OriginView';
import { useState } from 'react';
import OutImg from '@/shared/Img/ic_out_circle.svg';
import Image from 'next/image';
import ListImg from '@/shared/Img/ic_list.svg';


const TranslationWorkModify: NextPage = () => {
  const [showOriginal, setShowOriginal] = useState(false);
  return (
    <div
      className={`${showOriginal ? 'flex md:justify-center md:flex-row flex-col-reverse' : 'block'} h-screen`}
    >
      <div className="flex md:flex-1 flex-2/3 justify-center overflow-y-auto px-3">
        <PatchCard />
      </div>
      {showOriginal && (
        <div className="relative md:flex-1 flex-1/3 md:w-1/2 w-[100%] h-full border-r border-gray-300 overflow-y-auto">
          <OriginView width="100%" height="100%" />
          <Image
            src={OutImg}
            alt="원문 안보기"
            width={32}
            height={32}
            className="absolute top-2 left-2 cursor-pointer"
            onClick={() => setShowOriginal(false)}
          />
        </div>
      )}
      {!showOriginal && (
        <div
          className="hover:bg-custom-gray-50 bg-white absolute right-0 top-52 border-[#F5F5F5] border-2 z-50 md:py-6 py-2 px-2 cursor-pointer rounded-l-[24px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
          onClick={() => setShowOriginal(true)}
        >
          <div className='flex md:flex-col gap-1 justify-center items-center'>
            <div>
              <Image
                src={ListImg}
                alt="원문 보기"
                width={20}
                height={20}
              />
            </div>
            <div>원문</div>
          </div>
        </div>
      )}
    </div>
  );
};
export default TranslationWorkModify;
