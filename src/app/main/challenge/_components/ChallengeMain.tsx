'use client';
import { Card } from '@/shared/components/card/Card';
import Search from '@/shared/components/input/search';
import { useEffect, useMemo, useState } from 'react';
import Pagination from './Pagination';
import { Filter } from '@/shared/components/dropdown/Filter';
import { useToastQuery } from '@/shared/hooks/useToastQuery';
import { fetchChallenges } from '@/api/challenge/ChallengeApi';
import { useSearchParams } from 'next/navigation';
import CardSkeleton from '@/shared/components/card/CardSkeleton';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';

const ChallengeMain = () => {
  const [keyword, setKeyword] = useState('');
  const [filters, setFilters] = useState({
    fields: [] as string[],
    documentType: '',
    status: '',
  });

  const isMobile = useMediaQuery('(max-width: 344px)');
  const displayCount = isMobile ? 4 : 5;

  const searchParams = useSearchParams();
  const initialPage = Number(searchParams.get('page')) || 1;
  const [page, setPage] = useState(initialPage);

  const { data, isPending } = useToastQuery(
    ['challenges', page, displayCount, keyword, filters],
    () =>
      fetchChallenges({
        page,
        limit: displayCount,
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
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / displayCount);

  const handleSearch = (e: string) => {
    if (keyword !== e) {
      setKeyword(e);
      if (page !== 1) setPage(1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className="flex flex-col gap-6 bg-custom-gray-50">
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
          Array.from({ length: displayCount }).map((_, index) => (
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
