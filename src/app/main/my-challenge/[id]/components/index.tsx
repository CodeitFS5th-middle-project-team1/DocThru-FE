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

  return (
    <div>
      <Status data={data} />
      <MiniCard data={data} />
      <OriginView
        originUrl={data.challenge.originURL}
        width="100%"
      ></OriginView>
    </div>
  );
}
