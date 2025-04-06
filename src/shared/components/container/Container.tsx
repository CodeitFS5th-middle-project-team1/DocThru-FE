import timerIcon from '@images/deadLine-icon/small.svg';
import personIcon from '@images/person-icon/small.svg';
import Image from 'next/image';

import dayjs from '@/lib/utill';
import { ButtonHTMLAttributes } from 'react';
import Button, { ButtonCategory } from '../button/Button';

export interface ContainerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  originUrl: string;
  deadLine: string;
  currentParticipants: number;
  maxParticipants: number;
}

export const Container = ({
  originUrl,
  deadLine,
  currentParticipants,
  maxParticipants,
  ...props
}: ContainerProps) => {
  const overDeadLine = dayjs(deadLine).isBefore(dayjs());
  const maxParticipant = maxParticipants === currentParticipants;
  console.log(
    'category',
    overDeadLine,
    maxParticipant,
    overDeadLine || maxParticipant
  );
  return (
    <div className="flex flex-col justify-center items-center rounded-2xl border-2 border-custom-gray-100 gap-4 px-4 py-6 w-96 md:w-64 xl:w-72 ">
      <section className="flex justify-center items-center w-full gap-1">
        <Image src={timerIcon} alt="deadLine Icon" width={16} height={16} />
        <p className="text-sm font-normal text-custom-gray-600">
          {dayjs(deadLine).format('YYYY년 M월 D일')} 마감
        </p>
        <Image src={personIcon} alt="person Icon" width={16} height={16} />
        <p className="text-sm font-normal text-custom-gray-600">
          {currentParticipants}/{maxParticipants}
        </p>
      </section>

      <section className="flex  md:flex-col md:items-center gap-3">
        <div className="flex w-40 md:w-56 xl:w-60 ">
          <Button
            category={ButtonCategory.VIEW_ORIGINAL}
            size="text-center py-2"
            href={originUrl}
          >
            원본 보기
          </Button>
        </div>
        <div className="flex w-40 md:w-56 xl:w-60">
          <Button
            category={
              overDeadLine || maxParticipant
                ? ButtonCategory.DISABLE
                : ButtonCategory.TO_DO_WORK
            }
            size="text-center py-3"
            disabled={overDeadLine || maxParticipant}
            {...props}
          >
            작업 도전하기
          </Button>
        </div>
      </section>
    </div>
  );
};
