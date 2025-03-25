'use client';
import Logo from '@/shared/Img/logo.svg';
import Image from 'next/image';
import Member from '@/shared/Img/profile-icon/member.svg';
import admin from '@/shared/Img/profile-icon/admin.svg';
import BassBell from '@/shared/Img/bell-icon/bass.svg';

interface HeaderProps {
  isLogin: string | null;
  role: string | null;
  onLogin: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isLogin,
  role,
  onLogin,
  onLogout,
}) => {
  const ImageStyle = 'cursor-pointer';
  return (
    <div className="max-w-[1200px] w-full h-15 bg-white flex items-center justify-between md:px-6 px-4  lg:py-[14px]">
      <Image
        className={ImageStyle}
        width={120}
        height={27}
        src={Logo}
        alt="logo"
      />
      {!isLogin ? (
        <button
          onClick={onLogin}
          className="px-6 py-[10px] cursor-pointer border-solid border-[1px] rounded-xl"
        >
          로그인
        </button>
      ) : role !== 'admin' ? (
        <div className="flex items-center gap-4">
          <Image
            className={ImageStyle}
            src={Member}
            alt="member"
            onClick={onLogout}
          />
          <Image className={ImageStyle} src={BassBell} alt="bell" />
        </div>
      ) : (
        <Image
          className={ImageStyle}
          src={admin}
          alt="admin"
          onClick={onLogout}
        />
      )}
    </div>
  );
};

export default Header;
