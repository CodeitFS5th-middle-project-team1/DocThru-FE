import Image from 'next/image';
import { useState } from 'react';
import filterWhite from '@/shared/Img/filter-icon/normal/active.svg';
import filterDark from '@/shared/Img/filter-icon/normal/inactive.svg';
import close from '@/shared/Img/out-icon/out.svg';
import { CheckBox } from '../CheckBox';
import { Divider } from '../Divider';
import { RadioBtn } from '../RadioBtn';
import Button, { BGColor, ButtonBorder } from '../button/Button';
interface FilterProps {
  options?: { value: string; name: string }[];
  handleChange?: (value: string) => void;
  textSize?: 'sm' | 'lg';
}

export const Filter: React.FC<FilterProps> = ({ textSize }) => {
  const [open, setOpen] = useState(false);
  const [checkBoxList, setCheckBoxList] = useState<string[]>([]);
  const [documentType, setDocumentType] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [filterCount, setFilterCount] = useState<number>(0);
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

  const handleReset = () => {
    setCheckBoxList([]);
    setDocumentType('');
    setStatus('');
    setFilterCount(0);
    setOpen(false);
  };
  const selectBoxStyle =
    'flex flex-row justify-between items-center border-[1px] border-custom-gray-300 rounded-4xl cursor-pointer ';
  const selectOptionStyle =
    'w-[343px] absolute border-[2px] border-custom-gray-200 bg-white z-10 mt-2 rounded-[8px] py-4 px-4';

  const handleApply = () => {
    let count = 0;
    if (documentType !== '') count += 1;
    if (status !== '') count += 1;
    if (checkBoxList.length !== 0) count += checkBoxList.length;

    setFilterCount(count);

    setOpen(false);
  };

  return (
    <div
      className={`w-[140px] h-10 relative ${textSize === 'lg' ? 'R-14-0' : 'R-13-0'}`}
    >
      <div
        className={`${selectBoxStyle} p-2 pl-3 pr-2 color ${filterCount !== 0 ? 'bg-custom-gray-800 text-custom-gray-50' : 'text-custom-gray-400'}`}
        onClick={handleButtonClick}
      >
        {`필터  ${filterCount !== 0 ? filterCount : ''}`}
        <Image
          src={filterCount !== 0 ? filterWhite : filterDark}
          alt="toggle icon"
        />
      </div>

      {open && (
        <div className={selectOptionStyle}>
          <div className="flex flex-col gap-2 p-2">
            <div className="SB-16-0 flex justify-between items-center">
              {'필터'}
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
              handleChange={addCheckBoxList}
              checked={checkBoxList.includes('Next.JS')}
            />
            <CheckBox
              name="Modern JS"
              value="Modern JS"
              handleChange={addCheckBoxList}
              checked={checkBoxList.includes('Modern JS')}
            />
            <CheckBox
              name="Web"
              value="Web"
              handleChange={addCheckBoxList}
              checked={checkBoxList.includes('Web')}
            />
            <CheckBox
              name="Career"
              value="Career"
              handleChange={addCheckBoxList}
              checked={checkBoxList.includes('Career')}
            />
            <Divider />
            <div className="SB-14-0">문서타입</div>
            <RadioBtn
              id="공식문서"
              groupName="문서타입"
              value={'official document'}
              name="공식문서"
              onChange={(e) => setDocumentType(e.target.value)}
              checked={documentType === 'official document'}
            />
            <RadioBtn
              id="블로그"
              groupName="문서타입"
              value={'blog'}
              name="블로그"
              onChange={(e) => setDocumentType(e.target.value)}
              checked={documentType === 'blog'}
            />
            <Divider />
            <div className="SB-14-0">상태</div>
            <RadioBtn
              id="진생중"
              groupName="상태"
              value={'progress'}
              name="진행중"
              onChange={(e) => setStatus(e.target.value)}
              checked={status === 'progress'}
            />
            <RadioBtn
              id="마감"
              groupName="상태"
              value={'done'}
              name="마감"
              onChange={(e) => setStatus(e.target.value)}
              checked={status === 'done'}
            />
            <div className="flex justify-between items-center mt-2 gap-2">
              <Button
                bgColor={BGColor.WHITE}
                border={ButtonBorder.LITTLE_RECTANGLE_BORDER}
                onClick={handleReset}
              >
                초기화
              </Button>
              <Button
                bgColor={BGColor.BLACK}
                border={ButtonBorder.LITTLE_RECTANGLE}
                onClick={handleApply}
              >
                적용하기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
