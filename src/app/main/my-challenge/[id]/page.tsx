import ClientChallengeDetail from './components/index';

interface Params {
  params: {
    id: string;
  };
}

export default function Page({ params }: Params) {
  return <ClientChallengeDetail id={params.id} />;
}
