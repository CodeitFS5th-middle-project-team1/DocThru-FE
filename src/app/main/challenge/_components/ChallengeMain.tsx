'use client';

import Button, {
  BGColor,
  ButtonBorder,
} from '@/shared/components/button/Button';
import { Card, CardProps } from '@/shared/components/card/Card';
import Search from '@/shared/components/input/search';
import { DocumentType, FieldType } from '@/types';
import { useState } from 'react';
import Pagination from './Pagination';

const seedData: CardProps[] = [
  // {
  //   title: 'Next.js로 블로그 만들기',
  //   DocumentType: DocumentType.BLOG,
  //   FieldType: FieldType.NEXTJS,
  //   deadLine: '2025-04-15',
  //   currentParticipants: 3,
  //   maxParticipants: 5,
  //   href: '/projects/nextjs-blog',
  // },
  // {
  //   title: '모던 자바스크립트 완전 정복',
  //   DocumentType: DocumentType.OFFICIAL,
  //   FieldType: FieldType.MODERNJS,
  //   deadLine: '2025-04-20',
  //   currentParticipants: 5,
  //   maxParticipants: 10,
  //   href: '/projects/modernjs-master',
  // },
  // {
  //   title: 'REST API 실전 프로젝트',
  //   DocumentType: DocumentType.BLOG,
  //   FieldType: FieldType.API,
  //   deadLine: '2025-05-01',
  //   currentParticipants: 2,
  //   maxParticipants: 6,
  //   href: '/projects/rest-api-practice',
  // },
];

const ChallengeMain = () => {
  const [search, setSearch] = useState('');

  const handleSearch = (e: string) => {
    setSearch(e);
  };

  return (
    <div className="flex flex-col gap-6 ">
      <section className="flex gap-3">
        <div className="flex items-center">
          <Button
            border={ButtonBorder.RECTANGLE_BORDER}
            bgColor={BGColor.WHITE}
          >
            필터 버튼 자리
          </Button>
        </div>

        <div className="w-full">
          <Search
            name={'text'}
            placeholder="챌린지 이름을 검색해보세요"
            onSearch={handleSearch}
          />
        </div>
      </section>

      <section className="flex flex-col gap-6 w-full">
        {seedData.length === 0 ? (
          <div className="flex h-screen justify-center items-center">
            <p className="text-center text-gray-500">
              아직 챌린지가 없어요.
              <br />
              지금 바로 챌린지를 신청해보세요!
            </p>
          </div>
        ) : (
          <>
            {seedData.map((data, index) => (
              <Card
                key={index}
                title={data.title}
                DocumentType={data.DocumentType}
                FieldType={data.FieldType}
                deadLine={data.deadLine}
                currentParticipants={data.currentParticipants}
                maxParticipants={data.maxParticipants}
                href={data.href}
              />
            ))}
          </>
        )}
      </section>

      {seedData.length > 0 && (
        <section className="flex justify-center">
          <Pagination totalPages={20} />
        </section>
      )}
    </div>
  );
};

export default ChallengeMain;
