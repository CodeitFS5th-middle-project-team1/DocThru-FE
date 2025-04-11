import { FC, useState, useMemo } from 'react';
import Image from 'next/image';
import search from '@images/search-icon/ic_search.svg';
import { debounce } from '@/lib/utill';

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
  size = 'w-86 md:w-147.5 h-12',
}) => {
  const [value, setValue] = useState<string>('');

  const debouncedSearch = useMemo(
    () => debounce(onSearch as (...args: unknown[]) => void, 500),
    [onSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleSearch = () => {
    onSearch(value);
  };

  return (
    <div className="relative">
      <input
        type="search"
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`pl-9 rounded-3xl pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-gray-300 ${size}`}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
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
