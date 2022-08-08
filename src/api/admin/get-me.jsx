import { adminInstance } from 'api/axios';

export const adminGetMe = () => {
  return adminInstance.get('/me').then((data) => data?.data);
};
