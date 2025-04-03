import { getDetail } from './components/mock';
import { MiniCard } from './components/cardDetail';
import Status from './components/status';

interface Props {
  params: { id: string };
}

export default async function PostDetailPage({ params }: Props) {
  const data = await getDetail(params.id);

  return (
    <div>
      <Status
        status={data.approvalStatus}
        reason={data.approvalReason}
        name={data.name}
        time={data.time}
      />
      <MiniCard info={data} />
      <div>
        <p>원문 링크</p>
      </div>
    </div>
  );
}
