'use client';
import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css'; // 기본 테마

// ✅ 동적 import로 서버에서 실행되지 않도록 설정
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'], // 굵기, 기울임, 밑줄, 취소선
    [{ list: 'ordered' }, { list: 'bullet' }], // 리스트 (번호, 불렛)
    ['blockquote', 'code-block'], // 블록 인용, 코드 블록
    [{ indent: '-1' }, { indent: '+1' }], // 들여쓰기
    [{ size: ['small', false, 'large', 'huge'] }], // 폰트 크기
    [{ color: [] }, { background: [] }], // 글씨 색상, 배경색 ✅ 추가
    [{ align: [] }], // 정렬 기능 ✅ 추가
    ['clean'], // 포맷 초기화
  ],
};

interface EditorProps {
  draftedValue?: string;
  content: string | null;
  setContent: Dispatch<SetStateAction<string | null>>;
}

const Editor: React.FC<EditorProps> = ({ content, setContent}) => {
  

  return (
    <div className="w-full p-4">
      <ReactQuill
        theme="snow"
        value={content ?? ''}
        onChange={setContent}
        modules={modules}
        placeholder="내용을 입력하세요."
      />
    </div>
  );
};

export default Editor;
