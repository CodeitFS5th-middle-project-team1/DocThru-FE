'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import Logo from '@/shared/Img/logo.svg';
import Close from '@/shared/Img/close-icon/close.svg';
import { useEffect, useState } from 'react';
import ConfirmCancel from '@/shared/components/modal/confirmCancel';
import Navigate from '@/shared/components/modal/navigate';
import Editor from './_components/Editor';
import Confirm from '@/shared/components/modal/confirm';
import { notFound, useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorMessage, ErrorResponse } from '@/types';
import {
  createDraftTranslation,
  createTranslation,
  getDraftTranslation,
} from '@/api/TransLationApi';
import Button, { ButtonCategory } from '@/shared/components/button/Button';
import { useUnloadWarning } from '@/shared/hooks/useUnloadWarning';
import { useToastMutation } from '@/shared/hooks/useToastMutation';

const TranslationWork: NextPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string | null>(null);
  const [isDrafted, setIsDrafted] = useState(false);
  const [isDraftModal, setIsDraftModal] = useState(false);
  const [isDraftQuestionModal, setIsDraftQuestionModal] = useState(false);
  const [isForgiveModal, setIsForgiveModal] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const [challengeId, setChallengeId] = useState<string>('');
  const [translationId, setTranslationId] = useState(''); 

  // 로컬 스토리지에서 저장되어 있는 Challenge Id를 불러옵니다.
  useEffect(() => {
    const cid = localStorage.getItem('challengeId') as string
    if(!cid) router.replace('/not-found')
    else setChallengeId(cid);
  }, []);

  useUnloadWarning(content !== '' && !isSuccessModal);

  const { data: draftData } = useQuery({
    queryKey: ['draft', challengeId],
    queryFn: ({ queryKey }) => {
      const [, challengeId] = queryKey;
      return getDraftTranslation(challengeId as string);
    },
  });

  useEffect(() => {
    if (draftData?.status === 200) {
      setIsDrafted(true);
    }
    console.log(draftData, 'draftData');
  }, [draftData]);

  // 번역물 생성 Mutation
  const createTranslationMutation = useMutation({
    mutationFn: createTranslation,
    onSuccess: (data) => {
      setTranslationId(data.data.id);
      setIsSuccessModal(true);
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ErrorResponse>;
      const data = axiosError.response?.data;
      let message = '알 수 없는 에러가 발생했어요.';

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

        // fieldErrors가 있는 경우
        else if (messageObj.fieldErrors) {
          const fieldMessages = Object.entries(messageObj.fieldErrors)
            .map(([field, errors]) => `${errors.join('\n')}`)
            .join('\n');
          message = fieldMessages;
        }
      }
      if (
        message ===
        '이미 이 챌린지에 번역물을 제출하셨습니다. 한 챌린지당 하나의 번역물만 제출할 수 있습니다.'
      )
        message = '이미 참여한 챌린지입니다.';
      setErrorMessage(message);
      setIsErrorModal(true);
    },
  });

  // 임시 저장 번역물 생성 Mutation
  const createDraftMutation = useToastMutation(
    createDraftTranslation,
    {
      pending: '임시저장 중입니다...',
      success: '임시저장 성공!',
      error: '임시저장 실패 😢',
    },
    {
      onSuccess: () => {
        console.log('성공 후 추가 작업');
      },
    },
    'save-translation' // <- toastId (중복 방지용 고유 id)
  );

  return (
    <div className="w-screen h-screen flex flex-col items-center p-2">
      <div className="max-w-[1000px] w-full h-full">
        <div className="mt-6 flex justify-between h-[80px] items-center">
          <div
            onClick={() => {
              setIsForgiveModal(true);
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
                  setIsForgiveModal(true);
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
                  createDraftMutation.mutate({ title, content, challengeId });
                }}
              >
                임시저장
              </Button>
            </div>
            <div className="w-[95px] flex items-center">
              <Button
                category={ButtonCategory.YES}
                size={'py-2 flex'}
                onClick={() => {
                  createTranslationMutation.mutate({
                    title,
                    content,
                    challengeId,
                  });
                }}
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
          isOpen={isDraftModal}
          onClose={() => setIsDraftModal(false)}
          onConfirm={() => {
            setIsDraftModal(false);
            setIsDrafted(false);
          }}
        >
          임시저장 되었습니다!
        </Confirm>
        <Confirm
          isOpen={isErrorModal}
          onClose={() => setIsErrorModal(false)}
          onConfirm={() => {
            setIsErrorModal(false);
          }}
        >
          {errorMessage}
        </Confirm>
        <ConfirmCancel
          isOpen={isDraftQuestionModal}
          onClose={() => setIsDraftQuestionModal(false)}
          onConfirm={() => {
            setIsDraftQuestionModal(false);
            setIsDraftModal(true);
          }}
          onCancel={() => setIsDraftQuestionModal(false)}
        >
          임시저장 하시겠습니까?
        </ConfirmCancel>
        <ConfirmCancel
          isOpen={isForgiveModal}
          onClose={() => setIsForgiveModal(false)}
          onConfirm={() => {
            setIsForgiveModal(false);
            router.push(`/main/challenge/${challengeId}`);
          }}
          onCancel={() => setIsForgiveModal(false)}
        >
          정말 작업을 포기하시겠어요?
        </ConfirmCancel>
        <Navigate
          isOpen={isSuccessModal}
          onClose={() => {}}
          navigateUrl={`/main/translation/${translationId}`}
          text="작업물 보기"
        >
          제출되었습니다!
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
                  setTitle(draftData?.data.data.title);
                  setContent(draftData?.data.data.content);
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
};
export default TranslationWork;
