import { patientInstance } from 'api/axios';

export const patientGetMe = () => {
  return patientInstance.get('/me').then((data) => data?.data);
};
