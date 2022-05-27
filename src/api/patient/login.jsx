import { patientInstance } from 'api/axios';

export const patientLogin = (data) => {
  return patientInstance.post('/login', data).then((data) => data?.data);
};
