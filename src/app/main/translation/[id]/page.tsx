'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { challengeData } from '@/mock';
import { FEEDBACK } from '@/constants';
import { useTranslationStore } from '@/api/store/translationStore';
import { Title } from './_components/Title';
import { Author } from './_components/Author';
import { Content } from './_components/Content';
import { FeedBack } from './_components/FeedBack';

const TranslationDetail = () => {
  const { id } = useParams(); // ✅ 다이내믹 라우트에서 ID 가져오기
  const { translation, fetchTranslation } = useTranslationStore();

  useEffect(() => {
    if (typeof id === 'string') {
      fetchTranslation(id, '240db427-b326-46ae-84d5-711364c6fc78'); // ✅ ID 기반 데이터 요청
    }
  }, [id, fetchTranslation]);

  return (
    <div className="flex flex-col gap-4">
      <Title
        title={translation?.title}
        document={challengeData.documentType}
        field={challengeData.field}
      />
      <Author
        user={translation?.user}
        create={translation?.createdAt}
        likeCount={translation?.likeCount}
        like={translation?.isLiked}
      />
      <Content content={translation?.content} />
      <FeedBack feedBack={FEEDBACK} />
    </div>
  );
};

export default TranslationDetail;
