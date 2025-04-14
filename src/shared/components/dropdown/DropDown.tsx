'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import arrowdown from '@/shared/Img/arrow-icon/toggle/down.svg';
import arrowup from '@/shared/Img/arrow-icon/toggle/up.svg';

interface DropDowntProps {
  options: { value: string; name: string }[];
  value?: string;
  handleChange: (value: string) => void;
  defaultValue?: string;
  placeholder: string;
}

export const DropDown: React.FC<DropDowntProps> = ({
  options,
  value,
  handleChange,
  defaultValue,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find((option) => option.value === value);
  const defaultOption = options.find((option) => option.value === defaultValue);
  const displayValue = selectedOption
    ? selectedOption.name
    : defaultOption
      ? defaultOption.name
      : placeholder || '선택';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleButtonClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="w-full relative ">
      <div
        className="w-full flex flex-row justify-between py-2 pl-4 items-center border-[1px] border-custom-gray-200 rounded-sm p-2 cursor-pointer"
        ref={buttonRef}
        onClick={handleButtonClick}
      >
        {displayValue}
        <Image src={open ? arrowup : arrowdown} alt="toggle icon" />
      </div>

      {open && (
        <div
          className="absolute left-0 right-0 min-w-max border-[1px] border-custom-gray-300 bg-white z-10 mt-2 rounded-[8px]"
          ref={dropdownRef}
        >
          {options.map((d, idx) => (
            <div className="w-full" key={d.value}>
              <button
                className="w-full text-center p-3 hover:bg-gray-100"
                onClick={() => {
                  handleChange(d.value);
                  setOpen(false);
                }}
              >
                {d.name}
              </button>
              {idx < options.length - 1 && (
                <div className="w-full h-[1px] bg-custom-gray-300" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
