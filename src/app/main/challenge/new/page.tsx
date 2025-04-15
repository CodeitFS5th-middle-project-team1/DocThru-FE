'use client';

import { useCreateChallenge } from '@/api/challenge/ChallengeHooks';
import ChallengeForm, {
  ChallengeFormData,
} from '@/shared/components/form/ChallengeForm';
import { DocumentType, FieldType } from '@/types';
import { NextPage } from 'next';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import toast from 'react-hot-toast';

const NewChallenge: NextPage = () => {
  const methods = useForm();
  const [isProcessing, setIsProcessing] = useState(false);
  const { mutateAsync, isPending } = useCreateChallenge();

  const handleSubmit = async (data: ChallengeFormData) => {
    if (!data.field) return toast.error('분야를 선택해 주세요.');
    if (!data.documentType) return toast.error('문서타입을 선택해 주세요.');
    if (!data.deadline) return toast.error('마감일을 입력해 주세요.');
    if (new Date(data.deadline) === new Date())
      return toast.error('오늘일자 이후로 선택해 주세요. ');
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
