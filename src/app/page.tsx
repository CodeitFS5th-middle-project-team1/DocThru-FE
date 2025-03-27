'use client';

import { Container } from '@/shared/components/container/Container';

export default function Home() {
  return (
    <>
      <div className="flex w-full h-10 bg-sky-50">메인 홈페이지</div>
      <div className="flex justify-center w-full">
        <Container
          href={'/'}
          deadLine="2025-03-28"
          currentParticipants={4}
          maxParticipants={15}
        />
      </div>
    </>
  );
}
