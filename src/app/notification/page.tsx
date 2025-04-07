import { fetchNotifications } from '@/lib/notification/notification.api'; // API 호출 함수
import NotificationList from './components/NotificationList'; // 알림 리스트 컴포넌트
import { cookies } from 'next/headers';
import { verifyJwt } from '@/lib/api/auth';
// import { redirect } from 'next/navigation';
export default async function NotificationsPage() {
  const token = (await cookies()).get('accessToken')?.value;
  console.log('토큰:', token);
  const user = token ? verifyJwt(token) : null;
  console.log('JWT에서 추출한 사용자:', user);

  const userId = user?.id;
  console.log('userId:', userId);

  console.log('토큰 존재 여부:', !!token);

  // if (!userId) {
  //   redirect('/auth/login'); // 또는 에러 처리
  // }

  const notifications = userId ? await fetchNotifications(userId) : [];
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">알림</h1>
      <NotificationList notifications={notifications} />
    </main>
  );
}
