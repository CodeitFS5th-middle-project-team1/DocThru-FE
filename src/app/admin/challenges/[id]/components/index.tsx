'use client';

import { useGetMyChallenge } from '@/api/challenge/ChallengeHooks';
import { MiniCard } from './cardDetail';
import { Nav } from './nav';
import Status from './status';
import { OriginView } from '@/shared/components/OriginView';
import StatusBottom from './statusBottom';
import { showToast } from '@/lib/utill';
import { TOAST_ID } from '@/constants';

interface Props {
  id: string;
}

export default function AdminChallengeDetail({ id }: Props) {
  const { data, isLoading, isError } = useGetMyChallenge(id);

  if (isLoading || isError || !data) {
    showToast({
      type: 'loading',
      message: '로딩중',
      id: TOAST_ID.ADMIN,
    });

    return <div></div>; // 여기에 Spinner나 Skeleton도 가능
  }
  const info = data;

  return (
    <div>
      <Nav data={info} />
      <Status data={info} />
      <MiniCard data={info} />
      <OriginView
        originUrl={info.challenge.originURL}
        width="100%"
      ></OriginView>
      <StatusBottom data={info} />
    </div>
  );
}
