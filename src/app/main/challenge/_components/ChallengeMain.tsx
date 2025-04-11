'use client';
import { Card } from '@/shared/components/card/Card';
import Search from '@/shared/components/input/search';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { Filter } from '@/shared/components/dropdown/Filter';
import { useToastQuery } from '@/shared/hooks/useToastQuery';
import { fetchChallenges } from '@/api/challenge/ChallengeApi';
import { useSearchParams } from 'next/navigation';
import CardSkeleton from '@/shared/components/card/CardSkeleton';

const ChallengeMain = () => {
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [filters, setFilters] = useState({
    fields: [] as string[],
    documentType: '',
    status: '',
  });

  const searchParams = useSearchParams();
  const initialPage = Number(searchParams.get('page')) || 1;
  const [page, setPage] = useState(initialPage);

  const { data, isPending } = useToastQuery(
    ['challenges', page, limit, keyword, filters],
    () =>
      fetchChallenges({
        page,
        limit: 10,
        keyword,
        documentType: filters.documentType,
        fields: filters.fields,
        status: filters.status,
      }),
    'challenge-toast',
    {
      pending: '불러오는 중...',
      success: '불러오기 완료!',
    },
    {
      keepPreviousData: true,
    }
  );

  const challenges = data?.challenges ?? [];

  const handleSearch = (e: string) => {
    if (keyword !== e) {
      setKeyword(e);
      if (page !== 1) setPage(1);
    }
  };

  useEffect(() => {
    if (data?.totalCount !== undefined) {
      const nextTotalPages = Math.ceil(data.totalCount / limit);
      if (nextTotalPages !== totalPages) {
        setTotalPages(nextTotalPages);
      }
    }
  }, [data?.totalCount, limit, totalPages]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className="flex flex-col gap-6 ">
      <section className="flex gap-3">
        <div className="flex items-center">
          <Filter
            onApply={(appliedFilters) => {
              setFilters(appliedFilters);
              setPage(1);
            }}
          />
        </div>

        <div className="w-full">
          <Search
            name={'text'}
            placeholder="챌린지 이름을 검색해보세요"
            onSearch={handleSearch}
            size="w-full"
          />
        </div>
      </section>

      <section className="flex flex-col gap-6 w-full">
        {isPending ? (
          Array.from({ length: 5 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : challenges.length === 0 ? (
          <div className="flex h-screen justify-center items-center">
            <p className="text-center text-gray-500">
              아직 챌린지가 없어요.
              <br />
              지금 바로 챌린지를 신청해보세요!
            </p>
          </div>
        ) : (
          challenges.map((challenge) => (
            <Card
              key={challenge.id}
              data={{
                ...challenge,
                approvalStatus:
                  challenge.approvalStatus === 'PENDING'
                    ? 'PENDING'
                    : challenge.approvalStatus,
              }}
            />
          ))
        )}
      </section>

      <section className="flex justify-center">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </section>
    </div>
  );
};

export default ChallengeMain;
