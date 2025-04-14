import { ReactNode, ButtonHTMLAttributes } from 'react';

export enum TextPosition {
  TOP = 'top',
  MIDDLE = 'middle',
}

export enum TabActive {
  ON = 'on',
  OFF = 'off',
}

const TabTextStyle = {
  [TextPosition.TOP]: 'px-2 py-5 md:px-4 text-sm md:text-base font-semibold  ',
  [TextPosition.MIDDLE]:
    'px-2 py-3.5  md:px-6 md:py-4 text-base md:text-lg font-semibold ',
};

const TabColorStyle = {
  [TabActive.ON]: 'text-custom-gray-800',
  [TabActive.OFF]: 'text-custom-gray-500',
};

interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  position: TextPosition;
  isActive: TabActive;
  children: ReactNode;
}

export const Tab = ({ position, isActive, children, ...props }: TabProps) => {
  const baseStyle = TabTextStyle[position];
  const TextColorStyle = TabColorStyle[isActive];
  const borderStyle =
    position === TextPosition.MIDDLE && isActive === TabActive.ON
      ? 'border-b-2 border-custom-gray-800'
      : '';
  const fullClassName =
    `cursor-pointer ${baseStyle} ${TextColorStyle} ${borderStyle}`.trim();

  if (position === 'top') {
    return (
      <button className={fullClassName} {...props}>
        {children}
      </button>
    );
  }
  return (
    <button className={fullClassName} {...props}>
      {children}
    </button>
  );
};
