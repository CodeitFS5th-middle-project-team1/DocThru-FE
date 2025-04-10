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
  userId: string
): Promise<Notification[]> {
  const res = await fetch(`${BASE_URL}/notifications?userId=${userId}`, {
    cache: 'no-store',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch notifications');
  return res.json();
}
