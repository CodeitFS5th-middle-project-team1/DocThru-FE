import AdminChallengeDetail from './components/index';

interface Params {
  params: {
    id: string;
  };
}

export default function Page({ params }: Params) {
  return <AdminChallengeDetail id={params.id} />;
}
