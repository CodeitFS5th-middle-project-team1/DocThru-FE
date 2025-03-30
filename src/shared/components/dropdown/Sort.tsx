import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import arrowdown from '@/shared/Img/arrow-icon/toggle/down.svg';
import arrowup from '@/shared/Img/arrow-icon/toggle/up.svg';

interface SortProps {
  options: { value: string; name: string }[];
  placeholder: string;
  value?: string;
  defaultValue: string;
  handleChange: (value: string) => void;
  textSize: 'sm' | 'lg';
}

export const Sort: React.FC<SortProps> = ({
  options,
  placeholder,
  value,
  handleChange,
  defaultValue,
  textSize,
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

  const selectBoxStyle =
    'w-full flex flex-row justify-between items-center border-[1px] border-custom-gray-300 rounded-4xl cursor-pointer ';
  const selectOptionStyle =
    'absolute left-0 right-0 min-w-max border-[1px] border-custom-gray-300 bg-white z-10 mt-2 rounded-[8px]';
  return (
    <div
      className={`w-full relative min-w-[140px] min-h-[40px] ${textSize === 'lg' ? 'R-14-0' : 'R-13-0'}`}
    >
      <div
        className={`${selectBoxStyle} p-2 pl-3 pr-2`}
        ref={buttonRef}
        onClick={handleButtonClick}
      >
        {displayValue}
        <Image src={open ? arrowup : arrowdown} alt="toggle icon" />
      </div>

      {open && (
        <div className={selectOptionStyle} ref={dropdownRef}>
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
