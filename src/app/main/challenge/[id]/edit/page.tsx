'use client';

import ChallengeForm from '@/shared/components/form/ChallengeForm';
import { NextPage } from 'next';
import { useForm, FormProvider } from 'react-hook-form';

const Edit: NextPage = () => {
  const methods = useForm();

  const handleSubmit = (data: any) => {
    console.log('수정할 데이터:', data);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <ChallengeForm category="edit" onSubmit={handleSubmit} />
      </FormProvider>
    </div>
  );
};

export default Edit;
