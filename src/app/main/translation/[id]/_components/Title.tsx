import { Chip } from '@/shared/components/chip/chip';
import { Divider } from '@/shared/components/Divider';
import { DocumentType, FieldType } from '@/types';
import menu from '@images/menu-icon/Meatballs.svg';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface TitleProps {
  title?: string;
  documentProp?: DocumentType;
  field?: FieldType;
  onModify?: () => void;
  onDelete?: () => void;
  isAdmin: boolean;
  isSameUser: boolean;
}

export const Title: React.FC<TitleProps> = ({
  title,
  documentProp = '블로그',
  field = 'Next.js',
  onModify,
  onDelete,
  isAdmin,
  isSameUser,
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(false);
      }
    };
    if (openMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenu]);

  return (
    <div className="flex flex-col pt-10 gap-4">
      <div className="w-full flex justify-between  SB-24-0">
        <div>{title}</div>
        <div
          ref={modalRef}
          className="relative cursor-pointer"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {(isAdmin || isSameUser) && <Image src={menu} alt="menu" />}
          {openMenu && (
            <ul className="absolute  right-0 top-7 text-nowrap bg-white border border-custom-gray-300 rounded-xl z-10 text-sm">
              <li
                onClick={onModify}
                className="py-3 px-11 text-custom-gray-500 border-b-1 border-custom-gray-300 cursor-pointer "
              >
                수정하기
              </li>
              <li
                onClick={onDelete}
                className="py-3 px-11 text-custom-gray-500  cursor-pointer "
              >
                삭제하기
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <Chip label={field} />
        <Chip label={documentProp} />
      </div>
      <Divider />
    </div>
  );
};
