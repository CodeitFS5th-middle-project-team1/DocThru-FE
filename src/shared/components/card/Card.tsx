import timerIcon from '@images/deadLine-icon/small.svg';
import personIcon from '@images/person-icon/small.svg';
import Image from 'next/image';
import dayjs from '@/lib/utill';
import { DocumentType, FieldType } from '@/types';
import { Chip } from '../chip/chip';
import { ChipCardStatus } from '../chip/ChipCardStatus';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants';
import Button, { ButtonCategory } from '../button/Button';
import { CardSelector } from './CardSelector';
import { useAuthStore } from '@/api/auth/AuthStore';
import {
  deleteChallenge,
  deleteChallengeByAdmin,
} from '@/api/challenge/ChallengeApi';
import toast from 'react-hot-toast';

export interface CardData {
  id: string;
  userId: string;
  approvalStatus?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DELETED';
  status?: 'inProgress' | 'completed';
  title: string;
  documentType: DocumentType;
  field: FieldType;
  deadline: string;
  currentParticipants: number;
  maxParticipants: number;
  isDeadlineFull: boolean;
  isParticipantsFull: boolean;
}

export interface CardProps {
  data: CardData;
  href?: string;
  onClick?: () => void;
}

export const Card = ({ data, href, onClick }: CardProps) => {
  const { user } = useAuthStore();
  const router = useRouter();

  const maxParticipant = data?.isParticipantsFull ?? false;
  const overDeadLine = data?.isDeadlineFull ?? false;

  const isMine = user?.id === data.userId;
  const isAdmin = user?.role === 'ADMIN';
  const isShowSelector = isAdmin;
  const isShowButton =
    data.status === 'inProgress' || data.status === 'completed';

  const handleClick = () => {
    if (onClick) return onClick();
    router.push(`${PATH.challenge}/${data.id}`);
  };

  const handleEdit = () => router.push(`${PATH.challenge}/${data.id}/edit`);

  const handleDelete = async () => {
    try {
      if (isAdmin) {
        await deleteChallengeByAdmin(data.id);
      } else {
        await deleteChallenge(data.id);
      }
      router.refresh();
    } catch (error) {
      toast.error('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col  w-full justify-center items-center rounded-2xl border-2 border-custom-gray-800 gap-4 p-6 "
    >
      <section className="flex w-full justify-between relative">
        <div className="flex flex-col gap-4 ">
          {maxParticipant || overDeadLine ? (
            <div className="flex">
              <ChipCardStatus
                status={maxParticipant ? 'full' : 'done'}
                className=""
              />
            </div>
          ) : (
            ''
          )}
          <p className="text-xl text-custom-gray-700 font-bold">{data.title}</p>
          <div className="flex gap-1.5 ">
            <Chip label={data.field} />
            <Chip label={data.documentType} />
          </div>
        </div>
        {isShowSelector && (
          <>
            <CardSelector onEdit={handleEdit} onDelete={handleDelete} />
          </>
        )}
      </section>

      <section className="flex w-full justify-between pt-4  border-t border-custom-gray-200">
        <div className="flex items-center w-full gap-1">
          <Image src={timerIcon} alt="deadLine Icon" width={16} height={16} />
          <p className="text-sm font-normal text-custom-gray-600">
            {dayjs(data.deadline).format('YYYY년 M월 D일')} 마감
          </p>
          <Image src={personIcon} alt="person Icon" width={16} height={16} />
          <p className="text-sm font-normal text-custom-gray-600">
            {data.currentParticipants}/{data.maxParticipants}
          </p>
        </div>

        {isShowButton && (
          <div className="flex w-40 ">
            <Button
              category={
                data.status === 'inProgress'
                  ? ButtonCategory.CONTINUE
                  : ButtonCategory.VIEW_ORIGINAL
              }
              href={href}
            >
              {data.status === 'inProgress'
                ? '도전 계속하기'
                : '내 작업물 보기'}
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};
