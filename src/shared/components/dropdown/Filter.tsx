import Image from 'next/image';
import { useState } from 'react';
import filterWhite from '@/shared/Img/filter-icon/normal/active.svg';
import filterDark from '@/shared/Img/filter-icon/normal/inactive.svg';
import close from '@/shared/Img/out-icon/out.svg';
import { CheckBox } from '../CheckBox';
import { Divider } from '../Divider';
import { RadioBtn } from '../RadioBtn';
interface FilterProps {
  options?: { value: string; name: string }[];
  handleChange?: (value: string) => void;
  textSize?: 'sm' | 'lg';
}

export const Filter: React.FC<FilterProps> = ({
  options,
  handleChange,
  textSize,
}) => {
  const [open, setOpen] = useState(false);
  const [checkBoxList, setCheckBoxList] = useState<string[]>([]);
  const [documentType, setDocumentType] = useState<string>('');
  const [staus, setStatus] = useState<string>('');
  const addCheckBoxList = (value: string) => {
    setCheckBoxList((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  const handleButtonClick = () => {
    setOpen((prev) => !prev);
  };

  const selectBoxStyle =
    'flex flex-row justify-between items-center border-[1px] border-custom-gray-300 rounded-4xl cursor-pointer ';
  const selectOptionStyle =
    'w-[343px] absolute border-[2px] border-custom-gray-200 bg-white z-10 mt-2 rounded-[8px] py-4 px-4';

  return (
    <div
      className={`w-[140px] h-10 relative ${textSize === 'lg' ? 'R-14-0' : 'R-13-0'}`}
    >
      <div
        className={`${selectBoxStyle} p-2 pl-3 pr-2 color ${checkBoxList.length ? 'bg-custom-gray-800 text-custom-gray-50' : 'text-custom-gray-400'}`}
        onClick={handleButtonClick}
      >
        {'필터'}
        <Image
          src={checkBoxList.length ? filterWhite : filterDark}
          alt="toggle icon"
        />
      </div>

      {open && (
        <div className={selectOptionStyle}>
          <div className="flex flex-col gap-2 p-2">
            <div className="SB-16-0 flex justify-between items-center">
              필터
              <Image
                src={close}
                width={24}
                height={24}
                alt="close Icon"
                className="cursor-pointer"
                onClick={handleButtonClick}
              />
            </div>

            <div className="SB-14-0">분야</div>
            <CheckBox
              name="Next.JS"
              value="Next.JS"
              hendleChange={addCheckBoxList}
              checked={checkBoxList.includes('Next.JS')}
            />
            <CheckBox
              name="Modern JS"
              value="Modern JS"
              hendleChange={addCheckBoxList}
            />
            <CheckBox name="Web" value="Web" hendleChange={addCheckBoxList} />
            <CheckBox
              name="Career"
              value="Career"
              hendleChange={addCheckBoxList}
            />
            <Divider />
            <div className="SB-14-0">문서타입</div>
            <RadioBtn
              id="공식문서"
              groupName="문서타입"
              value={1}
              name="공식문서"
            />
            <RadioBtn
              id="블로그"
              groupName="문서타입"
              value={2}
              name="블로그"
            />
            <Divider />
            <div className="SB-14-0">상태</div>
            <RadioBtn id="진생중" groupName="상태" value={1} name="진행중" />
            <RadioBtn id="마감" groupName="상태" value={2} name="마감" />
            <div className="flex justify-between items-center mt-2">
              <button>초기화</button>
              <button>적용하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
