'use client';

import { NextPage } from 'next';
import PostCard from './_components/PostCard';
import { OriginView } from '@/shared/components/OriginView';
import { useState } from 'react';
import OutImg from '@/shared/Img/ic_out_circle.svg'
import Image from 'next/image';

const TranslationWork: NextPage = () => {
  const [showOriginal, setShowOriginal] = useState(true);
  return (
    <div className={`${showOriginal ? 'flex md:justify-center md:flex-row flex-col-reverse' : 'block'} h-screen`}>
      <div className="flex flex-1 justify-center overflow-y-auto p-6">
        <PostCard />
      </div>
      {
        showOriginal && <div className="relative flex-1 md:w-1/2 w-[100%] h-full border-r border-gray-300 overflow-y-auto">
          <OriginView width='100%' height='100%'/>
          <Image src={OutImg} alt="원문 안보기" width={32} height={32} className='absolute top-2 left-2 cursor-pointer' onClick={() => setShowOriginal(false)}/>
        </div>
      }
    </div>
  );
};
export default TranslationWork;
