'use client';

import { useCreateChallenge } from '@/api/challenge/ChallengeHooks';
import ChallengeForm, {
  ChallengeFormData,
} from '@/shared/components/form/ChallengeForm';
import { DocumentType, FieldType } from '@/types';
import { NextPage } from 'next';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

const NewChallenge: NextPage = () => {
  const methods = useForm();
  const [isProcessing, setIsProcessing] = useState(false);
  const { mutateAsync, isPending } = useCreateChallenge();

  const handleSubmit = async (data: ChallengeFormData) => {
    setIsProcessing(true);
    const formattedData = {
      ...data,
      deadline: new Date(data.deadline),
      maxParticipants: Number(data.maxParticipants),
      documentType: data.documentType as DocumentType,
      field: data.field as FieldType,
    };
    try {
      await mutateAsync(formattedData);
    } catch {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <ChallengeForm
          category="create"
          onSubmit={handleSubmit}
          isPending={isPending || isProcessing}
        />
      </FormProvider>
    </>
  );
};

export default NewChallenge;
