'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import BellIcon from '@/shared/Img/bell-icon/bass.svg';
import {
  fetchNotifications,
  Notification,
} from '@/lib/notification/notification.api';
import Popup from '@/shared/components/popup/popup';

export default function NotificationBell({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!userId) return;
    fetchNotifications(userId)
      .then(setNotifications)
      .catch((err) => console.error('알림 불러오기 실패:', err));
  }, [userId]);

  return (
    <div className="relative">
      <Image
        src={BellIcon}
        alt="bell"
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      <Popup
        isOpen={open}
        onClose={() => setOpen(false)}
        notifications={notifications}
      />
    </div>
  );
}
