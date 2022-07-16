import { patientInstance } from 'api/axios';

export const patientGetProfile = () => {
  return patientInstance.get('/profile').then((data) => data?.data);
};
