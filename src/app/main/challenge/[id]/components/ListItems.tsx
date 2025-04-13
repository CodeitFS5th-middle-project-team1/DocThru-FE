import Image from 'next/image';
import crown from '@images/vector-icon/crown-gold.svg';
import like from '@images/like-icon/small-active.svg';
import profile from '@images/profile-icon/member.svg';
import link from '@images/arrow-icon/no-stick/black.svg';
import { Divider } from '@/shared/components/Divider';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants';

interface ListItemsProps {
  id: string;
  rank: number;
  user: { nickname: string };
  likeCount: number;
  size: number;
  challengeId: string;
}

export const ListItems: React.FC<ListItemsProps> = ({
  id,
  rank,
  user,
  likeCount,
  size,
  challengeId,
}) => {
  const router = useRouter();
  return (
    <div className="flex-col">
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-6">
          <div className="w-[51px] h-[21px] flex items-center justify-center gap-0.5  bg-custom-gray-800 rounded-2xl py-[2px] px-2 text-custom-yellow-brand M-14-0">
            {rank === 0 && (
              <div className="w-4 h-4 flex items-center">
                <Image src={crown} alt="crown" />
              </div>
            )}
            <div>0{rank + 1}</div>
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
            <div>
              {likeCount > 9999 ? '9,999...' : likeCount.toLocaleString()}
            </div>
          </div>
          <div
            onClick={() => {
              if (id)
                router.push(
                  `${PATH.translation}/${id}?challengeId=${challengeId}`
                );
            }}
            className="flex gap-0.5 justify-center items-center cursor-pointer"
          >
            <div>작업물 보기</div>
            <div className="w-4 h-4 flex justify-center items-center">
              <Image src={link} alt="link" />
            </div>
          </div>
        </div>
      </div>
      {rank !== size - 1 && <Divider className="my-3 bg-gray-200" />}
    </div>
  );
};
