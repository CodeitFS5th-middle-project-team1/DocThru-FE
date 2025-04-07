import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import Image from 'next/image';
import linkIcon from '@images/arrow-icon/normal/link_click.svg';
import watchWorkIcon from '@images/filter-icon/document.svg';
import addIcon from '@images/math-symbols-icon/plus.svg';
import continueIcon from '@images/arrow-icon/normal/right.svg';
import closedIcon from '@images/close.svg';
import feedbackOffIcon from '@images/feedback-icon/inactive.svg';
import feedbackOnIcon from '@images/feedback-icon/active.svg';
import Link from 'next/link';

export enum ButtonCategory {
  Auth = 'auth',
  NEW_CHALLENGE = 'newChallenge',
  EDIT = 'edit',
  RESET = 'reset',
  APPLY = 'apply',
  CONTINUE = 'continue',
  MY_WORK = 'myWork',
  LINK = 'link',
  CANCEL = 'cancel',
  YES = 'yes',
  NO = 'no',
  DISABLE = 'disable',
  TO_DO_WORK = 'toDoWork',
  WATCH_MORE = 'watchMore',
  FEEDBACK_ON = 'feedBackOn',
  FEEDBACK_OFF = 'feedBackOff',
  DRAFT = 'draft',
  SUBMIT = 'submit',
  DROP = 'drop',
  LOAD = 'load',
  APPROVE = 'approve',
  REJECT = 'reject',
  MODIFY = 'modify',
  VIEW_ORIGINAL = 'viewOriginal',
}

