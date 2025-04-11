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
  const accessToken = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/notifications?userId=${userId}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  });

  if (!res.ok) throw new Error('알림 fetch 실패');
  return res.json();
}

export const deleteNotification = async (id: number) => {
  const accessToken = localStorage.getItem('accessToken');

  const res = await fetch(`${BASE_URL}/notifications/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('알림 삭제 실패');
  }
};
