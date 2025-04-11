'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import admin from '@/shared/Img/profile-icon/admin.svg';
import member from '@/shared/Img/profile-icon/member.svg';
import { useAuthStore, useHydrated } from '@/api/auth/AuthStore';
import { useLogout } from '@/api/auth/AuthHook';
import Link from 'next/link';
import { PATH } from '@/constants';

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();
  const logout = useLogout();
  const hasHydrated = useHydrated();

  const profileIcon = user?.role === 'ADMIN' ? admin : member;
  const isAdmin = user?.role === 'ADMIN';

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

  if (!hasHydrated) return null;
  if (!user) return null;

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
        <div className="absolute right-0 mt-2 min-w-[10rem] max-w-[16rem] bg-white border rounded-xl shadow-lg p-4 z-50">
          <div className="flex items-center gap-3 mb-3">
            <Image src={profileIcon} alt="사용자" width={36} height={36} />
            <div className="flex flex-col overflow-hidden">
              <p
                className="text-sm font-semibold truncate"
                title={user.nickname}
              >
                {user.nickname}
              </p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
          <hr className="my-2" />
          <div className="flex flex-col gap-2 items-start">
            {!isAdmin && (
              <Link
                href={PATH.myChallenge}
                className="text-sm text-gray-600 hover:text-black"
              >
                나의 챌린지
              </Link>
            )}

            <button
              onClick={logout}
              className="text-sm text-gray-600 hover:text-black cursor-pointer"
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
