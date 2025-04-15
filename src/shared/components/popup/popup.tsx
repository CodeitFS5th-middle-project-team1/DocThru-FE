import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Notification } from '@/api/notification/notification.api';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onDelete: (id: number) => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, notifications, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-6 z-50">
      <div className="relative bg-white rounded-xl border-2 border-custom-gray-300 shadow-lg py-3 m-4 w-90 max-h-115">
        <div className="flex justify-between items-center pb-2 mb-2">
          <h3 className="text-lg font-bold px-4 ">알림</h3>
        </div>
        <div className="max-h-[390px] overflow-y-auto custom-scrollbar">
          {notifications.length === 0 ? (
            <p className="text-gray-500 px-3 ">알림이 없습니다.</p>
          ) : (
            <AnimatePresence>
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    x: 100,
                    scale: 0.95,
                    filter: 'blur(2px)',
                    position: 'absolute',
                  }}
                  transition={{ duration: 0.7 }}
                  className="px-3 mb-3 border-b py-2"
                >
                  <p className="text-gray-800">{notification.message}</p>
                  <div className="flex justify-between px-2">
                    <p className="text-gray-400 text-sm mt-2 ml-1">
                      {new Date(notification.createdAt).toLocaleString(
                        'ko-KR',
                        {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        }
                      )}
                    </p>
                    <button
                      onClick={() => onDelete(notification.id)}
                      className="underline ml-1 text-[13px] text-gray-500 hover:text-red-500 cursor-pointer"
                    >
                      삭제
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
