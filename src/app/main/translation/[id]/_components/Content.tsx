import { Divider } from '@/shared/components/Divider';

interface ContentProps {
  content?: string;
}

export const Content: React.FC<ContentProps> = ({ content = '' }) => {
  return (
    <div>
      <div className="pt-6 pb-16">{content}</div>
      <Divider />
    </div>
  );
};
