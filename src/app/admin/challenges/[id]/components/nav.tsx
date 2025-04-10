import { ChallengeUser } from '@/types';
import next from '@images/arrow-icon/no-stick/icon_arrow_right.svg';
import prev from '@images/arrow-icon/no-stick/icon_arrow_left.svg';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  data: ChallengeUser;
}

export const Nav = ({ data }: Props) => {
  return (
    <div className="flex justify-between">
      <div>No. {data.challenge.idx}</div>
      <div className="flex">
        <Link
          className="mr-2.5"
          href={`/admin/challenges/${data.prevChallengeId?.id ?? ''}`}
        >
          <Image src={prev} alt="arrow_left Icon" width={24} height={24} />
        </Link>
        <Link href={`/admin/challenges/${data.nextChallengeId?.id ?? ''}`}>
          <Image src={next} alt="arrow_right Icon" width={24} height={24} />
        </Link>
      </div>
    </div>
  );
};
