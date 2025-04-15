import { customFetch } from '@/api/url';
import { buildQuery } from '../challenge/ChallengeApi';
import { TOAST_ID } from '@/constants';
export enum ChallengeOrderBy {
  CREATED_LAST = 'createdLast', // 신청 시간 빠른 순
  CREATED_FIRST = 'createdFirst', // 신청 시간 느린 순
  DEADLINE_FIRST = 'deadLineFirst', // 마감일 빠른 순
  DEADLINE_LAST = 'deadLineLast', // 마감일 느린 순
}

export interface AdminChallengeParams {
  order?: ChallengeOrderBy | string;
  page?: number;
  limit?: number;
  approvalStatus?: string;
  keyword?: string;
}

export interface AdminChallengeResponse {
  challenges: {
    id: string;
    idx: number;
    title: string;
    field: string;
    maxParticipants: number;
    deadline: string;
    createdAt: string;
    documentType: string;
    approvalStatus: string;
    isParticipantsFull: boolean;
    isDeadlineFull: boolean;
  }[];
  totalCount: number;
}
export const fetchChallengesByAdmin = async (
  params: AdminChallengeParams = {}
): Promise<AdminChallengeResponse> => {
  const res = await customFetch(`/challenges/manage${buildQuery(params)}`, {
    toastId: TOAST_ID.MAIN_CHALLENGE,
  });
  return res.json();
};
// // 관리자용 챌린지 목록 조회 API - NEXT FETCH 사용
// export const fetchChallengesByAdmin = async (
//   params: AdminChallengeParams = {}
// ): Promise<AdminChallengeResponse> => {
//   const { order, page = 1, limit = 10, approvalStatus, keyword } = params;

//   const baseURL =
//     process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

//   // URL 쿼리 파라미터
//   const queryParams = new URLSearchParams();
//   if (order) queryParams.append('orderBy', order);
//   if (page) queryParams.append('page', page.toString());
//   if (limit) queryParams.append('limit', limit.toString());
//   if (approvalStatus) queryParams.append('approvalStatus', approvalStatus);
//   if (keyword) queryParams.append('keyword', keyword);
//   let token = '';
//   if (typeof window !== 'undefined') {
//     token = localStorage.getItem('accessToken') || '';
//   }

//   const response = await fetch(
//     `${baseURL}/challenges/manage?${queryParams.toString()}`,
//     {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       // credentials: 'include', // 쿠키 포함
//       cache: 'no-store', // 매번 새로운 데이터 요청 -> 관리자 페이지는 항상 최신 데이터
//     }
//   );

//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({}));
//     console.error('API 요청 실패:', response.status, errorData);
//     throw new Error(
//       `API error: ${response.status} ${JSON.stringify(errorData)}`
//     );
//   }

//   const data = await response.json();
//   return data;
// };
