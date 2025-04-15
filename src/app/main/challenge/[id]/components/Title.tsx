import { Chip } from '@/shared/components/chip/chip';
import { Container } from '@/shared/components/container/Container';
import { Divider } from '@/shared/components/Divider';
import { Challenge, Translation } from '@/types';
import profile from '@images/profile-icon/member.svg';
import deadline from '@images/deadLine-icon/small-white.svg';
import person from '@images/person-icon/small-white.svg';
import Image from 'next/image';
import { useAuthStore } from '@/api/auth/AuthStore';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants';
import {
  useDeleteChallenge,
  useDeleteChallengeByAdmin,
} from '@/api/challenge/ChallengeHooks';
import { CardSelector } from '@/shared/components/card/CardSelector';

interface TitleProps {
  data: Challenge | undefined;
  isSameUser?: boolean;
  challengeId: string;
  isUserTranslationPresent?: Translation;
}

export const Title: React.FC<TitleProps> = ({
  challengeId,
  isSameUser = false,
  data,
  isUserTranslationPresent,
}) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'ADMIN';
  const { deleteMutation: deleteByUser } = useDeleteChallenge(data?.id || '');
  const { deleteMutation: deleteByAdmin } = useDeleteChallengeByAdmin();
  const onModify = () => {
    router.push(`${PATH.challenge}/${challengeId}/edit`);
  };
  const onDelete = (reason: string) => {
    if (isAdmin) {
      if (data) {
        deleteByAdmin.mutate({ id: data.id, reason });
        router.replace(PATH.challenge);
      }
    }
    if (!isAdmin) {
      deleteByUser.mutate();
      router.replace(PATH.challenge);
    }
  };
  return (
    <div className="w-full ">
      <div className="w-full flex flex-col gap-6 sm:flex-row justify-center items-center">
        <div className="w-full flex flex-col gap-4">
          {data?.isDeadlineFull && (
            <div className="w-fit flex gap-1 bg-custom-gray-800 rounded-3xl px-4 py-2 text-white items-center M-14-0">
              <Image src={deadline} alt="deadline" /> 챌린지가 마감 되었어요
            </div>
          )}
          {data?.isParticipantsFull && (
            <div className="w-fit flex gap-1 bg-custom-gray-200 rounded-3xl px-4 py-2 text-custom-gray-800 items-center M-14-0">
              <Image src={person} alt="person" />
              모집이 완료된 상태에요
            </div>
          )}
          <div className="flex SB-24-0 justify-between">
            {data?.title}
            {isSameUser ||
              (isAdmin && (
                <CardSelector onDelete={onDelete} onEdit={onModify} />
              ))}
          </div>
          <div className="flex flex-row gap-2">
            <Chip label={data?.documentType} />
            <Chip label={data?.field} />
          </div>
          <div className="">{data?.description}</div>
          <div className="flex gap-2 items-center">
            <Image src={profile} alt="profile" />
            {data?.user.nickname}
          </div>
        </div>
        <Container
          id={challengeId}
          currentParticipants={data?.currentParticipants}
          deadLine={data?.deadline}
          maxParticipants={data?.maxParticipants}
          originUrl={data?.originURL}
          isUserTranslationPresent={isUserTranslationPresent}
        />
      </div>

      <Divider className="bg-custom-gray-100 mt-6" />
    </div>
  );
};
