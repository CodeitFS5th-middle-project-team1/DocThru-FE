'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import Logo from '@/shared/Img/logo.svg';
import Button, {
  BGColor,
  ButtonBorder,
} from '@/shared/components/button/Button';

const TranslationWork: NextPage = () => {
  return (
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
                confirm('정말로 포기하시겠습니까?');
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
                alert('임시로 저장되었습니다!');
              }}
            >
              임시저장
            </Button>
          </div>
          <div className="w-[90px] h-[40px]">
            <Button border={ButtonBorder.RECTANGLE} bgColor={BGColor.BLACK} onClick={() => {alert("제출 되었습니다!")}}>
              제출하기
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-5">
          <input className="text-[20px] w-full" />
        </div>
        <hr />
        <div className="mt-5">에디터</div>
      </div>
    </div>
  );
};
export default TranslationWork;
