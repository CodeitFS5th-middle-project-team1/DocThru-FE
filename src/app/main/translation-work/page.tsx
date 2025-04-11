'use client';

import { NextPage } from 'next';
import PostMain from './_components/PostMain';
import { Suspense } from 'react';

const TranslationWork: NextPage = () => {
  return (
    <div>
      <Suspense>
        <PostMain />
      </Suspense>
    </div>
  );
};
export default TranslationWork;
