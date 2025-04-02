'use client';

import Button, {
  BGColor,
  ButtonBorder,
  ButtonImg,
} from '@/shared/components/button/Button';
import { Tab } from '@/shared/components/tab/Tab';
import Search from '@/shared/components/input/search';
import { NextPage } from 'next';
import { useState } from 'react';
import Pagination from '../challenge/_components/Pagination';
import ChallengeTable from './components/ChallengeTable';

const data = [
  {
    no: 1023,
    type: '공식문서',
    category: 'Next.js',
    title: 'Next.js - App Router: Routing Fundamentals',
    people: 10,
    applyDate: '24/01/16',
    deadline: '24/02/24',
    status: '승인 대기',
  },
  {
    no: 1024,
    type: '블로그',
    category: 'API',
    title: 'FetchAPI, 너는 에러를 제대로 핸들링 하고 있는가?(dailydev)',
    people: 5,
    applyDate: '24/01/16',
    deadline: '24/02/23',
    status: '신청 승인',
  },
];
export interface TabProps {
  defaultTabIndex: number;
  onClick: (index: number) => void;
  tabs: string[];
}
const MyChallenge: NextPage = () => {
  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState('on');
  const handleSearch = (e: string) => {
    setSearch(e);
  };

  return (
    <>
      <div className="flex justify-between items-center mt-8">
        <p className="text-xl text-custom-gray-800 font-semibold ">
          나의 챌린지
        </p>
        <div className="flex px-">
          <Button
            border={ButtonBorder.ROUND}
            bgColor={BGColor.BLACK}
            icon={ButtonImg.NEWCHALLENGE}
            href={'/auth/login'}
          >
            신규 챌린지 신청
          </Button>
        </div>
      </div>
      <div className="border-b border-gray-300 mb-8">
        <Tab isActive="off" onClick={() => {}} position="middle">
          참여중인 챌린지
        </Tab>
        <Tab isActive="off" onClick={() => {}} position="middle">
          완료한 챌린지
        </Tab>
        <Tab isActive="on" onClick={() => {}} position="middle">
          신청한 챌린지
        </Tab>
      </div>
      <div className="flex flex-col gap-6 ">
        <section className="flex gap-3">
          <div className="w-full">
            <Search
              name={'text'}
              placeholder="챌린지 이름을 검색해보세요"
              onSearch={handleSearch}
              size="w-full h-12"
            />
          </div>
          <div className="flex items-center">
            <Button
              border={ButtonBorder.RECTANGLE_BORDER}
              bgColor={BGColor.WHITE}
            >
              필터 버튼 자리
            </Button>
          </div>
        </section>
        <ChallengeTable data={data} />
        <section className="flex flex-col gap-6 w-full">
          <div className="flex h-100 justify-center items-center">
            <p className="text-center text-gray-500">
              아직 챌린지가 없어요.
              <br />
              지금 바로 챌린지를 신청해보세요!
            </p>
          </div>
        </section>

        <section className="flex justify-center mb-40">
          <Pagination totalPages={20} />
        </section>
      </div>
    </>
  );
};

export default MyChallenge;
