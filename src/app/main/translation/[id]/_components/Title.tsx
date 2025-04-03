import { Chip } from '@/shared/components/chip/chip';
import { Divider } from '@/shared/components/Divider';
import { DocumentType, FieldType } from '@/types';

interface TitleProps {
  title?: string;
  document: DocumentType;
  field: FieldType;
}

export const Title: React.FC<TitleProps> = ({ title, document, field }) => {
  return (
    <div className="flex flex-col pt-10 gap-4">
      <div className="w-full SB-24-0">{title}</div>
      <div className="flex flex-row gap-2">
        <Chip label={document} />
        <Chip label={field} />
      </div>
      <Divider />
    </div>
  );
};
