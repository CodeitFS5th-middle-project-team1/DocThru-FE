'use client';
import Image from 'next/image';
import Logo from '@/shared/Img/logo.svg';
import Close from '@/shared/Img/close-icon/close.svg';
import { useEffect, useState } from 'react';
import ConfirmCancel from '@/shared/components/modal/confirmCancel';
import Navigate from '@/shared/components/modal/navigate';
import Editor from '../_components/Editor';
import Confirm from '@/shared/components/modal/confirm';
import { useRouter, useSearchParams } from 'next/navigation';
import { AxiosError } from 'axios';
import { ErrorMessage, ErrorResponse, Modal, Translation } from '@/types';
import Button, { ButtonCategory } from '@/shared/components/button/Button';

import {
  useCreateDraft,
  useGetDraftTranslation,
} from '@/api/Translation/hook';
import { useUnloadWarning } from '@/shared/hooks/useUnloadWarning';
import { useMutation } from '@tanstack/react-query';
import { createTranslation, DraftRequest } from '@/api/Translation/api';

export default function PostCard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string | null>(null);
  const [isDrafted, setIsDrafted] = useState(false);
  const [modal, setModal] = useState<Modal>('none');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [challengeId, setChallengeId] = useState<string>('');
  const [translationId, setTranslationId] = useState('');
  useUnloadWarning(title !== '' && !(modal === 'success'));
  console.log(content)
  const createTranslationMutation = useMutation<
  Translation, // 성공 시 반환 타입
  AxiosError<ErrorResponse>, // 에러 타입
  DraftRequest // 요청 데이터 타입
>({
  mutationFn: (data: DraftRequest) => createTranslation(data, challengeId),
  onSuccess: (data) => {
    setTranslationId(data.id);
    setModal('success');
  },
  onError: (error) => {
    const axiosError = error as AxiosError<ErrorResponse>;
    console.log(error)
    const data = axiosError.response?.data;
    let message = '알 수 없는 이유로 제출하지 못했습니다.';
    if (data && typeof data.message === 'string') {
      // message가 그냥 string일 경우
      message = data.message;
    } else if (
      data &&
      typeof data.message === 'object' &&
      data.message !== null
    ) {
      const messageObj = data.message as ErrorMessage;
      // formErrors가 있는 경우
      if (
        Array.isArray(messageObj.formErrors) &&
        messageObj.formErrors.length > 0
      ) {
        message = messageObj.formErrors.join('\n');
      }
      // title, content 필드 오류 처리
      if (messageObj.fieldErrors) {
        const fieldErrors = messageObj.fieldErrors;
        if (fieldErrors.title) {
          message = '제목은 필수 입력 사항입니다.';
        }
        if (fieldErrors.content) {
          message = '내용은 필수 입력 사항입니다.';
        }
      }
    }
    setErrorMessage(message);
    setModal('error');
  },
});

  const { data: draftData, status: draftStatus } =
    useGetDraftTranslation(challengeId);
  const { mutate: createDraftMutation } = useCreateDraft(challengeId);
  // 로컬 스토리지에서 저장되어 있는 Challenge Id를 불러옵니다.

  const onHandleCreate = () => {
    const data = { title, content };  // { title, content } 객체 생성
    createTranslationMutation.mutate(data);  // data를 전달
  };

  useEffect(() => {
    const cid = searchParams.get('challengeId');
    if (!cid || cid.trim() === '') {
      router.replace('/main/challenge');
    } else {
      setChallengeId(cid);
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (draftStatus === 'success') {
      setIsDrafted(true);
    }
    console.log(draftData, 'draftData');
  }, [draftData, draftStatus]);

  return (
    <div className="relative max-w-[1000px] w-full h-full">
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
              onClick={onHandleCreate}
            >
              제출하기
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
        <div className="mt-5">
          <Editor setContent={setContent} content={content} draftedValue="" />
        </div>
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
          router.push(`/main/challenge/${challengeId}`);
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
        제출되었습니다!
      </Navigate>
      {isDrafted && (
        <div className="border border-[#262626] rounded-[8px] absolute left-1/2 top-[90%] transform -translate-x-1/2 z-30 max-w-[750px] w-[95%] flex justify-between items-center px-5">
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
                setTitle(draftData?.title ?? '');
                setContent(draftData?.content ?? null);
                setIsDrafted(false);
              }}
            >
              불러오기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
