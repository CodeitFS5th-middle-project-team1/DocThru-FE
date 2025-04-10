import { ChallengeUser } from '@/types';
import prev from '@images/arrow-icon/no-stick/black.svg';
import next from '@images/arrow-icon/no-stick/gray.svg';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  data: ChallengeUser;
}

export const Nav = ({ data }: Props) => {
  console.log('nav data', data);
  return (
    <div>
      <div>No. {data.challenge.idx}</div>
      <div>
        {data.prevChallengeId && (
          <Link href={`/main/my-challenge/${data.prevChallengeId.id}`}>
            <Image src={prev} alt="arrow_left Icon" width={16} height={16} />
          </Link>
        )}
        {data.nextChallengeId && (
          <Link href={`/main/my-challenge/${data.nextChallengeId.id}`}>
            <Image src={next} alt="arrow_right Icon" width={16} height={16} />
          </Link>
        )}
      </div>
    </div>
  );
};
