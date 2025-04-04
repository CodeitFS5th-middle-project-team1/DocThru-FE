// 관리자용 챌린지 정렬 옵션을 위한 enum 추가
export enum ChallengeOrderBy {
  DEFAULT = 'default',
  APPLY_FIRST = 'applyFirst', // 승인 최신 순
  APPLY_LAST = 'applyLast', // 승인 오래된 순
  DEADLINE_FIRST = 'deadLineFirst', // 마감일 빠른 순
  DEADLINE_LAST = 'deadLineLast', // 마감일 느린 순
}

// 관리자용 챌린지 목록 조회 매개변수
export interface AdminChallengeParams {
  orderBy?: ChallengeOrderBy;
  page?: number;
  limit?: number;
  approvalStatus?: string; // 'PENDING', 'APPROVED', 'REJECTED' 등
  keyword?: string;
}

// 관리자용 챌린지 목록 응답 타입
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
  const { orderBy, page = 1, limit = 10, approvalStatus, keyword } = params;

  // API 기본 URL 설정
  const baseURL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5004/api';

  // URL 쿼리 파라미터 구성
  const queryParams = new URLSearchParams();
  if (orderBy) queryParams.append('orderBy', orderBy);
  if (page) queryParams.append('page', page.toString());
  if (limit) queryParams.append('limit', limit.toString());
  if (approvalStatus) queryParams.append('approvalStatus', approvalStatus);
  if (keyword) queryParams.append('keyword', keyword);
  // 액세스 토큰 가져오기 (클라이언트 컴포넌트에서 호출될 경우)
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
      // Next.js 캐싱 옵션
      cache: 'no-store', // 매번 새로운 데이터 요청 (관리자 페이지는 항상 최신 데이터 필요)
    }
  );

  if (!response.ok) {
    // 에러 처리 로직
    const errorData = await response.json().catch(() => ({}));
    console.error('API 요청 실패:', response.status, errorData);
    throw new Error(
      `API error: ${response.status} ${JSON.stringify(errorData)}`
    );
  }
  const data = await response.json();
  return data;
};
