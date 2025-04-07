'use client';
import Logo from '@/shared/Img/logo.svg';
import Image from 'next/image';
import Member from '@/shared/Img/profile-icon/member.svg';
import admin from '@/shared/Img/profile-icon/admin.svg';
import BassBell from '@/shared/Img/bell-icon/bass.svg';
import { Divider } from '../Divider';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants';
import { useAuthStore, useHydrated } from '@/api/auth/AuthStore';
import { TextPosition } from '../tab/Tab';
import { TabGroup } from '../tab/TabGroup';
import ProfileDropdown from '../dropdown/ProfileDropdown';
import { useState } from 'react';

const Header = () => {
  const [activeTab, setActiveTab] = useState('management');
  const router = useRouter();
  const { user } = useAuthStore();
  const hasHydrated = useHydrated();

  if (!hasHydrated) return null;

  const ImageStyle = 'cursor-pointer';

  const TAB_LIST = [
    { key: 'management', label: '챌린지 관리' },
    { key: 'inventory', label: '챌린지 목록' },
  ];

  const handleTabChange = (key: string) => {
    setActiveTab(key);

    switch (key) {
      case 'management':
        router.push(PATH.challenge);
        break;
      case 'inventory':
        router.push(PATH.challenge);
        break;
      default:
        router.push(PATH.main);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="max-w-[1200px] w-full h-15 bg-white flex items-center justify-between md:px-6 px-4  lg:py-[14px]">
        <div className="flex gap-6">
          <Image
            className={ImageStyle}
            width={120}
            height={27}
            src={Logo}
            alt="logo"
            onClick={() => router.push(PATH.main)}
          />
          <TabGroup
            items={TAB_LIST}
            activeKey={activeTab}
            onTabChange={handleTabChange}
            position={TextPosition.TOP}
          />
        </div>
        {!user ? (
          <button
            onClick={() => router.push(PATH.login)}
            className="px-6 py-[10px] cursor-pointer border-solid border-[1px] rounded-xl"
          >
            로그인
          </button>
        ) : user.role !== 'ADMIN' ? (
          <div className="flex items-center gap-4">
            <Image className={ImageStyle} src={BassBell} alt="bell" />
            <ProfileDropdown />
          </div>
        ) : (
          <ProfileDropdown />
        )}
      </div>

      <Divider />
    </div>
  );
};

export default Header;
