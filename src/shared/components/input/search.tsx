import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import search from '@images/search-icon/ic_search.svg';

interface SearchInputProps {
  name: string;
  placeholder?: string;
  onSearch: (value: string) => void;
}

const Search: FC<SearchInputProps> = ({ name, placeholder, onSearch }) => {
  const { register, watch } = useFormContext();
  const searchValue = watch(name);

  const handleSearch = () => {
    onSearch(searchValue); // 상위 컴포넌트로 값 전달
  };

  return (
    <div className="mb-4 relative">
      <input
        type="search"
        {...register(name)}
        placeholder={placeholder}
        className="w-full pl-9 rounded-3xl pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button
        type="button"
        className="absolute inset-y-0 left-2 pr-2 h-10.5 hover:opacity-40 "
        onClick={handleSearch}
      >
        <Image src={search} alt="search Img" width={24} height={24} />
      </button>
    </div>
  );
};

export default Search;
