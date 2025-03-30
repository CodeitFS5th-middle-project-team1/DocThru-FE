import { NextPage } from 'next';
import mainLogo from '@images/logo-icon/mainLogo.svg';
import textLogo from '@images/logo-icon/textLogo.svg';
import Image from 'next/image';
import Button, {
  BGColor,
  ButtonBorder,
} from '@/shared/components/button/Button';
import Link from 'next/link';

const Login: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center px-4 md:px-28   gap-10 ">
      <section>
        <Link
          href={'/'}
          className="flex justify-center items-center pt-32 gap-3.5"
        >
          <Image src={mainLogo} alt="main logo" width={46} height={54} />
          <Image src={textLogo} alt="text logo" width={229} height={82} />
        </Link>
      </section>

      <div className="flex flex-col justify-center w-full md:w-lg gap-6">
        <section className="flex flex-col gap-2">
          <p className="text-sm font-medium text-custom-gray-900">이메일</p>
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            className="flex px-7 border border-custom-gray-200 rounded-xl bg-white py-3.5"
          ></input>
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-sm font-medium text-custom-gray-900">비밀번호</p>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="flex px-7 border border-custom-gray-200 rounded-xl bg-white py-3.5"
          ></input>
        </section>

        <section>
          <Button
            border={ButtonBorder.LITTLE_RECTANGLE}
            bgColor={BGColor.BLACK}
          >
            로그인
          </Button>
        </section>

        <section className="flex gap-2 justify-center  ">
          <p className="text-base font-normal text-custom-gray-600">
            회원이 아니신가요?
          </p>
          <Link
            href={'/auth/signup'}
            className="text-base text-custom-gray-800 font-normal underline"
          >
            회원가입하기
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Login;
