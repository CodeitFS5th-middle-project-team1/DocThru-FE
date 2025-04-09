'use client';
import { useParams } from 'next/navigation';
import { Title } from './_components/Title';
import { Author } from './_components/Author';
import { Content } from './_components/Content';
import { useGetTranslation } from '@/api/Translation/hook';
import { useGetFeedBackList, useCreateFeedBack } from '@/api/feedback/hook';
import { FeedBack } from './_components/FeedBack';

const TranslationDetail = () => {
  const { id } = useParams() as { id: string };
  const { data: translation } = useGetTranslation(id);
  const { data: feedback } = useGetFeedBackList(id);
  const { mutateAsync: createFeedBack } = useCreateFeedBack(id);
  return (
    <div className="flex flex-col gap-4">
      <Title title={translation?.title} />
      <Author
        user={translation?.user}
        create={translation?.createdAt}
        likeCount={translation?.likeCount}
        like={translation?.isLiked}
      />
      <Content content={translation?.content} />
      <FeedBack
        id={id}
        createFeedBack={createFeedBack}
        feedBack={feedback?.feedbacks}
      />
    </div>
  );
};

export default TranslationDetail;
