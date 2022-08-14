import { adminInstance } from 'api/axios';

export const adminGetComplaints = () => {
  return adminInstance.get('/complaints').then((data) => data?.data);
};
