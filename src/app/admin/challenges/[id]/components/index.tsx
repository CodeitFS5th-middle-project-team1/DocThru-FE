'use client';

import { useGetMyChallenge } from '@/api/challenge/ChallengeHooks';
import { MiniCard } from './cardDetail';
import { Nav } from './nav';
import Status from './status';
import { OriginView } from '@/shared/components/OriginView';

interface Props {
  id: string;
}

export default function AdminChallengeDetail({ id }: Props) {
  const { data, isLoading, isError } = useGetMyChallenge(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading challenge</div>;
  const info = data;
  console.log('이것이 데이터이다', data);

  return (
    <div>
      <Nav data={info} />
      <Status data={info} />
      <MiniCard data={info} />
      <OriginView originUrl={info.originURL} width="100%"></OriginView>
    </div>
  );
}
