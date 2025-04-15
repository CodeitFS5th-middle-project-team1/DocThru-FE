import { Chip } from '@/shared/components/chip/chip';
import { Divider } from '@/shared/components/Divider';
import { DocumentType, FieldType } from '@/types';
import menu from '@images/menu-icon/Meatballs.svg';
import Image from 'next/image';
import { useState } from 'react';

interface TitleProps {
  title?: string;
  document?: DocumentType;
  field?: FieldType;
  onModify?: () => void;
  onDelete?: () => void;
  isAdmin: boolean;
  isSameUser: boolean;
}

export const Title: React.FC<TitleProps> = ({
  title,
  document = '블로그',
  field = 'Next.js',
  onModify,
  onDelete,
  isAdmin,
  isSameUser,
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="flex flex-col pt-10 gap-4">
      <div className="w-full flex justify-between  SB-24-0">
        <div>{title}</div>
        <div
          className="relative cursor-pointer"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {(isAdmin || isSameUser) && <Image src={menu} alt="menu" />}
          {openMenu && (
            <div className="flex flex-col R-16-0 absolute right-0  whitespace-nowrap z-10">
              <button
                className="p-2 bg-white rounded-t-lg shadow-md hover: hover:bg-custom-gray-300 transition-colors duration-150 cursor-pointer"
                onClick={onModify}
              >
                수정하기
              </button>
              <Divider />
              <button
                className="p-2 bg-white rounded-b-lg shadow-md hover: hover:bg-custom-gray-300 transition-colors duration-150 cursor-pointer"
                onClick={onDelete}
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <Chip label={field} />
        <Chip label={document} />
      </div>
      <Divider />
    </div>
  );
};
