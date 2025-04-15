'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import BellIcon from '@/shared/Img/bell-icon/bass.svg';
import {
  fetchNotifications,
  deleteNotification,
  Notification,
} from '@/api/notification/notification.api';
import Popup from '@/shared/components/popup/popup';

export default function NotificationBell({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const bellRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const handleDelete = async (id: number) => {
    try {
      await deleteNotification(id); // 서버 요청
      setNotifications((prev) => prev.filter((n) => n.id !== id)); // 프론트 상태
    } catch (err) {
      console.error('알림 삭제 실패:', err);
    }
  };
  useEffect(() => {
    if (!userId) return;
    fetchNotifications(userId)
      .then(setNotifications)
      .catch((err) => console.error('알림 불러오기 실패:', err));
  }, [userId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={bellRef}>
      <Image
        src={BellIcon}
        alt="bell"
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 py-0.5 rounded-full leading-none">
          {unreadCount}
        </span>
      )}
      <Popup
        isOpen={open}
        onClose={() => setOpen(false)}
        notifications={notifications}
        onDelete={handleDelete}
      />
    </div>
  );
}
