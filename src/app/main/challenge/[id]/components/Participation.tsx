import Image from 'next/image';
import prev from '@images/arrow-icon/no-stick/black.svg';
import next from '@images/arrow-icon/no-stick/gray.svg';
import { Translation } from '@/types';
import { ListItems } from './ListItems';

interface ParticipationProps {
  List: Translation[] | null;
  currentPage: number;
  tatalPage: number;
}

export const Participation: React.FC<ParticipationProps> = ({
  List,
  currentPage,
  tatalPage,
}) => {
  const max = List ? List.length / 5 : 0;
  return (
    <div className="flex flex-col border-2 border-custom-gray-800 px-6 py-4 rounded-2xl">
      <div className="flex justify-between items-center ">
        <div>참여 현황</div>
        <div className="flex gap-2">
          <div className="bg-custom-gray-50 rounded-[13px] flex items-center py-1 px-[18px]">
            {currentPage} / {tatalPage}
          </div>
          <div className="cursor-pointer flex ">
            <div className="w-8 h-8 flex justify-center items-center">
              <Image src={next} alt="" />
            </div>
            <div className="w-8 h-8 flex items-center justify-center">
              <Image src={prev} alt="" className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      {List?.map((d, index) => {
        return (
          <ListItems
            key={index}
            id={d.id}
            likeCount={d.likeCount}
            rank={index}
            user={d.user}
          />
        );
      })}
    </div>
  );
};
