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
import { Sort } from '@/shared/components/dropdown/Sort';
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
  const options = [
    { value: 'option1', name: '승인 대기' },
    { value: 'option2', name: '신청 승인' },
    { value: 'option3', name: '신청 거절' },
    { value: 'option4', name: '신청 시간 빠른순' },
    { value: 'option5', name: '신청 시간 느린순' },
    { value: 'option6', name: '마감 기한 빠른순' },
    { value: 'option7', name: '마감 기한 느린순' },
  ];
  const [sortValue, setSortValue] = useState('option1');
  const handleSortChange = (value: string) => {
    setSortValue(value);
    console.log('Selected:', value);
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
              size="w-full h-[40px]"
            />
          </div>
          <div className="whitespace-nowrap text-gray-500 ">
            <Sort
              options={options}
              placeholder="승인 대기"
              value={sortValue}
              defaultValue="option1"
              handleChange={handleSortChange}
              className="text-left"
            />
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
          <Pagination
            totalPages={20}
            currentPage={0}
            onPageChange={function (page: number): void {
              throw new Error('Function not implemented.');
            }}
          />
        </section>
      </div>
    </>
  );
};

export default MyChallenge;
