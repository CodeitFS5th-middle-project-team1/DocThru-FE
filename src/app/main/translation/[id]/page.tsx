'use client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Title } from './_components/Title';
import { Author } from './_components/Author';
import { Content } from './_components/Content';
import {
  useDeleteTranslation,
  useGetTranslation,
} from '@/api/Translation/hook';
import { useGetFeedBackList, useCreateFeedBack } from '@/api/feedback/hook';
import { FeedBack } from './_components/FeedBack';
import { useCreateLike, useDeleteLike } from '@/api/like/hook';
import { useGetChallenge } from '@/api/challenge/ChallengeHooks';
import { Modal } from './_components/modal';
import { useState } from 'react';
import { useAuthStore } from '@/api/auth/AuthStore';
import { PATH } from '@/constants';

const TranslationDetail: React.FC = () => {
  const searchParams = useSearchParams();
  const { id } = useParams() as { id: string };
  const challengeId = searchParams.get('challengeId') as string;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [isDelete, setIsDelete] = useState(false);
  const { user } = useAuthStore();
  const { data: translation } = useGetTranslation(id, challengeId as string);
  const { data: feedback } = useGetFeedBackList(id);
  const { mutate: createFeedBack } = useCreateFeedBack(id);
  const { mutate: createLike } = useCreateLike(id);
  const { mutate: deleteLike } = useDeleteLike(id);
  const { mutate: Delete } = useDeleteTranslation();

  const { data: challenge } = useGetChallenge(translation?.challengeId || '');

  const isSameUser = translation?.user.id === user?.id;
  const isAdmin = user?.role === 'ADMIN';

  const onHandleLike = async () => {
    if (!translation?.isLiked) {
      createLike();
    } else {
      deleteLike();
    }
  };

  const openMdify = () => {
    if (isAdmin) {
      setModalText('수정 페이지로 이동합니다.');
      setIsOpen(true);
      return;
    }
    if (challenge?.isDeadlineFull) {
      setModalText('마감된 Challenge 수정 할 수 없습니다.');
      return;
    }
    setModalText('수정 페이지로 이동합니다.');
    setIsOpen(true);
  };

  const openDelete = () => {
    if (isAdmin) {
      setModalText('정말 삭제 하시겠습니까?');
      setIsOpen(true);
      setIsDelete(true);
      return;
    }
    if (challenge?.isDeadlineFull) {
      setModalText('마감된 Challenge 삭제 할 수 없습니다.');
      setIsOpen(true);
    } else {
      setModalText('정말 삭제 하시겠습니까?');
      setIsDelete(true);
      setIsOpen(true);
    }
  };

  const onCancle = () => {
    setIsOpen(false);
    setIsDelete(false);
  };

  const onModify = () => {
    router.push(`/main/translation-work/${id}?challengeId=${challengeId}`);
  };

  const onDelete = () => {
    if (translation) {
      Delete({
        challengeId: translation.challengeId,
        translationId: translation.id,
      });
      router.replace(PATH.challenge + `/` + translation.challengeId);
    }
  };

  return (
    <div className="flex flex-col gap-4 ">
      <Title
        isAdmin={isAdmin}
        isSameUser={isSameUser}
        title={translation?.title}
        field={challenge?.field}
        documentProp={challenge?.documentType}
        onDelete={openDelete}
        onModify={openMdify}
      />
      <Author
        user={translation?.user}
        create={translation?.createdAt}
        likeCount={translation?.likeCount}
        like={translation?.isLiked}
        likeClick={onHandleLike}
      />
      {isOpen && (
        <Modal
          apply={isDelete ? onDelete : onModify}
          cancle={onCancle}
          content={modalText}
        />
      )}
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
