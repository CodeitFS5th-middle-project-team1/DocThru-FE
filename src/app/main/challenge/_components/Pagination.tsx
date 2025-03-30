'use client';

import Image from 'next/image';
import { useState } from 'react';
import prevGray from '@images/arrow-icon/no-stick/gray.svg';
import prevBlack from '@images/arrow-icon/no-stick/black.svg';

type PaginationProps = {
  totalPages: number;
};

const blockSize = 5;

const Pagination = ({ totalPages }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentBlock = Math.floor((currentPage - 1) / blockSize);
  const startPage = currentBlock * blockSize + 1;
  const endPage = Math.min(startPage + blockSize - 1, totalPages);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className="flex w-72 md:w-80 gap-3 items-center justify-center mt-4">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        disabled={isPrevDisabled}
      >
        <Image
          key={`${isPrevDisabled}-prev`}
          src={isPrevDisabled ? prevGray : prevBlack}
          alt="previous Icon"
          width={6}
          height={12}
          className={isPrevDisabled ? '' : 'rotate-180'}
        />
      </button>

      <div>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 rounded-xl ${
              page === currentPage
                ? 'bg-custom-gray-800 text-sm text-custom-yellow-brand font-medium'
                : 'bg-white text-sm text-custom-gray-400 font-medium'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
        disabled={isNextDisabled}
      >
        <Image
          key={`${isNextDisabled}-prev`}
          src={isNextDisabled ? prevGray : prevBlack}
          alt="next Icon"
          width={6}
          height={12}
          className={isNextDisabled ? 'rotate-180' : ''}
        />
      </button>
    </div>
  );
};

export default Pagination;
