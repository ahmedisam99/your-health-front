import { doctorInstance } from 'api/axios';

export const doctorGetMyPatients = () => {
  return doctorInstance.get('/patients').then((data) => data?.data);
};
