'use client';
import { useAuthStore } from '@/api/auth/AuthStore';
import Button, { ButtonCategory } from '@/shared/components/button/Button';

export default function ChallengeHead() {
  const { user } = useAuthStore();

  if (!user) return null;

  const isAdmin = user.role === 'ADMIN';

  return (
    <div className="flex justify-between items-center">
      <p className="text-xl text-custom-gray-800 font-semibold ">챌린지 목록</p>
      {!isAdmin && (
        <div className="flex">
          <Button
            category={ButtonCategory.NEW_CHALLENGE}
            size="py-2.5 px-3"
            href={'/main/challenge/new'}
          >
            신규 챌린지 신청
          </Button>
        </div>
      )}
    </div>
  );
}
