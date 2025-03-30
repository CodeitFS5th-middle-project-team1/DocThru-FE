'use client';
import toast from 'react-hot-toast';

export default function Home() {
  return (
    <>
      <div className="w-10 h-10 bg-sky-50">메인 홈페이지</div>
      <div className="p-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => toast.success('성공했습니다! 🎉')}
        >
          성공 토스트
        </button>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          onClick={() => toast.error('문제가 생겼어요 😢')}
        >
          에러 토스트
        </button>

        <button
          className="bg-gray-700 text-white px-4 py-2 rounded ml-2"
          onClick={() => toast('그냥 일반 메시지 😎')}
        >
          일반 토스트
        </button>
      </div>
      );
    </>
  );
}
