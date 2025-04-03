import { NextPage } from 'next';
import Image from 'next/image';
import Logo from '@/shared/Img/logo.svg';
import Button from '@/shared/components/button/Button';

const TranslationWork: NextPage = () => {
  return (
    <div className="max-w-[1000px] w-full h-full">
      <div className="mt-6">
        <div>
          <Image
            className={'cursor-pointer'}
            width={120}
            height={27}
            src={Logo}
            alt="logo"
          />
        </div>
        <div>

        </div>
      </div>
    </div>
  );
};
export default TranslationWork;
