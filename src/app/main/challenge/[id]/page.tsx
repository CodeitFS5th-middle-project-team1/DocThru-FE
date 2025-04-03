'use client';

import { NextPage } from 'next';
import { Title } from './components/Title';
import { Participation } from './components/Participation';
import { useEffect } from 'react';
import { useChallengeStore } from '@/api/store/ChallengeStore';
import { useParams } from 'next/navigation';

const ChallengeDetail: NextPage = () => {
  const { id } = useParams() as { id: string };
  const { challenge, fetchChallenge } = useChallengeStore();

  useEffect(() => {
    fetchChallenge(id);
  }, [id]);

  return (
    <div className="w-full">
      <Title
        title={challenge?.title}
        document={challenge?.documentType}
        field={challenge?.field}
        content={challenge?.description}
        nickname="럽윈즈올"
        currentParticipants={challenge?.currentParticipants}
        deadLine={challenge?.deadline}
        maxParticipants={challenge?.maxParticipants}
        originUrl={challenge?.originUrl}
      />
      <Participation currentPage={1} tatalPage={3} />
    </div>
  );
};

export default ChallengeDetail;
