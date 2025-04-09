import type {
  Notification,
  CreateNotificationPayload,
} from './notification.types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

//알림 목록 조회
export async function fetchNotifications(
  userId: string
): Promise<Notification[]> {
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

export async function createNotification(
  payload: CreateNotificationPayload
): Promise<Notification> {
  const res = await fetch(`${BASE_URL}/notifications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('❌ 알림 생성 실패:', errorText);
    throw new Error('Failed to create notification');
  }

  return res.json();
}
