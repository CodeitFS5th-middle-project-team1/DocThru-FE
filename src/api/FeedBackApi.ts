import { docThro } from './url';

export const getFeedBack = async (id: string) => {
  try {
    const response = await docThro.get(`/translations/${id}/feedbacks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
