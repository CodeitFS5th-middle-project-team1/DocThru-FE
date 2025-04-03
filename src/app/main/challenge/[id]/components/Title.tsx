import { Chip } from '@/shared/components/chip/chip';
import { Container } from '@/shared/components/container/Container';
import { Divider } from '@/shared/components/Divider';
import { DocumentType, FieldType } from '@/types';
import profile from '@images/profile-icon/member.svg';
import Image from 'next/image';

interface TitleProps {
  title?: string;
  document?: DocumentType;
  field: FieldType;
  content: string;
  nickname: string;
  currentParticipants: number;
  maxParticipants: number;
  deadLine: string;
  originUrl: string;
}

export const Title: React.FC<TitleProps> = ({
  title,
  document,
  field,
  content,
  nickname = '',
  currentParticipants,
  maxParticipants,
  deadLine,
  originUrl,
}) => {
  return (
    <div className="w-full py-6">
      <div className="w-full flex flex-row gap-6">
        <div className="w-full flex flex-col gap-4">
          <div className="SB-24-0">{title}</div>
          <div className="flex flex-row gap-2">
            <Chip label={document} />
            <Chip label={field} />
          </div>
          <div className="">{content}</div>
          <div className="flex gap-2">
            <Image src={profile} alt="" />
            {nickname}
          </div>
          <></>
        </div>
        <Container
          currentParticipants={currentParticipants}
          deadLine={deadLine}
          maxParticipants={maxParticipants}
          originUrl={originUrl}
        />
      </div>

      <Divider className="bg-custom-gray-100 mt-6" />
    </div>
  );
};
