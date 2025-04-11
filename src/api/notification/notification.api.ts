export type Notification = {
  id: number;
  userId: string;
  category: 'challenge' | 'translation' | 'feedback' | 'admin';
  type: 'created' | 'updated' | 'deleted' | 'approved' | 'rejected' | 'closed';
  message: string;
  isRead: boolean;
  createdAt: string;
  challengeId?: number;
  translationId?: number;
  feedbackId?: number;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchNotifications(
  userId?: string
): Promise<Notification[]> {
  const url = userId
    ? `${BASE_URL}/notifications?userId=${userId}` // userId 있으면 쿼리로 붙임
    : `${BASE_URL}/notifications`; // 없으면 기본 경로 사용

  const res = await fetch(url, {
    cache: 'no-store',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('알림 fetch 실패');
  return res.json();
}

export const deleteNotification = async (id: number) => {
  const res = await fetch(`${BASE_URL}/notifications/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('알림 삭제 실패');
  }
};
