'use client';
import Logo from '@/shared/Img/logo.svg';
import Image from 'next/image';
import ProfileDropdown from '@/shared/components/dropdown/ProfileDropdown';
import { Divider } from '@/shared/components/Divider';
import { useRouter, usePathname } from 'next/navigation';
// import { PATH } from '@/constants';
import { Tab, TextPosition, TabActive } from '@/shared/components/tab/Tab';
import { useAuth } from '@/core/contexts/AuthProvider';

interface HeaderProps {
  onLogout?: () => void; // 로그아웃 기능 나중에 만들면 선택적으로 사용가능능
}

const AdminHeader: React.FC<HeaderProps> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();
  const ImageStyle = 'cursor-pointer';

  // useAuth에서 필요한 정보 가져옴
  const { user, clearAuth } = useAuth();

  // role과 rank를 조합해서 표시할 상태
  // 이거 한글도 타입으로 만드는게 좋을지?
  const getUserRoleDisplay = () => {
    if (user?.role === 'ADMIN') {
      return '어드민';
    }

    // 일반 사용자인 경우 rank에 따라 구분
    if (user?.rank === 'EXPERT') {
      return '전문가';
    }
    return '일반 사용자';
  };
  const tabs = [
    { label: '챌린지 관리', path: '/admin/challenges' },
    { label: '챌린지 목록', path: '/main/challenge' },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="max-w-[1200px] w-full bg-white flex items-center justify-between md:px-6 px-4 lg:py-[14px] h-[60px]">
        {/* 로고 */}
        <div className="flex items-center gap-12">
          <Image
            className={ImageStyle}
            width={120}
            height={27}
            src={Logo}
            alt="logo"
            onClick={() => router.push('/admin/challenges')} // 로고 클릭시 어디로 이동?
          />

          {/* 탭  */}
          <div className="flex gap-4">
            {tabs.map((tab) => (
              <Tab
                key={tab.path}
                position={TextPosition.TOP}
                isActive={pathname === tab.path ? TabActive.ON : TabActive.OFF}
                onClick={() => router.push(tab.path)}
              >
                {tab.label}
              </Tab>
            ))}
          </div>
        </div>

        {/* 우측 드롭다운 */}
        <ProfileDropdown
          nickname={user?.nickname || '닉네임 없음'} // 사용자 닉네임이 없을 경우
          role={getUserRoleDisplay()}
          onLogout={() => console.log('로그아웃')} // 나중에 로그아웃 기능 추가하면 수정 onLogout={handleLogout}
        />
      </div>
      <Divider />
    </div>
  );
};

export default AdminHeader;
