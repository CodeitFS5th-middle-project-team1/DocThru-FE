import Button, {
  BGColor,
  ButtonBorder,
} from '@/shared/components/button/Button';

export default function Home() {
  return (
    <>
      <div className="w-10 h-10 bg-sky-50">메인 홈페이지</div>
      <Button
        border={ButtonBorder.RECTANGLE}
        bgColor={BGColor.RED}
        closeIcon={true}
      >
        {' '}
        됐냐?
      </Button>
    </>
  );
}
