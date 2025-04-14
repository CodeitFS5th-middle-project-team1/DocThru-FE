'use client';
import { useParams, useSearchParams } from 'next/navigation';
import { Title } from './_components/Title';
import { Author } from './_components/Author';
import { Content } from './_components/Content';
import { useGetTranslation } from '@/api/Translation/hook';
import { useGetFeedBackList, useCreateFeedBack } from '@/api/feedback/hook';
import { FeedBack } from './_components/FeedBack';
import { useCreateLike, useDeleteLike } from '@/api/like/hook';

const TranslationDetail: React.FC = () => {
  const searchParams = useSearchParams();
  const { id } = useParams() as { id: string };
  const challengeId = searchParams.get('challengeId') as string;
  const { data: translation } = useGetTranslation(id, challengeId as string);
  const { data: feedback } = useGetFeedBackList(id);
  const { mutate: createFeedBack } = useCreateFeedBack(id);
  const { mutate: createLike } = useCreateLike(id);
  const { mutate: deleteLike } = useDeleteLike(id);

  const onHandleLike = async () => {
    if (!translation?.isLiked) {
      createLike();
    } else {
      deleteLike();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Title title={translation?.title} />
      <Author
        user={translation?.user}
        create={translation?.createdAt}
        likeCount={translation?.likeCount}
        like={translation?.isLiked}
        likeClick={onHandleLike}
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
