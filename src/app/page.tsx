'use client';

import { useAuth } from '@/core/contexts/AuthProvider';

export default function Home() {
  const { clearAuth } = useAuth();

  const handleLogout = () => {
    clearAuth();
    window.location.href = '/';
  };
  return (
    <>
      <div className="flex w-full h-10 bg-sky-50">메인 홈페이지</div>
      <div className="flex justify-center w-full">
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </>
  );
}
