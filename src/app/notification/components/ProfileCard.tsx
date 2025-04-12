'use client';

import { useAuthStore, useHydrated } from '@/api/auth/AuthStore';

export default function ProfileCard() {
  const { user } = useAuthStore();
  const hasHydrated = useHydrated();

  if (!hasHydrated) return null;
  if (!user)
    return <div className="text-center mt-10">로그인이 필요합니다.</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 border p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="space-y-2">
        <p>
          <strong>닉네임:</strong> {user.nickname}
        </p>
        <p>
          <strong>E-mail:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong>{' '}
          {user.role === 'ADMIN' ? '관리자' : '일반 사용자'}
        </p>
      </div>
    </div>
  );
}
