import dayjs from '@/lib/utill';
import timerIcon from '@images/deadLine-icon/small.svg';
import personIcon from '@images/person-icon/small.svg';
import Image from 'next/image';
import { ChallengeUser } from '@/types';
import { Chip } from '@shared/components/chip/chip';
import { JSX, useState } from 'react';
import ModalList from '@/shared/components/modal';
import { useDeleteChallenge } from '@/api/challenge/ChallengeHooks';

interface Props {
  data: ChallengeUser;
}

export const MiniCard = ({ data }: Props) => {
  const challenge = data.challenge;

  const maxParticipant =
    challenge.maxParticipants === challenge.currentParticipants;

  const { deleteMutation } = useDeleteChallenge(challenge.id);

  const [modalOpen, setModalOpen] = useState(false);

  const handleCancelClick = () => {
    setModalOpen(true);
  };

  const handleConfirmClick = () => {
    deleteMutation.mutate();
    setModalOpen(false);
  };

  const StatusCancel: Record<string, JSX.Element> = {
    PENDING: (
      <button
        className="w-[139px] h-[43px] bg-white border border-[#d4d4d4] rounded-md text-[#737373] cursor-pointer hover:bg-custom-gray-100"
        onClick={handleCancelClick}
      >
        취소하기
      </button>
    ),
  };

  return (
    <div className="w-full flex flex-col border-b border-[#E5E5E5] mb-4 space-y-4">
      <p className="text-2xl font-semibold">{challenge.title}</p>
      <div className="flex flex-col gap-4 ">
        {maxParticipant ? (
          <div className="flex justify-between items-center">
            <Chip label={challenge.documentType} />
            {StatusCancel[challenge.approvalStatus] ?? null}
          </div>
        ) : (
          ''
        )}
        <div className="flex justify-between items-center">
          <div className="flex gap-1.5">
            <Chip label={challenge.field} />
            <Chip label={challenge.documentType} />
          </div>
          {StatusCancel[challenge.approvalStatus] ?? null}
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

      <ModalList.ConfirmCancel
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmClick}
        onCancel={() => setModalOpen(false)}
      >
        <p className="text-center">정말로 챌린지를 취소하시겠습니까?</p>
      </ModalList.ConfirmCancel>
    </div>
  );
};
