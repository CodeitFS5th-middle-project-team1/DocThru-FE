/** 유저 권한 */
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

/** 유저 랭크 */
export enum UserRank {
  NORMAL = 'NORMAL',
  EXPERT = 'EXPERT',
}

/** 챌린지 분야 타입 */
export enum FieldType {
  NEXTJS = 'NEXTJS',
  MODERNJS = 'MODERNJS',
  API = 'API',
  WEB = 'WEB',
  CAREER = 'CAREER',
}

/** 원문 문서 종류 */
export enum DocumentType {
  BLOG = 'BLOG',
  OFFICIAL = 'OFFICIAL',
}

/** 관리자 승인 상태 */
export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  DELETED = 'DELETED',
}
/** 승인 상태 한글 라벨 매핑 */
export const ApprovalStatusLabels: Record<ApprovalStatus, string> = {
  [ApprovalStatus.PENDING]: '승인 대기',
  [ApprovalStatus.APPROVED]: '신청 승인',
  [ApprovalStatus.REJECTED]: '신청 거절',
  [ApprovalStatus.DELETED]: '챌린지 삭제',
};
/** 유저 타입 */
export interface User {
  id: string;
  email: string;
  nickname: string;
  password: string;
  profileImg?: string;
  role: UserRole;
  rank: UserRank;
  participationCount: number;
  recommendedCount: number;
  refreshToken?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

/** 번역 저장 타입 */
export interface Translation {
  id: string;
  title: string;
  content: string;
  user: { id: string; nickname: string };
  challengeId: string;
  likeCount: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  lastModifiedBy?: string;
}

/** 번역 임시 저장 타입 */
export interface DraftTranslation {
  id: string;
  challengeId: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

/** 좋아요 타입 */
export interface Like {
  id: string;
  translationId: string;
  userId: string;
}

/** 피드백 타입 */
export interface Feedback {
  id: string;
  idx: number;
  translationId: string;
  userId: string;
  userNickname: string;
  userProfileImg?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
/** 챌린지(목록) */
export interface ChallengeList {
  id: string;
  title: string;
  field: FieldType;
  maxParticipants: number;
  currentParticipants: number;
  deadline: string;
  documentType: DocumentType;
  isParticipantsFull: boolean;
  isDeadlineFull: boolean;
}

/** 챌린지(게시글) 타입 */
export interface Challenge {
  id: string;
  idx: number;
  field: FieldType;
  userId: string;
  user: { nickname: string };
  title: string;
  originURL: string;
  documentType: DocumentType;
  deadline: string;
  maxParticipants: number;
  currentParticipants: number;
  description: string;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
  deletedReason?: string;
  rejectedReason?: string;
  rejectedAt?: string;
  approvalStatus: ApprovalStatus;
  approvalAt?: string;
  isParticipantsFull: boolean;
  isDeadlineFull: boolean;
}

/** 챌린지 참여자 타입 */
export interface ChallengeParticipant {
  id: string;
  challengeId: string;
  userId: string;
}

export type ErrorMessage = {
  formErrors?: string[]; // 배열임
  fieldErrors?: Record<string, string[]>;
};

export type ErrorResponse = {
  code?: number;
  message?: string | ErrorMessage;
};

/** 번역물 생성 및 수정 모달 타입 */
export type Modal = 'none' | 'drafted' | 'forgive' | 'success' | 'error';

export interface ChallengeUser {
  challenge: {
    id: string;
    idx: number;
    field: FieldType;
    userId: string;
    title: string;
    originURL: string;
    documentType: DocumentType;
    deadline: string;
    maxParticipants: number;
    currentParticipants: number;
    description: string;
    deletedAt?: string;
    createdAt: string;
    updatedAt: string;
    deletedReason?: string;
    rejectedReason?: string;
    rejectedAt?: string;
    approvalStatus: ApprovalStatus;
    approvalAt?: string;
    isParticipantsFull: boolean;
    isDeadlineFull: boolean;
    user: {
      nickname: string;
    };
  };
  nextChallengeId: {
    id: string;
  } | null;
  prevChallengeId: {
    id: string;
  } | null;
}
