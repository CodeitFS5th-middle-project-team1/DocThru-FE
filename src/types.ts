/** 유저 권한 */
export enum UserRole {
  ADMIN,
  USER,
}

/** 유저 랭크 */
export enum UserRank {
  NORMAL,
  EXPERT,
}

/** 문서 타입 */
export type DocumentType = '블로그' | '공식문서'; // chip에서 허용하는 값에 맞춤
export type FieldType = 'Next.js' | 'Modern JS' | 'API' | 'Web' | 'Career'; // 이미 chip에 맞음

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
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

/** 챌린지(게시글) 타입 */
export interface Challenge {
  id: string;
  field: FieldType;
  userId: string;
  title: string;
  originUrl: string;
  documentType: DocumentType;
  deadline: string;
  maxParticipants: number;
  currentParticipants: number;
  description: string;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  deletedReason?: string;
  rejectedReason?: string;
}

/** 번역 저장 타입 */
export interface Translation {
  id: string;
  challengeId: string;
  userId: string;
  likeCount: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

/** 번역 임시 저장 타입 */
export interface DraftTranslation {
  id: string;
  challengeId: string;
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

/** 좋아요 타입 */
export interface Like {
  id: string;
  translationId: string;
  userId: string;
}

/** 챌린지 참여자 타입 */
export interface ChallengeParticipant {
  id: string;
  challengeId: string;
  userId: string;
}

/** 댓글 타입 */
export interface Comment {
  id: string;
  translationId: string;
  userId: string;
  userNickname: string;
  userProfileImg?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
