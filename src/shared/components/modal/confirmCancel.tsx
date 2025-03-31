import React from 'react';
import ModalBase from './modalBase';
import Image from 'next/image';
import check from '@images/modal-icon/check.svg';

interface ConfirmCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
}

const ConfirmCancel: React.FC<ConfirmCancelModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  children,
  width = '327px',
  height = '187px',
}) => {
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
      <div className="flex justify-center space-x-2">
        <button
          onClick={onCancel}
          className="w-22.5 h-10 bg-white text-custom-gray-800 rounded-xl border border-custom-gray-800 hover:bg-custom-gray-100"
        >
          아니오
        </button>
        <button
          onClick={onConfirm}
          className="w-22.5 h-10 bg-custom-gray-800 text-white rounded-xl hover:bg-custom-gray-700"
        >
          확인
        </button>
      </div>
    </ModalBase>
  );
};

export default ConfirmCancel;
