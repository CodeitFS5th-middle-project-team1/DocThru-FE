'use client';
import Text from '../input/text';
import Date from '../input/date';
import Button, { ButtonCategory } from '../button/Button';
import { DocumentType, FieldType } from '@/types';
import { DropDown } from '../dropdown/DropDown';
import { useFormContext, SubmitHandler } from 'react-hook-form';

interface ChallengeFormProps {
  category: 'edit' | 'create';
  defaultValues?: ChallengeFormData;
  onSubmit: SubmitHandler<ChallengeFormData>;
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
    formState: { errors: _errors },
  } = useFormContext<ChallengeFormData>();

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
          rules={{
            required: '제목을 입력해주세요.',
            minLength: {
              value: 2,
              message: '제목은 최소 2자 이상이어야 합니다.',
            },
            maxLength: {
              value: 15,
              message: '제목은 최대 15자 이하여야 합니다.',
            },
          }}
          errorMessage={_errors.title?.message}
        />
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-sm text-custom-gray-900 font-medium ">원문 링크</p>
        <Text
          name="originURL"
          placeholder="원문 링크를 입력해주세요"
          register={register}
          size="w-full h-12"
          rules={{
            required: '유효한 URL을 입력해주세요.',
            pattern: {
              value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
              message: '유효한 URL을 입력해주세요.',
            },
          }}
          errorMessage={_errors.originURL?.message}
        ></Text>
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-sm text-custom-gray-900 font-medium ">분야</p>
        <DropDown
          options={fieldTypeOptions}
          value={field}
          placeholder="분야 선택"
          handleChange={(v) => setValue('field', v as FieldType)}
        />
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-sm text-custom-gray-900 font-medium ">문서 타입</p>
        <DropDown
          options={documentTypeOptions}
          value={documentType}
          placeholder="문서 타입 선택"
          handleChange={(v) => setValue('documentType', v as DocumentType)}
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
          rules={{
            required: '최대 인원을 입력해주세요.',
            min: { value: 1, message: '최소 2명 이상 입력해주세요.' },
            max: {
              value: 20,
              message: '최대 인원 수는 20명 이하이어야 합니다.',
            },
            valueAsNumber: true,
            validate: (value) =>
              !isNaN(Number(value)) || '숫자만 입력 가능합니다.',
          }}
          type="number"
          errorMessage={_errors.maxParticipants?.message}
        ></Text>
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-sm text-custom-gray-900 font-medium ">내용</p>
        <Text
          name="description"
          placeholder="내용을 입력해주세요"
          register={register}
          size="w-full h-40"
          rules={{
            required: '내용은 최소 10자 이상이어야 합니다.',
            minLength: {
              value: 10,
              message: '내용은 최소 10자 이상이어야 합니다.',
            },
          }}
          errorMessage={_errors.description?.message}
        ></Text>
      </section>

      <Button type="submit" category={ButtonCategory.EDIT} size="py-3.5">
        {category === 'edit' ? '수정하기' : '신청하기'}
      </Button>
    </form>
  );
};

export default ChallengeForm;
