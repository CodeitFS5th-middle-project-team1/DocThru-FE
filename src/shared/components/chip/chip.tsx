interface ChipProps {
  label:
    | 'Next.js'
    | 'Modern JS'
    | 'API'
    | 'Web'
    | 'Career'
    | '공식문서'
    | '블로그'
    | '승인 대기'
    | '신청 거절'
    | '신청 승인'
    | '챌린지 삭제';
}

export const Chip: React.FC<ChipProps> = ({ label }) => {
  const chipStyles: Record<string, string> = {
    'Next.js':
      'w-fit px-3 py-[3px] bg-[#79E16A] text-custom-gray-600 rounded-lg',
    'Modern JS':
      'w-fit px-3 py-[3px] bg-[#F66E6B] text-custom-gray-600 rounded-lg',
    API: 'w-fit px-3 py-[3px] bg-[#FF905E] text-custom-gray-600 rounded-lg',
    Web: 'w-fit px-3 py-[3px] bg-[#F7EA5D] text-custom-gray-600 rounded-lg',
    Career: 'w-fit px-3 py-[3px] bg-[#7EB2EE] text-custom-gray-600 rounded-lg',
    공식문서:
      'w-fit px-[7px] py-[5px] bg-custom-gray-300 text-white rounded-lg',
    블로그: 'w-fit px-[7px] py-[5px] bg-custom-gray-300 text-white rounded-lg',
    '승인 대기': 'w-fit px-2 py-1 bg-[#FFFDE7] text-[#F2BC00] rounded-sm',
    '신청 거절': 'w-fit px-2 py-1 bg-[#FFF0F0] text-[#E54946] rounded-sm',
    '신청 승인': 'w-fit px-2 py-1 bg-[#DFF0FF] text-[#4095DE] rounded-sm',
    '챌린지 삭제':
      'w-fit px-2 py-1 bg-custom-gray-200 text-custom-gray-500 rounded-sm',
  };

  const chipStyle =
    chipStyles[label] ||
    'px-3 py-[3px] bg-[#79E16A] text-custom-gray-600 rounded-lg';
  return <div className={`${chipStyle}`}>{label}</div>;
};
