import { adminInstance } from 'api/axios';

export const adminGetDoctors = () => {
  return adminInstance.get('/doctors').then((data) => data?.data);
};
