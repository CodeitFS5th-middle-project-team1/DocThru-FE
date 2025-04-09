'use client';

import { useCreateChallenge } from '@/api/challenge/ChallengeHooks';
import ChallengeForm, {
  ChallengeFormData,
} from '@/shared/components/form/ChallengeForm';
import { DocumentType, FieldType } from '@/types';
import { NextPage } from 'next';
import { useForm, FormProvider } from 'react-hook-form';
import toast from 'react-hot-toast';

const NewChallenge: NextPage = () => {
  const methods = useForm();
  const { mutateAsync } = useCreateChallenge();

  const handleSubmit = async (data: ChallengeFormData) => {
    const formattedData = {
      ...data,
      deadline: new Date(data.deadline),
      maxParticipants: Number(data.maxParticipants),
      documentType: data.documentType as DocumentType,
      field: data.field as FieldType,
    };
    try {
      await mutateAsync(formattedData);
    } catch (error: any) {
      toast.error('입력 오류입니다.', {
        style: {
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        },
      });
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <ChallengeForm category="create" onSubmit={handleSubmit} />
      </FormProvider>
    </>
  );
};

export default NewChallenge;
