import Button, { ButtonCategory } from '@/shared/components/button/Button';

export default function MyChallengeHead() {
  return (
    <div className="flex justify-between items-center">
      <p className="text-xl text-custom-gray-800 font-semibold ">나의 챌린지</p>
      <div className="flex px-">
        <Button
          category={ButtonCategory.NEW_CHALLENGE}
          href={'/main/challenge/new'}
        >
          신규 챌린지 신청
        </Button>
      </div>
    </div>
  );
}
