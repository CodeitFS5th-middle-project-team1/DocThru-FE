import { DocumentType, FieldType } from '@/types';

interface ChipProps {
  label:
    | string
    | DocumentType
    | FieldType
    | '승인 대기'
    | '신청 거절'
    | '신청 승인'
    | '챌린지 삭제';
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({ label, className }) => {
  const chipTypeStyle = 'B-14-0 w-fit px-3 py-[3px] rounded-lg';
  const chipCategoryStyle =
    'R-13-0 w-fit px-[7px] py-[5px] bg-custom-gray-300 text-white rounded-lg boder-[1px] border-custom-gray-300';
  const chipStatusStyle = 'SB-13-0 w-fit px-2 py-1 rounded-sm';
  const chipStyles: Record<string, string> = {
    'Next.js': `${chipTypeStyle} bg-[#79E16A] text-custom-gray-600 `,
    'Modern JS': `${chipTypeStyle} bg-[#F66E6B] text-custom-gray-600 `,
    API: `${chipTypeStyle} bg-[#FF905E] text-custom-gray-600 `,
    Web: `${chipTypeStyle} bg-[#F7EA5D] text-custom-gray-600 `,
    Career: `${chipTypeStyle} bg-[#7EB2EE] text-custom-gray-600 `,
    공식문서: chipCategoryStyle,
    블로그: chipCategoryStyle,
    '승인 대기': `${chipStatusStyle} bg-[#FFFDE7] text-[#F2BC00]`,
    '신청 거절': `${chipStatusStyle} bg-[#FFF0F0] text-[#E54946]`,
    '신청 승인': `${chipStatusStyle} bg-[#DFF0FF] text-[#4095DE]`,
    '챌린지 삭제': `${chipStatusStyle} bg-custom-gray-200 text-custom-gray-500`,
  };

  const chipStyle =
    chipStyles[label] ??
    'px-3 py-[3px] bg-[#79E16A] text-custom-gray-600 rounded-lg';
  return (
    <div className={`disabled:true ${chipStyle} ${className}`}>{label}</div>
  );
};
