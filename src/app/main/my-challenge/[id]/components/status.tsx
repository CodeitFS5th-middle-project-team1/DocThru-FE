import { ChallengeUser } from '@/types';
import { NextPage } from 'next';
import { JSX } from 'react';

interface Props {
  data: ChallengeUser;
}

const Status: NextPage<Props> = ({ data }) => {
  console.log('data', data);
  const StatusComponent: Record<string, JSX.Element> = {
    REJECTED: (
      <div className="w-[890px] h-[35px] bg-[#FFF0F0] flex justify-center items-center mt-6 mb-4 rounded-[17.5px] text-[#e54946] text-[16px] font-semibold">
        삭제된 챌린지입니다.
      </div>
    ),
    PENDING: (
      <div className="w-[890px] h-[35px] bg-[#FFFDE7] flex justify-center items-center mt-6 mb-4 rounded-[17.5px] text-[#F2BC00] text-[16px] font-semibold">
        승인 대기 중인 챌린지입니다.
      </div>
    ),
    DELETED: (
      <div className="w-[890px] h-[35px] bg-[#737373] flex justify-center items-center mt-6 mb-4 rounded-[17.5px] text-[#FAFAFA] text-[16px] font-semibold">
        신청이 거절되었습니다.
      </div>
    ),
  };

  const StatusReason: Record<string, JSX.Element> = {
    DELETED: (
      <div>
        <div className="w-[890px] h-[117px] rounded-[16px] mb-4 border border-[#e5e5e5] bg-[#fafafa]">
          <div className="flex justify-center mt-[13px] mb-[10px] font-semibold text-[14px] text-[#262626]">
            삭제 사유
          </div>
          <div className="flex justify-center text-[#404040]">
            {data.deletedReason}
          </div>
          <div className="flex justify-end m-[14px] text-[14px] font-normal">
            <div className="text-[#404040]">{data.user.nickname}</div>
            <div className="mx-[8px] text-[#E5E5E5]">|</div>
            <div className="text-[#737373]">{data.createdAt}</div>
          </div>
        </div>
        <div className="border border-[#e5e5e5] mb-4 w-[890px]"></div>
      </div>
    ),
    PENDING: <div className="hidden"></div>,
    REJECTED: (
      <div>
        <div className="w-[890px] h-[117px] rounded-[16px] mb-4 border border-[#e5e5e5] bg-[#fafafa]">
          <div className="flex justify-center mt-[13px] mb-[10px] font-semibold text-[14px] text-[#262626]">
            신청 거절 사유
          </div>
          <div className="flex justify-center text-[#404040]">
            {data.deletedReason}
          </div>
          <div className="flex justify-end m-[14px] text-[14px] font-normal">
            <div className="text-[#404040]">{data.user.nickname}</div>
            <div className="mx-[8px] text-[#E5E5E5]">|</div>
            <div className="text-[#737373]">{data.createdAt}</div>
          </div>
        </div>
        <div className="border border-[#e5e5e5] mb-4 w-[890px]"></div>
      </div>
    ),
  };

  return (
    <>
      {StatusComponent[data.approvalStatus] ?? null}
      {StatusReason[data.approvalStatus] ?? null}
    </>
  );
};

export default Status;
