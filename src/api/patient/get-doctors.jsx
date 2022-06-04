import { patientInstance } from 'api/axios';

export const patientGetDoctors = () => {
  return patientInstance.get('/doctors').then((data) => data?.data);
};
