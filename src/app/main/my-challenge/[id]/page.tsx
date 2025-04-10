import { getDetail } from './components/mock';
import { MiniCard } from './components/cardDetail';
import Status from './components/status';

interface Params {
  id: string;
}

export default async function MyChallengeDetail({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const data = await getDetail(id);

  return (
    <div>
      <Status
        status={data.approvalStatus}
        reason={data.approvalReason}
        name={data.name}
        time={data.time}
      />
      {/* <MiniCard info={data} /> */}
      <div>
        <p>원문 링크</p>
      </div>
    </div>
  );
}
