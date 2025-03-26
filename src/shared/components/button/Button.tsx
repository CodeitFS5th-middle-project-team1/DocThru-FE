import { ReactNode, ButtonHTMLAttributes } from 'react';
import Image from 'next/image';
import linkIcon from '@images/arrow-icon/normal/link_click.svg';
import watchWorkIcon from '@images/filter-icon/document.svg';
import addIcon from '@images/math-symbols-icon/plus.svg';
import continueIcon from '@images/arrow-icon/normal/right.svg';
import closedIcon from '@images/close.svg';
import feedbackOffIcon from '@images/feedback-icon/inactive.svg';
import feedbackOnIcon from '@images/feedback-icon/active.svg';
import Link from 'next/link';

// export enum ButtonCategory {
//   FILL = "fill",
//   OUTLINE = "outline",
//   SOLID = "solid",
//   TRANSPARENT = "transparent"
//   CONTINUE= "continue"
//   WATCHWORK= "watchWork"
//   NEWCHALLENGE = "newChallenge"
// }

export enum ButtonBorder {
  LITTLE_RECTANGLE = 'littleRectangle',
  LITTLE_RECTANGLE_BORDER = 'littleRectangleBorder',
  RECTANGLE = 'rectangle',
  RECTANGLE_BORDER = 'rectangleBorder',
  ROUND = 'round',
  ROUND_BORDER = 'roundBorder',
}

export enum BGColor {
  RED = 'red',
  YELLOW = 'yellow',
  WHITE = 'white',
  GRAY = 'gray',
  DARK_GRAY = 'darkGary',
  BLACK = 'black',
}

export enum ButtonImg {
  TRANSPARENT = 'transparent',
  WATCHWORK = 'watchWork',
  NEWCHALLENGE = 'newChallenge',
  CONTINUE = 'continue',
  FEEDBACKON = 'feedbackOn',
  FEEDBACKOFF = 'feedbackOff',
}

const ButtonBorderStyle = {
  [ButtonBorder.LITTLE_RECTANGLE]: 'rounded-lg ',
  [ButtonBorder.LITTLE_RECTANGLE_BORDER]:
    'rounded-lg border-2 border-custom-gray-800 ',
  [ButtonBorder.RECTANGLE]: 'rounded-xl ',
  [ButtonBorder.RECTANGLE_BORDER]: 'rounded-xl border-2 border-custom-gray-800',
  [ButtonBorder.ROUND]: 'rounded-4xl',
  [ButtonBorder.ROUND_BORDER]: 'rounded-4xl border-2 border-custom-gray-800',
};

const buttonColorStyle = {
  [BGColor.RED]: 'text-custom-red bg-custom-red-brand',
  [BGColor.YELLOW]:
    'text-sm md:text-base font-semibold  text-custom-gray-800 bg-custom-yellow-brand',
  [BGColor.WHITE]:
    'text-sm md:text-base font-semibold  text-custom-gray-800 bg-custom-white ',
  [BGColor.GRAY]:
    'text-sm md:text-base font-semibold  text-custom-gray-500 bg-custom-gray-200',
  [BGColor.DARK_GRAY]:
    'text-sm md:text-base font-bold text-custom-gray-700 bg-custom-gray-400',
  [BGColor.BLACK]:
    'text-sm md:text-base font-semibold text-custom-white bg-custom-gray-800',
};

const ButtonIconChoice = {
  [ButtonImg.TRANSPARENT]: linkIcon,
  [ButtonImg.WATCHWORK]: watchWorkIcon,
  [ButtonImg.NEWCHALLENGE]: addIcon,
  [ButtonImg.CONTINUE]: continueIcon,
  [ButtonImg.FEEDBACKON]: feedbackOnIcon,
  [ButtonImg.FEEDBACKOFF]: feedbackOffIcon,
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  border: ButtonBorder;
  bgColor: BGColor;
  icon?: ButtonImg;
  children: ReactNode;
  href?: string;
  closeIcon?: boolean;
  onlyIcon?: boolean;
}

export default function Button({
  border,
  bgColor,
  icon,
  href,
  onlyIcon = false,
  children,
  closeIcon = false,
  ...props
}: ButtonProps) {
  const baseStyle = 'w-full px-30 py-3 md:py-3.5 justify-center cursor-pointer';
  const bgColorStyle = buttonColorStyle[bgColor];
  const borderStyle = ButtonBorderStyle[border];
  const iconChoice = icon ? ButtonIconChoice[icon] : null;

  if (href) {
    return (
      <Link
        href={href}
        className={`flex gap-2  justify-center items-center ${baseStyle} ${bgColorStyle} ${borderStyle}`}
      >
        {children}
        <Image src={iconChoice} alt="button Icon" width={16} />
      </Link>
    );
  }
  return (
    <>
      {onlyIcon ? (
        <button {...props}>
          <Image src={iconChoice} alt="feedback icon" width={40} />
        </button>
      ) : (
        <button
          className={`flex gap-2 ${baseStyle} ${bgColorStyle} ${borderStyle} `}
          {...props}
        >
          {children}
          {closeIcon && <Image src={closedIcon} alt="close icon" width={16} />}
        </button>
      )}
    </>
  );
}
