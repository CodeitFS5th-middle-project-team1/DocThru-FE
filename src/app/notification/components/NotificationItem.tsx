'use client';
import type { Notification } from '@/lib/notification/notification.types';
export default function NotificationItem({
  notification,
}: {
  notification: Notification;
}) {
  return (
    <li
      className={`border p-4 rounded-md ${notification.isRead ? 'opacity-50' : 'bg-white'}`}
    >
      <p className="font-medium">{notification.message}</p>
      {notification.reason && (
        <p className="text-sm text-red-500">사유: {notification.reason}</p>
      )}
      <p className="text-xs text-gray-400">
        {new Date(notification.createdAt).toLocaleString()}
      </p>
    </li>
  );
}
