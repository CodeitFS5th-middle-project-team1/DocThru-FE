import timerIcon from '@images/deadLine-icon/small.svg';
import personIcon from '@images/person-icon/small.svg';
import Image from 'next/image';
import selectorIcon from '@images/menu-icon/Meatballs.svg';
import dayjs from '@/lib/utill';
import { DocumentType, FieldType } from '@/types';
import { Chip } from '../chip/chip';
import Button, { BGColor, ButtonBorder, ButtonImg } from '../button/Button';

export interface CardProps {
  title: string;
  DocumentType: DocumentType;
  FieldType: FieldType;
  deadLine: string;
  currentParticipants: number;
  maxParticipants: number;
  href: string;
}

export const Card = ({
  title,
  DocumentType,
  FieldType,
  deadLine,
  currentParticipants,
  maxParticipants,
  href,
}: CardProps) => {
  const maxParticipant = maxParticipants === currentParticipants;

  return (
    <div className="flex flex-col w-full justify-center items-center rounded-2xl border-2 border-custom-gray-800 gap-4 p-6 ">
      <section className="flex w-full justify-between relative">
        <div className="flex flex-col gap-4 ">
          {maxParticipant ? (
            <div className="flex">
              <Chip label={DocumentType} />
            </div>
          ) : (
            ''
          )}
          <p className="text-xl text-custom-gray-700 font-bold">{title}</p>
          <div className="flex gap-1.5 ">
            <Chip label={FieldType} />
            <Chip label={DocumentType} />
          </div>
        </div>
        <Image
          src={selectorIcon}
          alt="selector Icon"
          className="absolute right-0"
        />
      </section>

      <section className="flex w-full justify-between pt-4  border-t border-custom-gray-200">
        <div className="flex items-center w-full gap-1">
          <Image src={timerIcon} alt="deadLine Icon" width={16} height={16} />
          <p className="text-sm font-normal text-custom-gray-600">
            {dayjs(deadLine).format('YYYY년 M월 D일')} 마감
          </p>
          <Image src={personIcon} alt="person Icon" width={16} height={16} />
          <p className="text-sm font-normal text-custom-gray-600">
            {currentParticipants}/{maxParticipants}
          </p>
        </div>
        <div className="flex w-40 ">
          <Button
            border={ButtonBorder.ROUND_BORDER}
            bgColor={BGColor.WHITE}
            icon={ButtonImg.CONTINUE}
            href={href}
          >
            도전 계속하기
          </Button>
        </div>
      </section>
    </div>
  );
};
