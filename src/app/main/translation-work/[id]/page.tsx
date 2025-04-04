'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import Logo from '@/shared/Img/logo.svg';
import Close from '@/shared/Img/close-icon/close.svg';
import Button, {
  BGColor,
  ButtonBorder,
} from '@/shared/components/button/Button';
import { useState } from 'react';
import ConfirmCancel from '@/shared/components/modal/confirmCancel';
import Navigate from '@/shared/components/modal/navigate';
import Editor from '../_components/Editor';
import Confirm from '@/shared/components/modal/confirm';

const TranslationWork: NextPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isDrafted, setIsDrafted] = useState(false);
  const [isDraftModal, setIsDraftModal] = useState(false);
  const [isForgiveModal, setIsForgiveModal] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <div className="max-w-[1000px] w-full h-full">
        <div className="mt-6 flex justify-between h-[80px] items-center">
          <div>
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
                  setIsSuccessModal(true);
                }}
              >
                수정하기
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-5">
            <input
              className="text-[20px] w-full"
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
        <ConfirmCancel
          isOpen={isForgiveModal}
          onClose={() => setIsForgiveModal(false)}
          onConfirm={() => {
            setIsForgiveModal(false);
          }}
          onCancel={() => setIsForgiveModal(false)}
        >
          정말 작업을 포기하시겠어요?
        </ConfirmCancel>
        <Navigate
          isOpen={isSuccessModal}
          onClose={() => {}}
          navigateUrl="/main"
          text="작업물 보기"
        >
          수정되었습니다!
        </Navigate>
        {isDrafted && (
          <div className="border border-[#262626] rounded-[8px] fixed left-1/2 top-[90%] transform -translate-x-1/2 z-30 max-w-[890px] w-full flex justify-between items-center px-5">
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
                  setIsDraftModal(true);
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
