import { NextPage } from 'next';
import ChallengeHead from './_components/ChallengeHead';
import ChallengeMain from './_components/ChallengeMain';

const ChallengeDetail: NextPage = () => {
  return (
    <div className="flex gap-4 flex-col px-4 md:px-6 xl:px-[28.875rem] pt-20 pb-28">
      <ChallengeHead />
      <ChallengeMain />
    </div>
  );
};

export default ChallengeDetail;
