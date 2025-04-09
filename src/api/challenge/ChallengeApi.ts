import { docThro } from '@/api/url';
import { ChallengeFormData } from '@/shared/components/form/ChallengeForm';
import { Challenge, ChallengeUser, DocumentType, FieldType } from '@/types';

export interface FetchChallengeParams {
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

export const fetchChallengeById = async (
  id: string
): Promise<ChallengeFormData> => {
  const response = await docThro.get(`/challenges/${id}`);

  return response.data.challenge;
};

export const fetchMyChallenge = async (id: string): Promise<ChallengeUser> => {
  const res = await docThro.get<ChallengeUser>(`/challenges/${id}`);
  console.log('dasdsadwqe214214', res.data);
  return res.data;
};

export const createChallenge = async (data: ChallengeFormRequest) => {
  console.log('data', data);
  const res = await docThro.post('/challenges', data);
  return res.data;
};

export const editChallenge = async (id: string, data: ChallengeFormRequest) => {
  const res = await docThro.patch(`/challenges/${id}`, data);
  return res.data;
};

export const deleteChallenge = async (id: string) => {
  const res = await docThro.patch(`/challenges/${id}/remove`);
  return res.data;
};

export const deleteChallengeByAdmin = async (id: string) => {
  const res = await docThro.patch(`/challenges/${id}/removeForce`);
  return res.data;
};
