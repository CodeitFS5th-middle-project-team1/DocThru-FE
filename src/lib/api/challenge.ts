import { docThro } from '@/api/url';
import { ChallengeFormData } from '@/shared/components/form/ChallengeForm';
import { Challenge, DocumentType, FieldType } from '@/types';

export interface FetchChallengeParams {
  page?: number;
  limit?: number;
  documentType?: string;
  fields?: string[];
  approvalStatus?: string;
  keyword?: string;
}

interface FetchChallengeResponse {
  challengesWithIsMax: Challenge[];
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
  const res = await docThro.get('/challenges', { params });
  return res.data;
};

export const fetchChallengeById = async (
  id: string
): Promise<ChallengeFormData> => {
  const response = await docThro.get(`/challenges/${id}`);
  console.log('response', response);
  return response.data.challenge;
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
