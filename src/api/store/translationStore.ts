import { create } from 'zustand';
import getTranLation from '../TransLationApi';
import { Translation } from '@/types';

interface TranslationState {
  translation: Translation | null;
  loading: boolean;
  error: string | null;
  fetchTranslation: (
    challengeId: string,
    translationId: string
  ) => Promise<void>;
}

export const useTranslationStore = create<TranslationState>((set) => ({
  translation: null,
  loading: false,
  error: null,

  fetchTranslation: async (challengeId: string, translationId: string) => {
    set({ loading: true, error: null });

    try {
      const response = await getTranLation(challengeId, translationId);
      set({ translation: response, loading: false });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || '데이터를 불러오는 중 오류 발생',
        loading: false,
      });
    }
  },
}));
