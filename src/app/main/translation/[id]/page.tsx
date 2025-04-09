'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
// import { useTranslationStore } from '@/api/store/translationStore';
import { Title } from './_components/Title';
import { Author } from './_components/Author';
import { Content } from './_components/Content';
import { FeedBack } from './_components/FeedBack';
// import { useFeedBackStore } from '@/api/store/FeedBackStore';

const TranslationDetail = () => {
  const { id } = useParams();
  // const { translation, fetchTranslation } = useTranslationStore();
  // const { feedback, fetchFeedBack } = useFeedBackStore();
  // useEffect(() => {
  //   const challengeId = localStorage.getItem('challengeId');
  //   if (typeof id === 'string' && challengeId) {
  //     fetchTranslation(challengeId, id);
  //     fetchFeedBack(id);
  //   }
  // }, [id, fetchTranslation]);

  // return (
  //   <div className="flex flex-col gap-4">
  //     <Title title={translation?.title} />
  //     <Author
  //       user={translation?.user}
  //       create={translation?.createdAt}
  //       likeCount={translation?.likeCount}
  //       like={translation?.isLiked}
  //     />
  //     <Content content={translation?.content} />
  //     <FeedBack feedBack={feedback} />
  //   </div>
  // );
};

export default TranslationDetail;
