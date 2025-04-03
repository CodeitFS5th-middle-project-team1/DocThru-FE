import dayjs from '@/lib/utill';
import timerIcon from '@images/deadLine-icon/small.svg';
import personIcon from '@images/person-icon/small.svg';
import Image from 'next/image';
import { DocumentType, FieldType } from '@/types';
import { Chip } from '@shared/components/chip/chip';

export interface MiniCardProps {
  info: {
    title: string;
    DocumentType: DocumentType;
    FieldType: FieldType;
    deadLine: string;
    content: string;
    currentParticipants: number;
    maxParticipants: number;
  };
}

export const MiniCard = ({ info }: MiniCardProps) => {
  const {
    title,
    DocumentType,
    FieldType,
    deadLine,
    content,
    currentParticipants,
    maxParticipants,
  } = info;

  const maxParticipant = maxParticipants === currentParticipants;

  return (
    <div className="w-[890px] flex flex-col border-b border-[#E5E5E5] mb-4 space-y-4">
      <p className="">{title}</p>
      <div className="flex flex-col gap-4 ">
        {maxParticipant ? (
          <div className="flex">
            <Chip label={DocumentType} />
          </div>
        ) : (
          ''
        )}
        <div className="flex gap-1.5 ">
          <Chip label={FieldType} />
          <Chip label={DocumentType} />
        </div>
      </div>
      <div>{content}</div>
      <div className="flex items-center w-full gap-1 mb-4">
        <Image src={timerIcon} alt="deadLine Icon" width={16} height={16} />
        <p className="text-sm font-normal text-custom-gray-600">
          {dayjs(deadLine).format('YYYY년 M월 D일')} 마감
        </p>
        <Image src={personIcon} alt="person Icon" width={16} height={16} />
        <p className="text-sm font-normal text-custom-gray-600">
          {currentParticipants}/{maxParticipants}
        </p>
      </div>
    </div>
  );
};
