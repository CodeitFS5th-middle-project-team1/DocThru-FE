'use client';

// import { useRouter } from 'next/navigation';
//import { useAuth } from '@/core/contexts/AuthProvider'; // 경로 확인 필요
import AdminHeader from '@/shared/components/layout/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //  const router = useRouter();
  // const { handleLogout } = useAuth();

  // 관리자 권한 체크 - >  로그인시 관리자인 경우 관리자 목록으로 리다이렉트하도록 설정 필요할듯
  // if (isLogin && role !== 'ADMIN') {
  //   // 클라이언트 측에서 리다이렉트 처리
  //   router.replace('/main/challenge');
  //   return null;
  // }

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      {/* <AdminHeader onLogout={handleLogout} /> */}
      <AdminHeader />
      <div className="max-w-[1200px] w-full h-full">{children}</div>
    </div>
  );
}
