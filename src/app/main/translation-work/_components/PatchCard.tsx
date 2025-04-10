'use client';

import Image from 'next/image';
import Logo from '@/shared/Img/logo.svg';
import Close from '@/shared/Img/close-icon/close.svg';
import { useEffect, useState } from 'react';
import ConfirmCancel from '@/shared/components/modal/confirmCancel';
import Navigate from '@/shared/components/modal/navigate';
import Editor from '../_components/Editor';
import Confirm from '@/shared/components/modal/confirm';
import { useParams, useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { ErrorResponse, Modal } from '@/types';
import Button, { ButtonCategory } from '@/shared/components/button/Button';
import { useUnloadWarning } from '@/shared/hooks/useUnloadWarning';
import {
  useCreateDraft,
  useGetDraftTranslation,
  useGetTranslation,
  usePatchTranslation,
} from '@/api/Translation/hook';

export default function PatchCard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string | null>(null);
  const [modal, setModal] = useState<Modal>('none');
  const [isDrafted, setIsDrafted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [challengeId, setChallengeId] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  const router = useRouter();
  const params = useParams();
  const translationId = params.id as string;

  const { mutate: createDraftMutation } = useCreateDraft(translationId);
  const { mutate: modifyTranslationMutation, status: modifyStatus } =
    usePatchTranslation(translationId);
  const { data: draftData, status: draftStatus } =
    useGetDraftTranslation(challengeId);
  const { data: TranslationData } = useGetTranslation(translationId);

  const onHandleModify = (error: unknown) => {
    const data = { title, content };
    modifyTranslationMutation(data);
    if (modifyStatus === 'success') {
      setModal('success');
      return;
    }
    if (modifyStatus === 'error') {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (
        axiosError.response?.status === 500 ||
        axiosError.response?.status === 404
      ) {
        setErrorMessage('서버 요청 에러 발생!');
        setModal('error');
      } else {
        setErrorMessage(
          '제목은 최소 1자 이상 최대 50자 이하로 입력해주세요.\n내용은 1000자 이하로 입력해주세요.'
        );
        setModal('error');
      }
    }
  };

  // 로컬 스토리지에서 저장되어 있는 Challenge Id를 불러옵니다.
  useEffect(() => {
    const cid = localStorage.getItem('challengeId') as string;
    if (!cid) router.replace('/not-found');
    else setChallengeId(cid);
  }, [router]);

  useEffect(() => {
    if (
      TranslationData?.title !== undefined &&
      TranslationData?.content !== undefined
    ) {
      setTitle(TranslationData.title);
      setContent(TranslationData.content);
      setIsLoaded(true);
    }
  }, [TranslationData]);

  useUnloadWarning(content !== '' && !(modal === 'success'));

  useEffect(() => {
    if (draftStatus === 'success') {
      setIsDrafted(true);
    }
  }, [draftData, draftStatus]);

  return (
    <div className="w-screen h-screen flex flex-col items-center p-2">
      <div className="max-w-[1000px] w-full h-full">
        <div className="mt-6 flex justify-between h-[80px] items-center">
          <div
            onClick={() => {
              setModal('forgive');
            }}
          >
            <Image
              className={'cursor-pointer'}
              width={120}
              height={27}
              src={Logo}
              alt="logo"
            />
          </div>
          <div className="flex gap-2">
            <div className="md:w-[81px] w-[36px]">
              <Button
                category={ButtonCategory.DROP}
                size={'py-2 flex'}
                onClick={() => {
                  setModal('forgive');
                }}
              >
                <p className="hidden md:flex">포기</p>
              </Button>
            </div>
            <div className="w-[90px] flex items-center">
              <Button
                category={ButtonCategory.NO}
                size={'py-2 flex'}
                onClick={() => {
                  createDraftMutation({ title, content });
                }}
              >
                임시저장
              </Button>
            </div>
            <div className="w-[95px] flex items-center">
              <Button
                category={ButtonCategory.YES}
                size={'py-2 flex'}
                onClick={onHandleModify}
              >
                수정하기
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-5">
            <input
              className="text-[36px] w-full"
              placeholder="제목을 입력하세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <hr />
          {isLoaded && (
            <div className="mt-5">
              <Editor
                setContent={setContent}
                content={content}
                draftedValue=""
              />
            </div>
          )}
        </div>
        <Confirm
          isOpen={modal === 'drafted'}
          onClose={() => setModal('none')}
          onConfirm={() => {
            setModal('none');
            setIsDrafted(false);
          }}
        >
          임시저장 되었습니다!
        </Confirm>
        <Confirm
          isOpen={modal === 'error'}
          onClose={() => setModal('none')}
          onConfirm={() => {
            setModal('none');
          }}
        >
          {errorMessage}
        </Confirm>
        <ConfirmCancel
          isOpen={modal === 'forgive'}
          onClose={() => setModal('none')}
          onConfirm={() => {
            setModal('none');
            router.push(`/main/translation/${translationId}`);
          }}
          onCancel={() => setModal('none')}
        >
          정말 작업을 포기하시겠어요?
        </ConfirmCancel>
        <Navigate
          isOpen={modal === 'success'}
          onClose={() => {}}
          navigateUrl={`/main/translation/${translationId}`}
          text="작업물 보기"
        >
          수정되었습니다!
        </Navigate>
        {isDrafted && (
          <div className="border border-[#262626] rounded-[8px] fixed left-1/2 top-[90%] transform -translate-x-1/2 z-30 max-w-[750px] w-[95%] flex justify-between items-center px-5">
            <div className="flex gap-5 items-center">
              <div
                onClick={() => {
                  setIsDrafted(false);
                }}
              >
                <Image
                  className={'cursor-pointer'}
                  width={15}
                  height={15}
                  src={Close}
                  alt="close"
                />
              </div>
              <div>
                임시 저장된 작업물이 있어요. 저장된 작업을 불러오시겠어요??
              </div>
            </div>
            <div className="w-[90px] my-1">
              <Button
                category={ButtonCategory.YES}
                size={'py-1 flex'}
                onClick={() => {
                  setTitle(draftData?.title || '');
                  setContent(draftData?.content || null);
                  setIsDrafted(false);
                }}
              >
                불러오기
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
