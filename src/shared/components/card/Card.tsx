import timerIcon from '@images/deadLine-icon/small.svg';
import personIcon from '@images/person-icon/small.svg';
import Image from 'next/image';
import selectorIcon from '@images/menu-icon/Meatballs.svg';
import dayjs from '@/lib/utill';
import { DocumentType, FieldType } from '@/types';
import { Chip } from '../chip/chip';

import { ChipCardStatus } from '../chip/ChipCardStatus';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants';
import Button, { ButtonCategory } from '../button/Button';

export interface CardProps {
  id: string;
  role: 'base' | 'my' | 'admin';
  status?: 'inProgress' | 'completed';
  title: string;
  DocumentType: DocumentType;
  FieldType: FieldType;
  deadLine: string;
  currentParticipants: number;
  maxParticipants: number;
  href?: string;
  onClick?: () => void;
}

export const Card = ({
  id,
  role,
  status,
  title,
  DocumentType,
  FieldType,
  deadLine,
  currentParticipants,
  maxParticipants,
  href,
  onClick,
}: CardProps) => {
  const maxParticipant = maxParticipants === currentParticipants;
  const overDeadLine = dayjs(deadLine).isBefore(dayjs());
  const router = useRouter();

  const isShowSelector = role === 'my' || role === 'admin';
  const isShowButton = status === 'inProgress' || status === 'completed';

  const handleClick = () => {
    if (onClick) return onClick();
    router.push(`${PATH.challenge}/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col w-full justify-center items-center rounded-2xl border-2 border-custom-gray-800 gap-4 p-6 "
    >
      <section className="flex w-full justify-between relative">
        <div className="flex flex-col gap-4 ">
          {maxParticipant || overDeadLine ? (
            <div className="flex">
              <ChipCardStatus
                status={maxParticipant ? 'full' : 'done'}
                className=""
              />
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
        {isShowSelector && (
          <Image
            src={selectorIcon}
            alt="selector Icon"
            className="absolute right-0"
          />
        )}
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

        {isShowButton && (
          <div className="flex w-40 ">
            <Button
              category={
                status === 'inProgress'
                  ? ButtonCategory.CONTINUE
                  : ButtonCategory.VIEW_ORIGINAL
              }
              href={href}
            >
              {status === 'inProgress' ? '도전 계속하기' : '내 작업물 보기'}
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};
