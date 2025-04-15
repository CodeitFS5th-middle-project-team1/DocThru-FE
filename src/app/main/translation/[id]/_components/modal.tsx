import Button, { ButtonCategory } from '@/shared/components/button/Button';

interface ModalProps {
  content: string;
  apply: () => void;
  cancle: () => void;
}
export const Modal: React.FC<ModalProps> = ({ content, apply, cancle }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 w-[400px] h-[200px] bg-white border-2 border-custom-gray-300 rounded-2xl shadow-lg z-50">
      <div className="flex h-[80%] justify-center items-center">{content}</div>
      <div className="flex justify-between">
        <Button category={ButtonCategory.CANCEL} onClick={cancle}>
          취소
        </Button>
        <Button category={ButtonCategory.APPLY} onClick={apply}>
          확인
        </Button>
      </div>
    </div>
  );
};
