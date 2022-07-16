import { doctorInstance } from 'api/axios';

export const doctorGetProfile = () => {
  return doctorInstance.get('/profile').then((data) => data?.data);
};
