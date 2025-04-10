'use client';

import { useEffect, useState } from 'react';
import {
  fetchNotifications,
  Notification,
  deleteNotification,
} from '@/api/notification/notification.api';

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  //  알림 fetch
  useEffect(() => {
    fetchNotifications()
      .then((data) => {
        //console.log(data);
        setNotifications(data);
      })
      .catch((err) => console.error('알림 불러오기 실패:', err));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error('삭제 실패:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">📬 알림 목록</h1>
      {notifications.length === 0 ? (
        <p className="text-gray-500">알림이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li
              key={n.id}
              className="bg-white border p-4 rounded shadow relative"
            >
              <p className="text-gray-800">{n.message}</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-400">
                  {new Date(n.createdAt).toLocaleString('ko-KR')}
                </p>
                <button
                  onClick={() => handleDelete(n.id)}
                  className="text-[12px] text-gray-400 underline hover:text-red-500"
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
