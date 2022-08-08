import { adminInstance } from 'api/axios';

export const adminLogin = (data) => {
  return adminInstance.post('/login', data).then((data) => data?.data);
};
