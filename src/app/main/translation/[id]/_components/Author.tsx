import Image from 'next/image';
import likeActive from '@images/like-icon/small-active.svg';
import likeInactive from '@images/like-icon/small-inactive.svg';
import profile from '@images/profile-icon/member.svg';
import { Divider } from '@/shared/components/Divider';
import dayjs from 'dayjs';

interface AuthorProps {
  like?: boolean;
  likeCount?: number;
  user?: { id: string; nickname: string };
  create?: Date | string;
}

export const Author: React.FC<AuthorProps> = ({
  user,
  like = false,
  create,
  likeCount = 0,
}) => {
  const formatted = dayjs(create).format('YY/MM/DD');
  return (
    <div>
      <div className="w-full M-14-0  flex justify-between items-center pt-6 pb-16  ">
        <div className="flex gap-3">
          <div className="flex gap-2 text-custom-gray-800 items-center">
            <Image src={profile} alt="profileIcon" />
            <span>{user?.nickname || ''}</span>
          </div>
          <div className="flex flex-row gap-1 text-custom-gray-500 items-center">
            <Image
              className="cursor-pointer"
              src={like ? likeActive : likeInactive}
              alt="likeIcon"
            />
            <span>{likeCount.toLocaleString()}</span>
          </div>
        </div>
        <div className="text-custom-gray-500">
          <span>{formatted}</span>
        </div>
      </div>
      <Divider />
    </div>
  );
};
