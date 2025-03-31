'use client';

import Text from '../input/text';

import Date from '../input/date';
import Button, { BGColor, ButtonBorder } from '../button/Button';

interface ChallengeFormProps {
  category: 'edit' | 'create';
  // defaultValues?: {
  //   title: string;
  //   originUrl: string;
  //   FieldType: FieldType;
  //   documentType: DocumentType;
  //   deadline: string;
  //   maxParticipants: string;
  //   content: string;
  // };
  onSubmit: (data: any) => void;
}

const ChallengeForm = ({
  category,
  // defaultValues,
  onSubmit,
}: ChallengeFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <p className="text-lg md:text-xl font-bold">
        {category === 'edit' ? '챌린지 수정' : '신규 챌린지 신청'}
      </p>

      <section className="flex flex-col gap-2">
        <p className="text-sm text-custom-gray-900 font-medium ">제목</p>
        <Text name="title" placeholder="제목을 입력해주세요" />
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-sm text-custom-gray-900 font-medium ">원문 링크</p>
        <Text name="originUrl" placeholder="원문 링크를 입력해주세요"></Text>
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-sm text-custom-gray-900 font-medium ">분야</p>
        <Text name="fieldType" placeholder="카테고리"></Text>
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-sm text-custom-gray-900 font-medium ">문서 타입</p>
        <Text name="documentType" placeholder="YY/MM/DD"></Text>
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-sm text-custom-gray-900 font-medium ">마감일</p>
        <Date name="deadline" placeholder="YY/MM/DD"></Date>
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-sm text-custom-gray-900 font-medium ">최대 인원</p>
        <Text
          name="maxParticipants"
          placeholder="원문 링크를 입력해주세요"
        ></Text>
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-sm text-custom-gray-900 font-medium ">내용</p>
        <Text name="content" placeholder="내용을 입력해주세요"></Text>
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
