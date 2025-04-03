import { NextPage } from 'next';
import { JSX } from 'react';

interface Props {
  status: string;
  reason: string;
  name: string;
  time: string;
}

const Status: NextPage<Props> = ({ status, reason, name, time }) => {
  const StatusComponent: Record<string, JSX.Element> = {
    del: (
      <div className="w-[890px] h-[35px] bg-[#FFF0F0] flex justify-center items-center mt-6 mb-4 rounded-[17.5px] text-[#e54946] text-[16px] font-semibold">
        삭제된 챌린지입니다.
      </div>
    ),
    PENDING: (
      <div className="w-[890px] h-[35px] bg-[#FFF0F0] flex justify-center items-center mt-6 mb-4 rounded-[17.5px] text-[#e54946] text-[16px] font-semibold">
        승인 대기 중인 챌린지입니다.
      </div>
    ),
    REJECTED: (
      <div className="w-[890px] h-[35px] bg-[#FFF0F0] flex justify-center items-center mt-6 mb-4 rounded-[17.5px] text-[#e54946] text-[16px] font-semibold">
        거절된 챌린지입니다.
      </div>
    ),
  };

  const StatusReason: Record<string, JSX.Element> = {
    del: (
      <div className="text-red-500">
        <div>삭제된 챌린지입니다.</div>
        <div>{reason}</div>
      </div>
    ),
    PENDING: <div className="hidden"></div>,
    REJECTED: (
      <div>
        <div className="w-[890px] h-[117px] rounded-[16px] mb-4 border border-[#e5e5e5] bg-[#fafafa]">
          <div className="flex justify-center mt-[13px] mb-[10px] font-semibold text-[14px] text-[#262626]">
            삭제된 챌린지입니다.
          </div>
          <div className="flex justify-center text-[#404040]">{reason}</div>
          <div className="flex justify-end m-[14px] text-[14px] font-normal">
            <div className="text-[#404040]">{name}</div>
            <div className="mx-[8px] text-[#E5E5E5]">|</div>
            <div className="text-[#737373]">{time}</div>
          </div>
        </div>
        <div className="border border-[#e5e5e5] mb-4 w-[890px]"></div>
      </div>
    ),
  };

  return (
    <>
      {StatusComponent[status] ?? null}
      {StatusReason[status] ?? null}
    </>
  );
};

export default Status;
