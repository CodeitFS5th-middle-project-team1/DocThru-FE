'use client';

import { useGetMyChallenge } from '@/api/challenge/ChallengeHooks';
import { MiniCard } from './cardDetail';
import Status from './status';
import { OriginView } from '@/shared/components/OriginView';

interface Props {
  id: string;
}

export default function ClientChallengeDetail({ id }: Props) {
  const { data, isLoading, isError } = useGetMyChallenge(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading challenge</div>;
  const info = data;

  return (
    <div>
      <Status data={info} />
      <MiniCard data={info} />
      <OriginView originUrl={info.originURL} width="100%"></OriginView>
    </div>
  );
}
