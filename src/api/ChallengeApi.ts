import { docThro } from './url';

const getChallenge = async (challengeId: string) => {
  try {
    const response = await docThro.get(`/challenges/${challengeId}`);
    console.log(response.data.challenge);
    return response.data.challenge;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default getChallenge;
