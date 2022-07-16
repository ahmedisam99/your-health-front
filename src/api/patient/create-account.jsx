import { patientInstance } from 'api/axios';

export const patientCreateAccount = (data) => {
  return patientInstance.post('/register', data).then((data) => data?.data);
};
