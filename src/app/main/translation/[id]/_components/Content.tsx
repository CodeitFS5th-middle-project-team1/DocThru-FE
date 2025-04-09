import { Divider } from '@/shared/components/Divider';

interface ContentProps {
  content?: string;
}

export const Content: React.FC<ContentProps> = ({ content = '' }) => {
  return (
    <div>
      <div
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <Divider />
    </div>
  );
};
