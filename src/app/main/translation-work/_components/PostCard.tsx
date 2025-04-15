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
import { ErrorResponse, Modal, Translation } from '@/types';
import Button, { ButtonCategory } from '@/shared/components/button/Button';

import { useCreateDraft, useGetDraftTranslation } from '@/api/Translation/hook';
import { useUnloadWarning } from '@/shared/hooks/useUnloadWarning';
import { useMutation } from '@tanstack/react-query';
import { createTranslation, DraftRequest } from '@/api/Translation/api';
import toast from 'react-hot-toast';

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

  const createTranslationMutation = useMutation<
    Translation, // 성공 시 반환 타입
    AxiosError<ErrorResponse>, // 에러 타입
    DraftRequest // 요청 데이터 타입
  >({
    mutationFn: (data: DraftRequest) => createTranslation(data, challengeId),
    onSuccess: (data) => {
      console.log(data);
      setTranslationId(data.id);
      setModal('success');
    },
    onError: (error) => {
      let message = error.message ?? '알 수 없는 이유로 제출하지 못했습니다.';

      try {
        const parsed = JSON.parse(error.message); // 👈 핵심
        const rawMessage = parsed.message;

        if (typeof rawMessage === 'string') {
          message = rawMessage;
        } else if (typeof rawMessage === 'object' && rawMessage !== null) {
          const fieldErrors = rawMessage.fieldErrors;
          const formErrors = rawMessage.formErrors;

          if (fieldErrors?.title?.length > 0) {
            message = fieldErrors.title[0];
          } else if (fieldErrors?.content?.length > 0) {
            message = fieldErrors.content[0];
          } else if (formErrors?.length > 0) {
            message = formErrors.join('\n');
          }
        }
      } catch (e) {
        console.error('❌ 에러 파싱 실패:', e);
      }

      console.log('🔥 최종 메시지:', message);
      setErrorMessage(message);
      setModal('error');
    },
  });

  const { data: draftData, status: draftStatus } =
    useGetDraftTranslation(challengeId);
  const { mutate: createDraftMutation } = useCreateDraft(challengeId);

  const getContentLengthWithTags = (content: string): number => {
    return content.length;
  };

  const length = getContentLengthWithTags(content || '');

  const onHandleCreate = () => {
    if (!title.trim()) return toast.error('제목을 입력해 주세요.');
    if (title.trim().length < 2 || title.trim().length >= 50) {
      return toast.error('제목은 2자 이상 10자 이하로 입력해 주세요.');
    }
    if (!content) return toast.error('본문내용을 입력해 주세요.');

    if (length > 1000) {
      return toast.error('전체 본문 내용은 1000자 이하로 작성해 주세요.');
    }
    createTranslationMutation.mutate({ title, content });
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
          <div className="text-custom-gray-300">{length}/1000</div>
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
        navigateUrl={`/main/translation/${translationId}?challengeId=${challengeId}`}
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
