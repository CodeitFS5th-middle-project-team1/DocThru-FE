import type {
  Notification,
  CreateNotificationPayload,
} from './notification.types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

//알림 목록 조회
export async function fetchNotifications(
  userId: string
): Promise<Notification[]> {
  const url = `${BASE_URL}/notifications?userId=${userId}`;

  const res = await fetch(url, {
    cache: 'no-store',
    credentials: 'include',
  });

  if (!res.ok) {
    //  console.error(' 응답 실패 상태:', res.status, res.statusText);
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
    throw new Error('Failed to create notification');
  }

  return res.json();
}
