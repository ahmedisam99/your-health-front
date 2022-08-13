import { doctorInstance } from 'api/axios';

export const doctorGetComplaints = () => {
  return doctorInstance.get('/complaints').then((data) => data?.data);
};
