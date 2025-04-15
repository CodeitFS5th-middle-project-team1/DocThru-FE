'use client';
import Image from 'next/image';
import selectorIcon from '@images/menu-icon/Meatballs.svg';
import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '@/api/auth/AuthStore';
import SendModal from '../modal/send';

export const CardSelector = ({
  onEdit,
  onDelete,
  disableDeleteModal = false,
}: {
  onEdit: () => void;
  onDelete: (reason: string) => void;
  disableDeleteModal?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { user } = useAuthStore();
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleAction = (callback: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    callback();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!user) return null;

  return (
    <>
      <div className="relative w-6 h-6 cursor-pointer" ref={modalRef}>
        <Image
          src={selectorIcon}
          alt="selector Icon"
          className="absolute right-0"
          onClick={toggleMenu}
        />
        {isOpen && (
          <ul className="absolute  right-0 top-7 text-nowrap bg-white border border-custom-gray-300 rounded-xl z-10 text-sm">
            <li
              onClick={handleAction(onEdit)}
              className="py-3 px-11 text-custom-gray-500 border-b-1 border-custom-gray-300 cursor-pointer "
            >
              수정하기
            </li>
            <li
              onClick={(e) => {
                e.stopPropagation();
                if (disableDeleteModal) {
                  onDelete('');
                  setIsOpen(false);
                } else {
                  setIsDeleteModalOpen(true);
                  setIsOpen(false);
                }
              }}
              className="py-3 px-11 text-custom-gray-500  cursor-pointer "
            >
              삭제하기
            </li>
          </ul>
        )}
      </div>

      {isDeleteModalOpen && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (e.nativeEvent.stopImmediatePropagation) {
              e.nativeEvent.stopImmediatePropagation();
            }
          }}
        >
          <SendModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onSend={(reason) => {
              onDelete(reason);
              setIsDeleteModalOpen(false);
            }}
            title="삭제 사유"
            placeholder="삭제 사유를 입력해주세요"
          />
        </div>
      )}
    </>
  );
};
