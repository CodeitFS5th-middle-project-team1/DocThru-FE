import clickIcon from '@/shared/Img/icon_click.svg';
import Image from 'next/image';

interface OriginViewProps {
  width?: string;
  height?: string;
  className?: string;
  originUrl?: string;
}

export const OriginView = ({
  width = '500px',
  height = '500px',
  className,
  originUrl = 'https://nextjs-ko.org/docs',
}: OriginViewProps) => {
  return (
    <div className="relative" style={{ width, height }}>
      {/* 오른쪽 상단 버튼 */}
      <div onClick={() => window.open(`${originUrl}`, '_blank', 'noopener,noreferrer') } className="bg-[#f6f8facb] absolute top-2 right-6 z-10 flex items-center gap-2 rounded-[12px] font-bold shadow-md hover:bg-[#eaeef2] text-[#404040] px-3 py-1 text-sm cursor-pointer">
        <div>링크 열기</div>
        <Image src={clickIcon} alt="클릭 이미지" width={24} height={24} />
      </div>

      {/* iframe */}
      <iframe
        src={originUrl}
        width="100%"
        height="100%"
        title="원본 보기"
        className={`${className}`}
      />
    </div>
  );
};
