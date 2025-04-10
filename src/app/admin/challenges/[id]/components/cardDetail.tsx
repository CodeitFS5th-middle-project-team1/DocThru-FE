import dayjs from '@/lib/utill';
import timerIcon from '@images/deadLine-icon/small.svg';
import personIcon from '@images/person-icon/small.svg';
import Image from 'next/image';
import { ChallengeUser } from '@/types';
import { Chip } from '@shared/components/chip/chip';

interface Props {
  data: ChallengeUser;
}

export const MiniCard = ({ data }: Props) => {
  const challenge = data.challenge;
  const maxParticipant =
    challenge.maxParticipants === challenge.currentParticipants;

  return (
    <div className="w-full flex flex-col border-b border-[#E5E5E5] mb-4 space-y-4">
      <p className="text-2xl font-semibold">{challenge.title}</p>
      <div className="flex flex-col gap-4 ">
        {maxParticipant ? (
          <div className="flex">
            <Chip label={challenge.documentType} />
          </div>
        ) : (
          ''
        )}
        <div className="flex gap-1.5 ">
          <Chip label={challenge.field} />
          <Chip label={challenge.documentType} />
        </div>
      </div>
      <div>{challenge.description}</div>
      <div className="flex items-center w-full gap-1 mb-4">
        <Image src={timerIcon} alt="deadLine Icon" width={16} height={16} />
        <p className="text-sm font-normal text-custom-gray-600">
          {dayjs(challenge.deadline).format('YYYY년 M월 D일')} 마감
        </p>
        <Image src={personIcon} alt="person Icon" width={16} height={16} />
        <p className="text-sm font-normal text-custom-gray-600">
          {challenge.currentParticipants}/{challenge.maxParticipants}
        </p>
      </div>
    </div>
  );
};
