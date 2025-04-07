'use client';

import { NextPage } from 'next';
import { Title } from './components/Title';
import { Participation } from './components/Participation';
import { useEffect } from 'react';
import { useChallengeStore } from '@/api/challenge/ChallengeStore';
import { useParams } from 'next/navigation';
import { useTranslationListStore } from '@/api/store/translationStore';

const ChallengeDetail: NextPage = () => {
  const { id } = useParams() as { id: string };
  const { challenge, fetchChallenge } = useChallengeStore();
  const { translationList, fetchTranslationList } = useTranslationListStore();
  useEffect(() => {
    fetchChallenge(id);
    fetchTranslationList(id);
    localStorage.setItem('challengeId', id);
  }, [id]);

  return (
    <div className="w-full">
      <Title
        title={challenge?.title}
        document={challenge?.documentType}
        field={challenge?.field}
        content={challenge?.description}
        nickname={'test'}
        currentParticipants={challenge?.currentParticipants}
        deadLine={challenge?.deadline}
        maxParticipants={challenge?.maxParticipants}
        originUrl={challenge?.originURL}
      />
      <Participation currentPage={1} tatalPage={3} List={translationList} />
    </div>
  );
};

export default ChallengeDetail;
