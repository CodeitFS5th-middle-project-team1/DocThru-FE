import type { Notification } from './notification.types';
export async function fetchNotifications(userId: string) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  console.log('🔗 BASE_URL:', BASE_URL);
  console.log('🧑 userId:', userId);

  const url = `${BASE_URL}/notifications?userId=${userId}`;
  console.log('📡 요청 URL:', url);

  const res = await fetch(url, {
    cache: 'no-store',
    credentials: 'include',
  });

  if (!res.ok) {
    console.error('❌ 응답 실패 상태:', res.status, res.statusText);
    throw new Error('Failed to fetch notifications');
  }

  return res.json();
}
