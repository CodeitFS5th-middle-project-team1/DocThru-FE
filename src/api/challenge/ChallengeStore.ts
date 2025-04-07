import { create } from 'zustand';
import { Challenge, ChallengeList } from '@/types';
import { getChallenge, getChallengeList } from '../ChallengeApi';

interface ChallengeState {
  challenge: Challenge | null;
  loading: boolean;
  error: string | null;
  fetchChallenge: (challengeId: string) => Promise<void>;
}

export const useChallengeStore = create<ChallengeState>((set) => ({
  challenge: null,
  loading: false,
  error: null,

  fetchChallenge: async (challengeId: string) => {
    set({ loading: true, error: null });

    try {
      const response = await getChallenge(challengeId);
      set({ challenge: response.challenge, loading: false });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || '데이터를 불러오는 중 오류 발생',
        loading: false,
      });
    }
  },
}));

interface ChallengeListState {
  challengeList: ChallengeList[] | null;
  loading: boolean;
  error: string | null;
  fetchChallengeList: () => Promise<void>;
}

export const useChallengeListStore = create<ChallengeListState>((set) => ({
  challengeList: null,
  loading: false,
  error: null,

  fetchChallengeList: async () => {
    set({ loading: true, error: null });

    try {
      const response = await getChallengeList();
      set({ challengeList: response.challenges, loading: false });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || '데이터를 불러오는 중 오류 발생',
        loading: false,
      });
    }
  },
}));
