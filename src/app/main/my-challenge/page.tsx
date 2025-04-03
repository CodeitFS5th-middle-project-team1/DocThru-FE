import { NextPage } from 'next';
import MyChallengeHead from './components/MyChallengeHead';
import MyChallengeMain from './components/MyChallengeMain';

const MyChallenge: NextPage = () => {
  return (
    <>
      <MyChallengeHead />
      <MyChallengeMain />
    </>
  );
};

export default MyChallenge;
