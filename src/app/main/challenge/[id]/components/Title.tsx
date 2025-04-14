import { Chip } from '@/shared/components/chip/chip';
import { Container } from '@/shared/components/container/Container';
import { Divider } from '@/shared/components/Divider';
import { Challenge } from '@/types';
import profile from '@images/profile-icon/member.svg';
import menu from '@images/menu-icon/Meatballs.svg';
import deadline from '@images/deadLine-icon/small-white.svg';
import person from '@images/person-icon/small-white.svg';
import Image from 'next/image';
import { useState } from 'react';

interface TitleProps {
  data: Challenge | undefined;
  isSameUser?: boolean;
  challengeId: string;
}

export const Title: React.FC<TitleProps> = ({
  challengeId,
  isSameUser = false,
  data,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="w-full ">
      <div className="w-full flex flex-col gap-6 sm:flex-row justify-center items-center">
        <div className="w-full flex flex-col gap-4">
          {data?.isDeadlineFull && (
            <div className="w-fit flex gap-1 bg-custom-gray-800 rounded-3xl px-4 py-2 text-white items-center M-14-0">
              <Image src={deadline} alt="deadline" /> 모집이 완료된 상태에요
            </div>
          )}
          {data?.isParticipantsFull && (
            <div className="w-fit flex gap-1 bg-custom-gray-200 rounded-3xl px-4 py-2 text-custom-gray-800 items-center M-14-0">
              <Image src={person} alt="person" />
              챌린지가 마감 되었어요
            </div>
          )}
          <div className="flex SB-24-0 justify-between">
            {data?.title}
            {isSameUser && (
              <div className="relative">
                <div
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => setOpenMenu((prev) => !prev)}
                >
                  <Image src={menu} alt="menu" />
                </div>
                {openMenu && (
                  <div className="flex flex-col R-16-0 absolute right-0  whitespace-nowrap z-10">
                    <button className="p-1.5 bg-white rounded-t-lg shadow-md hover: hover:bg-custom-gray-300 transition-colors duration-150 cursor-pointer">
                      수정하기
                    </button>
                    <Divider />
                    <button className="p-1.5 bg-white rounded-b-lg shadow-md hover: hover:bg-custom-gray-300 transition-colors duration-150 cursor-pointer">
                      삭제하기
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-row gap-2">
            <Chip label={data?.documentType} />
            <Chip label={data?.field} />
          </div>
          <div className="">{data?.description}</div>
          <div className="flex gap-2 items-center">
            <Image src={profile} alt="profile" />
            {data?.user.nickname}
          </div>
        </div>
        <Container
          id={challengeId}
          currentParticipants={data?.currentParticipants}
          deadLine={data?.deadline}
          maxParticipants={data?.maxParticipants}
          originUrl={data?.originURL}
        />
      </div>

      <Divider className="bg-custom-gray-100 mt-6" />
    </div>
  );
};
