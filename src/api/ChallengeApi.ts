import { docThro } from './url';

export const getChallenge = async (challengeId: string) => {
  try {
    const response = await docThro.get(`/challenges/${challengeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getChallengeList = async () => {
  try {
    const response = await docThro.get(`/challenges`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getChallengeUserList = async () => {
  try {
    const response = await docThro.get(`/challenges`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getChallengeManageList = async () => {
  try {
    const response = await docThro.get(`/challenges`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const createChallenge = async () => {
  try {
    const response = await docThro.post(``);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const deleteChallenge = async () => {
  try {
    const response = await docThro.delete(``);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