const ButtonPreset = {
  [ButtonCategory.Auth]: {
    className:
      'text-sm md:text-base font-semibold text-custom-white bg-custom-gray-800 rounded-xl',
    icon: null,
  },
  [ButtonCategory.NEW_CHALLENGE]: {
    className:
      'text-sm md:text-base font-semibold text-custom-white bg-custom-gray-800 rounded-4xl',
    icon: addIcon,
  },
  [ButtonCategory.EDIT]: {
    className:
      'text-sm md:text-base font-semibold text-custom-white bg-custom-gray-800 rounded-xl',
    icon: null,
  },
  [ButtonCategory.RESET]: {
    className:
      'text-sm  font-semibold text-nowrap text-custom-gray-800 bg-custom-white rounded-xl border-1 border-custom-gray-800',
    icon: null,
  },
  [ButtonCategory.APPLY]: {
    className:
      'text-sm md:text-base font-semibold text-custom-white bg-custom-gray-800 rounded-xl',
    icon: null,
  },
  [ButtonCategory.CONTINUE]: {
    className:
      'text-sm  font-semibold text-nowrap text-custom-gray-800 bg-custom-white rounded-4xl border-1 border-custom-gray-800',
    icon: continueIcon,
  },
  [ButtonCategory.MY_WORK]: {
    className:
      'text-sm md:text-base font-semibold  text-custom-gray-500 bg-custom-gray-200 rounded-4xl',
    icon: watchWorkIcon,
  },
  [ButtonCategory.LINK]: {
    className:
      'text-sm md:text-base font-bold text-custom-gray-700 bg-custom-gray-400 rounded-xl',
    icon: linkIcon,
  },
  [ButtonCategory.CANCEL]: {
    className:
      'text-sm  font-semibold text-nowrap text-custom-gray-800 bg-custom-white border-custom-gray-300 rounded-lg',
    icon: null,
  },
  [ButtonCategory.YES]: {
    className:
      'text-sm md:text-base font-semibold text-custom-white bg-custom-gray-800 border-custom-gray-300 rounded-xl',
    icon: null,
  },
  [ButtonCategory.NO]: {
    className:
      'text-sm  font-semibold text-nowrap text-custom-gray-800 bg-custom-white border-custom-gray-300 rounded-xl border-1 border-custom-gray-800',
    icon: null,
  },
  [ButtonCategory.DISABLE]: {
    className:
      'text-sm md:text-base font-semibold  text-custom-gray-500 bg-custom-gray-200  rounded-xl cursor-not-allowed pointer-events-none',
    icon: null,
  },
  [ButtonCategory.TO_DO_WORK]: {
    className:
      'text-sm md:text-base font-semibold text-custom-white bg-custom-gray-800 border-custom-gray-300 rounded-xl',
    icon: null,
  },
  [ButtonCategory.WATCH_MORE]: {
    className:
      'text-sm md:text-base font-medium  text-custom-gray-500 bg-[#f5f5f5]  rounded-xl',
    icon: null,
  },
  [ButtonCategory.FEEDBACK_ON]: {
    className: '',
    icon: feedbackOnIcon,
  },
  [ButtonCategory.FEEDBACK_OFF]: {
    className: '',
    icon: feedbackOffIcon,
  },
  [ButtonCategory.DRAFT]: {
    className:
      'text-sm md:text-base  font-semibold text-nowrap text-custom-gray-800 bg-custom-white border-custom-gray-300 rounded-xl border-1 border-custom-gray-800 ',
    icon: null,
  },
  [ButtonCategory.DROP]: {
    className:
      'text-sm md:text-base text-custom-red bg-custom-red-brand rounded-xl',
    icon: closedIcon,
  },
  [ButtonCategory.SUBMIT]: {
    className:
      'text-sm md:text-base font-semibold text-custom-white bg-custom-gray-800 border-custom-gray-300 rounded-xl',
    icon: null,
  },
  [ButtonCategory.LOAD]: {
    className:
      'text-sm md:text-base font-semibold text-custom-white bg-custom-gray-800 border-custom-gray-300 rounded-xl',
    icon: null,
  },
  [ButtonCategory.APPROVE]: {
    className:
      'text-sm md:text-base font-semibold text-custom-white bg-custom-gray-800 border-custom-gray-300 rounded-xl',
    icon: null,
  },
  [ButtonCategory.REJECT]: {
    className:
      'text-sm md:text-base text-custom-red bg-custom-red-brand rounded-xl',
    icon: null,
  },
  [ButtonCategory.MODIFY]: {
    className:
      'text-sm md:text-base font-semibold text-custom-white bg-custom-gray-800 border-custom-gray-300 rounded-xl',
    icon: null,
  },
  [ButtonCategory.VIEW_ORIGINAL]: {
    className:
      'text-sm md:text-base font-semibold text-custom-gray-800 bg-custom-yellow-brand border-2 border-custom-gray-800 rounded-xl',
    icon: null,
  },
};

type AnchorProps = {
  href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type NativeButtonProps = {
  href?: never;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type CommonProps = {
  category: ButtonCategory;
  size?: string;
  iconW?: number;
  iconH?: number;
  iconAlt?: string;
  children?: ReactNode;
};

export type ButtonProps = CommonProps & (AnchorProps | NativeButtonProps);

export default function Button({
  category,
  size = 'py-1 px-4',
  iconW = 16,
  iconH = 16,
  iconAlt,

  children,
  ...props
}: ButtonProps) {
  const baseStyle = `w-full  justify-center items-center cursor-pointer`;
  const preset = ButtonPreset[category];
  const finalStyle = `${baseStyle} ${preset.className} ${size} `;

  const iconSrc = preset.icon;

  const iconElement = iconSrc && (
    <Image src={iconSrc} alt={`${iconAlt} icon`} width={iconW} height={iconH} />
  );

  const Content = (
    <>
      {iconSrc && children && (
        <span className="flex items-center  gap-2">
          {children}
          {iconElement}
        </span>
      )}
      {!iconSrc && children && children}
      {iconSrc && !children && iconElement}
    </>
  );

  if ('href' in props && props.href) {
    const { href, ...linkProps } = props;

    return (
      <Link href={href} className={finalStyle} {...linkProps}>
        {Content}
      </Link>
    );
  }
  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={finalStyle} {...buttonProps}>
      {Content}
    </button>
  );
}
