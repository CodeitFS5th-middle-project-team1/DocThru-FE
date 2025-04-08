'use client';
import Image from 'next/image';
import Logo from '@/shared/Img/logo.svg';
import Close from '@/shared/Img/close-icon/close.svg';
import { useEffect, useState } from 'react';
import ConfirmCancel from '@/shared/components/modal/confirmCancel';
import Navigate from '@/shared/components/modal/navigate';
import Editor from '../_components/Editor';
import Confirm from '@/shared/components/modal/confirm';
import { notFound, useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorMessage, ErrorResponse, Modal } from '@/types';
import {
  createDraftTranslation,
  createTranslation,
  getDraftTranslation,
} from '@/api/TransLationApi';
import Button, { ButtonCategory } from '@/shared/components/button/Button';
import { useUnloadWarning } from '@/shared/hooks/useUnloadWarning';
import { useToastMutation } from '@/shared/hooks/useToastMutation';
import { OriginView } from '@/shared/components/OriginView';
export default function PostCard () {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string | null>(null);
  const [isDrafted, setIsDrafted] = useState(false);
  const [modal, setModal] = useState<Modal>('none');
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

  useUnloadWarning(content !== '' && !(modal === 'success'));

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
      setModal('success');
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ErrorResponse>;
      if(axiosError.status === 500 || axiosError.status === 404){
        setErrorMessage("서버 요청 에러 발생!");
        setModal("error");
      }
      else{
        setErrorMessage("제목은 최소 1자 이상 최대 50자 이하로 입력해주세요.\n내용은 1000자 이하로 입력해주세요.");
        setModal("error");
      }
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
      <div className="max-w-[1000px] w-full h-full">
        <div className="mt-6 flex justify-between h-[80px] items-center">
          <div
            onClick={() => {
              setModal('forgive')
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
                  setModal('forgive')
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
            setModal('none')
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
  );
}