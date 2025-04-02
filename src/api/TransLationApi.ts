import { docThro } from './url';

const getTranLation = async (challengeId: string, translationId: string) => {
  try {
    const response = await docThro.get(
      `/challenges/${challengeId}/translations/${translationId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default getTranLation;
