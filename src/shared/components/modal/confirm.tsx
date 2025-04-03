import React from 'react';
import ModalBase from './modalBase';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
}

const Confirm: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  children,
  width = '540px',
  height = '250px',
}) => {
  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      width={width}
      height={height}
      justifyContent="justify-end"
    >
      <div className="w-full flex justify-center">{children}</div>
      <div className="mt-11 flex justify-end">
        <button
          onClick={onConfirm}
          className="px-4 h-12 py-2 bg-custom-gray-800 rounded-xl text-white hover:bg-custom-gray-700"
        >
          확인
        </button>
      </div>
    </ModalBase>
  );
};

export default Confirm;
