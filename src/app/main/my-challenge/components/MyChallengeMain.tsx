'use client';

//import { Card } from '@/shared/components/card/Card';
import Search from '@/shared/components/input/search';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { useToastQuery } from '@/shared/hooks/useToastQuery';
import { Tab, TabActive, TextPosition } from '@/shared/components/tab/Tab';
import ChallengeTable from './ChallengeTable';
// import dayjs from 'dayjs';
import { Challenge } from '@/types';
import {
  fetchChallengeByParticipating,
  fetchChallengeByUser,
  //fetchChallenges,
} from '@/api/challenge/ChallengeApi';
import { Sort } from '@/shared/components/dropdown/Sort';
import { ApprovalStatus, ApprovalStatusLabels } from '@/types';
import { ChallengeOrderBy } from '@/lib/api/admin';
const TAB_LIST = [
  { key: 'participating', label: '참여중인 챌린지' },
  { key: 'completed', label: '마감된 챌린지' },
  { key: 'applied', label: '신청한 챌린지' },
] as const;

type TabKey = (typeof TAB_LIST)[number]['key'];

export type ChallengeWithApply = Challenge & {
  appliedAt?: string;
  approvalStatus?: string;
};

const MyChallengeMain = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [keyword, setKeyword] = useState('');
  //const [orderBy, setOrderBy] = useState('');
  //const [approvalStatus, setApprovalStatus] = useState('');
  const [activeTab, setActiveTab] = useState<TabKey>('participating');
  const [sortValue, setSortValue] = useState('option1');
  const getParamsFromSortValue = (value: string) => {
    const mapping: Record<string, any> = {
      option1: { approvalStatus: 'PENDING' },
      option2: { approvalStatus: 'APPROVED' },
      option3: { approvalStatus: 'REJECTED' },
      option4: { orderBy: ChallengeOrderBy.CREATED_FIRST },
      option5: { orderBy: ChallengeOrderBy.CREATED_LAST },
      option6: { orderBy: ChallengeOrderBy.DEADLINE_FIRST },
      option7: { orderBy: ChallengeOrderBy.DEADLINE_LAST },
    };
    return mapping[value] || {};
  };
  const { approvalStatus, orderBy } = getParamsFromSortValue(sortValue);
  console.log('🔥 orderBy:', orderBy);
  const { data, isPending } = useToastQuery(
    ['my-challenges', page, limit, keyword, activeTab, sortValue],
    () => {
      if (activeTab === 'applied') {
        return fetchChallengeByUser({
          page,
          limit,
          keyword,
          orderBy,
          approvalStatus,
        });
      }

      return fetchChallengeByParticipating({
        page,
        limit,
        keyword,
        isExpired:
          activeTab === 'completed'
            ? true
            : activeTab === 'participating'
              ? false
              : undefined,
      });
    },
    'challenge-toast',
    {
      pending: '불러오는 중...',
      success: '불러오기 완료!',
    }
  );

  const challenges = data?.challenges ?? [];
  const totalPages = Math.ceil((data?.totalCount ?? 1) / limit);

  const getStatusLabel = (status: string): string => {
    if (Object.values(ApprovalStatus).includes(status as ApprovalStatus)) {
      return ApprovalStatusLabels[status as ApprovalStatus];
    }
    return '승인 대기';
  };
  const handleSortChange = (value: string) => {
    setSortValue(value);
    setPage(1);
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
  const tableData =
    activeTab === 'applied'
      ? (challenges as ChallengeWithApply[]).map((challenge, idx) => ({
          no: idx + 1 + (page - 1) * limit,
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
          status: getStatusLabel(challenge.approvalStatus || ''),
          id: challenge.id,
        }))
      : [];
  console.table(tableData);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className="flex flex-col gap-6 ">
      <section className="flex flex-col gap-3">
        <div className="flex border-b border-custom-gray-300">
          {TAB_LIST.map((tab) => (
            <Tab
              key={tab.key}
              position={TextPosition.MIDDLE}
              isActive={activeTab === tab.key ? TabActive.ON : TabActive.OFF}
              onClick={() => {
                setActiveTab(tab.key);
                setPage(1);
              }}
            >
              {tab.label}
            </Tab>
          ))}
        </div>

        <div className="w-full">
          {activeTab === 'completed' ? (
            <>
              <Search
                name={'text'}
                placeholder="챌린지 이름을 검색해보세요"
                onSearch={(e) => {
                  setKeyword(e);
                  setPage(1);
                }}
                size="w-full"
              />
            </>
          ) : (
            <section className="flex gap-3">
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
              {activeTab === 'applied' && (
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
              )}
            </section>
          )}
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
        ) : activeTab === 'applied' ? (
          <ChallengeTable data={tableData} />
        ) : (
          <div className="flex h-screen justify-center items-center">
            <p className="text-center text-gray-500">챌린지를 선택해주세요.</p>
          </div>
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

export default MyChallengeMain;
