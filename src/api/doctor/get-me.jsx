import { doctorInstance } from 'api/axios';

export const doctorGetMe = () => {
  return doctorInstance.get('/me').then((data) => data?.data);
};
