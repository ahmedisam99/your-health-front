import { doctorInstance } from 'api/axios';

export const doctorGetReports = () => {
  return doctorInstance.get('/reports').then((data) => data?.data);
};
