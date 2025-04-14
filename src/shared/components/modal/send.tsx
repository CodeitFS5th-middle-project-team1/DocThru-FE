import React, { useState, useEffect } from 'react';
import ModalBase from './modalBase';
import Image from 'next/image';
import close from '@images/close-icon/close.svg';

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (content: string) => void;
  title?: string;
  initialContent?: string;
  placeholder?: string;
  width?: string;
  height?: string;
}

const SendModal: React.FC<SendModalProps> = ({
  isOpen,
  onClose,
  onSend,
  title = '글 작성',
  initialContent = '',
  placeholder = '내용을 입력해주세요',
  width = '496px',
  height = '423px',
}) => {
  const [content, setContent] = useState(initialContent);

  // 모달이 열릴 때마다 초기값으로 리셋하고 싶다면 useEffect로 처리할 수 있습니다.
  useEffect(() => {
    if (isOpen) {
      setContent(initialContent);
    }
  }, [isOpen, initialContent]);

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      width={width}
      height={height}
      justifyContent="justify-between"
    >
      <div className="flex flex-row justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <button
          onClick={onClose}
          className="hover:bg-custom-gray-100 cursor-pointer"
        >
          <Image src={close} alt="모달 닫기 이미지"></Image>
        </button>
      </div>
      <div className="flex flex-1 min-w-0 flex-col justify-center">
        <p className="mb-2">내용</p>
        <textarea
          className="w-full h-4/5 border resize-none border-gray-300 rounded p-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          rows={5}
        />
      </div>
      <div className="w-full">
        <button
          onClick={() => onSend(content)}
          className="w-full h-12 bg-custom-gray-800 text-white rounded-xl hover:bg-custom-gray-700 cursor-pointer"
        >
          전송
        </button>
      </div>
    </ModalBase>
  );
};

export default SendModal;
