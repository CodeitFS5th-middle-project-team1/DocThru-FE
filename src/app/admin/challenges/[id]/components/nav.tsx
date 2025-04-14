import { ChallengeUser } from '@/types';
import on from '@images/arrow-icon/no-stick/icon_arrow_right.svg';
import off from '@images/arrow-icon/no-stick/icon_arrow_left.svg';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  data: ChallengeUser;
}

export const Nav = ({ data }: Props) => {
  const prevId = data.prevChallengeId?.id;
  const nextId = data.nextChallengeId?.id;

  const prevImage = prevId ? on : off;
  const prevRotate = prevId ? 'rotate-180' : '';
  const prevCursor = prevId ? 'cursor-pointer' : 'cursor-default opacity-50';

  const nextImage = nextId ? on : off;
  const nextRotate = nextId ? '' : 'rotate-180';
  const nextCursor = nextId ? 'cursor-pointer' : 'cursor-default opacity-50';

  return (
    <div className="flex justify-between">
      <div>No. {data.challenge.idx}</div>
      <div className="flex">
        <Link
          className={`mr-2.5 ${prevCursor}`}
          href={prevId ? `/admin/challenges/${prevId}` : '#'}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            if (!prevId) e.preventDefault();
          }}
        >
          <Image
            src={prevImage}
            alt="arrow_left Icon"
            width={24}
            height={24}
            className={prevRotate}
          />
        </Link>
        <Link
          className={nextCursor}
          href={nextId ? `/admin/challenges/${nextId}` : '#'}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            if (!nextId) e.preventDefault();
          }}
        >
          <Image
            src={nextImage}
            alt="arrow_right Icon"
            width={24}
            height={24}
            className={nextRotate}
          />
        </Link>
      </div>
    </div>
  );
};
