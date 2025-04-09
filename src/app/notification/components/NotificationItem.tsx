'use client';

import React from 'react';

const TestNotification = () => {
  const handleCreateNotification = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: '894727a2-2844-46db-87df-45b2ef6363ac',
            category: 'challenge',
            type: 'approved',
            message: '✅ 프론트에서 알림 생성 테스트!',
            challengeId: '6f2c5876-2b53-401c-adbb-350c204977fd',
          }),
          credentials: 'include',
        }
      );

      if (res.ok) {
        const data = await res.json();
        alert(`✅ 알림 생성 성공! ID: ${data.id}`);
        console.log('알림 생성 결과:', data);
      } else {
        console.error('❌ 요청 실패:', res.status, res.statusText);
      }
    } catch (err) {
      console.error('❌ 에러 발생:', err);
    }
  };

  return (
    <button
      onClick={handleCreateNotification}
      className="p-2 bg-blue-500 text-white rounded"
    >
      🧪 알림 테스트 보내기
    </button>
  );
};

export default TestNotification;
