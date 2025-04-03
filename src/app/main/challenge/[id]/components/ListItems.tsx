import Image from 'next/image';
import crown from '@images/vector-icon/crown-gold.svg';
import like from '@images/like-icon/small-active.svg';
import profile from '@images/profile-icon/member.svg';
import link from '@images/arrow-icon/no-stick/black.svg';
import { Divider } from '@/shared/components/Divider';

interface ListItemsProps {
  rank: string;
  user: { nickname: string };
  likeCount: number;
}

export const ListItems: React.FC<ListItemsProps> = ({
  rank,
  user,
  likeCount,
}) => {
  return (
    <div className="flex-col ">
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-6">
          <div className="h-fit flex items-center gap-0.5  bg-custom-gray-800 rounded-2xl py-[2px] px-2 text-custom-yellow-brand M-14-0">
            <div className="w-4 h-4 flex items-center">
              <Image src={crown} alt="crown" />
            </div>
            <div>{rank}</div>
          </div>
          <div className="flex gap-1">
            <Image src={profile} alt="profile" />
            <div className="flex-col gap-0.5">
              {user.nickname}
              <div>전문가</div>
            </div>
          </div>
        </div>

        <div className="flex gap-[42px]">
          <div className="flex gap-1">
            <Image src={like} alt="like" />
            <div>{likeCount}</div>
          </div>
          <div className="flex gap-0.5 justify-center items-center">
            <div>작업물 보기</div>
            <div className="w-4 h-4 justify-center items-center">
              <Image src={link} alt="link" />
            </div>
          </div>
        </div>
      </div>
      <Divider className="my-3 bg-gray-200" />
    </div>
  );
};
