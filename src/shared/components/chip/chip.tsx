import {
  DocumentType,
  FieldType,
  ApprovalStatusLabels,
  ApprovalStatus,
} from '@/types';

type ApprovalStatusLabelType = (typeof ApprovalStatusLabels)[ApprovalStatus];

interface ChipProps {
  label:
    | string
    | DocumentType
    | FieldType
    | ApprovalStatusLabelType
    | undefined;
  className?: string;
}
export const Chip: React.FC<ChipProps> = ({ label, className }) => {
  const chipTypeStyle =
    'flex B-14-0 w-fit px-3 py-[3px] rounded-lg items-center whitespace-nowrap';
  const chipCategoryStyle =
    'flex R-13-0 w-fit px-[7px] py-[5px] text-custom-gray-600 rounded-lg border-[1px] border-custom-gray-300 items-center whitespace-nowrap';
  const translatedLabel = (() => {
    if (label === 'BLOG' || label === '블로그') return '블로그';
    if (label === 'OFFICIAL' || label === '공식문서') return '공식문서';
    if (label === 'NEXTJS' || label === 'Next.js') return 'Next.js';
    if (label === 'Modern JS' || label === 'MODERNJS') return 'Modern JS';
    return label;
  })();

  const chipStatusStyle =
    'SB-13-0 w-fit px-2 py-1 rounded-sm  whitespace-nowrap';
  const chipStyles: Record<string, string> = {
    'Next.js': `${chipTypeStyle} bg-[#79E16A] text-custom-gray-600 `,
    'Modern JS': `${chipTypeStyle} bg-[#F66E6B] text-custom-gray-600 `,
    API: `${chipTypeStyle} bg-[#FF905E] text-custom-gray-600 `,
    WEB: `${chipTypeStyle} bg-[#F7EA5D] text-custom-gray-600 `,
    Career: `${chipTypeStyle} bg-[#7EB2EE] text-custom-gray-600 `,
    OFFICIAL: chipCategoryStyle,
    공식문서: chipCategoryStyle,
    블로그: chipCategoryStyle,
    [ApprovalStatusLabels.PENDING]: `${chipStatusStyle} bg-[#FFFDE7] text-[#F2BC00]`,
    [ApprovalStatusLabels.REJECTED]: `${chipStatusStyle} bg-[#FFF0F0] text-[#E54946]`,
    [ApprovalStatusLabels.APPROVED]: `${chipStatusStyle} bg-[#DFF0FF] text-[#4095DE]`,
    [ApprovalStatusLabels.DELETED]: `${chipStatusStyle} bg-custom-gray-200 text-custom-gray-500`,
  };

  const chipStyle =
    chipStyles[translatedLabel ?? ''] ??
    'flex px-3 py-[3px] bg-[#79E16A] text-custom-gray-600 rounded-lg ';
  return <div className={` ${chipStyle} ${className}`}>{translatedLabel}</div>;
};
