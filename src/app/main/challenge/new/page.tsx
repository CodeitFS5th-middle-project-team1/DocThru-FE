'use client';

import ChallengeForm from '@/shared/components/form/ChallengeForm';
import { NextPage } from 'next';
import { useForm, FormProvider } from 'react-hook-form';

const NewChallenge: NextPage = () => {
  const methods = useForm();

  const handleSubmit = (data: any) => {
    console.log('신규 데이터:', data);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <ChallengeForm category="create" onSubmit={handleSubmit} />
      </FormProvider>
    </div>
  );
};

export default NewChallenge;
