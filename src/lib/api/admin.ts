export enum ChallengeOrderBy {
  CREATED_FIRST = 'default',
  CREATED_LAST = 'createdLast',
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

// 관리자용 챌린지 목록 조회
export const fetchChallengesByAdmin = async (
  params: AdminChallengeParams = {}
): Promise<AdminChallengeResponse> => {
  const { order, page = 1, limit = 10, approvalStatus, keyword } = params;

  const baseURL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5004/api';

  // URL 쿼리 파라미터
  const queryParams = new URLSearchParams();
  console.log('정렬 조건:', order);
  if (order) queryParams.append('order', order);
  if (page) queryParams.append('page', page.toString());
  if (limit) queryParams.append('limit', limit.toString());
  if (approvalStatus) queryParams.append('approvalStatus', approvalStatus);
  if (keyword) queryParams.append('keyword', keyword);
  const finalUrl = `${baseURL}/challenges/manage?${queryParams.toString()}`;
  console.log('요청 URL:', finalUrl);
  // 액세스 토큰 가져오기
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('accessToken') || '';
  }

  const response = await fetch(
    `${baseURL}/challenges/manage?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      // credentials: 'include', // 쿠키 포함
      cache: 'no-store', // 매번 새로운 데이터 요청 -> 관리자 페이지는 항상 최신 데이터
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('API 요청 실패:', response.status, errorData);
    throw new Error(
      `API error: ${response.status} ${JSON.stringify(errorData)}`
    );
  }

  const data = await response.json();
  return data;
};
