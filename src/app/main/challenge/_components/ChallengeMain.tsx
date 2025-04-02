'use client';

import { Card } from '@/shared/components/card/Card';
import Search from '@/shared/components/input/search';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { Filter } from '@/shared/components/dropdown/Filter';
import { useToastQuery } from '@/shared/hooks/useToastQuery';
import { fetchChallenges } from '@/lib/api/challenge';

const ChallengeMain = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [keyword, setKeyword] = useState('');
  // const [documentType, setDocumentType] = useState<string>();
  // const [fields, setFields] = useState<string[]>();
  // const [approvalStatus, setApprovalStatus] = useState<string>();

  const { data, isPending } = useToastQuery(
    ['challenges', page, limit, keyword],
    () =>
      fetchChallenges({
        page,
        limit: 10,
        keyword,
      }),
    'challenge-toast',
    {
      pending: '불러오는 중...',
      success: '불러오기 완료!',
      error: '불러오기 실패!',
    }
  );

  const challenges = data?.challengesWithIsMax ?? [];
  const totalPages = Math.ceil((data?.totalCount ?? 1) / limit);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className="flex flex-col gap-6 ">
      <section className="flex gap-3">
        <div className="flex items-center">
          <Filter />
        </div>

        <div className="w-full">
          <Search
            name={'text'}
            placeholder="챌린지 이름을 검색해보세요"
            onSearch={(e) => {
              setKeyword(e);
              setPage(1);
            }}
            size="w-full"
          />
        </div>
      </section>

      <section className="flex flex-col gap-6 w-full">
        {challenges.length === 0 ? (
          <div className="flex h-screen justify-center items-center">
            <p className="text-center text-gray-500">
              아직 챌린지가 없어요.
              <br />
              지금 바로 챌린지를 신청해보세요!
            </p>
          </div>
        ) : (
          <>
            {challenges.map((data, index) => (
              <Card
                category="base"
                key={index}
                title={data.title}
                DocumentType={data.documentType}
                FieldType={data.field}
                deadLine={data.deadline}
                currentParticipants={data.currentParticipants}
                maxParticipants={data.maxParticipants}
              />
            ))}
          </>
        )}
      </section>

      {challenges.length > 0 && totalPages > 1 && (
        <section className="flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </section>
      )}
    </div>
  );
};

export default ChallengeMain;
