'use client';

const CardSkeleton = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center rounded-2xl border-2 border-custom-gray-800 gap-4 p-6 animate-pulse">
      <section className="flex w-full justify-between relative">
        <div className="flex flex-col gap-4 w-full">
          <div className="h-4 w-1/4 bg-gray-300 rounded" />
          <div className="h-6 w-3/4 bg-gray-300 rounded" />
          <div className="flex gap-1.5">
            <div className="h-4 w-16 bg-gray-300 rounded" />
            <div className="h-4 w-16 bg-gray-300 rounded" />
          </div>
        </div>
        <div className="h-4 w-4 bg-gray-300 rounded-full" />
      </section>

      <section className="flex w-full justify-between pt-4 border-t border-custom-gray-200">
        <div className="flex items-center w-full gap-2">
          <div className="h-4 w-4 bg-gray-300 rounded" />
          <div className="h-4 w-24 bg-gray-300 rounded" />
          <div className="h-4 w-4 bg-gray-300 rounded ml-2" />
          <div className="h-4 w-24 bg-gray-300 rounded" />
        </div>
        <div className="h-8 w-28 bg-gray-300 rounded" />
      </section>
    </div>
  );
};

export default CardSkeleton;
