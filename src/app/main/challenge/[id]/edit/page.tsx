'use client';

import { fetchChallengeById } from '@/api/challenge/ChallengeApi';
import { useEditChallenge } from '@/api/challenge/ChallengeHooks';
import ChallengeForm, {
  ChallengeFormData,
} from '@/shared/components/form/ChallengeForm';
import { DocumentType, FieldType } from '@/types';
import { NextPage } from 'next';
import { useParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

const Edit: NextPage = () => {
  const methods = useForm<ChallengeFormData>({
    defaultValues: {
      title: '',
      originURL: '',
      documentType: DocumentType['BLOG'],
      field: FieldType['NEXTJS'],
      deadline: new Date(),
      maxParticipants: 5,
      description: '',
    },
  });

  const params = useParams();
  const challengeId = params?.id as string;

  const { mutateAsync } = useEditChallenge(challengeId);

  const resetForm = useCallback(
    (data: ChallengeFormData) => methods.reset(data),
    [methods]
  );

  useEffect(() => {
    const fetchDefault = async () => {
      if (!challengeId) return;
      const challenge = await fetchChallengeById(challengeId);

      const challengeFormData: ChallengeFormData = {
        ...challenge,
        deadline: new Date(challenge.deadline),
      };

      resetForm(challengeFormData);
    };

    fetchDefault();
  }, [challengeId, resetForm]);
  const handleSubmit = async (data: ChallengeFormData) => {
    try {
      const parsedData = {
        ...data,
        deadline: new Date(data.deadline),
      };
      await mutateAsync(parsedData);
      return true;
    } catch (err) {
      console.error('수정 실패:', err);
      return false;
    }
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
