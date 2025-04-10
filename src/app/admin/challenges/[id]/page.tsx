'use client';

import { useParams } from 'next/navigation';
import AdminChallengeDetail from './components/index';

export default function Page() {
  const { id } = useParams() as { id: string };
  return <AdminChallengeDetail id={id} />;
}
