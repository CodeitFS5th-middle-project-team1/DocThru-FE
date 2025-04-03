import { DocumentType, FieldType } from '@/types';

export interface ChallengeDetail {
  id: string;
  title: string;
  DocumentType: DocumentType;
  FieldType: FieldType;
  deadLine: string;
  currentParticipants: number;
  maxParticipants: number;
  content: string;
  approvalStatus: string;
  approvalReason: string;
  name: string;
  time: string;
}

export const getDetail = async (id: string): Promise<ChallengeDetail> => {
  return {
    id: id,
    title: '챌린지 제목 예시',
    DocumentType: '블로그', // 'BLOG' → '블로그' 로 변경
    FieldType: 'Career', // 그대로 사용 가능
    deadLine: '2025-05-01T23:59:59',
    currentParticipants: 3,
    maxParticipants: 5,
    content: '이건은 예시로 작성한 내용입니다 커피는 너무 많이 마시면 안됩니다',
    approvalStatus: 'REJECTED',
    name: '운영진',
    time: '24/04/02 17:08',
    approvalReason:
      '독스루는 개발 문서 번역 플랫폼으로, 다른 종류의 번역 챌린지를 개최할 수 없음을 알려드립니다. 감사합니다.',
  };
};
