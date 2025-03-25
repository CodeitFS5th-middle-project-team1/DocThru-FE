interface ChipProps {
  label: string;
}

export const Chip: React.FC<ChipProps> = ({ label }) => {
  const chipStyles: Record<string, string> = {
    'Next.js': 'px-3 py-[3px] bg-[#79E16A] text-custom-gray-600 rounded-lg',
    'Modern JS': 'px-3 py-[3px] bg-[#F66E6B] text-custom-gray-600 rounded-lg',
    API: 'px-3 py-[3px] bg-[#FF905E] text-custom-gray-600 rounded-lg',
    Web: 'px-3 py-[3px] bg-[#F7EA5D] text-custom-gray-600 rounded-lg',
    Career: 'px-3 py-[3px] bg-[#7EB2EE] text-custom-gray-600 rounded-lg',
    공식문서: 'px-[7px] py-[5px] bg-custom-gray-300 text-white rounded-lg',
    블로그: 'px-[7px] py-[5px] bg-custom-gray-300 text-white rounded-lg',
    '승인 대기': 'px-2 py-1 bg-[#FFFDE7] text-[#F2BC00] rounded-sm',
    '신청 거절': 'px-2 py-1 bg-[#FFF0F0] text-[#E54946] rounded-sm',
    '신청 승인': 'px-2 py-1 bg-[#DFF0FF] text-[#4095DE] rounded-sm',
    '챌린지 삭제':
      'px-2 py-1 bg-custom-gray-200 text-custom-gray-500 rounded-sm',
  };
  const chipStyle =
    chipStyles[label] ||
    'px-3 py-[3px] bg-[#79E16A] text-custom-gray-600 rounded-lg';
  return <div className={`${chipStyle}`}>{label}</div>;
};
