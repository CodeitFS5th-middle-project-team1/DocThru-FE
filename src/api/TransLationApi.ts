import { docThro } from './url';

export const getTranLation = async (
  challengeId: string,
  translationId: string
) => {
  try {
    const response = await docThro.get(
      `/challenges/${challengeId}/translations/${translationId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getTranLationList = async (challengeId: string) => {
  try {
    const response = await docThro.get(
      `/challenges/${challengeId}/translations`
    );
    return response.data.translations;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  // 번역물을 생성하는 API
  export const createTranslation = async ({
    title,
    content,
    challengeId,
  }: {
    title: string;
    content: string;
    challengeId: string;
  }) => {
    const response = await docThro.post(
      `/challenges/${challengeId}/translations`,
      {
        title,
        content,
      }
    );
    return response;
  };

    // 임시 저장 생성 API
    export const createDraftTranslation = async ({
      title,
      content,
      challengeId,
    }: {
      title: string;
      content: string;
      challengeId: string;
    }) => {
      const response = await docThro.post(`/challenges/${challengeId}/drafts`, {
        title,
        content,
      });
      return response;
    };
  
    // 임시 저장된 번역물을 가져오는 API
    export const getDraftTranslation = async (challengeId : string) => {
      const response = await docThro.get(`/challenges/${challengeId}/drafts`);
      return response;
    };
  