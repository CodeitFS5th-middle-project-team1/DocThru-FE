import { docThro } from './url';

export const login = async (email: string, password: string) => {
  try {
    const response = await docThro.post(`auth/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const signup = async () => {
  try {
    const response = await docThro.post(`auth/signup`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
