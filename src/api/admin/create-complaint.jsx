import { adminInstance } from 'api/axios';

export const adminCreateComplaint = (data) => {
  return adminInstance.post('/complaints', data).then((data) => data?.data);
};
