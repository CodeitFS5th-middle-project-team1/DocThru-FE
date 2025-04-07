import Image from 'next/image';
import selectorIcon from '@images/menu-icon/Meatballs.svg';
import { useState } from 'react';

export const CardSelector = ({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleAction = (callback: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    callback();
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative w-6 h-6">
        <Image
          src={selectorIcon}
          alt="selector Icon"
          className="absolute right-0"
          onClick={toggleMenu}
        />
        {isOpen && (
          <ul className="absolute  right-0 top-7 text-nowrap bg-white border border-custom-gray-300 rounded-xl z-10 text-sm">
            <li
              onClick={handleAction(onEdit)}
              className="py-3 px-11 text-custom-gray-500 border-b-1 border-custom-gray-300 cursor-pointer "
            >
              수정하기
            </li>
            <li
              onClick={handleAction(onDelete)}
              className="py-3 px-11 text-custom-gray-500  cursor-pointer "
            >
              삭제하기
            </li>
          </ul>
        )}
      </div>
    </>
  );
};
