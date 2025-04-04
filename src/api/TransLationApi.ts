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
