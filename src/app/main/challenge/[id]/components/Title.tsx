import { Chip } from '@/shared/components/chip/chip';
import { Container } from '@/shared/components/container/Container';
import { Divider } from '@/shared/components/Divider';
import { DocumentType, FieldType } from '@/types';
import profile from '@images/profile-icon/member.svg';
import menu from '@images/menu-icon/Meatballs.svg';
import deadline from '@images/deadLine-icon/small-white.svg';
import person from '@images/person-icon/small-white.svg';
import Image from 'next/image';
import { useState } from 'react';

interface TitleProps {
  title?: string;
  document?: DocumentType;
  field?: FieldType;
  content?: string;
  nickname?: string;
  currentParticipants?: number;
  maxParticipants?: number;
  deadLine?: string;
  originUrl?: string;
  isSameUser?: boolean;
  id: string;
  isParticipantsFull?: boolean;
  isDeadlineFull?: boolean;
}

export const Title: React.FC<TitleProps> = ({
  title = '',
  document = '',
  field = '',
  content = '',
  nickname = '',
  currentParticipants = 0,
  maxParticipants = 0,
  deadLine = '',
  originUrl = '/',
  isSameUser = false,
  isParticipantsFull = false,
  isDeadlineFull = false,
  id = '',
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="w-full ">
      <div className="w-full flex flex-col gap-6 sm:flex-row justify-center items-center">
        <div className="w-full flex flex-col gap-4">
          {isParticipantsFull && (
            <div className="w-fit flex gap-1 bg-custom-gray-800 rounded-3xl px-4 py-2 text-white items-center M-14-0">
              <Image src={deadline} alt="deadline" />
              모집이 완료된 상대에요
            </div>
          )}
          {isDeadlineFull && (
            <div className="w-fit flex gap-1 bg-custom-gray-200 rounded-3xl px-4 py-2 text-custom-gray-800 items-center M-14-0">
              <Image src={person} alt="" /> 챌린지가 마감 되었어요
            </div>
          )}
          <div className="flex SB-24-0 justify-between">
            {title}
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
            <Chip label={document} />
            <Chip label={field} />
          </div>
          <div className="">{content}</div>
          <div className="flex gap-2 items-center">
            <Image src={profile} alt="profile" />
            {nickname}
          </div>
        </div>
        <Container
          currentParticipants={currentParticipants}
          deadLine={deadLine}
          maxParticipants={maxParticipants}
          originUrl={originUrl}
        />
      </div>

      <Divider className="bg-custom-gray-100 mt-6" />
    </div>
  );
};
