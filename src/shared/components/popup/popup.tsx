import React from 'react';
import Image from 'next/image';
import check from '@images/close-icon/close.svg';

interface Notification {
  message: string;
  date: string;
}

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, notifications }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-end z-50">
      {/* 배경 클릭 시 팝업 닫기 필요없는 것 같아서 일단은 주석처리 */}
      {/* <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} /> */}
      <div className="relative bg-white rounded shadow-lg p-4 m-4 w-80 max-h-116">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-bold">알림</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <Image src={check} alt="팝업 닫기 이미지"></Image>
          </button>
        </div>
        <div className="max-h-60 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-gray-500">알림이 없습니다.</p>
          ) : (
            notifications.map((notification, index) => (
              <div key={index} className="mb-3 border-b pb-2">
                <p className="text-gray-800">{notification.message}</p>
                <p className="text-gray-500 text-sm">{notification.date}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
