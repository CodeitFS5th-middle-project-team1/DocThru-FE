'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import admin from '@/shared/Img/profile-icon/admin.svg';
import member from '@/shared/Img/profile-icon/member.svg';
interface Props {
  nickname: string;
  role: string; // 어드민 or 일반 사용자
  onLogout: () => void;
}

const ProfileDropdown: React.FC<Props> = ({ nickname, role, onLogout }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  //console.log('[ProfileDropDown] role 값:', role);
  //이거 콘솔로그가 브라우저랑 서버에 다른값이 찍힘 -> 하이드레이션 문제(?)
  const profileIcon = role === '어드민' ? admin : member; //'어드민' 하드코딩 괜찮은지? 나중에 수정 필요할수도

  //드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <Image
        className="cursor-pointer"
        src={profileIcon}
        alt="프로필아이콘"
        width={36}
        height={36}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute right-0 mt-2 min-w-[12rem] max-w-[16rem] bg-white border rounded-xl shadow-lg p-4 z-50">
          <div className="flex items-center gap-3 mb-3">
            <Image src={profileIcon} alt="사용자" width={36} height={36} />
            <div className="flex flex-col overflow-hidden">
              <p className="text-sm font-semibold truncate" title={nickname}>
                {nickname}
              </p>
              <p className="text-xs text-gray-500">{role}</p>
            </div>
          </div>
          <hr className="my-2" />
          {/* <button
            onClick={onLogout}
            className="text-sm text-gray-600 hover:text-black"
          >
            로그아웃
          </button> */}
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
