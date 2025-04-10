import Image from 'next/image';
import prev from '@images/arrow-icon/no-stick/black.svg';
import next from '@images/arrow-icon/no-stick/gray.svg';
import { Translation } from '@/types';
import { ListItems } from './ListItems';

interface ParticipationProps {
  List: Translation[] | undefined;
  page?: number;
  maxPage?: number;
  handleNextPage?: () => void;
  handlePrevPage?: () => void;
}

export const Participation: React.FC<ParticipationProps> = ({
  List,
  handleNextPage,
  handlePrevPage,
  page,
  maxPage = 0,
}) => {
  return (
    <div className="flex flex-col border-2 border-custom-gray-800 px-6 py-4 rounded-2xl min-h-[165px]">
      <div className="flex justify-between items-center ">
        <div>참여 현황</div>
        {maxPage > 1 && (
          <div className="flex gap-2">
            <div className="bg-custom-gray-50 rounded-[13px] flex items-center py-1 px-[18px]">
              {page} / {maxPage}
            </div>
            <div className="cursor-pointer flex ">
              <div
                className="w-8 h-8 flex justify-center items-center"
                onClick={handlePrevPage}
              >
                <Image src={next} alt="" />
              </div>
              <div
                className="w-8 h-8 flex items-center justify-center"
                onClick={handleNextPage}
              >
                <Image src={prev} alt="" className="cursor-pointer" />
              </div>
            </div>
          </div>
        )}
      </div>
      {List?.map((d, index) => {
        return (
          <ListItems
            size={List.length}
            key={index}
            id={d.id}
            likeCount={d.likeCount}
            rank={index}
            user={d.user}
          />
        );
      })}
      {List?.length === 0 && (
        <div className="flex flex-col pt-4 justify-center items-center R-16-0 text-custom-gray-500">
          <div>아직 참여한 도전자가 없어요,</div>
          <div>지금 바로 도전해보세요!</div>
        </div>
      )}
    </div>
  );
};
