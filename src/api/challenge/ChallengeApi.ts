import { docThro } from '@/api/url';
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

export const fetchChallenges = async (
  params: FetchChallengeParams
): Promise<FetchChallengeResponse> => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined && value !== null && value !== '';
    })
  );
  const res = await docThro.get('/challenges', { params: cleanParams });
  return res.data;
};

export const fetchChallengeByParticipating = async (
  params: FetchChallengeParams
): Promise<FetchChallengeResponse> => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined && value !== null && value !== '';
    })
  );

  const res = await docThro.get('/challenges/participating', {
    params: cleanParams,
  });

  return res.data;
};

export const fetchChallengeByUser = async (
  params: FetchChallengeParams
): Promise<FetchChallengeResponse> => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined && value !== null && value !== '';
    })
  );
  const res = await docThro.get('/challenges/user', { params: cleanParams });
  return res.data;
};

export const fetchChallengeByAdmin = async (
  params: FetchChallengeParams
): Promise<FetchChallengeResponse> => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined && value !== null && value !== '';
    })
  );
  const res = await docThro.get('/challenges/manage', { params: cleanParams });
  return res.data;
};

export const fetchChallengeById = async (id: string): Promise<Challenge> => {
  const response = await docThro.get(`/challenges/${id}`);

  return response.data.challenge;
};

export const createChallenge = async (data: ChallengeFormRequest) => {
  const res = await docThro.post('/challenges', data);
  return res.data;
};

export const editChallenge = async (id: string, data: ChallengeFormRequest) => {
  const res = await docThro.patch(`/challenges/${id}`, data);
  return res.data;
};

export const deleteChallenge = async (id: string) => {
  console.log('deleteChallenge', id);
  const res = await docThro.patch(`/challenges/${id}/remove`);
  return res.data;
};

export const deleteChallengeByAdmin = async (id: string) => {
  const res = await docThro.patch(`/challenges/${id}/removeForce`);
  return res.data;
};

export const fetchMyChallenge = async (id: string): Promise<ChallengeUser> => {
  const res = await docThro.get<ChallengeUser>(`/challenges/${id}`);
  return res.data;
};

export const rejectChallenge = async (
  id: string,
  reason: string
): Promise<void> => {
  await docThro.patch(`/challenges/${id}/admin/reject`, {
    rejectedReason: reason,
  });
};

export const approveChallenge = async (id: string): Promise<void> => {
  await docThro.patch(`/challenges/${id}/admin/approve`);
};
