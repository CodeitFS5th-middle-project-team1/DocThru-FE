'use client';

import Popup from '@/shared/components/popup/popup';
import BassBell from '@/shared/Img/bell-icon/bass.svg';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Notification } from '@/lib/notification/notification.types';
import { fetchNotifications } from '@/lib/notification/notification.api';
interface Props {
  userId: string;
}

const NotificationBell = ({ userId }: Props) => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!userId) return;

    fetchNotifications(userId)
      .then((data) => {
        console.log('알림:', data);
        setNotifications(data);
      })
      .catch((err) => console.error('알림 불러오기 실패:', err));
  }, [userId]);

  return (
    <div className="relative">
      <Image
        className="cursor-pointer"
        src={BassBell}
        alt="bell"
        onClick={() => setOpen((prev) => !prev)}
      />
      <Popup
        isOpen={open}
        onClose={() => setOpen(false)}
        notifications={notifications}
      />
    </div>
  );
};

export default NotificationBell;
