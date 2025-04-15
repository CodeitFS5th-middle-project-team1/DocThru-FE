import { customFetch } from '@/api/url';
import { TOAST_ID } from '@/constants';
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

export const buildQuery = (params: FetchChallengeParams): string => {
  const entries: [string, string][] = [];

  for (const [key, value] of Object.entries(params)) {
    if (
      value === undefined ||
      value === null ||
      value === '' ||
      (Array.isArray(value) && value.length === 0)
    ) {
      continue; // skip
    }

    if (Array.isArray(value)) {
      for (const v of value) {
        entries.push([key, String(v)]);
      }
    } else {
      entries.push([key, String(value)]);
    }
  }

  return entries.length ? `?${new URLSearchParams(entries).toString()}` : '';
};

export const fetchChallenges = async (
  params: FetchChallengeParams
): Promise<FetchChallengeResponse> => {
  const res = await customFetch(`/challenges${buildQuery(params)}`, {
    toastId: TOAST_ID.MAIN_CHALLENGE,
  });
  return res.json();
};

export const fetchChallengeByParticipating = async (
  params: FetchChallengeParams
): Promise<FetchChallengeResponse> => {
  const res = await customFetch(
    `/challenges/participating${buildQuery(params)}`,
    { toastId: TOAST_ID.MAIN_CHALLENGE }
  );
  return res.json();
};

export const fetchChallengeByUser = async (
  params: FetchChallengeParams
): Promise<FetchChallengeResponse> => {
  const res = await customFetch(`/challenges/user${buildQuery(params)}`, {
    toastId: TOAST_ID.MAIN_CHALLENGE,
  });
  return res.json();
};

export const fetchChallengeByAdmin = async (
  params: FetchChallengeParams
): Promise<FetchChallengeResponse> => {
  const res = await customFetch(`/challenges/manage${buildQuery(params)}`, {
    toastId: TOAST_ID.MAIN_CHALLENGE,
  });
  return res.json();
};

export const fetchChallengeById = async (id: string): Promise<Challenge> => {
  const res = await customFetch(`/challenges/${id}`, {
    toastId: TOAST_ID.MAIN_CHALLENGE,
  });
  const data = await res.json();
  return data.challenge;
};

export const createChallenge = async (data: ChallengeFormRequest) => {
  const res = await customFetch('/challenges', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    toastId: TOAST_ID.MAIN_CHALLENGE,
  });
  return res.json();
};

export const editChallenge = async (id: string, data: ChallengeFormRequest) => {
  const res = await customFetch(`/challenges/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    toastId: TOAST_ID.MAIN_CHALLENGE,
  });
  return res.json();
};

export const editChallengeByAdmin = async (
  id: string,
  data: ChallengeFormRequest
) => {
  const res = await customFetch(`/challenges/${id}/admin/modify`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    toastId: TOAST_ID.MAIN_CHALLENGE,
  });
  return res.json();
};

export const deleteChallenge = async (id: string) => {
  const res = await customFetch(`/challenges/${id}/remove`, {
    method: 'PATCH',
    toastId: TOAST_ID.MAIN_CHALLENGE,
  });
  return res.json();
};

export const deleteChallengeByAdmin = async (id: string, reason: string) => {
  const res = await customFetch(`/challenges/${id}/admin/removeForce`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ deletedReason: reason }),
    toastId: TOAST_ID.MAIN_CHALLENGE,
  });
  return res.json();
};

export const fetchMyChallenge = async (id: string): Promise<ChallengeUser> => {
  const res = await customFetch(`/challenges/${id}`, {
    toastId: TOAST_ID.MAIN_CHALLENGE,
  });
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
    toastId: TOAST_ID.MAIN_CHALLENGE,
  });
};

export const approveChallenge = async (id: string): Promise<void> => {
  await customFetch(`/challenges/${id}/admin/approve`, {
    method: 'PATCH',
    toastId: TOAST_ID.MAIN_CHALLENGE,
  });
};
