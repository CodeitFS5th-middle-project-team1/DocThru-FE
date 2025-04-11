'use client';

import { NextPage } from 'next';
import PatchMain from '../_components/PatchMain';
import { Suspense } from 'react';

const TranslationWorkModify: NextPage = () => {
    return (
      <div>
        <Suspense>
          <PatchMain />
        </Suspense>
      </div>
    );
};
export default TranslationWorkModify;
