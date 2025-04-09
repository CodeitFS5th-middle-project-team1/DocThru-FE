'use client';

import { Card } from '@/shared/components/card/Card';
import Search from '@/shared/components/input/search';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { useToastQuery } from '@/shared/hooks/useToastQuery';
import { Tab, TabActive, TextPosition } from '@/shared/components/tab/Tab';
import ChallengeTable from './ChallengeTable';
import dayjs from 'dayjs';
import { Challenge } from '@/types';
import {
  fetchChallengeByParticipating,
  fetchChallengeByUser,
  fetchChallenges,
} from '@/api/challenge/ChallengeApi';
import { Sort } from '@/shared/components/dropdown/Sort';

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
  const [orderBy, setOrderBy] = useState('');
  const [approvalStatus, setApprovalStatus] = useState('');
  const [activeTab, setActiveTab] = useState<TabKey>('participating');

  const { data, isPending } = useToastQuery(
    ['my-challenges', page, limit, keyword, activeTab],
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

  const tableData = (challenges as ChallengeWithApply[]).map((c, idx) => ({
    no: idx + 1 + (page - 1) * limit,
    type: c.field,
    category: c.documentType,
    title: c.title,
    people: `${c.currentParticipants}/${c.maxParticipants}`,
    applyDate: dayjs(c.appliedAt).format('YYYY.MM.DD'),
    deadline: dayjs(c.deadline).format('YYYY.MM.DD'),
    approvalStatus: c.approvalStatus,
  }));

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
              {/* <Sort /> */}
            </>
          ) : (
            <Search
              name={'text'}
              placeholder="챌린지 이름을 검색해보세요"
              onSearch={(e) => {
                setKeyword(e);
                setPage(1);
              }}
              size="w-full"
            />
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
          <>
            {challenges.map((challenge) => (
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
            ))}
          </>
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
