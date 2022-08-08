import { adminInstance } from 'api/axios';

export const adminGetPatients = () => {
  return adminInstance.get('/patients').then((data) => data?.data);
};
