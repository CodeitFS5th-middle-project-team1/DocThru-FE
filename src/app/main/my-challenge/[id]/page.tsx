'use client';
import { useParams } from 'next/navigation';
import ClientChallengeDetail from './components/index';

export default function Page() {
  const { id } = useParams() as { id: string };
  return <ClientChallengeDetail id={id} />;
}
