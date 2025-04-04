import { Feedback } from '@/types';
import { create } from 'zustand';
import { getFeedBack } from '../FeedBackApi';

interface FeedBakcState {
  feedback: Feedback[] | null;
  loading: boolean;
  error: string | null;
  fetchFeedBack: (id: string) => Promise<void>;
}

export const useFeedBackStore = create<FeedBakcState>((set) => ({
  feedback: null,
  loading: false,
  error: null,

  fetchFeedBack: async (id: string) => {
    set({ loading: true, error: null });

    try {
      const response = await getFeedBack(id);
      set({ feedback: response.feedbacks, loading: false });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || '데이터를 불러오는 중 오류 발생',
        loading: false,
      });
    }
  },
}));
