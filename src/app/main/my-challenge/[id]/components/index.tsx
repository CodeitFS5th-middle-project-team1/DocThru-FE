'use client';

import { useGetMyChallenge } from '@/api/challenge/ChallengeHooks';
import { MiniCard } from './cardDetail';
import Status from './status';
import { OriginView } from '@/shared/components/OriginView';
import { showToast } from '@/lib/utill';
import { TOAST_ID } from '@/constants';

interface Props {
  id: string;
}

export default function ClientChallengeDetail({ id }: Props) {
  const { data, isLoading, isError } = useGetMyChallenge(id);
  if (isLoading || isError || !data) {
    showToast({
      type: 'loading',
      message: '로딩중',
      id: TOAST_ID.ADMIN,
    });

    return <div></div>;
  }

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
