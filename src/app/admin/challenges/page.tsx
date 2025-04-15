'use client';

import Search from '@/shared/components/input/search';
import { NextPage } from 'next';
import { useState } from 'react';
import Pagination from '../../main/challenge/_components/Pagination';
import ChallengeTable from './components/ChallengeTable';
import { Sort } from '@/shared/components/dropdown/Sort';
// import { useQuery } from '@tanstack/react-query';
import { ChallengeOrderBy } from '@/api/admin/admin';
import { useGetChallengeByAdmin } from '@/api/challenge/ChallengeHooks';
import { ApprovalStatus, ApprovalStatusLabels } from '@/types';
import { useSearchParams } from 'next/navigation';

// interface ChallengeApiResponse {
//   id: string;
//   idx: number;
//   title: string;
//   documentType: string;
//   field: string;
//   maxParticipants: number;
//   createdAt: string;
//   deadline: string;
//   approvalStatus: string;
// }
// type Params =
//   | { approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED' }
//   | { order: ChallengeOrderBy };

const AdminChallenge: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortValue, setSortValue] = useState('option1');
  const [limit] = useState(10);

  const searchParams = useSearchParams();
  const initialPage = Number(searchParams.get('page')) || 1;
  const [page, setPage] = useState(initialPage);

  const getParamsFromSortValue = (value: string) => {
    const mapping = {
      option1: { approvalStatus: 'PENDING' },
      option2: { approvalStatus: 'APPROVED' },
      option3: { approvalStatus: 'REJECTED' },
      option4: { order: ChallengeOrderBy.CREATED_FIRST },
      option5: { order: ChallengeOrderBy.CREATED_LAST },
      option6: { order: ChallengeOrderBy.DEADLINE_FIRST },
      option7: { order: ChallengeOrderBy.DEADLINE_LAST },
    };
    return mapping[value as keyof typeof mapping] || {};
  };

  const queryParams = {
    page,
    limit,
    keyword: searchTerm,
    ...getParamsFromSortValue(sortValue),
  };

  const { data, isLoading, error } = useGetChallengeByAdmin(queryParams);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortValue(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const getStatusLabel = (status: string) =>
    ApprovalStatusLabels[status as ApprovalStatus] || '승인 대기';

  // const transformedData =
  //   data?.challenges.map((challenge) => ({
  //     no: challenge.idx,
  //     type: challenge.documentType,
  //     category: challenge.field,
  //     title: challenge.title,
  //     people: challenge.maxParticipants,
  //     createdAt: new Date(challenge.createdAt).toLocaleDateString('ko-KR'),
  //     deadline: new Date(challenge.deadline).toLocaleDateString('ko-KR'),
  //     status: getStatusLabel(challenge.approvalStatus),
  //     id: challenge.id,
  //   })) || [];

  const transformedData =
    data?.challenges.map((challenge) => ({
      no: challenge.idx,
      type: challenge.documentType,
      category: challenge.field,
      title: challenge.title,
      people: challenge.maxParticipants,
      createdAt: new Date(challenge.createdAt).toLocaleDateString('ko-KR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      }),
      deadline: new Date(challenge.deadline).toLocaleDateString('ko-KR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      }),
      status: getStatusLabel(challenge.approvalStatus),
      id: challenge.id,
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
        <p className="text-xl text-custom-gray-800 font-semibold">
          챌린지 신청 관리
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <section className="flex gap-3">
          <div className="w-full">
            <Search
              name="text"
              placeholder="챌린지 이름을 검색해보세요"
              onSearch={handleSearch}
              size="w-full h-[40px]"
            />
          </div>
          <div className="whitespace-nowrap text-gray-500">
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

        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-6">
            데이터를 불러오는 중 오류가 발생했습니다.
          </div>
        ) : transformedData.length > 0 ? (
          <ChallengeTable data={transformedData} />
        ) : (
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
        {!isLoading && !error && (data?.totalCount ?? 0) > 0 && (
          <section className="flex justify-center ">
            <Pagination
              totalPages={Math.ceil((data?.totalCount ?? 0) / limit)}
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
