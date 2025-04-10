import ModalList from '@/shared/components/modal';
import { ChallengeUser } from '@/types';
import { NextPage } from 'next';
import { JSX, useState } from 'react';
import { ApprovalStatus } from '@/types';
import {
  approveChallenge,
  rejectChallenge,
} from '@/api/challenge/ChallengeApi';

interface Props {
  data: ChallengeUser;
}

const StatusBottom: NextPage<Props> = ({ data }) => {
  const challenge = data.challenge;
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState<ApprovalStatus>(
    challenge.approvalStatus
  );
  const [_reason, setReason] = useState(challenge.rejectedReason || '');

  const handleRejectClick = () => {
    setModalOpen(true);
  };

  const handleApproveClick = async () => {
    try {
      await approveChallenge(challenge.id);
      setStatus(ApprovalStatus.APPROVED);
    } catch (error) {
      console.error('승인 실패:', error);
    }
  };

  const handleRejectSubmit = async (text: string) => {
    try {
      await rejectChallenge(challenge.id, text);
      setReason(text);
      setStatus(ApprovalStatus.REJECTED);
      setModalOpen(false);
    } catch (error) {
      console.error('거절 실패:', error);
    }
  };

  const StatusBottom: Record<ApprovalStatus, JSX.Element> = {
    DELETED: <div className="hidden"></div>,
    PENDING: (
      <div>
        <div className="border-t border-[#E5E5E5] my-6"></div>
        <div className="flex justify-end">
          <button
            onClick={handleRejectClick}
            className="w-38 h-12 mr-3 bg-[#FFE7E7] text-[#F24744] rounded-xl hover:bg-[#f8d3d3]"
          >
            거절하기
          </button>
          <button
            onClick={handleApproveClick}
            className="w-38 h-12 bg-custom-gray-800 text-white rounded-xl hover:bg-custom-gray-700"
          >
            승인하기
          </button>
        </div>
      </div>
    ),
    REJECTED: <div className="hidden"></div>,
    APPROVED: <div className="hidden"></div>,
  };

  return (
    <>
      {StatusBottom[status]}

      <ModalList.Send
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSend={handleRejectSubmit}
        title="거절 사유 작성"
        placeholder="거절 사유를 입력해주세요"
      />
    </>
  );
};

export default StatusBottom;
