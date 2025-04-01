import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string; // 모달의 너비를 조절할 수 있는 props
  height?: string; // 모달의 높이를 조절할 수 있는 props
  justifyContent?: string; // justifyContent 속성을 조절할 수 있는 props
}

const ModalBase: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  width = 'auto',
  height = 'auto',
  justifyContent = 'justify-end',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 배경 */}
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      {/* 모달 내용 */}
      <div
        className={`relative bg-white rounded-xl shadow-lg p-6 z-10 flex flex-col ${justifyContent}`}
        style={{ width, height }}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalBase;
