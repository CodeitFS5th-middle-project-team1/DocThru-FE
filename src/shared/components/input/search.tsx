import { FC, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import search from '@images/search-icon/ic_search.svg';

interface SearchInputProps {
  name: string;
  placeholder?: string;
  onSearch: (value: string) => void;
  size?: string;
}

const Search: FC<SearchInputProps> = ({
  name,
  placeholder,
  onSearch,
  size = 'w-full h-12', // 마이 챌린지 페이지에서 화면 꽉 차게 사용되기 때문에 수정했는데 문제되면 알려주세요 -은비
}) => {
  const [value, setValue] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 디바운스 처리
    timeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearch = () => {
    // 수동 검색 시 pending 상태의 타임아웃 제거
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onSearch(value);
  };

  return (
    <div className=" relative">
      <input
        type="search"
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`pl-9 rounded-3xl pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-gray-300 ${size}`}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button
        type="button"
        className="absolute inset-y-0 left-2 pr-2 h-full hover:opacity-40"
        onClick={handleSearch}
      >
        <Image src={search} alt="search Img" width={24} height={24} />
      </button>
    </div>
  );
};

export default Search;
