import React from 'react';
import ModalBase from './modalBase';
import Image from 'next/image';
import check from '@images/modal-icon/check.svg';

interface NavigateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: () => void;
  navigateUrl?: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
  text?: string;
}

const Navigate: React.FC<NavigateModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  navigateUrl,
  children,
  width = '327px',
  height = '206px',
  text = '로그인하러 가기',
}) => {
  const handleNavigate = () => {
    if (navigateUrl) {
      window.location.href = navigateUrl;
    } else if (onNavigate) {
      onNavigate();
    }
  };
  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      width={width}
      height={height}
      justifyContent="justify-between"
    >
      <div className="flex justify-center">
        <Image src={check} alt="모달이미지"></Image>
      </div>
      <div className="flex justify-center">{children}</div>
      <div className="flex justify-center">
        <button
          onClick={handleNavigate}
          className="w-38 h-10 bg-custom-gray-800 text-white rounded-xl hover:bg-custom-gray-700"
        >
          {text}
        </button>
      </div>
    </ModalBase>
  );
};

export default Navigate;
