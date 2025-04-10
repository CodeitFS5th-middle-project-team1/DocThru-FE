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

const Status: NextPage<Props> = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState<ApprovalStatus>(
    data.challenge.approvalStatus
  );
  const [reason, setReason] = useState(data.challenge.rejectedReason || '');

  const handleReject = () => {
    setModalOpen(true);
  };

  const onConfirm = async () => {
    try {
      await approveChallenge(data.challenge.id);
      setStatus(ApprovalStatus.APPROVED);
    } catch (error) {
      console.error('승인 실패:', error);
    }
  };

  const handleSendReject = async (text: string) => {
    try {
      await rejectChallenge(data.challenge.id, text); // ✅ data.id 전달
      setReason(text);
      setStatus(ApprovalStatus.REJECTED);
      setModalOpen(false);
    } catch (error) {
      console.error('거절 실패:', error);
    }
  };

  console.log('data', data);
  console.log('status', status);
  console.log('reason', reason);

  const StatusComponent: Record<string, JSX.Element> = {
    REJECTED: (
      <div className="w-full h-[35px] bg-[#FFF0F0] flex justify-center items-center mt-6 mb-4 rounded-[17.5px] text-[#e54946] text-[16px] font-semibold">
        신청이 거절되었습니다.
      </div>
    ),
    PENDING: (
      <div className="w-full h-[35px] bg-[#FFFDE7] flex justify-center items-center mt-6 mb-4 rounded-[17.5px] text-[#F2BC00] text-[16px] font-semibold">
        승인 대기 중인 챌린지입니다.
      </div>
    ),
    DELETED: (
      <div className="w-full h-[35px] bg-[#737373] flex justify-center items-center mt-6 mb-4 rounded-[17.5px] text-[#FAFAFA] text-[16px] font-semibold">
        삭제된 챌린지입니다.
      </div>
    ),
  };

  const StatusReason: Record<string, JSX.Element> = {
    DELETED: (
      <div>
        <div className="w-full h-[117px] rounded-[16px] mb-4 border border-[#e5e5e5] bg-[#fafafa]">
          <div className="flex justify-center mt-[13px] mb-[10px] font-semibold text-[14px] text-[#262626]">
            삭제 사유
          </div>
          <div className="flex justify-center text-[#404040]">{reason}</div>
          <div className="flex justify-end m-[14px] text-[14px] font-normal">
            <div className="text-[#404040]">{data.challenge.user.nickname}</div>
            <div className="mx-[8px] text-[#E5E5E5]">|</div>
            <div className="text-[#737373]">{data.challenge.createdAt}</div>
          </div>
        </div>
        <div className="border border-[#e5e5e5] mb-4 w-full"></div>
      </div>
    ),
    PENDING: <div className="hidden"></div>,
    REJECTED: (
      <div>
        <div className="w-full h-[117px] rounded-[16px] mb-4 border border-[#e5e5e5] bg-[#fafafa]">
          <div className="flex justify-center mt-[13px] mb-[10px] font-semibold text-[14px] text-[#262626]">
            신청 거절 사유
          </div>
          <div className="flex justify-center text-[#404040]">{reason}</div>
          <div className="flex justify-end m-[14px] text-[14px] font-normal">
            <div className="text-[#404040]">{data.challenge.user.nickname}</div>
            <div className="mx-[8px] text-[#E5E5E5]">|</div>
            <div className="text-[#737373]">{data.challenge.createdAt}</div>
          </div>
        </div>
        <div className="border border-[#e5e5e5] mb-4 w-full"></div>
      </div>
    ),
  };

  const StatusBottom: Record<ApprovalStatus, JSX.Element> = {
    DELETED: <div className="hidden"></div>,
    PENDING: (
      <div className="flex justify-center space-x-2">
        <button
          onClick={handleReject}
          className="w-22.5 h-10 bg-white text-custom-gray-800 rounded-xl border border-custom-gray-800 hover:bg-custom-gray-100"
        >
          거절하기
        </button>
        <button
          onClick={onConfirm}
          className="w-22.5 h-10 bg-custom-gray-800 text-white rounded-xl hover:bg-custom-gray-700"
        >
          승인하기
        </button>
      </div>
    ),
    REJECTED: <div className="hidden"></div>,
    APPROVED: <div className="hidden"></div>,
  };

  return (
    <>
      {StatusComponent[status] ?? null}
      {StatusReason[status] ?? null}
      {StatusBottom[status] ?? null}

      <ModalList.Send
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSend={handleSendReject}
        title="거절 사유 작성"
        placeholder="거절 사유를 입력해주세요"
      />
    </>
  );
};

export default Status;
