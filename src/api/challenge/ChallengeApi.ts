import { customFetch } from '@/api/url';
import { Challenge, ChallengeUser, DocumentType, FieldType } from '@/types';

export interface FetchChallengeParams {
  id?: string;
  page?: number;
  limit?: number;
  documentType?: string;
  fields?: string[];
  approvalStatus?: string;
  keyword?: string;
  status?: string;
  isExpired?: boolean;
  orderBy?: string;
}

interface FetchChallengeResponse {
  challenges: Challenge[];
  totalCount: number;
}

export interface ChallengeFormRequest {
  title: string;
  originURL: string;
  documentType: DocumentType;
  field: FieldType;
  deadline: Date;
  maxParticipants: number;
  description: string;
}

const buildQuery = (params: FetchChallengeParams): string => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined && value !== null && value !== '';
    })
  );
  return `?${new URLSearchParams(cleanParams as any).toString()}`;
};

export const fetchChallenges = async (
  params: FetchChallengeParams
): Promise<FetchChallengeResponse> => {
  const res = await customFetch(`/challenges${buildQuery(params)}`);
  return res.json();
};

export const fetchChallengeByParticipating = async (
  params: FetchChallengeParams
): Promise<FetchChallengeResponse> => {
  const res = await customFetch(
    `/challenges/participating${buildQuery(params)}`
  );
  return res.json();
};

export const fetchChallengeByUser = async (
  params: FetchChallengeParams
): Promise<FetchChallengeResponse> => {
  const res = await customFetch(`/challenges/user${buildQuery(params)}`);
  return res.json();
};

export const fetchChallengeByAdmin = async (
  params: FetchChallengeParams
): Promise<FetchChallengeResponse> => {
  const res = await customFetch(`/challenges/manage${buildQuery(params)}`);
  return res.json();
};

export const fetchChallengeById = async (id: string): Promise<Challenge> => {
  const res = await customFetch(`/challenges/${id}`);
  const data = await res.json();
  return data.challenge;
};

export const createChallenge = async (data: ChallengeFormRequest) => {
  const res = await customFetch('/challenges', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const editChallenge = async (id: string, data: ChallengeFormRequest) => {
  const res = await customFetch(`/challenges/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteChallenge = async (id: string) => {
  const res = await customFetch(`/challenges/${id}/remove`, {
    method: 'PATCH',
  });
  return res.json();
};

export const deleteChallengeByAdmin = async (id: string) => {
  const res = await customFetch(`/challenges/${id}/removeForce`, {
    method: 'PATCH',
  });
  return res.json();
};

export const fetchMyChallenge = async (id: string): Promise<ChallengeUser> => {
  const res = await customFetch(`/challenges/${id}`);
  return res.json();
};

export const rejectChallenge = async (
  id: string,
  reason: string
): Promise<void> => {
  await customFetch(`/challenges/${id}/admin/reject`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rejectedReason: reason }),
  });
};

export const approveChallenge = async (id: string): Promise<void> => {
  await customFetch(`/challenges/${id}/admin/approve`, {
    method: 'PATCH',
  });
};
