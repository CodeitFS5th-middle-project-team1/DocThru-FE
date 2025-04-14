import Image from 'next/image';
import person from '@shared/Img/person-icon/small-white.svg';
import deadline from '@shared/Img/deadLine-icon/small-white.svg';
interface ChipCardStatusProps {
  status: 'full' | 'done' | '';
  className: string;
}
export const ChipCardStatus: React.FC<ChipCardStatusProps> = ({
  status,
  className,
}) => {
  const chipStatusStyle =
    'M-13-0 w-fit px-3 py-2 rounded-3xl gap-1 flex items-center ';
  return status === 'full' ? (
    <div className={`${chipStatusStyle} bg-custom-gray-200 ${className}`}>
      <Image src={person} alt="person" /> 모집이 완료된 상태에요
    </div>
  ) : status === 'done' ? (
    <div
      className={`${chipStatusStyle} text-white bg-custom-gray-800 ${className}`}
    >
      <Image src={deadline} alt="deadline" /> 챌린지가 마감되었어요
    </div>
  ) : (
    <></>
  );
};
