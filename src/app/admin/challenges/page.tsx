'use client';

import Search from '@/shared/components/input/search';
import { NextPage } from 'next';
import { useState } from 'react';
import Pagination from '../../main/challenge/_components/Pagination';
import ChallengeTable from './components/ChallengeTable';
import { Sort } from '@/shared/components/dropdown/Sort';
import { useQuery } from '@tanstack/react-query';
import { ChallengeOrderBy, fetchChallengesByAdmin } from '@/lib/api/admin';

export interface TabProps {
  defaultTabIndex: number;
  onClick: (index: number) => void;
  tabs: string[];
}

const AdminChallenge: NextPage = () => {
  const [, setKeyword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortValue, setSortValue] = useState('option1');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const getParamsFromSortValue = (value: string) => {
    const mapping: Record<string, any> = {
      option1: { approvalStatus: 'PENDING' }, // 승인 대기
      option2: { approvalStatus: 'APPROVED' }, // 신청 승인
      option3: { approvalStatus: 'REJECTED' }, // 신청 거절
      option4: { orderBy: ChallengeOrderBy.APPLY_FIRST }, // 신청 시간 빠른순
      option5: { orderBy: ChallengeOrderBy.APPLY_LAST }, // 신청 시간 느린순
      option6: { orderBy: ChallengeOrderBy.DEADLINE_FIRST }, // 마감 기한 빠른순
      option7: { orderBy: ChallengeOrderBy.DEADLINE_LAST }, // 마감 기한 느린순
    };
    return mapping[value] || {};
  };

  const queryParams = {
    page,
    limit,
    keyword: searchTerm,
    ...getParamsFromSortValue(sortValue),
  };

  // API 호출
  const { data, isLoading, error } = useQuery<{
    challenges: any[];
    totalCount: number;
  }>({
    queryKey: ['adminChallenges', queryParams],
    queryFn: () => fetchChallengesByAdmin(queryParams),
    staleTime: 5000, //5초동안 캐시데이터 사용 -> 수정 가능
  });

  //TODO: 검색 전체 데이터에서 가능하게 하는게 좋지 않을까?
  const handleSearch = (e: string) => {
    setKeyword(e);
    setSearchTerm(e);
    setPage(1); // 검색 시 첫 페이지로 이동
  };

  const handleSortChange = (value: string) => {
    setSortValue(value);
    setPage(1);
    console.log('Selected:', value);
  };

  //페이지네이션 핸들러
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const transformedData =
    data?.challenges.map((challenge) => ({
      no: challenge.idx,
      type: challenge.documentType,
      category: challenge.field,
      title: challenge.title,
      people: challenge.maxParticipants,
      applyDate: new Date(challenge.createdAt).toLocaleDateString('ko-KR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      }),
      deadline: new Date(challenge.deadline).toLocaleDateString('ko-KR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      }),
      status:
        challenge.approvalStatus === 'APPROVED'
          ? '신청 승인'
          : challenge.approvalStatus === 'REJECTED'
            ? '신청 거절'
            : '승인 대기',
      id: challenge.id, // 상세페이지 이동시 사용
    })) || [];

  const options = [
    { value: 'option1', name: '승인 대기' },
    { value: 'option2', name: '신청 승인' },
    { value: 'option3', name: '신청 거절' },
    { value: 'option4', name: '신청 시간 빠른순' },
    { value: 'option5', name: '신청 시간 느린순' },
    { value: 'option6', name: '마감 기한 빠른순' },
    { value: 'option7', name: '마감 기한 느린순' },
  ];

  return (
    <>
      <div className="flex justify-between items-center mt-8">
        <p className="text-xl text-custom-gray-800 font-semibold ">
          챌린지 신청 관리
        </p>
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

        {/* TODO: 로딩 처리 */}
        {isLoading && (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
          </div>
        )}

        {/* TODO: 에러 처리  */}
        {error && (
          <div className="text-center text-red-500 py-6">
            데이터를 불러오는 중 오류가 발생했습니다.
          </div>
        )}

        {/* 데이터 있는 경우 */}
        {!isLoading && !error && transformedData.length > 0 && (
          <ChallengeTable data={transformedData} />
        )}

        {/* 데이터 없는 경우 */}
        {!isLoading && !error && transformedData.length === 0 && (
          <section className="flex flex-col gap-6 w-full">
            <div className="flex h-100 justify-center items-center">
              <p className="text-center text-gray-500">
                아직 챌린지가 없어요.
                <br />
                지금 바로 챌린지를 신청해보세요!
              </p>
            </div>
          </section>
        )}

        {/* 페이지네이션 */}
        {!isLoading && !error && data && data.totalCount > 0 && (
          <section className="flex justify-center mb-40">
            <Pagination
              totalPages={Math.ceil(data.totalCount / limit)}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          </section>
        )}
      </div>
    </>
  );
};

export default AdminChallenge;
