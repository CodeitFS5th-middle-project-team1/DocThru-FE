import React from 'react';
//import Image from 'next/image';
//import close from '@images/close-icon/close.svg';
import type { Notification } from '@/lib/notification/notification.types';
// interface Notification {
//   message: string;
//   date: string;
// }

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
}

const Popup: React.FC<PopupProps> = ({ isOpen, notifications }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-6 z-50">
      <div className="relative bg-white rounded shadow-lg p-4 m-4 w-80 max-h-116">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-bold">알림</h3>
          {/* <button onClick={onClose} className="hover:bg-custom-gray-100">
            <Image src={close} alt="모달 닫기 이미지" />
          </button> */}
        </div>
        <div className="max-h-60 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-gray-500">알림이 없습니다.</p>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} className="mb-3 border-b pb-2">
                <p className="text-gray-800">{notification.message}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(notification.createdAt).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
