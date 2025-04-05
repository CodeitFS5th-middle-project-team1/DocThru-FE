'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import Logo from '@/shared/Img/logo.svg';
import Close from '@/shared/Img/close-icon/close.svg';
import Button, {
  BGColor,
  ButtonBorder,
} from '@/shared/components/button/Button';
import { useEffect, useState } from 'react';
import ConfirmCancel from '@/shared/components/modal/confirmCancel';
import Navigate from '@/shared/components/modal/navigate';
import Editor from './_components/Editor';
import Confirm from '@/shared/components/modal/confirm';
import { useRouter } from 'next/navigation';
import { docThro } from '@/api/url';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const TranslationWork: NextPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isDrafted, setIsDrafted] = useState(true);
  const [isDraftModal, setIsDraftModal] = useState(false);
  const [isDraftQuestionModal, setIsDraftQuestionModal] = useState(false);
  const [isForgiveModal, setIsForgiveModal] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const [challengeId, setChallengeId] = useState<string | null>(null);
  useEffect(() => {
    setChallengeId(localStorage.getItem('challengeId'));
  }, []);
  console.log(challengeId);

  const createTranslation = async ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => {
    const response = await docThro.post(
      `/challenges/${challengeId}/translations`,
      {
        title,
        content,
      }
    );
    return response;
  };
  type ErrorMessage = {
    formErrors?: string[]; // 배열임
    fieldErrors?: Record<string, string[]>;
  };

  type ErrorResponse = {
    code?: number;
    message?: string | ErrorMessage;
  };

  const mutation = useMutation({
    mutationFn: createTranslation,
    onSuccess: (data) => {
      setIsSuccessModal(true);
      console.log('성공', data);
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
          console.log("test")
        }
      }
      if(message === "이미 이 챌린지에 번역물을 제출하셨습니다. 한 챌린지당 하나의 번역물만 제출할 수 있습니다.") message = "이미 참여한 챌린지입니다."
      setErrorMessage(message);
      setIsErrorModal(true);
    },
  });

  return (
    <div className="w-screen h-screen flex flex-col items-center p-2">
      <div className="max-w-[1000px] w-full h-full">
        <div className="mt-6 flex justify-between h-[80px] items-center">
          <div
            onClick={() => {
              router.push('/main/challenge');
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
          <div className="flex gap-2 h-[40px]">
            <div className="w-[81px]">
              <Button
                border={ButtonBorder.RECTANGLE}
                bgColor={BGColor.RED}
                closeIcon={true}
                onClick={() => {
                  setIsForgiveModal(true);
                }}
              >
                포기
              </Button>
            </div>
            <div className="w-[90px]">
              <Button
                border={ButtonBorder.RECTANGLE_BORDER}
                bgColor={BGColor.WHITE}
                onClick={() => {
                  setIsDraftModal(true);
                }}
              >
                임시저장
              </Button>
            </div>
            <div className="w-[90px] h-[40px]">
              <Button
                border={ButtonBorder.RECTANGLE}
                bgColor={BGColor.BLACK}
                onClick={() => {
                  mutation.mutate({ title, content });
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
            router.push('/main/challenge');
          }}
          onCancel={() => setIsForgiveModal(false)}
        >
          정말 작업을 포기하시겠어요?
        </ConfirmCancel>
        <Navigate
          isOpen={isSuccessModal}
          onClose={() => {}}
          navigateUrl={`/main/challenge/${challengeId}`}
          text="작업물 보기"
        >
          제출되었습니다!
        </Navigate>
        {isDrafted && (
          <div className="border border-[#262626] rounded-[8px] fixed left-1/2 top-[90%] transform -translate-x-1/2 z-30 max-w-[750px] w-full flex justify-between items-center px-5">
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
            <div className="w-[90px]">
              <Button
                border={ButtonBorder.RECTANGLE}
                bgColor={BGColor.BLACK}
                onClick={() => {
                  setIsDraftQuestionModal(true);
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
