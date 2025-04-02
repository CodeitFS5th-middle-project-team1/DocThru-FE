'use client';

import Text from '../input/text';
import Date from '../input/date';
import Button, { BGColor, ButtonBorder } from '../button/Button';
import { DocumentType, FieldType } from '@/types';
import { DropDown } from '../dropdown/DropDown';
import { useFormContext } from 'react-hook-form';

interface ChallengeFormProps {
  category: 'edit' | 'create';
  defaultValues?: ChallengeFormData;
  onSubmit: (data: any) => Promise<unknown>;
  isPending?: boolean;
}

export interface ChallengeFormData {
  title: string;
  originURL: string;
  documentType: DocumentType;
  field: FieldType;
  deadline: Date;
  maxParticipants: number;
  description: string;
}

export const DocumentTypeLabel: Record<DocumentType, string> = {
  [DocumentType.BLOG]: '블로그',
  [DocumentType.OFFICIAL]: '공식문서',
};

export const FieldTypeLabel: Record<FieldType, string> = {
  [FieldType.NEXTJS]: 'Next.js',
  [FieldType.MODERNJS]: 'Modern JS',
  [FieldType.API]: 'API',
  [FieldType.WEB]: 'WEB',
  [FieldType.CAREER]: 'Career',
};

const ChallengeForm = ({ category, onSubmit }: ChallengeFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const documentType = watch('documentType');
  const field = watch('field');

  const documentTypeOptions = Object.values(DocumentType).map((value) => ({
    value,
    name: DocumentTypeLabel[value],
  }));

  const fieldTypeOptions = Object.values(FieldType).map((value) => ({
    value,
    name: FieldTypeLabel[value],
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <p className="text-lg md:text-xl font-bold">
        {category === 'edit' ? '챌린지 수정' : '신규 챌린지 신청'}
      </p>

      <section className="flex flex-col gap-2">
        <p className="text-sm text-custom-gray-900 font-medium ">제목</p>
        <Text
          name="title"
          placeholder="제목을 입력해주세요"
          register={register}
          size="w-full h-12"
        />
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-sm text-custom-gray-900 font-medium ">원문 링크</p>
        <Text
          name="originURL"
          placeholder="원문 링크를 입력해주세요"
          register={register}
          size="w-full h-12"
        ></Text>
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-sm text-custom-gray-900 font-medium ">분야</p>
        <DropDown
          options={fieldTypeOptions}
          value={field}
          placeholder="분야 선택"
          handleChange={(v) => setValue('field', v)}
        />
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-sm text-custom-gray-900 font-medium ">문서 타입</p>
        <DropDown
          options={documentTypeOptions}
          value={documentType}
          placeholder="문서 타입 선택"
          handleChange={(v) => setValue('documentType', v)}
        />
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-sm text-custom-gray-900 font-medium ">마감일</p>
        <Date
          name="deadline"
          placeholder="YY/MM/DD"
          register={register}
          size="w-full h-12 px-3"
        ></Date>
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-sm text-custom-gray-900 font-medium ">최대 인원</p>
        <Text
          name="maxParticipants"
          placeholder="최대 인원 수를 입력해주세요"
          register={register}
          size="w-full h-12"
        ></Text>
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-sm text-custom-gray-900 font-medium ">내용</p>
        <Text
          name="description"
          placeholder="내용을 입력해주세요"
          register={register}
          size="w-full h-40"
        ></Text>
      </section>

      <Button
        type="submit"
        border={ButtonBorder.RECTANGLE}
        bgColor={BGColor.BLACK}
      >
        {category === 'edit' ? '수정하기' : '신청하기'}
      </Button>
    </form>
  );
};

export default ChallengeForm;
