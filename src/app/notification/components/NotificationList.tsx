'use client';
import type { Notification } from '@/lib/notification/notification.types';
import NotificationItem from './NotificationItem';

interface Props {
  notifications: Notification[];
}

export default function NotificationList({ notifications }: Props) {
  if (notifications.length === 0) {
    return <p className="text-gray-500">알림이 없습니다.</p>;
  }

  return (
    <ul className="space-y-3">
      {notifications.map((n) => (
        <NotificationItem key={n.id} notification={n} />
      ))}
    </ul>
  );
}
